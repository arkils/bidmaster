# V3-001: Card lift, travel, and snap

| Field | Value |
| --- | --- |
| **ID** | V3-001 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | TODO |
| **Priority** | Blocking |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | — |

## Summary

On the screen of the player who played a card, that card lifts off the hand, travels to its place in the trick, and snaps down. `card.mp3` still plays once. Do not start this task until the user records that version 3 build may start.

## Read first

- [ ] [product/vision.md](../../product/vision.md)
- [ ] [product/look.md](../../product/look.md)
- [ ] [open-questions.md](../../open-questions.md)
- [ ] [prep/PREP-005-card-landing.md](../prep/PREP-005-card-landing.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. [OQ-29](../../open-questions.md) is answered. | Lift, travel, and snap. The off-turn hand stays flat. |

## Acceptance criteria

- [ ] On the screen of the player who played the card, it lifts from its place in that hand, travels to its place in the trick, and snaps down
- [ ] On every other screen, the card still arrives in the trick. That screen does not invent a hand for a card it cannot see
- [ ] `card.mp3` plays once for that card, as it does now
- [ ] No new sound file, and no praise mark or score pop
- [ ] A hand card stays flat when it is not that player's turn. A legal card is raised only on that player's turn
- [ ] The turn mark, the 2 second won-trick pause, the move to the winner, and the deal slide stay as [look.md](../../product/look.md) describes them
- [ ] [product/look.md](../../product/look.md) records the lift, the travel, and the snap
- [ ] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can play one card and see it lift, travel, and snap on the player's own screen, hear `card.mp3` once, and find the turn, the won trick, and the deal unchanged. Another player's screen shows the card arrive in the trick without a flight from a hidden hand.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | Written by [PREP-006](../prep/PREP-006-card-task.md). Unstarted. Version 3 build has not been recorded. |
