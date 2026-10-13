# DISC-006. Interface contracts

## ID

`DISC-006`

## Track

Discovery

## Phase

Discovery & Architecture

## Component

Interfaces

## Status

`TODO`

## Priority

Blocking

## Blocked by

DISC-005

## Blocks

DISC-007

## Summary

The API or other interface contracts for version 1 are written down: who calls what, what goes in, and what comes back. They match the data model and the journeys.

## Read first

- `docs/00-discovery-status.md`
- `docs/product/vision.md`
- `docs/product/requirements.md`
- The journeys document from DISC-003
- The data-model document from DISC-005
- The architecture overview from DISC-004
- `docs/open-questions.md`

## Open questions

None yet. If version 1 has no programmatic interface, record that as a confirmed outcome of this task instead of inventing one.

## Acceptance criteria

- A contract document exists and is linked from `docs/README.md`.
- Each operation names its caller, inputs, outputs, and the errors version 1 must surface.
- The contract does not widen version-1 scope.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-13 | agent | Seeded. Blocked by DISC-005. |

## Definition of done

- Every acceptance criterion is met.
- Status is `DONE` in this file and in `docs/tasks/backlog.md`.
- Assumptions, open questions, and risks touched by this task are updated in their registers.
- No code was written.
