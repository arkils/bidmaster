import json
import os
import time
import base64
from datetime import datetime, timezone
from decimal import Decimal

import boto3
from botocore.exceptions import ClientError

from bid import bid_notice, select_trump, submit_bid, trump_notice
from play import accept_result, card_notice, continued_notice, hand_notices, play_card, scored_notice
from deal import hand_notice, match_view, start_match, started_notice
from rooms import (
    create_item,
    join_players,
    leave_players,
    kept_matches,
    new_room_id,
    notice,
    player_topic,
    public_room,
    room_topic,
)

table = boto3.resource("dynamodb").Table(os.environ["ROOMS_TABLE"])
iot = boto3.client("iot-data", endpoint_url=f"https://{os.environ['IOT_ENDPOINT']}")
AUTHORIZER_NAME = "bidmaster-player"


def handler(event, context):
    method = event["requestContext"]["http"]["method"]
    path = event.get("rawPath", "")
    if method == "GET" and path == "/api/health":
        return respond(200, {"status": "ok"})
    if method == "GET" and path == "/api/matches":
        return list_matches(query_player(event))
    body = read_body(event)
    room_id = (event.get("pathParameters") or {}).get("roomId", "")
    if method == "POST" and path == "/api/rooms":
        return create_room(body)
    if method == "POST" and path.endswith("/play"):
        return play_room(room_id, body)
    if method == "POST" and path.endswith("/result"):
        return result_room(room_id, body)
    if method == "POST" and path.endswith("/bid"):
        return bid_room(room_id, body)
    if method == "POST" and path.endswith("/trump"):
        return trump_room(room_id, body)
    if method == "POST" and path.endswith("/start"):
        return start_room(room_id, body)
    if method == "POST" and path.endswith("/join"):
        return join_room(room_id, body)
    if method == "POST" and path.endswith("/leave"):
        return leave_room(room_id, body)
    if method == "GET" and room_id:
        return load_room(room_id, query_player(event))
    return respond(404, {"error": "there is no room with that id"})


def create_room(body):
    name = str(body.get("name") or "").strip()
    player_id = str(body.get("playerId") or "").strip()
    if not name or not player_id:
        return respond(400, {"error": "a name is required"})
    for _ in range(8):
        room_id = new_room_id()
        item = create_item(room_id, player_id, name, int(time.time() * 1000))
        try:
            table.put_item(Item=item, ConditionExpression="attribute_not_exists(roomId)")
        except ClientError as error:
            if error.response["Error"]["Code"] != "ConditionalCheckFailedException":
                raise
            continue
        publish("joined", item)
        return respond(200, with_iot(present(item, player_id)))
    return respond(500, {"error": "a room id could not be reserved"})


def join_room(room_id, body):
    item = load_item(room_id)
    if item is None:
        return respond(404, {"error": "there is no room with that id"})
    name = str(body.get("name") or "").strip()
    player_id = str(body.get("playerId") or "").strip()
    if not name or not player_id:
        return respond(400, {"error": "a name is required"})
    players, error = join_players(item, player_id, name, int(time.time() * 1000))
    if error:
        return respond(409, {"error": error})
    changed = players != item.get("players")
    item["players"] = players
    if changed:
        save(item)
        publish("joined", item)
    return respond(200, with_iot(present(item, player_id)))


def leave_room(room_id, body):
    item = load_item(room_id)
    if item is None:
        return respond(404, {"error": "there is no room with that id"})
    player_id = str(body.get("playerId") or "").strip()
    remaining = leave_players(item, player_id)
    if remaining is None:
        return respond(403, with_iot(present(item, player_id, include_cards=False)))
    item["players"] = remaining
    save(item)
    publish("host-left", item)
    return respond(200, with_iot(present(item, player_id)))


def bid_room(room_id, body):
    item = load_item(room_id)
    if item is None:
        return respond(404, {"error": "there is no room with that id"})
    player_id = str(body.get("playerId") or "").strip()
    raw = body.get("bid")
    bid = raw if isinstance(raw, int) and not isinstance(raw, bool) else None
    updated, error = (None, None) if bid is None else submit_bid(item, player_id, bid)
    if error:
        return respond(409, {"error": error})
    if updated is None:
        return respond(403, with_iot(present(item, player_id)))
    if not save_turn(item, updated):
        current = load_item(room_id)
        return respond(403, with_iot(present(current, player_id)))
    publish_payload(bid_notice(updated))
    return respond(200, with_iot(present(updated, player_id)))


def trump_room(room_id, body):
    item = load_item(room_id)
    if item is None:
        return respond(404, {"error": "there is no room with that id"})
    player_id = str(body.get("playerId") or "").strip()
    updated = select_trump(item, player_id, body.get("suit"))
    if updated is None:
        return respond(403, with_iot(present(item, player_id)))
    if not save_turn(item, updated):
        current = load_item(room_id)
        return respond(403, with_iot(present(current, player_id)))
    publish_payload(trump_notice(updated))
    return respond(200, with_iot(present(updated, player_id)))


def play_room(room_id, body):
    item = load_item(room_id)
    if item is None:
        return respond(404, {"error": "there is no room with that id"})
    player_id = str(body.get("playerId") or "").strip()
    played = play_card(item, player_id, body.get("suit"), body.get("rank"), now=int(time.time() * 1000))
    if played is None:
        return respond(403, with_iot(present(item, player_id, include_cards=False)))
    updated, meta = played
    if not save_if_turn(item, updated):
        current = load_item(room_id)
        return respond(403, with_iot(present(current, player_id, include_cards=False)))
    publish_payload(card_notice(updated, meta))
    if meta.get("scored"):
        publish_payload(scored_notice(updated, meta))
    for owner, cards in hand_notices(updated, meta, player_id):
        iot.publish(
            topic=player_topic(updated["roomId"], owner),
            qos=0,
            payload=json.dumps({"kind": "hand", "roomId": updated["roomId"], "cards": cards}).encode(),
        )
    return respond(200, with_iot(present(updated, player_id, include_cards=False)))


