# DISC-006: Interface contracts

| Field | Value |
| --- | --- |
| **ID** | DISC-006 |
| **Track** | Discovery |
| **Phase** | Discovery & Architecture |
| **Component** | docs / architecture |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | DISC-005 |
| **Blocks** | DISC-007 |
| **Completed** | 2026-10-14 |

## Summary

The API or other interface contracts for version 1 are written down: who calls what, what goes in, and what comes back. They match the data model and the journeys.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [architecture/data-model.md](../../architecture/data-model.md)
- [x] [architecture/overview.md](../../architecture/overview.md)
- [x] [open-questions.md](../../open-questions.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None for this task | Giving a name stays in the browser cookie and is not a call. The HTTP and IoT operations are in [architecture/contracts.md](../../architecture/contracts.md). |

## Acceptance criteria

- [x] A contract document exists and is linked from [README.md](../../README.md)
- [x] Each operation names its caller, inputs, outputs, and the errors version 1 must surface
- [x] The contract does not widen version-1 scope
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can implement each HTTP and IoT operation from the named caller, inputs, outputs, and errors.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-13 | agent | Seeded. Blocked by DISC-005. |
| 2026-10-14 | agent | DISC-005 is done. Wrote the contracts from the journeys, the data model, and the rules. Giving a name is not a call. The only surfaced rejection sentence is the last-bidder rule. Acceptance criteria met. |
| 2026-10-14 | agent | User added a player id beside the visible name. Decision 0009 is ACCEPTED. Contracts now identify a player by that id, and list the matches that id played. |
| 2026-10-14 | agent | Review fixes. Public facts name a seat number plus the display name. A repeat join before the match starts updates that seat's name. A room id stays reserved while the room record exists, including an unstarted room. |
