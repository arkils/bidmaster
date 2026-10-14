import os
import re

import boto3

table = boto3.resource("dynamodb").Table(os.environ["ROOMS_TABLE"])


def handler(event, context):
    room_id, player_id = identity(event)
    if not room_id or not player_id or not seated(room_id, player_id):
        return deny()
    account = context.invoked_function_arn.split(":")[4]
    region = os.environ["AWS_REGION"]
    room = f"bidmaster/room/{room_id}"
    player = f"bidmaster/room/{room_id}/player/{player_id}"
    topic = f"arn:aws:iot:{region}:{account}:topic"
    topicfilter = f"arn:aws:iot:{region}:{account}:topicfilter"
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
                    {
                        "Effect": "Allow",
                        "Action": "iot:Subscribe",
                        "Resource": [f"{topicfilter}/{room}", f"{topicfilter}/{player}"],
                    },
                    {
                        "Effect": "Allow",
                        "Action": "iot:Receive",
                        "Resource": [f"{topic}/{room}", f"{topic}/{player}"],
                    },
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


def seated(room_id, player_id):
    item = table.get_item(Key={"roomId": room_id}).get("Item")
    if not item:
        return False
    return any(player["playerId"] == player_id for player in item.get("players", []))


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
