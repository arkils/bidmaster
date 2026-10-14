# IMPL-016: Own seat on the felt

| Field | Value |
| --- | --- |
| **ID** | IMPL-016 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-014 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

The caller's seat chip sits inside the green table, at the bottom of the felt. It does not sit in the gap between the felt and the hand.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-014-own-seat.md](IMPL-014-own-seat.md)
- [x] [impl/IMPL-013-seat-circle.md](IMPL-013-seat-circle.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for this on 2026-10-14. | — |

## Acceptance criteria

- [x] The caller's seat chip is fully inside the green table, along the bottom edge. No part of that chip sits on the page below the felt
- [x] The chip stays the same as the other seats: the name only, the bid once stored, the tricks won, and a face-down count. It is highlighted only when it is that player's turn
- [x] It does not cover the trump mark, the trick, or another seat. The hand stays below the table
- [x] On a phone, the chip is still fully inside the felt, and the page does not scroll sideways
- [x] [product/look.md](../../product/look.md) records that the caller's chip is inside the felt
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A player looking at the room sees their own seat chip on the green table, at the bottom, with the hand underneath the felt.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | The own seat chip, such as `PP`, is below the green table. It should be inside the green table area. Not started. |
| 2026-10-14 | agent | Live check. Asha's chip is inside the felt along the bottom. The hand is below the table. The chip does not cover trump or the other seats. On a 390px-wide phone the page does not scroll sideways. |
