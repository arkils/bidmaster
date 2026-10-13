# Backlog

One task is `IN_PROGRESS`. Take the lowest `TODO` whose blockers are `DONE`. Status here and in the task file stay the same.

Coding waits for **Review GO**, then Planning, then **Build GO**. Review, Planning, and Implementation rows are added in those phases.

| ID | Status | Priority | Blocked by | Summary |
| --- | --- | --- | --- | --- |
| [DISC-001](discovery/DISC-001-product-vision.md) | DONE | Blocking | — | Product vision, version-1 scope, and explicit non-goals |
| [DISC-002](discovery/DISC-002-requirements.md) | DONE | Blocking | DISC-001 | Requirements split into CONFIRMED, PROPOSED, and FUTURE |
| [DISC-003](discovery/DISC-003-user-journeys.md) | DONE | Blocking | DISC-002 | User journeys |
| [DISC-004](discovery/DISC-004-architecture.md) | DONE | Blocking | DISC-003 | Architecture overview and ADRs for stack choices |
| [DISC-005](discovery/DISC-005-data-model.md) | IN_PROGRESS | Blocking | DISC-004 | Data model |
| [DISC-006](discovery/DISC-006-interface-contracts.md) | TODO | Blocking | DISC-005 | API or interface contracts |
| [DISC-007](discovery/DISC-007-non-functional-requirements.md) | TODO | Blocking | DISC-006 | Non-functional requirements |
| [DISC-008](discovery/DISC-008-local-development.md) | TODO | Blocking | DISC-007 | Local development and delivery approach |
| [DISC-009](discovery/DISC-009-documentation-gate.md) | TODO | Blocking | DISC-008 | Documentation gate |

The order is a chain. Split or reorder a later task only after discovery shows the product needs a different cut. Do that in the task’s notes log and in this table before starting the reordered work.
