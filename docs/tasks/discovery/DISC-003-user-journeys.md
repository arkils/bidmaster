# DISC-003: User journeys

| Field | Value |
| --- | --- |
| **ID** | DISC-003 |
| **Track** | Discovery |
| **Phase** | Discovery & Architecture |
| **Component** | docs / product |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | DISC-002 |
| **Blocks** | DISC-004 |
| **Completed** | 2026-10-13 |

## Summary

The journeys a version-1 user actually takes are written down, from the confirmed scope. Each journey names the person, the start, the steps, and the end.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [game/rules.md](../../game/rules.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| OQ-5 | How does an invited player get into a room? | Home offers Create room and Join room. The room URL ends in a two-word id. Recorded in [product/journeys.md](../../product/journeys.md). |
| OQ-6 | Does the host enter a name when creating the room? | A first-time popup asks for a name before Create room or Join room. |
| OQ-9 | After the first visit, how does the site remember the person's name? | The name is stored in a cookie. Decision 0009 later added a player id in that same cookie. |
| OQ-7 | When the host starts the match, how is seating fixed? | Seating follows join time, earliest first. |
| OQ-10 | Who bids first in round 1? | The host chooses who bids first in round 1. That player leads the first trick. |
| OQ-8 | When does the dashboard appear, and which points does it show? | From the start of the match: cumulative scores, a ranking table, and one line per player. |

## Acceptance criteria

- [x] A journeys document under `docs/product/` covers version 1
- [x] Each journey uses only CONFIRMED or clearly marked PROPOSED behavior
- [x] A journey that would add scope stops and asks. It is not added silently
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can follow each version-1 journey from the name popup through a finished match and a look back, without inventing a step.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-13 | agent | Seeded. Blocked by DISC-002. |
| 2026-10-13 | agent | DISC-002 is done. Started this task. Asked OQ-5 before writing journeys. |
| 2026-10-13 | agent | User answered OQ-5. Wrote create, join, and start journeys. Asked OQ-6. Left seating and the dashboard as OQ-7 and OQ-8. |
| 2026-10-13 | agent | User answered OQ-6. Name popup comes before create or join. Asked OQ-9. |
| 2026-10-13 | agent | User answered OQ-9. The name is stored in a cookie. Asked OQ-7. |
| 2026-10-13 | agent | User answered the seating half of OQ-7. Seats follow join time. Asked OQ-10. |
| 2026-10-13 | agent | User answered OQ-10. The host chooses the round-1 first bidder. Asked OQ-8. |
| 2026-10-13 | agent | User answered OQ-8. Dashboard is cumulative score, ranking table, and a line per player. Acceptance criteria met. |
