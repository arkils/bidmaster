from deal import SUITS, cards_dealt
from rooms import public_room

TOTAL_EQUALS_TRICKS = "the bid would make the total equal the tricks in the round"


def seat_of(item, player_id):
    for index, player in enumerate(item.get("players") or [], start=1):
        if player.get("playerId") == player_id:
            return index
    return None


def bidding_seat(opener, count, steps):
    return ((int(opener) - 1 + steps) % count) + 1


def round_opener(item):
    return int(item.get("roundOpener") or item["openerSeat"])


def trump_seat(bids, opener, count):
    order = [bidding_seat(opener, count, step) for step in range(count)]
    amounts = {int(entry["seat"]): int(entry["bid"]) for entry in bids}
    highest = max(amounts[seat] for seat in order)
    for seat in order:
        if amounts[seat] == highest:
            return seat
    return order[0]


def submit_bid(item, caller_id, bid):
    players = item.get("players") or []
    if not item.get("started") or item.get("trump") or not players:
        return None, None
    bids = [dict(entry) for entry in item.get("bids") or []]
    if len(bids) >= len(players):
        return None, None
    seat = seat_of(item, caller_id)
    if seat is None or seat != int(item.get("turn")):
        return None, None
    if any(int(entry["seat"]) == seat for entry in bids):
        return None, None
    if isinstance(bid, bool) or not isinstance(bid, int):
        return None, None
    size = cards_dealt(item)
    if bid < 0 or bid > size:
        return None, None
    if len(bids) == len(players) - 1 and sum(int(entry["bid"]) for entry in bids) + bid == size:
        return None, TOTAL_EQUALS_TRICKS
    bids.append({"seat": seat, "bid": bid})
    updated = dict(item)
    updated["bids"] = bids
    if len(bids) == len(players):
        chooser = trump_seat(bids, round_opener(item), len(players))
        updated["trumpSeat"] = chooser
        updated["turn"] = chooser
    else:
        updated["turn"] = bidding_seat(round_opener(item), len(players), len(bids))
    return updated, None


def select_trump(item, caller_id, suit):
    players = item.get("players") or []
    bids = item.get("bids") or []
    if not item.get("started") or item.get("trump") or len(bids) != len(players):
        return None
    chooser = int(item.get("trumpSeat") or trump_seat(bids, round_opener(item), len(players)))
    if seat_of(item, caller_id) != chooser or suit not in SUITS:
        return None
    updated = dict(item)
    updated["trump"] = suit
    updated["turn"] = round_opener(item)
    return updated


def round_public(item):
    players = item.get("players") or []
    names = {index: player["name"] for index, player in enumerate(players, start=1)}
    bids = [
        {"seat": int(entry["seat"]), "name": names[int(entry["seat"])], "bid": int(entry["bid"])}
        for entry in item.get("bids") or []
    ]
    body = {
        "cardsDealt": cards_dealt(item),
        "turn": int(item["turn"]) if item.get("turn") is not None else None,
        "leadSeat": round_opener(item),
        "bids": bids,
        "tricks": [public_trick(entry) for entry in item.get("tricks") or []],
        "trick": [public_card(entry) for entry in item.get("trick") or []],
    }
    if len(bids) == len(players) and players:
        body["trumpSeat"] = int(item.get("trumpSeat") or trump_seat(bids, round_opener(item), len(players)))
    if item.get("trump"):
        body["trump"] = item["trump"]
    return body


def public_card(entry):
    return {"seat": int(entry["seat"]), "suit": entry["suit"], "rank": entry["rank"]}


def public_trick(entry):
    return {"winner": int(entry["winner"]), "cards": [public_card(card) for card in entry["cards"]]}


def bid_notice(item):
    latest = item["bids"][-1]
    notice = {
        "kind": "bid",
        "roomId": item["roomId"],
        "seats": public_room(item, None)["seats"],
        "seat": int(latest["seat"]),
        "bid": int(latest["bid"]),
    }
    if len(item["bids"]) == len(item["players"]):
        notice["trumpSeat"] = int(item["trumpSeat"])
    return notice


def trump_notice(item):
    return {
        "kind": "trump",
        "roomId": item["roomId"],
        "seats": public_room(item, None)["seats"],
        "trump": item["trump"],
        "leadSeat": round_opener(item),
    }
