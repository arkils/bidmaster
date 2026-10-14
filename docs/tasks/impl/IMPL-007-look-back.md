# IMPL-007: Look back at a match

| Field | Value |
| --- | --- |
| **ID** | IMPL-007 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | dashboard |
| **Status** | TODO |
| **Priority** | Blocking |
| **Blocked by** | IMPL-006 |
| **Blocks** | — |
| **Completed** | — |

## Summary

A player can open a started match by its room id and see each scored round. The dashboard also lists the matches this browser's player id played.

## Read first

- [ ] [product/journeys.md](../../product/journeys.md)
- [ ] [product/requirements.md](../../product/requirements.md)
- [ ] [product/non-functional.md](../../product/non-functional.md)
- [ ] [architecture/contracts.md](../../architecture/contracts.md)
- [ ] [architecture/data-model.md](../../architecture/data-model.md)
- [ ] [game/rules.md](../../game/rules.md)
- [ ] [impl/IMPL-006-play.md](IMPL-006-play.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. A trick-by-trick review stays out of version 1. | — |

## Acceptance criteria

- [ ] List my matches returns the kept matches in which this cookie's player id was seated. Each entry has the date the match started, the room id, and the seated players in seat order under the names they used
- [ ] The list is empty when that player id has not sat in a started match. A cookie with no player id does not receive another player's list. This is not a list of every match on the site
- [ ] Opening a room id shows the date, the players, and every scored round: cumulative scores, the ranking, and the graph of points gained or lost each round
- [ ] That look back does not show the cards, the bids, the trump, or the seat that bids first in round 1
- [ ] Anyone who knows a room id can open that public result. Another browser, or this browser after the cookie is cleared, has a different player id and does not show this browser's list
- [ ] A started match remains stored after everyone has left. It does not expire
- [ ] The page works in a computer browser and in a phone browser
- [ ] Status updated in [backlog.md](../backlog.md)

## Definition of done

After a match has started, a player can leave and later open that room id to see the scored rounds, and this browser can list the matches its player id sat in.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Authored by PREP-002. Not started. Build GO is not recorded. |
