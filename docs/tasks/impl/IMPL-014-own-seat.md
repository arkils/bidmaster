# IMPL-014: Own seat chip

| Field | Value |
| --- | --- |
| **ID** | IMPL-014 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-013 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

The caller's own seat is a chip like the other seats. It stays at the bottom, above that player's hand, and it is highlighted when it is that player's turn.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-013-seat-circle.md](IMPL-013-seat-circle.md)
- [x] [impl/IMPL-012-table-play.md](IMPL-012-table-play.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for this on 2026-10-14. | — |

## Acceptance criteria

- [x] On the room page, the caller's seat is a chip in the same style as the other seats: the name only, the bid once stored, the tricks won, and a face-down count. It does not show a seat number
- [x] That chip stays at the bottom, above the caller's hand. The other seats stay around the table
- [x] The caller's chip is highlighted when it is that player's turn, for a bid, the trump choice, or a card. It is not highlighted when another seat is to move
- [x] The hand, the trump mark, the legal-card raise, and the phone bid control stay as they are
- [x] [product/look.md](../../product/look.md) records that the caller's seat is that same chip
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A player sees their own seat as a chip at the bottom of the table, matching the other seats, and that chip is highlighted on their turn.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | On the room page, `PP won 1` is plain text under the felt. It should be a chip like the other seats, always at the bottom, and highlighted when it is that player's turn. Not started. |
| 2026-10-14 | agent | Live check. Asha's seat is a chip above the hand: name, bid, tricks won, and the face-down count. It sits below the felt. While Cid was to move, Cid's chip was highlighted and Asha's was not. |
