# REV-003: Data model

| Field | Value |
| --- | --- |
| **ID** | REV-003 |
| **Track** | Review |
| **Phase** | Pre-Development Review |
| **Component** | docs / architecture |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | REV-002 |
| **Blocks** | REV-004 |
| **Completed** | 2026-10-14 |

## Summary

Review the data model against the architecture overview, the accepted decisions, and the confirmed product. Record findings. Do not edit those documents to repair them.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [architecture/data-model.md](../../architecture/data-model.md)
- [x] [architecture/overview.md](../../architecture/overview.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [game/rules.md](../../game/rules.md)
- [x] [decisions/0008-iot-core-notifications.md](../../decisions/0008-iot-core-notifications.md)
- [x] [decisions/0009-player-id.md](../../decisions/0009-player-id.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None at the start of this task. | Ask only if the review is blocked on a fact the docs do not settle. |

## Acceptance criteria

- [x] Findings are recorded in this file, including a review that finds none
- [x] The data model and the documents it was checked against were not edited to repair them
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read this file and know whether the data model agrees with the overview, the accepted decisions, and the confirmed product.

## Findings

Checked on 2026-10-14. These points agree. DynamoDB keeps every started match after the room is empty: the start date, the room id, each seat’s player id and name, and each round’s points. The record does not expire. Seats are numbered from 1 and the host is seat 1, which is the earliest join. Two seats may share a name. A public mention is the seat number plus the name. The cookie holds the name and the player id. There is no account. Connection ids are not stored. While a round is unscored, the match holds that round’s hands, bids, trump, tricks, and turn, and a hand is sent only to that seat’s player id. After the round is scored, the kept result is the points. A look back does not show the cards, bids, or trump. An unstarted room keeps its id. A match has 3 to 10 players, fixed at the start. Round count and deal size are calculated from the rules. A successful bid in the current scoring table is a round whose points are positive, because an exact bid scores above zero and a miss scores below zero.

| ID | Finding |
| --- | --- |
| F-8 | [architecture/data-model.md](../../architecture/data-model.md) says rank follows the rules, then stops at a higher score and, on a tie, more successful bids. [game/rules.md](../../game/rules.md) also says that when the score and the number of successful bids are both equal, those players share the rank, and players who share the highest rank share the win. This is the same gap as F-1, now in the data model. The requirements still point at the rules for rank. |
| F-9 | The kept-match list does not include the seat that bids first in round 1. The section before the start says that choice is fixed on the match. The rules move that seat one place clockwise every round. A later agent who stores only the kept-match list cannot tell who opens a later round. |

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Seeded after REV-002. Not started. |
| 2026-10-14 | agent | Reviewed the data model against the overview, decisions 0008 and 0009, the vision, the requirements, the journeys, and the rules. Recorded F-8 and F-9. Did not edit those documents. |
