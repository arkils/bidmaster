# IMPL-015: Deal at most 10

| Field | Value |
| --- | --- |
| **ID** | IMPL-015 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | deal |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-006 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

A round deals at most 10 cards to each player, so a match has at most 20 rounds. Three, four, and five players deal 10 and play 20 rounds. Six or more keep the shorter equal deal.

## Read first

- [x] [game/rules.md](../../game/rules.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [impl/IMPL-006-play.md](IMPL-006-play.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user set the cap at 10 on 2026-10-14. | — |

## Acceptance criteria

- [x] `docs/game/rules.md` says M is the greatest whole number for which M times the player count is at most 52, and M is never more than 10. Three players deal 10. Four players deal 10. Five players still deal 10. Six players still deal 8. Ten players still deal 5
- [x] The round list is still M down to 1, then 1 back up to M, so the match has 2M rounds and never more than 20. Three, four, and five players each play 20 rounds. Six players still play 16. Ten players still play 10. Cards that are not dealt stay out of that round
- [x] A new match uses this cap from the first round. A round that is already dealt keeps the cards it has. The current trick, bids, and trump of that round stay in place
- [x] The deal-size checks agree with the cap
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A new three-player, four-player, or five-player match deals 10 cards in the first round and again in the last round, and that match has 20 rounds. No match has more than 20 rounds. A hand that was already dealt is not replaced.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | The maximum deal is 10 cards, including when there are 3 or 4 players. Not started. |
| 2026-10-14 | user | Because the deal is at most 10, a match has at most 20 rounds. |
| 2026-10-14 | agent | A new three-player match deals 10. An in-progress round that still holds 15 cards, with 2 tricks played, still counts as 17 dealt. |
