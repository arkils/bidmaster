# V3-018: A played card crosses the felt

| Field | Value |
| --- | --- |
| **ID** | V3-018 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-16 |

## Summary

A played card stays visible on the way from the player to the trick. It does not jump onto the table.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [v3/V3-001-card-landing.md](V3-001-card-landing.md)
- [x] [v3/V3-016-card-from-seat.md](V3-016-card-from-seat.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user said the card still appears on the table instead of traveling from the player. | The played-card flight crosses the felt. A won trick keeps its own timing. |

## Acceptance criteria

- [x] On the player's own screen, the card leaves that card in the hand and is still between the hand and the trick while it is crossing
- [x] On every other screen, the card leaves that player's seat chip and is still between the seat and the trick while it is crossing
- [x] The trick copy stays hidden until the flight lands
- [x] `card.mp3` still plays once. A won trick, a bid, the turn, and the deal keep their timing
- [x] [product/look.md](../../product/look.md) records the crossing
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can play a card and see it cross the felt from the hand, and on another screen see that same card cross from the seat chip, instead of appearing on the trick.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-16 | user | The cards still appear from thin air. They do not travel from the player to the table. |
| 2026-10-16 | agent | The flight starts at the hand or the seat, then the travel easing spends most of the distance in the first instant, so the card looks as if it appears on the trick. |
| 2026-10-16 | agent | The played-card crossing now takes 560ms and moves evenly. At mid-flight the card is on the felt, between the player and the trick, and the trick copy stays hidden. Checked from the hand and from West's seat. |
