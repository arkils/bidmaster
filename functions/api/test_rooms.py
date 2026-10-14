import unittest

from rooms import create_item, join_players, kept_matches, leave_players, new_room_id, notice, public_room


class RoomTests(unittest.TestCase):
    def test_room_id_is_two_words(self):
        from unique_names_generator.data import ADJECTIVES, ANIMALS

        adjectives = {word.lower() for word in ADJECTIVES}
        animals = {word.lower() for word in ANIMALS}
        for _ in range(20):
            room_id = new_room_id()
            left, right = room_id.split("-")
            self.assertTrue(left.isalpha())
            self.assertTrue(right.isalpha())
            self.assertNotEqual(left, right)
            self.assertIn(left, adjectives)
            self.assertIn(right, animals)

    def test_create_seats_the_host_first(self):
        item = create_item("funny-monkey", "host", "Asha", 1)
        body = public_room(item, "host")
        self.assertEqual(body["seats"], [{"seat": 1, "name": "Asha"}])
        self.assertEqual(body["yourSeat"], 1)
        self.assertNotIn("playerId", str(body["seats"]))
        self.assertFalse(body["started"])

    def test_join_keeps_order_and_hides_other_ids(self):
        item = create_item("funny-monkey", "host", "Asha", 1)
        players, error = join_players(item, "friend", "Asha", 2)
        self.assertIsNone(error)
        item["players"] = players
        body = public_room(item, "friend")
        self.assertEqual(
            body["seats"],
            [{"seat": 1, "name": "Asha"}, {"seat": 2, "name": "Asha"}],
        )
        self.assertEqual(body["yourSeat"], 2)
        self.assertNotIn("host", str(body["seats"]))

    def test_rejoin_updates_the_name_and_keeps_the_seat(self):
        item = create_item("funny-monkey", "host", "Asha", 1)
        players, _ = join_players(item, "friend", "Bo", 2)
        item["players"] = players
        players, error = join_players(item, "friend", "Bea", 3)
        self.assertIsNone(error)
        self.assertEqual(players[1]["name"], "Bea")
        self.assertEqual(players[1]["joinedAt"], 2)
        self.assertEqual(len(players), 2)

    def test_eleventh_player_is_full(self):
        item = create_item("funny-monkey", "p0", "Zero", 0)
        players = item["players"]
        for index in range(1, 10):
            players, error = join_players({"players": players, "started": False}, f"p{index}", "Name", index)
            self.assertIsNone(error)
        self.assertEqual(len(players), 10)
        refused, error = join_players({"players": players, "started": False}, "p10", "Late", 11)
        self.assertIsNone(refused)
        self.assertEqual(error, "room is full")

    def test_host_leave_makes_the_next_player_seat_one(self):
        item = create_item("funny-monkey", "host", "Asha", 1)
        players, _ = join_players(item, "friend", "Bo", 2)
        item["players"] = players
        remaining = leave_players(item, "host")
        item["players"] = remaining
        body = public_room(item, "friend")
        self.assertEqual(body["seats"], [{"seat": 1, "name": "Bo"}])
        self.assertEqual(body["yourSeat"], 1)
        self.assertEqual(notice("host-left", item)["seats"], body["seats"])

    def test_only_host_leave_reserves_an_empty_room(self):
        item = create_item("funny-monkey", "host", "Asha", 1)
        item["players"] = leave_players(item, "host")
        body = public_room(item, "host")
        self.assertEqual(body["seats"], [])
        self.assertNotIn("yourSeat", body)
        self.assertEqual(body["roomId"], "funny-monkey")

    def test_other_player_leave_is_not_applied(self):
        item = create_item("funny-monkey", "host", "Asha", 1)
        players, _ = join_players(item, "friend", "Bo", 2)
        item["players"] = players
        self.assertIsNone(leave_players(item, "friend"))


class MatchListTests(unittest.TestCase):
    def test_list_is_only_started_matches_for_that_player(self):
        seated = create_item("brave-lion", "ada", "Ada", 1)
        seated["started"] = True
        seated["startedOn"] = "2026-10-14"
        waiting = create_item("calm-mole", "ada", "Ada", 1)
        other = create_item("deft-newt", "bea", "Bea", 1)
        other["started"] = True
        other["startedOn"] = "2026-10-13"
        later = create_item("even-owl", "ada", "Ada", 1)
        later["players"].append({"playerId": "bea", "name": "Bea", "joinedAt": 2})
        later["started"] = True
        later["startedOn"] = "2026-10-15"
        found = kept_matches([seated, waiting, other, later], "ada")
        self.assertEqual([match["roomId"] for match in found], ["even-owl", "brave-lion"])
        self.assertEqual(found[0]["seats"], [{"seat": 1, "name": "Ada"}, {"seat": 2, "name": "Bea"}])
        self.assertNotIn("ada", str(found))
        self.assertEqual(kept_matches([seated, other], "nobody"), [])
        self.assertIsNone(kept_matches([seated, other], ""))


if __name__ == "__main__":
    unittest.main()
