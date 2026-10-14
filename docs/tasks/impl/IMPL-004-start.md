# IMPL-004: Start the match

| Field | Value |
| --- | --- |
| **ID** | IMPL-004 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | match |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | IMPL-003 |
| **Blocks** | IMPL-005 |
| **Completed** | 2026-10-14 |

## Summary

The host starts the match when 3 to 10 players are seated, chooses who bids first in round 1, and each player receives a private hand. From that moment every player sees the dashboard at zero.

## Read first

- [x] [product/journeys.md](../../product/journeys.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)
- [x] [architecture/data-model.md](../../architecture/data-model.md)
- [x] [game/rules.md](../../game/rules.md)
- [x] [impl/IMPL-003-room.md](IMPL-003-room.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. Bids, trump, and cards are later tasks. | — |

## Acceptance criteria

- [x] The host chooses the seated player who bids first in round 1, by seat, and that player also leads the first trick
- [x] Start is refused when the caller is not the host, the room has fewer than 3 or more than 10 players, the chosen seat is empty, or the match has already started. The match stays as it was
- [x] A successful start fixes seating in join order, records the date and the round-1 opener, and deals the first hand under `docs/game/rules.md`
- [x] Each seated player's cards go only on that player id's private topic. They are not in the start response and not on the room topic
- [x] The room notice says the match started and names the seat order and the seat that bids first in round 1
- [x] From the start, every player sees the dashboard: each cumulative score at 0, a ranking table, and a graph with one line per player and no scored round yet
- [x] A join after the start is refused with the message “room is full”
- [x] A leave after the start is not applied
- [x] Load after the start returns the date, the seats as a seat number and the name used, the round-1 opener, and the caller's own cards only when that player id is seated
- [x] The page works in a computer browser and in a phone browser
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A host can open a started match for 3 to 10 players, each player can see only their own cards, and every player can see a zeroed dashboard. Bids are still a later task.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Authored by PREP-002. Not started. Build GO is not recorded. |
| 2026-10-14 | agent | Done on https://dyqrtt5df9uyr.cloudfront.net. The first deal is M cards from a shuffled 52-card deck, M = 52 // players. A card is a suit and a rank. The room notice kind is `started`. Each hand is a private notice kind `hand`. |
