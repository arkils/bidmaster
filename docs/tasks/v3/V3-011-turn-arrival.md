# V3-011: Turn arrival lift and snap

| Field | Value |
| --- | --- |
| **ID** | V3-011 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

When the turn moves to a seat, that chip lifts and the ring, the glow, and the star snap on. Every screen sees it. No new sound.

## Read first

- [x] [product/vision.md](../../product/vision.md)
- [x] [product/look.md](../../product/look.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [prep/PREP-011-turn-arrival.md](../prep/PREP-011-turn-arrival.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. [OQ-33](../../open-questions.md) is answered. | The chip lifts. The ring, the glow, and the star snap on. |

## Acceptance criteria

- [x] When the turn moves to a seat, for a bid, the trump choice, or a card, that chip lifts and the ring, the glow, and the star snap on
- [x] Every screen sees that lift and snap
- [x] No new sound file. `buzz.mp3` still waits 10 seconds, and it still plays only on that player's own screen
- [x] A stored bid, the deal, a played card, and a won trick stay as they are
- [x] [product/look.md](../../product/look.md) records the lift and the snap
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can pass the turn to a seat and see that chip lift as the gold ring, the glow, and the star snap on, on every screen. The buzz still waits 10 seconds. A stored bid, the deal, a played card, and a won trick are unchanged.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | Written by [PREP-012](../prep/PREP-012-turn-task.md). Unstarted. |
| 2026-10-15 | agent | The chip lifts when the turn arrives. The ring, the glow, and the star snap on. The buzz still waits 10 seconds. |
