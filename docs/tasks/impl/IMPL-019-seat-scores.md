# IMPL-019: Seat bid and tricks

| Field | Value |
| --- | --- |
| **ID** | IMPL-019 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-018 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

A seat chip no longer shows how many cards are left. It shows the bid and the tricks won as two colored numbers on a larger chip.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-018-table-comments.md](IMPL-018-table-comments.md)
- [x] [impl/IMPL-014-own-seat.md](IMPL-014-own-seat.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user described the chip on 2026-10-14. | The bid number uses the turn gold. The tricks-won number uses blue. |

## Acceptance criteria

- [x] A seat chip does not show how many cards are left
- [x] Once a round has started, the chip shows two numbers: the bid once stored, and the tricks won so far. A bid that is not stored yet is a dash. Tricks won start at 0
- [x] The two numbers are not written as "bid 4" and "won 3". The bid number is gold. The tricks-won number is blue
- [x] The chip is large enough to hold the name and both numbers. It stays inside the felt, and chips do not cover the trump mark, the trick, or each other. On a phone the page does not scroll sideways
- [x] The caller's chip uses the same two numbers. It stays inside the felt, along the bottom, and is highlighted only on that player's turn
- [x] [product/look.md](../../product/look.md) records the two numbers and drops the face-down count from the chip
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A player looking at a seat sees the name and, during a round, a gold bid and a blue tricks-won count. The chip does not show cards left.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | The chip shows the name and cards left. Cards left is not useful. Show the bid and the tricks won so far, as two numbers on a larger chip, with color, not as the words "bid 4" and "won 3". |
| 2026-10-14 | agent | Done. The chip shows a gold bid and a blue tricks-won count. A bid that is not stored yet is a dash. Checked with 10 players on a wide window and on a 390px phone. |
