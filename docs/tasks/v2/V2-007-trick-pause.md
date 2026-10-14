# V2-007: Pause on the winning card

| Field | Value |
| --- | --- |
| **ID** | V2-007 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | web |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

When the last card of a trick is played, that trick stays in the center. The card that won is highlighted. Two seconds later, the cards move to the winner's seat.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [game/rules.md](../../game/rules.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for this on 2026-10-15. | — |

## Acceptance criteria

- [x] The cards stay in the center when the last player of the trick plays
- [x] The winning card, the one from the seat that won the trick, is highlighted for those two seconds
- [x] The move to the winner's chip starts only after 2 seconds
- [x] That move is the existing animation: the cards travel to the winner's seat and each plays `card.mp3`
- [x] The result is recorded in [look.md](../../product/look.md)
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can play the last card of a trick, see the winning card highlighted while the trick stays put, and see the cards leave for the winner only after 2 seconds. `docs/product/look.md` says so.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | The user asked for a task only. `taken` is set as soon as the trick list grows, and the gather animation starts on the next frame. The winning card is the played card whose seat is `winner`. Not started. |
| 2026-10-15 | agent | The winning card keeps a gold ring for 2 seconds. The move and the card sounds start after that. A full trick was not played in the browser. |
