# DISC-005. Data model

## ID

`DISC-005`

## Track

Discovery

## Phase

Discovery & Architecture

## Component

Data model

## Status

`IN_PROGRESS`

## Priority

Blocking

## Blocked by

DISC-004

## Blocks

DISC-006

## Summary

The data version 1 must remember is written down: entities, relationships, and what is kept after a session ends. It matches the architecture overview and the confirmed scope.

## Read first

- `docs/00-discovery-status.md`
- `docs/product/vision.md`
- `docs/product/requirements.md`
- `docs/architecture/README.md`
- The architecture overview from DISC-004
- `docs/game/rules.md`
- `docs/open-questions.md`

## Open questions

- OQ-18. Whether a container takes over when a match starts. The data-model document stays unwritten until this is answered.
- OQ-17. What DynamoDB keeps after everyone has left the room. This waits on OQ-18.

## Acceptance criteria

- A data-model document exists and is linked from `docs/README.md`.
- It covers the state version 1 must store. It does not add entities the confirmed scope does not need.
- Facts taken from `docs/game/rules.md` are labeled with whether the user has confirmed them for the product.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-13 | agent | Seeded. Blocked by DISC-004. |
| 2026-10-13 | agent | DISC-004 is done. Started this task. Asked OQ-17 before writing the data model. |
| 2026-10-13 | agent | User left the container-versus-Lambda choice unanswered. Recorded OQ-18. Data model still unwritten. |

## Definition of done

- Every acceptance criterion is met.
- Status is `DONE` in this file and in `docs/tasks/backlog.md`.
- Assumptions, open questions, and risks touched by this task are updated in their registers.
- No code was written.
