import unittest

from rooms import create_item, join_players, reaction_notice


class ReactionTests(unittest.TestCase):
    def test_a_seated_player_can_send_a_prepared_reaction(self):
        item = create_item("funny-monkey", "host", "North", 1)
        players, error = join_players(item, "east", "East", 2)
        self.assertIsNone(error)
        item["players"] = players
        before = dict(item)
        notice = reaction_notice(item, "east", "👏")
        self.assertEqual(notice["kind"], "reaction")
        self.assertEqual(notice["seat"], 2)
        self.assertEqual(notice["name"], "East")
        self.assertEqual(notice["reaction"], "👏")
        self.assertNotIn("playerId", notice)
        self.assertEqual(item, before)
        line = reaction_notice(item, "host", "Nice one")
        self.assertEqual(line["name"], "North")
        self.assertEqual(line["reaction"], "Nice one")

    def test_a_missing_player_or_a_typed_line_is_refused(self):
        item = create_item("funny-monkey", "host", "North", 1)
        self.assertIsNone(reaction_notice(item, "gone", "👏"))
        self.assertIsNone(reaction_notice(item, "host", "hello"))
