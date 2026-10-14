# IMPL-026: Disable the last bidder's forbidden number

| Field | Value |
| --- | --- |
| **ID** | IMPL-026 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-025 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

When the last player of the round is bidding, the one number that would make the bids add up to the cards dealt is disabled. Every other legal number stays available.

## Read first

- [x] [game/rules.md](../../game/rules.md)
- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-012-table-play.md](IMPL-012-table-play.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The bidding rule is already in the game rules. The user asked on 2026-10-14 for that number to be disabled. | Only the last bidder loses that one number. Earlier bidders keep every legal number. |

## Acceptance criteria

- [x] On the last bidder's turn, the bid button whose value would make the stored bids plus that bid equal the cards dealt is disabled. The player cannot submit it
- [x] Every other whole number from 0 through the cards dealt stays enabled
- [x] A player who is not last still sees every whole number from 0 through the cards dealt enabled
- [x] When no legal number would make that total, every bid button stays enabled
- [x] A rejected bid from the server still shows its rejection. Scoring, seating order, and who bids last do not change
- [x] [product/look.md](../../product/look.md) records the disabled number on the last bid
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

The last player to bid sees the forbidden number disabled, and can tap any other legal number.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | If the last player has the compulsion on the bid, that player cannot bid the number that makes the total bids equal the cards dealt. That number should be disabled. Not started. |
| 2026-10-14 | agent | On the last bid, the number that would make the total equal the cards dealt is disabled. In a 10-card round with bids of 2 and 3, 5 was disabled and could not be clicked. 4 was stored. The first bidder still had 0 through 10 enabled. When the earlier bids already added to 12, every button stayed enabled. The server still rejects that bid. |
