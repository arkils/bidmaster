# DISC-003. User journeys

## ID

`DISC-003`

## Track

Discovery

## Phase

Discovery & Architecture

## Component

User journeys

## Status

`DONE`

## Priority

Blocking

## Blocked by

DISC-002

## Blocks

DISC-004

## Summary

The journeys a version-1 user actually takes are written down, from the confirmed scope. Each journey names the person, the start, the steps, and the end.

## Read first

- `docs/00-discovery-status.md`
- `docs/product/vision.md`
- `docs/product/requirements.md`
- `docs/open-questions.md`
- `docs/game/rules.md`

## Open questions

- OQ-5. Answered 2026-10-13. Recorded in `docs/product/journeys.md`.
- OQ-6. Answered 2026-10-13. A first-time popup asks for a name before Create room or Join room.
- OQ-9. Answered 2026-10-13. The name is stored in a cookie.
- OQ-7. Answered 2026-10-13. Seating follows join time.
- OQ-10. Answered 2026-10-13. The host chooses who bids first in round 1.
- OQ-8. Answered 2026-10-13. The dashboard shows cumulative scores, a ranking table, and a per-round graph.

## Acceptance criteria

- A journeys document under `docs/product/` covers version 1.
- Each journey uses only CONFIRMED or clearly marked PROPOSED behavior.
- A journey that would add scope stops and asks. It is not added silently.

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

## Definition of done

- Every acceptance criterion is met.
- Status is `DONE` in this file and in `docs/tasks/backlog.md`.
- Assumptions, open questions, and risks touched by this task are updated in their registers.
- No code was written.
