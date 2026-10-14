# IMPL-023: Align the controls under the table

| Field | Value |
| --- | --- |
| **ID** | IMPL-023 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-022 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

Copy link, Leave room, the Bids first select, and Start match share one baseline under the table. The Bids first label stays above the select.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-018-table-comments.md](IMPL-018-table-comments.md)
- [x] [impl/IMPL-020-center-and-room-name.md](IMPL-020-center-and-room-name.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user showed the row on 2026-10-14. | The buttons and the select share a bottom edge. The label stays above the select. |

## Acceptance criteria

- [x] Copy link, Leave room, the Bids first select, and Start match line up on one baseline. The Bids first label stays above the select and does not lift the other controls
- [x] Dashboard, once the match has started, uses that same baseline
- [x] On a phone the controls stay full width and stacked, still centered
- [x] [product/look.md](../../product/look.md) records the shared baseline
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

Under the table, the buttons and the Bids first select sit on one line. The label sits above the select.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | Copy link, Leave room, Bids first, and Start match are not aligned. The label sits up with the outline buttons, and the select sits lower than those buttons. Not started. |
| 2026-10-14 | agent | The row under the table uses `align-items: flex-end`. Copy link, Leave room, the Bids first select, and Start match share a bottom edge. The label stays above the select. A started room keeps Copy link and Dashboard on that same edge. On a 390px phone the controls are full width, stacked, and centered. |
