# V3-016: A played card comes from the player

| Field | Value |
| --- | --- |
| **ID** | V3-016 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-16 |

## Summary

A played card travels from the player's hand on that player's screen, and from that player's seat chip on every other screen.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [v3/V3-001-card-landing.md](V3-001-card-landing.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user described the flight on 2026-10-15. | Own screen: from the hand. Other screens: from that player's seat chip. |

## Acceptance criteria

- [x] On the screen of the player who played it, the card lifts off that card in the hand, travels to its place in the trick, and snaps down
- [x] On every other screen, the card lifts off that player's seat chip, travels to its place in the trick, and snaps down
- [x] `card.mp3` still plays once. No new sound
- [x] A hand stays flat until it is that player's turn. A bid, the turn, the deal, and a won trick stay as they are
- [x] [product/look.md](../../product/look.md) records both flights
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can play a card and see it leave the hand. On another player's screen, that same card leaves the player's seat chip and lands in the trick.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | A played card appears on the table directly. The player who plays it should see it travel from their hand. Everyone else should see it come from that player's seat on the table. |
| 2026-10-15 | agent | Logged. [look.md](../../product/look.md) still gives other screens only a short slide into the trick. Not implemented in this pass. |
| 2026-10-16 | agent | The player's own card still leaves that card in the hand. Another player's card leaves that seat chip. Both were checked on the room page. |
