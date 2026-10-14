# IMPL-018: Table comments

| Field | Value |
| --- | --- |
| **ID** | IMPL-018 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-017 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

The room page title, the repeated name, the bid control, the seat arc, the controls under the table, and the match list are adjusted from the comments on the 10-player table. Plain-text controls on the home page, the room, and the dashboard use the shared React components. Further comments stay in the notes log until this task starts.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-017-shadcn-table.md](IMPL-017-shadcn-table.md)
- [x] [impl/IMPL-013-seat-circle.md](IMPL-013-seat-circle.md)
- [x] [impl/IMPL-012-table-play.md](IMPL-012-table-play.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | How the bid control should look, beyond no longer being the plain line "Bid, 0 through N" beside a bare number box. | Buttons for each whole number from 0 through the cards dealt. Tapping one submits that bid. The user said to start on 2026-10-14, and a deal is at most 10 cards. |

## Acceptance criteria

- [x] The page title reads BidMaster and is centered
- [x] The caller's name is not repeated under that title. The name stays on the caller's seat chip
- [x] The bid control is no longer the plain line "Bid, 0 through N" beside a bare number box. It still accepts a whole number from 0 through the cards dealt, and it still fits on a phone
- [x] The other seats spread around the felt. They are not bunched across the top. They still do not cover the trump mark, the trick, the caller's chip, or each other. The caller's chip stays inside the felt, along the bottom
- [x] Under the table, the room address is not printed as a raw URL. Copy link stays, and it uses the same button style as the other room controls. Dashboard, once the match has started, is a button in that same style, not a plain underlined link
- [x] Your matches is a structured list. Each match shows the date, the room id, and the seats as separate parts, not one underlined run of text. The same list on the home page and on the dashboard uses that structure
- [x] A pass over the home page, the room, and the dashboard replaces plain-text controls with the shared React components. That includes the Room link on the dashboard. Card faces, the felt, and the seat chips stay custom
- [x] [product/look.md](../../product/look.md) records the title, the missing name under it, the spread of seats, the controls under the table, and the match list
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A player opening a room sees BidMaster centered, no second copy of their name under it, a bid control that is not the bare number line, the other seats spread around the oval, and Copy link and Dashboard as buttons, without the raw room URL under the table. Your matches reads as separate date, room, and seats, and the other plain-text controls use the shared components.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | On the 10-player room, the title Bidmaster is left aligned. It should be centered and written BidMaster. The player name under the title, such as Nia, is not needed. The line "Bid, 0 through 5" at the bottom looks ugly and should be beautified. The circle of players is cluttered on top and should be more spread. More images and comments may follow before this task starts. Not started. |
| 2026-10-14 | user | Under the hand, the printed room URL looks ugly, and the Copy link box looks ugly. Dashboard is a plain link and should be a button in the same style. Not started. |
| 2026-10-14 | user | Your matches on the dashboard is an underlined run of the date, the room id, and the seats, and a long seat list wraps onto the next line. It should be well structured. Across the home page, the room, and the dashboard, plain-text controls should use the shared React components. Card faces, the felt, and the seat chips stay custom. Not started. |
| 2026-10-14 | user | The comments are enough. Start this task. |
| 2026-10-14 | agent | Done. BidMaster is centered. The name under the title is gone. A bid is a row of number buttons. Ten seats on flying-giraffe spread down both sides of the oval, on a wide window and at 390px, without covering each other or leaving the felt. Copy link and Dashboard are buttons, and the raw URL is not shown. Your matches is a date, room, and seats table. |
