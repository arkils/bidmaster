# IMPL-012: Table play layout

| Field | Value |
| --- | --- |
| **ID** | IMPL-012 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-011 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

The room table keeps each seat, the trump mark, the trick, and the caller's name in their own place. A hand card is raised only when it is that player's turn and the card is legal to play. Every player sees which seat is to move. Bidding can be submitted on a phone.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [game/rules.md](../../game/rules.md)
- [x] [impl/IMPL-011-card-table.md](IMPL-011-card-table.md)
- [x] [impl/IMPL-005-bid-and-trump.md](IMPL-005-bid-and-trump.md)
- [x] [impl/IMPL-006-play.md](IMPL-006-play.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user reported these layout and play-control problems on 2026-10-14. | — |

## Acceptance criteria

- [x] Seat chips do not cover the trump mark, the trick, or each other. Each other seat still shows the seat number and name once, the bid once stored, the tricks won, and a face-down count. It does not show that player's cards
- [x] The caller's own seat line, in the style of `1. PP`, is fully visible with that player's hand. It is not clipped by the table edge
- [x] Trump, once chosen, is a suit mark using the same red or near-black symbol as the cards. It sits in a fixed place that does not cover a seat, the trick, or the caller's name. The words `Trump is diamonds.` are not laid across a seat
- [x] The seat whose turn it is, for a bid, the trump choice, or a card, is highlighted on every player's screen. A seat that is not to move is not highlighted
- [x] Hand cards stay flat and are not controls when it is not that player's turn to play. On that player's turn to play, a card that the rules allow is enabled and raised. A card the rules do not allow stays visible, flat, and disabled. The first card of a trick may be any card in hand. After that, a player who still holds the led suit can play only that suit
- [x] The bid control is a number from 0 through the cards dealt this round, with a submit button labeled `Bid`. On a phone, both the field and the `Bid` button are on screen. The page does not scroll sideways
- [x] [product/look.md](../../product/look.md) records the trump mark, the turn highlight, and which hand cards are raised
- [x] The dashboard stays a scoreboard. Play, bids, and trump still follow the rules already implemented
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A player at the table can see whose turn it is, where trump is, and their own name. Only a legal card on their own turn is raised and playable. A bid can be submitted from a phone.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | On `vivacious-whitefish`, the seat chips look bad, trump text sits under seat 3, and `1. PP won 1` is clipped at the bottom left of the felt. Cards should be highlighted only on that player's turn, and only eligible cards should be enabled and popped out. Every player should see which seat is highlighted. Trump should show its suit symbol, somewhere other than on top of a seat. The bid box is awkward, and on a phone the submit control is not shown. Not started. |
| 2026-10-14 | agent | Live check. Seats sit above the center and do not cover the trump mark. The caller's name sits with the hand. Trump is the suit symbol. On a turn to play, only the led suit was raised when that suit was still held. On a phone, the bid field and the Bid button were both on screen, and a bid of 1 was stored. |
