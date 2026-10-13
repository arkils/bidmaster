# REV-005: Non-functional requirements

| Field | Value |
| --- | --- |
| **ID** | REV-005 |
| **Track** | Review |
| **Phase** | Pre-Development Review |
| **Component** | docs / product |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | REV-004 |
| **Blocks** | REV-006 |
| **Completed** | 2026-10-14 |

## Summary

Review the non-functional requirements against the vision, the requirements, the journeys, and the accepted decisions. Record findings. Do not edit those documents to repair them.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [decisions/0002-serverless-hosting.md](../../decisions/0002-serverless-hosting.md)
- [x] [decisions/0005-mumbai-region.md](../../decisions/0005-mumbai-region.md)
- [x] [decisions/0008-iot-core-notifications.md](../../decisions/0008-iot-core-notifications.md)
- [x] [decisions/0009-player-id.md](../../decisions/0009-player-id.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None at the start of this task. | Ask only if the review is blocked on a fact the docs do not settle. |

## Acceptance criteria

- [x] Findings are recorded in this file, including a review that finds none
- [x] The non-functional requirements and the documents they were checked against were not edited to repair them
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read this file and know whether the non-functional requirements agree with the confirmed product and the accepted decisions.

## Findings

Checked on 2026-10-14. These points agree. The site is public and global, rooms are by invitation, and there is no lobby. A match has 3 to 10 players. Many matches can run at once, and no maximum count was invented. The site works in a computer browser and a phone browser. Android and iOS stay FUTURE. A player sees only their own cards, on that player id’s topic and in that player id’s load. The screen shows the name and hides the id. A public name is the seat number plus the name. The match list is only the matches for the cookie’s player id. Anyone who knows a room id can see the public result, including the bids, trump, played cards, and turn of a round still being played, and not the other hands. There is no account. A started match is kept and does not expire. The dashboard is on screen from the start of the match. A missed notice is repaired by loading the room. The cold start after a quiet period may be slower than the usual delay. Version 1 is not a source of income.

| ID | Finding |
| --- | --- |
| F-14 | The non-functional requirements say no process stays up for the match. The next bullets say the table is live while players are in the room, and that IoT Core meters a connection only while a player is subscribed. [Decision 0008](../../decisions/0008-iot-core-notifications.md) keeps that MQTT session for the time the room is open. This is the same tension as F-5, now inside the non-functional requirements. The text also says IoT is not a server that stays running. |
| F-15 | The same section says CloudFront is on the AWS free tier, and that version 1 states no cost ceiling. [Decision 0002](../../decisions/0002-serverless-hosting.md) describes the serverless option as costing nothing while idle. A later agent can treat the free tier as a spending cap. |
| F-16 | A bid or a card should feel real-time, and a delay of 1 or 2 seconds is acceptable. A player far from Mumbai waits longer on each bid and card, per [decision 0005](../../decisions/0005-mumbai-region.md). The cold start is the only delay the text explicitly allows to run slower than that. It does not say whether the extra wait from outside India may pass 2 seconds. |

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Seeded after REV-004. Not started. |
| 2026-10-14 | agent | Reviewed the non-functional requirements against the vision, the requirements, the journeys, and decisions 0002, 0005, 0008, and 0009. Recorded F-14 through F-16. Did not edit those documents. |
