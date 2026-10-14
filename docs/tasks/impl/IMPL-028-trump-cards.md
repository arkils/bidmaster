# IMPL-028: Trump choice as four cards

| Field | Value |
| --- | --- |
| **ID** | IMPL-028 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-027 |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

The trump choice is four cards in a 2×2 grid. Each card uses the same face as a hand card, with only the suit symbol in the center. The suit name is not written on the card.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [game/rules.md](../../game/rules.md)
- [x] [impl/IMPL-012-table-play.md](IMPL-012-table-play.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user showed the suit buttons on 2026-10-15. | Four equal cards, two by two. Clubs, diamonds, hearts, spades. The symbol sits in the middle. No suit name on the face. |

## Acceptance criteria

- [x] On the trump chooser's turn, the four choices are cards in a 2×2 grid: clubs, diamonds, hearts, spades. The cards share one size and line up in two columns
- [x] Each card uses the same face as a hand card. The suit symbol is in the center. Hearts and diamonds are red. Clubs and spades are near-black. The suit name is not written on the card, and there is no rank
- [x] Tapping a card still selects that suit. Who chooses trump does not change. A player who is not choosing does not see the four cards
- [x] The grid sits in the center and does not cover a seat. On a phone the page does not scroll sideways
- [x] Once trump is chosen, the center still shows the suit mark above the trick
- [x] [product/look.md](../../product/look.md) records the four trump cards
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

The player who chooses trump sees four equal cards in a 2×2 grid, each with its suit symbol in the center, and can tap one to choose trump.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | The suit boxes are not aligned. Use the same card layout. Do not keep the suit names. Show four cards in a 2×2 grid with the suit symbol in the middle of each. Not started. |
| 2026-10-15 | agent | The chooser sees four equal cards, clubs and diamonds on the first row, hearts and spades on the second. Each symbol sits in the center of its card. On a 390px phone the grid stays on the page. |
