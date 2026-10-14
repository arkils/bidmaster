import random
import unittest

from bid import TOTAL_EQUALS_TRICKS, round_public, select_trump, submit_bid, trump_seat
from deal import start_match
from rooms import create_item, join_players


def started(opener, names, seed=1):
    item = create_item("brave-lion", "p1", names[0], 1)
    for index, name in enumerate(names[1:], start=2):
        players, error = join_players(item, f"p{index}", name, index)
        assert error is None
        item["players"] = players
    return start_match(item, "p1", opener, "2026-10-14", random.Random(seed))


class BidTests(unittest.TestCase):
    def test_bids_go_clockwise_and_name_trump(self):
        item = started(2, ("Ada", "Bea", "Cid"))
        item, error = submit_bid(item, "p2", 2)
        self.assertIsNone(error)
        self.assertEqual(item["turn"], 3)
        item, error = submit_bid(item, "p3", 4)
        self.assertIsNone(error)
        item, error = submit_bid(item, "p1", 4)
        self.assertIsNone(error)
        self.assertEqual(item["trumpSeat"], 3)
        self.assertEqual([entry["bid"] for entry in round_public(item)["bids"]], [2, 4, 4])
        self.assertNotIn("cards", round_public(item))

    def test_illegal_bids_are_not_applied(self):
        item = started(1, ("Ada", "Bea", "Cid"))
        size = round_public(item)["cardsDealt"]
        self.assertIsNone(submit_bid(item, "p2", 1)[0])
        self.assertIsNone(submit_bid(item, "p1", size + 1)[0])
        self.assertIsNone(submit_bid(item, "p1", -1)[0])
        self.assertIsNone(submit_bid(item, "p1", True)[0])
        updated, _ = submit_bid(item, "p1", 1)
        self.assertIsNone(submit_bid(updated, "p1", 2)[0])
        self.assertEqual(len(item.get("bids") or []), 0)

    def test_last_bid_cannot_equal_the_tricks(self):
        item = started(1, ("Ada", "Bea", "Cid", "Dee"))
        item, _ = submit_bid(item, "p1", 2)
        item, _ = submit_bid(item, "p2", 1)
        item, _ = submit_bid(item, "p3", 3)
        refused, error = submit_bid(item, "p4", 7)
        self.assertIsNone(refused)
        self.assertEqual(error, TOTAL_EQUALS_TRICKS)
        accepted, error = submit_bid(item, "p4", 0)
        self.assertIsNone(error)
        self.assertEqual(accepted["bids"][-1]["bid"], 0)

    def test_all_zero_bids_give_trump_to_the_opener(self):
        item = started(3, ("Ada", "Bea", "Cid"))
        item, _ = submit_bid(item, "p3", 0)
        item, _ = submit_bid(item, "p1", 0)
        item, _ = submit_bid(item, "p2", 0)
        self.assertEqual(item["trumpSeat"], 3)

    def test_first_highest_bid_selects_trump(self):
        bids = [{"seat": 1, "bid": 2}, {"seat": 2, "bid": 4}, {"seat": 3, "bid": 4}, {"seat": 4, "bid": 1}]
        self.assertEqual(trump_seat(bids, 1, 4), 2)

    def test_only_the_chooser_can_name_trump(self):
        item = started(1, ("Ada", "Bea", "Cid"))
        for player, amount in (("p1", 1), ("p2", 0), ("p3", 0)):
            item, error = submit_bid(item, player, amount)
            self.assertIsNone(error)
        self.assertIsNone(select_trump(item, "p2", "hearts"))
        self.assertIsNone(select_trump(item, "p1", "jokers"))
        chosen = select_trump(item, "p1", "hearts")
        self.assertEqual(chosen["trump"], "hearts")
        self.assertEqual(chosen["turn"], 1)
        self.assertIsNone(select_trump(chosen, "p1", "clubs"))
        view = round_public(chosen)
        self.assertEqual(view["trump"], "hearts")
        self.assertEqual(view["bids"][0]["name"], "Ada")


if __name__ == "__main__":
    unittest.main()
