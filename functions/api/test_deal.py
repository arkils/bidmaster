import random
import unittest

from deal import deal_hands, deal_size, deck, hand_notice, match_view, round_deals, start_match, started_notice
from rooms import create_item, join_players


def seated_room():
    item = create_item("brave-lion", "p1", "Ada", 1)
    for index, name in enumerate(("Bea", "Cid"), start=2):
        players, error = join_players(item, f"p{index}", name, index)
        assert error is None
        item["players"] = players
    return item


class DealTests(unittest.TestCase):
    def test_deal_size_follows_the_deck(self):
        self.assertEqual(deal_size(3), 10)
        self.assertEqual(deal_size(4), 10)
        self.assertEqual(deal_size(5), 10)
        self.assertEqual(deal_size(6), 8)
        self.assertEqual(deal_size(10), 5)
        self.assertEqual(len(round_deals(3)), 20)
        self.assertEqual(len(round_deals(4)), 20)
        self.assertEqual(len(round_deals(5)), 20)
        self.assertEqual(len(round_deals(6)), 16)
        self.assertEqual(len(round_deals(10)), 10)

    def test_hands_are_unique_and_equal(self):
        hands = deal_hands(6, random.Random(1))
        dealt = [card for hand in hands for card in hand]
        self.assertEqual(len(hands), 6)
        self.assertTrue(all(len(hand) == 8 for hand in hands))
        self.assertEqual(len(dealt), len({(card["suit"], card["rank"]) for card in dealt}))
        self.assertTrue(all(card in deck() for card in dealt))

    def test_start_deals_and_hides_other_cards(self):
        item = seated_room()
        started = start_match(item, "p1", 2, "2026-10-14", random.Random(2))
        self.assertEqual(started["openerSeat"], 2)
        self.assertEqual(started["startedOn"], "2026-10-14")
        self.assertEqual([player["name"] for player in started["players"]], ["Ada", "Bea", "Cid"])
        view = match_view(started, "p2")
        self.assertNotIn("hands", view)
        self.assertEqual(len(view["cards"]), 10)
        self.assertEqual(view["yourSeat"], 2)
        self.assertTrue(all("cardsLeft" not in entry for entry in view["seats"]))
        self.assertNotIn("suit", str(view["seats"]))
        self.assertTrue(all(entry["rank"] == 1 and entry["score"] == 0 for entry in view["ranking"]))
        notice = started_notice(started)
        self.assertEqual(notice["openerSeat"], 2)
        self.assertNotIn("cards", notice)
        self.assertNotIn("cards", str(notice))
        private = hand_notice(started, 2)
        self.assertEqual(private["cards"], view["cards"])
        self.assertNotIn("p1", str(private))
        cards = deck()
        started["hands"] = [cards[index * 17 : (index + 1) * 17] for index in range(3)]
        started["cardsDealt"] = 17
        kept = match_view(started, "p2")
        self.assertEqual(len(kept["cards"]), 17)
        self.assertEqual(kept["round"]["cardsDealt"], 17)
        started.pop("cardsDealt", None)
        started["hands"] = [hand[:15] for hand in started["hands"]]
        started["tricks"] = [{"winner": 1, "cards": []}, {"winner": 2, "cards": []}]
        self.assertEqual(match_view(started, "p2")["round"]["cardsDealt"], 17)

    def test_start_is_refused_without_changing_the_room(self):
        item = seated_room()
        self.assertIsNone(start_match(item, "p2", 1, "2026-10-14", random.Random(1)))
        self.assertIsNone(start_match(item, "p1", 4, "2026-10-14", random.Random(1)))
        short = create_item("brave-lion", "p1", "Ada", 1)
        players, _ = join_players(short, "p2", "Bea", 2)
        short["players"] = players
        self.assertIsNone(start_match(short, "p1", 1, "2026-10-14", random.Random(1)))
        started = start_match(item, "p1", 1, "2026-10-14", random.Random(1))
        self.assertIsNone(start_match(started, "p1", 1, "2026-10-14", random.Random(1)))
        self.assertFalse(item["started"])

    def test_join_after_start_is_full_for_a_new_player(self):
        item = start_match(seated_room(), "p1", 1, "2026-10-14", random.Random(1))
        refused, error = join_players(item, "p9", "Late", 9)
        self.assertIsNone(refused)
        self.assertEqual(error, "room is full")
        players, error = join_players(item, "p2", "Renamed", 9)
        self.assertIsNone(error)
        self.assertEqual(players[1]["name"], "Bea")


if __name__ == "__main__":
    unittest.main()
