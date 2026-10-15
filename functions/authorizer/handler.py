import os
import re

import boto3

table = boto3.resource("dynamodb").Table(os.environ["ROOMS_TABLE"])


def handler(event, context):
    room_id, player_id = identity(event)
    item = room_item(room_id) if room_id and player_id else None
    if item is None:
        return deny()
    is_seated = any(player["playerId"] == player_id for player in item.get("players", []))
    if not is_seated and not item.get("started"):
        return deny()
    account = context.invoked_function_arn.split(":")[4]
    region = os.environ["AWS_REGION"]
    room = f"bidmaster/room/{room_id}"
    topic = f"arn:aws:iot:{region}:{account}:topic"
    topicfilter = f"arn:aws:iot:{region}:{account}:topicfilter"
    subscribe = [f"{topicfilter}/{room}"]
    receive = [f"{topic}/{room}"]
    if is_seated:
        player = f"bidmaster/room/{room_id}/player/{player_id}"
        subscribe.append(f"{topicfilter}/{player}")
        receive.append(f"{topic}/{player}")
    return {
        "isAuthenticated": True,
        "principalId": principal_id(player_id),
        "disconnectAfterInSeconds": 86400,
        "refreshAfterInSeconds": 3600,
        "policyDocuments": [
            {
                "Version": "2012-10-17",
                "Statement": [
                    {"Effect": "Allow", "Action": "iot:Connect", "Resource": "*"},
                    {"Effect": "Allow", "Action": "iot:Subscribe", "Resource": subscribe},
                    {"Effect": "Allow", "Action": "iot:Receive", "Resource": receive},
                ],
            }
        ],
    }


def identity(event):
    mqtt = (event.get("protocolData") or {}).get("mqtt") or {}
    http = (event.get("protocolData") or {}).get("http") or {}
    username = str(mqtt.get("username") or event.get("token") or query_token(http.get("queryString")) or "")
    username = username.split("?", 1)[0]
    if "#" not in username:
        return "", ""
    room_id, player_id = username.split("#", 1)
    return room_id, player_id


def query_token(query):
    for part in str(query or "").lstrip("?").split("&"):
        name, _, value = part.partition("=")
        if name == "x-amz-customauthorizer-token" and value:
            return value
    return ""


def principal_id(player_id):
    return re.sub(r"[^a-zA-Z0-9]", "", player_id)[:128]


def room_item(room_id):
    return table.get_item(Key={"roomId": room_id}).get("Item")


def deny():
    return {
        "isAuthenticated": False,
        "principalId": "denied",
        "policyDocuments": [
            {
                "Version": "2012-10-17",
                "Statement": [{"Effect": "Deny", "Action": "*", "Resource": "*"}],
            }
        ],
        "disconnectAfterInSeconds": 0,
    }
