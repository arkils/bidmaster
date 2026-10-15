# V2-016: Reserve the trump mark

| Field | Value |
| --- | --- |
| **ID** | V2-016 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

The ivory gap between the room id and the stadium keeps the height of the trump mark from the start of the room page. Choosing a suit fills that place. The stadium and the controls under it do not move.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [v2/V2-013-trump-above-table.md](V2-013-trump-above-table.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for this on 2026-10-15. | The place stays empty until a suit is chosen, and its height is already reserved. |

## Acceptance criteria

- [x] Before trump is chosen, the gap between the room id and the stadium is empty: no suit mark and no card frame
- [x] That gap already has the height of the trump mark, including the space around it
- [x] When a suit is chosen, the mark appears in that same place and the stadium, the seats, and the controls under the table stay where they were
- [x] The home page and the dashboard do not grow that gap
- [x] [product/look.md](../../product/look.md) records the reserved empty place
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can open a room, see an empty gap of the trump mark's height under the room id, choose a suit, and see the mark fill that gap without the table moving. `docs/product/look.md` says so.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Keep the place for the trump icon empty, but reserve the space. The page shifts down when trump is selected. Not started. |
| 2026-10-15 | agent | The mark is rendered only when `round.trump` is set. It is 1.7rem tall with a 0.45rem top margin, so the stadium drops by that amount when the suit is chosen. |
| 2026-10-15 | agent | The room page keeps an empty box of that size until a suit is chosen. Checked in the browser: the empty box was 27px with no mark and no frame, and the stadium stayed at the same top after hearts was chosen. The home page and the dashboard had no box. |
