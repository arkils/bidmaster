# IMPL-011: Card table look

| Field | Value |
| --- | --- |
| **ID** | IMPL-011 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-007 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

The room page looks like a card table, built from one design record and one token stylesheet. The caller's hand is at the bottom, the other seats sit clockwise around the trick, and the dashboard stays a scoreboard on the same stone page.

## Read first

- [x] [product/journeys.md](../../product/journeys.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [impl/IMPL-009-dashboard-url.md](IMPL-009-dashboard-url.md)
- [x] [impl/IMPL-010-seat-list.md](IMPL-010-seat-list.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user agreed this look on 2026-10-14. | — |

## Acceptance criteria

- [x] On the room page, the caller's seat is at the bottom. The other seats run clockwise from the caller's left, up to 10. Each other seat shows the seat number and the name once, in the style of `1. Asha`, the bid once it is stored, the tricks won, and a face-down count of cards still in hand. It does not show that player's cards
- [x] The center of the table shows the current trick as face-up cards, the trump suit once chosen, and whose turn it is. Before the first card of the round, the center shows the bids. The seat whose turn it is is marked
- [x] The caller's hand is a row of face-up cards. Each card has a large rank in the corner and one large suit mark in the center. Jack, queen, king, and ace use that same face. Hearts and diamonds are red. Clubs and spades are near-black. The cards are white. When it is that player's turn, the card is the control for the bid, the trump choice, or the play that already exists. When it is not that player's turn, the cards stay visible and are not controls
- [x] A played card slides into the trick. The winning card lifts when the trick is taken. A new hand deals in with a short slide. The seat whose turn it is pulses briefly. The motion is snappy
- [x] Before the match starts, the center is empty and the seats still sit around the table. Copy link, Leave, Bids first, and Start stay under the table, in the same words as now
- [x] `docs/product/look.md` records the look: muted olive felt, a stone-colored page, white cards, red hearts and diamonds, near-black clubs and spades, plain sans for page text, and the motion above. `web/src/tokens.css` holds those choices as variables. Components use the variables. The home page, the name popup, the room, and the dashboard all use that stone page. The felt is only the table
- [x] The dashboard at `/dashboard/{roomId}` still shows the date, the players, the cumulative scores, the ranking, and the graph. It does not become a felt table. It does not show cards, bids, trump, or who bid first in round 1. Your matches stays as it is
- [x] On a phone, the same table is compressed. The hand is a horizontal row that can scroll. The other seats are compact chips around the center, still clockwise, still one seat number each. The page itself does not scroll sideways. Buttons and cards stay at least 2.75rem tall
- [x] A player still sees only their own cards. Play, bids, and trump follow the rules already implemented
- [x] The page works in a computer browser and in a phone browser
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A player opening a room sees bold cards at the bottom of a muted olive table, the other seats around the center, and the trick in the middle. Colors and motion come from the token stylesheet. The dashboard is still the scoreboard.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | The user agreed the card-table look. Not started. Coding waits until the user says to start this task. |
| 2026-10-14 | user | Mood: a combination of a private card club and a bright modern game. Cards are bold. Motion is snappy. The background is neither very dark nor very bright. Play should feel interesting. Effects and the rest of the styling are still being asked, one question at a time. |
| 2026-10-14 | user | Motion: a card slides into the trick, the winning card lifts when the trick is taken, a new hand deals in with a short slide, and the seat whose turn it is pulses briefly. |
| 2026-10-14 | user | Color: muted olive felt on a stone-colored page. Cards stay white. Hearts and diamonds stay red. Clubs and spades stay near-black. The design decisions live in one file that components read, so a later edit to that file can restyle the site in one place. |
| 2026-10-14 | user | Card face: a large rank in the corner and one large suit mark in the center. Jack, queen, king, and ace use that same face, not illustrated royalty. |
| 2026-10-14 | user | Design file: a short record in `docs/product/look.md`, plus `web/src/tokens.css`. Components use the tokens. A later restyle edits the record, then the tokens. |
| 2026-10-14 | user | The questions are done. IMPL-011 is the one task for this look. |
| 2026-10-14 | agent | Live check on the deployed site. The room page is the olive table. The caller's cards stay at the bottom, other seats are chips with one seat number, a bid, tricks won, and a face-down count. The dashboard stays the stone scoreboard. On a 390px-wide phone the page does not scroll sideways and the hand scrolls. An unstarted room keeps Copy link and Leave under the table. |
