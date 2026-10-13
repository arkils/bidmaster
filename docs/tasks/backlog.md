# Backlog

One task is `IN_PROGRESS` at a time. If none is, take the lowest `TODO` whose blockers are `DONE`. Status here and in the task file stay the same.

The user recorded **Review GO** on 2026-10-14. Coding still waits for Planning, then **Build GO**. Planning and Implementation rows are added in those phases.

| ID | Status | Priority | Blocked by | Summary |
| --- | --- | --- | --- | --- |
| [DISC-001](discovery/DISC-001-product-vision.md) | DONE | Blocking | — | Product vision, version-1 scope, and explicit non-goals |
| [DISC-002](discovery/DISC-002-requirements.md) | DONE | Blocking | DISC-001 | Requirements split into CONFIRMED, PROPOSED, and FUTURE |
| [DISC-003](discovery/DISC-003-user-journeys.md) | DONE | Blocking | DISC-002 | User journeys |
| [DISC-004](discovery/DISC-004-architecture.md) | DONE | Blocking | DISC-003 | Architecture overview and ADRs for stack choices |
| [DISC-005](discovery/DISC-005-data-model.md) | DONE | Blocking | DISC-004 | Data model |
| [DISC-006](discovery/DISC-006-interface-contracts.md) | DONE | Blocking | DISC-005 | API or interface contracts |
| [DISC-007](discovery/DISC-007-non-functional-requirements.md) | DONE | Blocking | DISC-006 | Non-functional requirements |
| [DISC-008](discovery/DISC-008-local-development.md) | DONE | Blocking | DISC-007 | Local development and delivery approach |
| [DISC-009](discovery/DISC-009-documentation-gate.md) | DONE | Blocking | DISC-008 | Documentation gate |
| [REV-001](review/REV-001-product-documents.md) | DONE | Blocking | — | Review vision, requirements, and journeys against the rules |
| [REV-002](review/REV-002-architecture.md) | DONE | Blocking | REV-001 | Review the architecture overview and accepted decisions |
| [REV-003](review/REV-003-data-model.md) | DONE | Blocking | REV-002 | Review the data model against the overview and the confirmed product |
| [REV-004](review/REV-004-contracts.md) | DONE | Blocking | REV-003 | Review the interface contracts against the data model and the journeys |
| [REV-005](review/REV-005-non-functional.md) | DONE | Blocking | REV-004 | Review the non-functional requirements against the confirmed product |
| [REV-006](review/REV-006-delivery.md) | DONE | Blocking | REV-005 | Review delivery against the accepted decisions and the confirmed product |
| [REV-007](review/REV-007-synthesis.md) | DONE | Blocking | REV-006 | Disposition the review findings |
| [REV-008](review/REV-008-apply-findings.md) | DONE | Blocking | REV-007 | Apply the review findings |

The order is a chain. Split or reorder a later task only after discovery shows the product needs a different cut. Do that in the task’s notes log and in this table before starting the reordered work.
