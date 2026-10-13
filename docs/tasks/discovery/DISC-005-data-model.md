# DISC-005: Data model

| Field | Value |
| --- | --- |
| **ID** | DISC-005 |
| **Track** | Discovery |
| **Phase** | Discovery & Architecture |
| **Component** | docs / architecture |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | DISC-004 |
| **Blocks** | DISC-006 |
| **Completed** | 2026-10-14 |

## Summary

The data version 1 must remember is written down: entities, relationships, and what is kept after a session ends. It matches the architecture overview and the confirmed scope.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [architecture/README.md](../../architecture/README.md)
- [x] [architecture/overview.md](../../architecture/overview.md)
- [x] [game/rules.md](../../game/rules.md)
- [x] [open-questions.md](../../open-questions.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| OQ-18 | When a match starts, does a container start and hold the live connections? | No. The match stays in DynamoDB. AWS IoT Core carries notices. [Decision 0008](../../decisions/0008-iot-core-notifications.md) is ACCEPTED. |
| OQ-17 | What does DynamoDB keep after everyone has left the room? | Every started match: the start date, the room id, the players, and each round's points. The dashboard can open that match later. See [architecture/data-model.md](../../architecture/data-model.md). |

## Acceptance criteria

- [x] A data-model document exists and is linked from [README.md](../../README.md)
- [x] It covers the state version 1 must store. It does not add entities the confirmed scope does not need
- [x] Facts taken from [game/rules.md](../../game/rules.md) are labeled with whether the user has confirmed them for the product
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can see what DynamoDB keeps for a room, a round still being played, and a finished match, and what a look back does not show.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-13 | agent | Seeded. Blocked by DISC-004. |
| 2026-10-13 | agent | DISC-004 is done. Started this task. Asked OQ-17 before writing the data model. |
| 2026-10-13 | agent | User left the container-versus-Lambda choice unanswered. Recorded OQ-18. Data model still unwritten. |
| 2026-10-13 | agent | User accepted IoT Core as the notice path and declined a per-match container. Wrote decision 0008 as ACCEPTED. OQ-18 is answered. Data model still waits on OQ-17. |
| 2026-10-14 | agent | User answered OQ-17. A started match is kept: date, room id, players, and each round's points, so the dashboard can open it later. Wrote the data model. Trick-by-trick review stays out. Acceptance criteria met. |
| 2026-10-14 | agent | Review fixes. Seats are numbered. A public player reference is the seat number and the name. An unstarted room keeps its id because nothing deletes that record. A repeat join before the start updates the seat's name. |
