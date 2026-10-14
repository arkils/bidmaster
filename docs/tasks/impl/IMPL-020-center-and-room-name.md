# IMPL-020: Center, turn line, and room name

| Field | Value |
| --- | --- |
| **ID** | IMPL-020 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-019 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

The facts in the middle of the felt, and the line that says whose turn it is, stop being plain sentences. The room id sits under the BidMaster title. Create room, Join room, Copy link, and Dashboard are centered.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-018-table-comments.md](IMPL-018-table-comments.md)
- [x] [impl/IMPL-019-seat-scores.md](IMPL-019-seat-scores.md)
- [x] [impl/IMPL-008-room-names.md](IMPL-008-room-names.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | How the center facts and the turn line should look, beyond no longer being plain sentences. | Each stored bid in the center sits on a small light chip: the name in ink, the number in the bid gold. The turn line ("Ada's turn", "Your bid", "Choose trump") is a centered label in the turn gold, larger than body text. Trump and the trick stay as they are. The user said to start on 2026-10-14. |

## Acceptance criteria

- [x] A stored bid shown in the center of the felt is no longer the plain line "Nia bid 4". The words stay understandable. The trump mark and the trick stay as they are, and the new treatment does not cover a seat
- [x] The line with the hand ("Your bid", "Choose trump", or whose turn it is) is no longer a plain sentence. It stays centered and does not cover a seat, the trump mark, or the trick
- [x] Copy link and Dashboard are centered under the table. On a phone they stay full width and stacked, still centered in the page
- [x] On the home page, Create room and Join room are centered, including the room-id field once Join room is open. The same centering applies to the other action rows on the home page, the room page, and the dashboard
- [x] Directly under the BidMaster title, on a room page, the room id is visible and centered, so a player can read the name and tell a friend which room to join. The full address is still not printed under the table
- [x] [product/look.md](../../product/look.md) records the center treatment, the turn line, the centered actions, and the room id under the title
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A player on a room page sees the room id under BidMaster, a center that is not a pale sentence, a turn line that is not a plain sentence, and Copy link and Dashboard centered. Create room and Join room are centered on the home page.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | The center detail, such as "Nia bid 4", should be more beautiful. "Ada's turn" should be prettier. Copy link and Dashboard should be centered. Across pages, actions such as Join room and Create room should be centered. Just under BidMaster, the room name from the address should be visible, so it is easy to tell a friend which room to join. Not started. |
| 2026-10-14 | user | Start this task. |
| 2026-10-14 | agent | Done. flying-giraffe shows the room id under BidMaster, Nia's bid as a light chip with a gold 4, and Ada's turn as a gold label. Copy link and Dashboard are centered, full width on a 390px phone. Create room, Join room, and the dashboard Room button are centered. |
