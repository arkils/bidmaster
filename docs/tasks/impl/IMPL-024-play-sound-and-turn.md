# IMPL-024: Play sound and turn mark

| Field | Value |
| --- | --- |
| **ID** | IMPL-024 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-023 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

A card play makes a short sound. A won trick sends every card in it to the winner's seat chip, with one sound per card, back to back. The seat whose turn it is has a thicker ring, a continuous effect, and a star.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-012-table-play.md](IMPL-012-table-play.md)
- [x] [impl/IMPL-019-seat-scores.md](IMPL-019-seat-scores.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | Which sound. | One short card sound, bundled with the site. The same sound plays once when a card lands in the trick, and once for each card in a won trick, back to back. The user left the exact sound open on 2026-10-14. |

## Acceptance criteria

- [x] When a card is played into the trick, a short card sound plays once
- [x] When a trick is won, every card in that trick moves to the winner's seat chip. One sound plays for each of those cards, back to back, while they move. The winner's tricks-won number still increases by one
- [x] The seat whose turn it is has a thicker ring in the turn color, a continuous effect, and a star. A seat that is not to move has none of those
- [x] The sounds and the move do not cover the rules of the trick. A card the rules do not allow stays disabled
- [x] [product/look.md](../../product/look.md) records the sound, the cards moving to the winner, and the turn mark
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A played card makes a sound. A won trick sends its cards to the winner's chip with one sound per card. The seat to move is marked by a thick ring, a continuous effect, and a star.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | Play a card sound each time a card is played. When someone wins the trick, all of those cards go to that player's icon, and that many sounds play back to back. The turn highlight should be more visible: a thicker line, a continuous effect, and a star if that fits. Not started. |
| 2026-10-14 | user | Start this task. IMPL-023 is still logged. |
| 2026-10-14 | agent | Done. A short card sound is bundled at `web/public/card.wav`. On flying-giraffe only Ada, the seat to move, has the thick gold ring, the continuing glow, and the star. A won trick moves its cards toward that winner's chip and plays one sound per card. |