def result_room(room_id, body):
    item = load_item(room_id)
    if item is None:
        return respond(404, {"error": "there is no room with that id"})
    player_id = str(body.get("playerId") or "").strip()
    accepted = accept_result(item, player_id, int(time.time() * 1000))
    if accepted is None:
        return respond(403, with_iot(present(item, player_id, include_cards=False)))
    updated, meta = accepted
    if not save_result(item, updated):
        current = load_item(room_id)
        return respond(403, with_iot(present(current, player_id, include_cards=False)))
    publish_payload(continued_notice(updated, meta))
    for owner, cards in hand_notices(updated, meta, player_id):
        iot.publish(
            topic=player_topic(updated["roomId"], owner),
            qos=0,
            payload=json.dumps({"kind": "hand", "roomId": updated["roomId"], "cards": cards}).encode(),
        )
    return respond(200, with_iot(present(updated, player_id, include_cards=False)))


def list_matches(player_id):
    found = kept_matches(scan_rooms(), player_id)
    if found is None:
        return respond(400, {})
    return respond(200, {"matches": found})


def scan_rooms():
    items = []
    kwargs = {}
    while True:
        result = table.scan(**kwargs)
        items.extend(result.get("Items", []))
        last = result.get("LastEvaluatedKey")
        if not last:
            return items
        kwargs["ExclusiveStartKey"] = last


def load_room(room_id, player_id):
    item = load_item(room_id)
    if item is None:
        return respond(404, {"error": "there is no room with that id"})
    return respond(200, with_iot(present(item, player_id)))


def start_room(room_id, body):
    item = load_item(room_id)
    if item is None:
        return respond(404, {"error": "there is no room with that id"})
    player_id = str(body.get("playerId") or "").strip()
    started = start_match(item, player_id, body.get("seat"), utc_date())
    if started is None:
        return respond(403, with_iot(present(item, player_id, include_cards=False)))
    try:
        table.put_item(
            Item=started,
            ConditionExpression="started = :unstarted",
            ExpressionAttributeValues={":unstarted": False},
        )
    except ClientError as error:
        if error.response["Error"]["Code"] != "ConditionalCheckFailedException":
            raise
        current = load_item(room_id)
        return respond(403, with_iot(present(current, player_id, include_cards=False)))
    publish_started(started)
    return respond(200, with_iot(present(started, player_id, include_cards=False)))


def load_item(room_id):
    result = table.get_item(Key={"roomId": room_id})
    return result.get("Item")


def save(item):
    table.put_item(Item=item)


def save_if_turn(current, updated):
    try:
        table.put_item(
            Item=updated,
            ConditionExpression="#turn = :turn",
            ExpressionAttributeNames={"#turn": "turn"},
            ExpressionAttributeValues={":turn": int(current["turn"])},
        )
    except ClientError as error:
        if error.response["Error"]["Code"] != "ConditionalCheckFailedException":
            raise
        return False
    return True


def save_result(current, updated):
    try:
        table.put_item(
            Item=updated,
            ConditionExpression="resultAt = :at",
            ExpressionAttributeValues={":at": current["resultAt"]},
        )
    except ClientError as error:
        if error.response["Error"]["Code"] != "ConditionalCheckFailedException":
            raise
        return False
    return True


def save_turn(current, updated):
    try:
        table.put_item(
            Item=updated,
            ConditionExpression="#turn = :turn AND attribute_not_exists(trump)",
            ExpressionAttributeNames={"#turn": "turn"},
            ExpressionAttributeValues={":turn": int(current["turn"])},
        )
    except ClientError as error:
        if error.response["Error"]["Code"] != "ConditionalCheckFailedException":
            raise
        return False
    return True


def present(item, caller_id, include_cards=True):
    if item.get("started"):
        return match_view(item, caller_id, include_cards)
    return public_room(item, caller_id)


def utc_date():
    return datetime.now(timezone.utc).date().isoformat()


def publish(kind, item):
    publish_payload(notice(kind, item))


def publish_payload(payload):
    iot.publish(topic=room_topic(payload["roomId"]), qos=0, payload=json.dumps(payload).encode())


def publish_started(item):
    iot.publish(topic=room_topic(item["roomId"]), qos=0, payload=json.dumps(started_notice(item)).encode())
    for seat in range(1, len(item["players"]) + 1):
        player_id = item["players"][seat - 1]["playerId"]
        iot.publish(
            topic=player_topic(item["roomId"], player_id),
            qos=0,
            payload=json.dumps(hand_notice(item, seat)).encode(),
        )


def with_iot(body):
    body["iotEndpoint"] = os.environ["IOT_ENDPOINT"]
    body["authorizerName"] = AUTHORIZER_NAME
    return body


def query_player(event):
    params = event.get("queryStringParameters") or {}
    return str(params.get("playerId") or "")


def read_body(event):
    raw = event.get("body") or ""
    if event.get("isBase64Encoded") and raw:
        raw = base64.b64decode(raw).decode()
    if not raw:
        return {}
    return json.loads(raw)


def respond(status, body):
    return {
        "statusCode": status,
        "headers": {"content-type": "application/json"},
        "body": json.dumps(body, default=json_default),
    }


def json_default(value):
    if isinstance(value, Decimal):
        whole = int(value)
        return whole if value == whole else float(value)
    raise TypeError(f"Object of type {type(value).__name__} is not JSON serializable")
