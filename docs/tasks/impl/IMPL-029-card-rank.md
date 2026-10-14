# IMPL-029: Keep the rank in the left corner

| Field | Value |
| --- | --- |
| **ID** | IMPL-029 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-028 |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

A playable hand card keeps its rank in the left corner, the same place it sits when the card is not a control. The suit mark stays in the center.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-012-table-play.md](IMPL-012-table-play.md)
- [x] [impl/IMPL-011-card-table.md](IMPL-011-card-table.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user showed an active hand on 2026-10-15. | The rank stays left. Becoming playable does not center it. |

## Acceptance criteria

- [x] On a player's turn, a raised legal card shows its rank in the left corner, in the same place as a card that is not a control
- [x] A disabled hand card on that turn keeps the rank in that same left corner
- [x] The suit mark stays centered on the card. Hearts and diamonds stay red. Clubs and spades stay near-black
- [x] A legal card is still raised and playable. A card the rules do not allow stays flat and disabled
- [x] Trick cards and the hand cards shown before the turn use that same left rank
- [x] [product/look.md](../../product/look.md) records that the rank stays in the left corner when the card is playable
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

Turning a hand card into a control does not move its rank. The number stays in the left corner, and the suit mark stays in the center.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Active cards look different from the quiet hand. The rank becomes centered once the card is active. It should stay on the left of the card, as it does when no cards are active. Not started. |
| 2026-10-15 | agent | A playable card keeps the rank 7px from the left edge, the same inset as a card that is not a control. The suit mark stays centered. |
