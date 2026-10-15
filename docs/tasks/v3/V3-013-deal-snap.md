# V3-013: Deal snap

| Field | Value |
| --- | --- |
| **ID** | V3-013 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

On the caller's screen, a new hand lifts into the row and snaps down. The cards are staggered a little. No new sound.

## Read first

- [x] [product/vision.md](../../product/vision.md)
- [x] [product/look.md](../../product/look.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [prep/PREP-013-bid-and-deal.md](../prep/PREP-013-bid-and-deal.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. [OQ-35](../../open-questions.md) is answered. | The hand lifts and snaps in. |

## Acceptance criteria

- [x] On the caller's screen, the new hand lifts into the row and snaps down. The cards are staggered a little
- [x] No new sound file. `card.mp3` stays the sound of a played card
- [x] Other players still do not see the hand
- [x] The round result still waits for OK, and the deal still starts only then. After the last round, OK still deals nothing
- [x] The turn arrival and a stored bid stay as they are
- [x] [product/look.md](../../product/look.md) records the lift and the snap
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can accept a round result and see that caller's new hand lift and snap into the row, staggered a little, with no new sound. Another player's screen does not show that hand. The last round still deals nothing.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | Written by [PREP-013](../prep/PREP-013-bid-and-deal.md). Unstarted. |
| 2026-10-15 | agent | The caller's new hand lifts and snaps into the row, staggered. No new sound. |
