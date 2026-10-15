from unique_names_generator import get_random_name
from unique_names_generator.data import ADJECTIVES, ANIMALS

ROOM_FULL = "room is full"


def new_room_id():
    for _ in range(8):
        room_id = get_random_name(
            combo=[ADJECTIVES, ANIMALS],
            separator="-",
            style="lowercase",
        )
        adjective, animal = room_id.split("-", 1)
        if adjective != animal and adjective.isalpha() and animal.isalpha():
            return room_id
    raise RuntimeError("a room id could not be chosen")


def room_topic(room_id):
    return f"bidmaster/room/{room_id}"


def player_topic(room_id, player_id):
    return f"bidmaster/room/{room_id}/player/{player_id}"


def public_room(item, caller_id):
    seats = []
    your_seat = None
    for index, player in enumerate(item.get("players", []), start=1):
        seats.append({"seat": index, "name": player["name"]})
        if player["playerId"] == caller_id:
            your_seat = index
    body = {
        "roomId": item["roomId"],
        "started": bool(item.get("started")),
        "seats": seats,
        "url": f"/{item['roomId']}",
    }
    if your_seat is not None:
        body["yourSeat"] = your_seat
    return body


def create_item(room_id, player_id, name, joined_at):
    return {
        "roomId": room_id,
        "started": False,
        "players": [{"playerId": player_id, "name": name, "joinedAt": joined_at}],
    }


def join_players(item, player_id, name, joined_at):
    players = [dict(player) for player in item.get("players", [])]
    for player in players:
        if player["playerId"] == player_id:
            if not item.get("started"):
                player["name"] = name
            return players, None
    if item.get("started") or len(players) >= 10:
        return None, ROOM_FULL
    players.append({"playerId": player_id, "name": name, "joinedAt": joined_at})
    return players, None


def leave_players(item, player_id):
    if item.get("started"):
        return None
    players = item.get("players", [])
    if not players or players[0]["playerId"] != player_id:
        return None
    return [dict(player) for player in players[1:]]


def kept_matches(items, player_id):
    player_id = str(player_id or "").strip()
    if not player_id:
        return None
    found = []
    for item in items:
        if not item.get("started"):
            continue
        players = item.get("players") or []
        if not any(player.get("playerId") == player_id for player in players):
            continue
        found.append(
            {
                "startedOn": item.get("startedOn"),
                "roomId": item["roomId"],
                "seats": [
                    {"seat": index, "name": player["name"]} for index, player in enumerate(players, start=1)
                ],
            }
        )
    found.sort(key=lambda match: (match.get("startedOn") or "", match["roomId"]), reverse=True)
    return found


def notice(kind, item):
    return {
        "kind": kind,
        "roomId": item["roomId"],
        "seats": public_room(item, None)["seats"],
    }


REACTIONS = ("👏", "😂", "🔥", "😮", "😬", "Nice one", "Well bid", "Wow", "Unlucky", "Good game")


def reaction_notice(item, player_id, reaction):
    if reaction not in REACTIONS:
        return None
    for index, player in enumerate(item.get("players") or [], start=1):
        if player.get("playerId") == player_id:
            return {
                "kind": "reaction",
                "roomId": item["roomId"],
                "seat": index,
                "name": player["name"],
                "reaction": reaction,
            }
    return None
