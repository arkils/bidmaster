# IMPL-013: Seats in a circle

| Field | Value |
| --- | --- |
| **ID** | IMPL-013 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-012 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

Other players sit around the table again, clockwise from the caller. A seat on that table shows the player's name, not the seat number.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-011-card-table.md](IMPL-011-card-table.md)
- [x] [impl/IMPL-012-table-play.md](IMPL-012-table-play.md)
- [x] [impl/IMPL-010-seat-list.md](IMPL-010-seat-list.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for the circle and for names without seat numbers on 2026-10-14. | — |

## Acceptance criteria

- [x] On the room page, the caller's seat stays at the bottom with that player's hand. The other seats sit around the table, clockwise from the caller's left, up to 10. They are not a single list across the top
- [x] A seat on the room table shows the name only, in the style of `Bea` and `Cid`. It does not show `2. Bea` or `3. Cid`. The caller's own line is the same, in the style of `PP`. The stored name is unchanged
- [x] Each other seat still shows the bid once stored, the tricks won, and a face-down count. It does not show that player's cards. The chips do not cover the trump mark, the trick, or each other. The caller's name is fully visible
- [x] The seat whose turn it is stays highlighted. Only a legal card is raised on that player's turn to play. Trump stays a suit mark clear of the seats. On a phone, the bid field and the `Bid` button stay on screen, and the page does not scroll sideways
- [x] [product/look.md](../../product/look.md) records the circle and that a room-table seat shows the name only
- [x] The dashboard stays a scoreboard. The host's Bids first choice can still tell two players apart when they share a name
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A player at the table sees the other players seated around the felt, each labeled by name. The trump mark, the turn highlight, and the legal-card raise from IMPL-012 stay in place.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | After IMPL-012 the players come as a list. The older layout, with players sitting in a circle, should stay. Seat numbers should not be visible on those players: `2. Bea` and `3. Cid` should be `Bea` and `Cid`. Not started. This replaces the room-table style `1. Asha` from IMPL-010. |
| 2026-10-14 | agent | Live check. Bea sits on the caller's left and Cid on the right, with the trump mark between them. The labels are `Bea`, `Cid`, and `Asha`. The dashboard ranking still shows the seat number. |
