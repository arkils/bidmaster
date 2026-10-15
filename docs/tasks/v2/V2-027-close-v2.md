# V2-027: Close version 2

| Field | Value |
| --- | --- |
| **ID** | V2-027 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | docs |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Version 2 is finished. The living product and architecture documents match the shipped site, and a few costs that do not change play are removed.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [product/look.md](../../product/look.md)
- [x] [architecture/overview.md](../../architecture/overview.md)
- [x] [architecture/data-model.md](../../architecture/data-model.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [decisions/0008-iot-core-notifications.md](../../decisions/0008-iot-core-notifications.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. Version 3 is not designed in this task. | — |

## Acceptance criteria

- [x] The living documents describe the shipped round-result wait, names on screen without a seat number, both dashboard graphs, and a dashboard listener that is not a seat
- [x] Version 2 is recorded as closed, and the next step is a version 3 discussion
- [x] The match list is not loaded on the room page or the rules page
- [x] A live notice that is not JSON is ignored
- [x] A load no longer attaches a cards-left count the screen does not show
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read the product and architecture documents and know what version 2 shipped, without treating an older sentence about an immediate next deal, a visible seat number, or a seated-only subscription as the current behavior. Version 3 is not started.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Version 2 development and bug fixes are done. Complete the documents, check them against the site, and optimize without a new feature. |
| 2026-10-15 | agent | Recorded the close. Corrected the round-result wait, the on-screen names, and the dashboard subscription. Stopped the room and rules pages from listing matches, ignored a bad live notice, and dropped the unused cards-left count. |
