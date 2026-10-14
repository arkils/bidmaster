# IMPL-007: Look back at a match

| Field | Value |
| --- | --- |
| **ID** | IMPL-007 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | dashboard |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | IMPL-006 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

A player can open a started match by its room id and see each scored round. The dashboard also lists the matches this browser's player id played.

## Read first

- [x] [product/journeys.md](../../product/journeys.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)
- [x] [architecture/data-model.md](../../architecture/data-model.md)
- [x] [game/rules.md](../../game/rules.md)
- [x] [impl/IMPL-006-play.md](IMPL-006-play.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. A trick-by-trick review stays out of version 1. | — |

## Acceptance criteria

- [x] List my matches returns the kept matches in which this cookie's player id was seated. Each entry has the date the match started, the room id, and the seated players in seat order under the names they used
- [x] The list is empty when that player id has not sat in a started match. A cookie with no player id does not receive another player's list. This is not a list of every match on the site
- [x] Opening a room id shows the date, the players, and every scored round: cumulative scores, the ranking, and the graph of points gained or lost each round
- [x] That look back does not show the cards, the bids, the trump, or the seat that bids first in round 1
- [x] Anyone who knows a room id can open that public result. Another browser, or this browser after the cookie is cleared, has a different player id and does not show this browser's list
- [x] A started match remains stored after everyone has left. It does not expire
- [x] The page works in a computer browser and in a phone browser
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

After a match has started, a player can leave and later open that room id to see the scored rounds, and this browser can list the matches its player id sat in.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Authored by PREP-002. Not started. Build GO is not recorded. |
| 2026-10-14 | agent | The user put the dashboard at `/dashboard/{roomId}`. Look back opens that same page. See [IMPL-009](IMPL-009-dashboard-url.md). |
| 2026-10-14 | agent | The home page and the dashboard list the matches for this browser's player id. |
