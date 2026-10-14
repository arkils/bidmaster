import random

from rooms import public_room

SUITS = ("clubs", "diamonds", "hearts", "spades")
RANKS = ("ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king")
SUIT_ORDER = {suit: index for index, suit in enumerate(SUITS)}
RANK_ORDER = {rank: index for index, rank in enumerate(RANKS)}


def deck():
    return [{"suit": suit, "rank": rank} for suit in SUITS for rank in RANKS]


def deal_size(player_count):
    return min(10, 52 // player_count)


def round_deals(player_count):
    largest = deal_size(player_count)
    return list(range(largest, 0, -1)) + list(range(1, largest + 1))


def cards_dealt(item):
    hands = item.get("hands") or []
    from_hands = max((len(hand) for hand in hands), default=0) + len(item.get("tricks") or [])
    stored = item.get("cardsDealt")
    if stored is not None and from_hands:
        return max(int(stored), from_hands)
    if stored is not None:
        return int(stored)
    if from_hands:
        return from_hands
    players = item.get("players") or []
    return deal_size(len(players)) if players else 0


def sort_hand(cards):
    return sorted(cards, key=lambda card: (SUIT_ORDER[card["suit"]], RANK_ORDER[card["rank"]]))


def deal_hands(player_count, rng):
    cards = deck()
    rng.shuffle(cards)
    size = deal_size(player_count)
    return [cards[index * size : (index + 1) * size] for index in range(player_count)]


def start_match(item, caller_id, seat, on_date, rng=None):
    players = item.get("players") or []
    if item.get("started"):
        return None
    if not players or players[0].get("playerId") != caller_id:
        return None
    if not 3 <= len(players) <= 10:
        return None
    if isinstance(seat, bool) or not isinstance(seat, int) or not 1 <= seat <= len(players):
        return None
    started = dict(item)
    started["started"] = True
    started["startedOn"] = on_date
    started["openerSeat"] = seat
    started["turn"] = seat
    started["hands"] = deal_hands(len(players), rng or random.Random())
    started["rounds"] = []
    started["bids"] = []
    started["roundOpener"] = seat
    started["cardsDealt"] = deal_size(len(players))
    started["trick"] = []
    started["tricks"] = []
    started["over"] = False
    return started


def scores(item):
    totals = [0 for _ in item.get("players", [])]
    successes = [0 for _ in totals]
    for round_result in item.get("rounds") or []:
        for entry in round_result:
            index = int(entry["seat"]) - 1
            totals[index] += int(entry["points"])
            if entry["points"] > 0:
                successes[index] += 1
    return totals, successes


def ranking(item):
    totals, successes = scores(item)
    order = sorted(range(len(totals)), key=lambda index: (-totals[index], -successes[index], index))
    ranked = []
    for place, index in enumerate(order):
        rank = place + 1
        if place > 0:
            previous = order[place - 1]
            if totals[index] == totals[previous] and successes[index] == successes[previous]:
                rank = ranked[-1]["rank"]
        player = item["players"][index]
        ranked.append(
            {
                "rank": rank,
                "seat": index + 1,
                "name": player["name"],
                "score": totals[index],
            }
        )
    return ranked


def match_view(item, caller_id, include_cards=True):
    body = public_room(item, caller_id)
    body["startedOn"] = item.get("startedOn")
    body["openerSeat"] = int(item["openerSeat"]) if item.get("openerSeat") is not None else None
    body["ranking"] = ranking(item)
    body["rounds"] = rounds_public(item)
    body["over"] = bool(item.get("over"))
    if item.get("resultAt") is not None:
        body["resultAt"] = int(item["resultAt"])
    if not item.get("over"):
        from bid import round_public

        body["round"] = round_public(item)
        hands = item.get("hands") or []
        for seat in body["seats"]:
            index = seat["seat"] - 1
            if index < len(hands):
                seat["cardsLeft"] = len(hands[index])
        if include_cards and body.get("yourSeat") and item.get("hands"):
            hand = item["hands"][body["yourSeat"] - 1]
            body["cards"] = sort_hand(hand)
    return body


def rounds_public(item):
    names = {index: player["name"] for index, player in enumerate(item.get("players") or [], start=1)}
    return [
        [
            {"seat": int(entry["seat"]), "name": names[int(entry["seat"])], "points": int(entry["points"])}
            for entry in result
        ]
        for result in item.get("rounds") or []
    ]


def started_notice(item):
    return {
        "kind": "started",
        "roomId": item["roomId"],
        "seats": public_room(item, None)["seats"],
        "openerSeat": item["openerSeat"],
    }


def hand_notice(item, seat):
    return {
        "kind": "hand",
        "roomId": item["roomId"],
        "cards": sort_hand(item["hands"][seat - 1]),
    }
