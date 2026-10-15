import random

from bid import bidding_seat, seat_of
from deal import cards_dealt, deck, ranking, round_deals, scores, sort_hand
from rooms import public_room

PLAY_RANKS = ("2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace")


def points_for(bid, won):
    if int(bid) == 0:
        return 10 if int(won) == 0 else -10
    magnitude = int(bid) * 11
    return magnitude if int(won) == int(bid) else -magnitude


def trick_winner(trick, trump):
    led = trick[0]["suit"]

    def strength(card):
        rank = PLAY_RANKS.index(card["rank"])
        if card["suit"] == trump:
            return (2, rank)
        if card["suit"] == led:
            return (1, rank)
        return (0, 0)

    return max(trick, key=strength)["seat"]


RESULT_WAIT_MS = 5000


def play_card(item, caller_id, suit, rank, rng=None, now=None):
    players = item.get("players") or []
    if item.get("over") or item.get("resultAt") is not None or not item.get("trump") or not players:
        return None
    if suit not in ("clubs", "diamonds", "hearts", "spades") or rank not in PLAY_RANKS:
        return None
    seat = seat_of(item, caller_id)
    if seat is None or seat != int(item.get("turn")):
        return None
    hands = [[dict(card) for card in hand] for hand in item.get("hands") or []]
    if seat > len(hands):
        return None
    hand = hands[seat - 1]
    held = next((card for card in hand if card["suit"] == suit and card["rank"] == rank), None)
    if held is None:
        return None
    trick = [dict(card) for card in item.get("trick") or []]
    if trick:
        led = trick[0]["suit"]
        if any(card["suit"] == led for card in hand) and suit != led:
            return None
    hands[seat - 1] = [card for card in hand if not (card["suit"] == suit and card["rank"] == rank)]
    trick.append({"seat": seat, "suit": suit, "rank": rank})
    updated = dict(item)
    updated["hands"] = hands
    updated["trick"] = trick
    meta = {"card": trick[-1], "hands": "player"}
    if len(trick) < len(players):
        updated["turn"] = bidding_seat(seat, len(players), 1)
        return updated, meta
    winner = trick_winner(trick, item["trump"])
    tricks = [dict(entry) for entry in item.get("tricks") or []]
    tricks.append({"winner": winner, "cards": trick})
    updated["tricks"] = tricks
    updated["trick"] = []
    meta["winner"] = winner
    if len(tricks) < cards_dealt(item):
        updated["turn"] = winner
        meta["leadSeat"] = winner
        return updated, meta
    return score_round(updated, meta, now)


def score_round(item, meta, now=None):
    players = item["players"]
    count = len(players)
    won = [0 for _ in players]
    for trick in item["tricks"]:
        won[int(trick["winner"]) - 1] += 1
    bids = {int(entry["seat"]): int(entry["bid"]) for entry in item["bids"]}
    result = [{"seat": seat, "points": points_for(bids[seat], won[seat - 1])} for seat in range(1, count + 1)]
    rounds = [list(entry) for entry in item.get("rounds") or []]
    rounds.append(result)
    item["rounds"] = rounds
    item["resultAt"] = int(now if now is not None else 0)
    item.pop("turn", None)
    meta["scored"] = True
    meta["hands"] = None
    return item, meta


def accept_result(item, caller_id, now, rng=None):
    if item.get("over") or item.get("resultAt") is None:
        return None
    seat = seat_of(item, caller_id)
    if seat is None:
        return None
    if seat != 1 and int(now) < int(item["resultAt"]) + RESULT_WAIT_MS:
        return None
    return continue_match(dict(item), rng or random.Random())


def continue_match(item, rng):
    players = item["players"]
    count = len(players)
    deals = round_deals(count)
    rounds = item.get("rounds") or []
    item.pop("resultAt", None)
    meta = {"continued": True, "hands": None}
    for key in ("bids", "trump", "trumpSeat", "trick", "tricks"):
        item.pop(key, None)
    if len(rounds) >= len(deals):
        item["over"] = True
        item.pop("hands", None)
        item.pop("turn", None)
        item.pop("cardsDealt", None)
        return item, meta
    opener = bidding_seat(item["openerSeat"], count, len(rounds))
    size = deals[len(rounds)]
    item["over"] = False
    item["roundOpener"] = opener
    item["turn"] = opener
    item["cardsDealt"] = size
    item["bids"] = []
    item["trick"] = []
    item["tricks"] = []
    item["hands"] = deal_hands_of(count, size, rng)
    meta["hands"] = "all"
    meta["openerSeat"] = opener
    return item, meta


def deal_hands_of(player_count, size, rng):
    cards = deck()
    rng.shuffle(cards)
    return [cards[index * size : (index + 1) * size] for index in range(player_count)]


def card_notice(item, meta):
    card = meta["card"]
    notice = {
        "kind": "card",
        "roomId": item["roomId"],
        "seats": public_room(item, None)["seats"],
        "seat": int(card["seat"]),
        "suit": card["suit"],
        "rank": card["rank"],
    }
    if meta.get("winner") is not None:
        notice["winner"] = int(meta["winner"])
    if meta.get("leadSeat") is not None:
        notice["leadSeat"] = int(meta["leadSeat"])
    return notice


def scored_notice(item, meta):
    names = {index: player["name"] for index, player in enumerate(item["players"], start=1)}
    result = item["rounds"][-1]
    totals, _ = scores(item)
    notice = {
        "kind": "scored",
        "roomId": item["roomId"],
        "seats": public_room(item, None)["seats"],
        "points": [{"seat": int(entry["seat"]), "name": names[int(entry["seat"])], "points": int(entry["points"])} for entry in result],
        "scores": [
            {"seat": seat, "name": names[seat], "score": totals[seat - 1]} for seat in range(1, len(item["players"]) + 1)
        ],
        "ranking": ranking(item),
        "gains": [{"seat": int(entry["seat"]), "name": names[int(entry["seat"])], "points": int(entry["points"])} for entry in result],
        "over": bool(item.get("over")),
    }
    if meta.get("openerSeat") is not None:
        notice["openerSeat"] = int(meta["openerSeat"])
    return notice


def continued_notice(item, meta):
    notice = {
        "kind": "continued",
        "roomId": item["roomId"],
        "seats": public_room(item, None)["seats"],
        "over": bool(item.get("over")),
    }
    if meta.get("openerSeat") is not None:
        notice["openerSeat"] = int(meta["openerSeat"])
    return notice


def hand_notices(item, meta, caller_id):
    if meta.get("hands") == "all":
        return [(item["players"][seat - 1]["playerId"], sort_hand(item["hands"][seat - 1])) for seat in range(1, len(item["players"]) + 1)]
    if meta.get("hands") == "player":
        seat = seat_of(item, caller_id)
        return [(caller_id, sort_hand(item["hands"][seat - 1]))]
    return []
