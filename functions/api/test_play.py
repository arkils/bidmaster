import random
import unittest

from bid import select_trump, submit_bid
from deal import deal_size, match_view, ranking, round_deals, start_match
from play import play_card, points_for, trick_winner
from rooms import create_item, join_players


def room(names, opener=1):
    item = create_item("brave-lion", "p1", names[0], 1)
    for index, name in enumerate(names[1:], start=2):
        players, error = join_players(item, f"p{index}", name, index)
        assert error is None
        item["players"] = players
    return start_match(item, "p1", opener, "2026-10-14", random.Random(1))


def ready(item, bids, trump="hearts"):
    opener = item["roundOpener"]
    order = [((opener - 1 + step) % len(item["players"])) + 1 for step in range(len(item["players"]))]
    for seat, bid in zip(order, bids):
        item, error = submit_bid(item, f"p{seat}", bid)
        assert error is None, error
    return select_trump(item, f"p{item['trumpSeat']}", trump)


class PlayTests(unittest.TestCase):
    def test_trump_and_led_suit_decide_the_trick(self):
        hearts = [
            {"seat": 1, "suit": "hearts", "rank": "ace"},
            {"seat": 2, "suit": "spades", "rank": "2"},
            {"seat": 3, "suit": "hearts", "rank": "king"},
        ]
        self.assertEqual(trick_winner(hearts, "spades"), 2)
        spades = [
            {"seat": 1, "suit": "spades", "rank": "2"},
            {"seat": 2, "suit": "spades", "rank": "king"},
        ]
        self.assertEqual(trick_winner(spades, "spades"), 2)
        led = [
            {"seat": 1, "suit": "hearts", "rank": "ace"},
            {"seat": 2, "suit": "hearts", "rank": "king"},
            {"seat": 3, "suit": "diamonds", "rank": "ace"},
        ]
        self.assertEqual(trick_winner(led, "spades"), 1)

    def test_illegal_plays_are_not_applied(self):
        item = ready(room(("Ada", "Bea", "Cid"), 1), (0, 0, 0), "spades")
        held = item["hands"][0][0]
        self.assertIsNone(play_card(item, "p2", held["suit"], held["rank"]))
        self.assertIsNone(play_card(item, "p1", "clubs", "ace") if held["suit"] != "clubs" or held["rank"] != "ace" else play_card(item, "p1", "clubs", "2"))
        other = next(card for card in item["hands"][0] if card["suit"] != held["suit"])
        started, _ = play_card(item, "p1", held["suit"], held["rank"])
        refused = play_card(started, "p2", other["suit"], other["rank"])
        if any(card["suit"] == held["suit"] for card in item["hands"][1]):
            self.assertIsNone(refused)
        self.assertEqual(len(item["trick"]), 0)

    def test_winner_leads_and_exact_bids_score(self):
        self.assertEqual(points_for(0, 0), 10)
        self.assertEqual(points_for(0, 1), -10)
        self.assertEqual(points_for(1, 1), 11)
        self.assertEqual(points_for(1, 0), -11)
        self.assertEqual(points_for(5, 4), -55)
        item = ready(room(("Ada", "Bea", "Cid"), 1), (0, 0, 0), "spades")
        item["cardsDealt"] = 1
        item["hands"] = [
            [{"suit": "hearts", "rank": "ace"}],
            [{"suit": "spades", "rank": "2"}],
            [{"suit": "diamonds", "rank": "king"}],
        ]
        item, meta = play_card(item, "p1", "hearts", "ace")
        self.assertIsNone(meta.get("winner"))
        item, meta = play_card(item, "p2", "spades", "2")
        item, meta = play_card(item, "p3", "diamonds", "king")
        self.assertEqual(meta["winner"], 2)
        self.assertEqual(item["roundOpener"], 2)
        self.assertEqual(item["cardsDealt"], 16)
        self.assertEqual(len(item["hands"][0]), 16)
        self.assertEqual(item["rounds"][0][0]["points"], 10)
        self.assertEqual(item["rounds"][0][1]["points"], -10)
        self.assertNotIn("trump", item)
        view = match_view(item, "p1")
        self.assertNotIn("bids", str(view["rounds"]))
        self.assertEqual(len(view["cards"]), 16)
        stranger = match_view(item, "p9")
        self.assertNotIn("cards", stranger)

    def test_the_last_round_deals_no_further_hand(self):
        item = ready(room(("Ada", "Bea", "Cid"), 1), (0, 0, 0), "clubs")
        deals = round_deals(3)
        item["rounds"] = [[{"seat": seat, "points": 10} for seat in range(1, 4)] for _ in range(len(deals) - 1)]
        item["cardsDealt"] = 1
        item["hands"] = [[{"suit": "clubs", "rank": rank}] for rank in ("ace", "king", "queen")]
        item["roundOpener"] = 1
        item["turn"] = 1
        item, _ = play_card(item, "p1", "clubs", "ace")
        item, _ = play_card(item, "p2", "clubs", "king")
        item, meta = play_card(item, "p3", "clubs", "queen")
        self.assertTrue(item["over"])
        self.assertTrue(meta["scored"])
        self.assertIsNone(meta.get("openerSeat"))
        self.assertNotIn("hands", item)
        self.assertEqual(len(item["rounds"]), len(deals))
        view = match_view(item, "p1")
        self.assertNotIn("round", view)
        self.assertNotIn("cards", view)
        self.assertEqual(len(view["rounds"]), len(deals))

    def test_more_successful_bids_rank_higher_when_scores_match(self):
        item = room(("Ada", "Bea", "Cid"))
        item["rounds"] = [
            [{"seat": 1, "points": 10}, {"seat": 2, "points": 10}, {"seat": 3, "points": -10}],
            [{"seat": 1, "points": -10}, {"seat": 2, "points": 10}, {"seat": 3, "points": 10}],
        ]
        ranked = {entry["seat"]: entry["rank"] for entry in ranking(item)}
        self.assertEqual(ranked[2], 1)
        self.assertEqual(ranked[1], ranked[3])

    def test_a_complete_three_player_match_finishes(self):
        item = room(("Ada", "Bea", "Cid"), 2)
        self.assertEqual(len(round_deals(3)), 2 * deal_size(3))
        rng = random.Random(4)
        while not item.get("over"):
            if not item.get("trump"):
                count = len(item["players"])
                opener = item["roundOpener"]
                order = [((opener - 1 + step) % count) + 1 for step in range(count)]
                for seat in order:
                    item, error = submit_bid(item, f"p{seat}", 0)
                    self.assertIsNone(error)
                item = select_trump(item, f"p{item['trumpSeat']}", "spades")
            seat = item["turn"]
            hand = item["hands"][seat - 1]
            led = item["trick"][0]["suit"] if item["trick"] else None
            choices = [card for card in hand if card["suit"] == led] if led else hand
            if not choices:
                choices = hand
            card = choices[0]
            item, _ = play_card(item, f"p{seat}", card["suit"], card["rank"], rng)
        self.assertEqual(len(item["rounds"]), 2 * deal_size(3))
        self.assertNotIn("hands", item)
        self.assertTrue(ranking(item))


if __name__ == "__main__":
    unittest.main()
