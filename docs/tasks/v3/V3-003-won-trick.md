# V3-003: Won trick lift, travel, and snap

| Field | Value |
| --- | --- |
| **ID** | V3-003 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

On every screen, the winning card lifts during the 2 second hold. The cards of a trick that does not end the round then travel to the winner's chip and snap down. `card.mp3` still plays once for each of those cards.

## Read first

- [x] [product/vision.md](../../product/vision.md)
- [x] [product/look.md](../../product/look.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [prep/PREP-008-won-trick.md](../prep/PREP-008-won-trick.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. [OQ-31](../../open-questions.md) is answered. | Lift, travel, and snap onto the winner. The round-ending trick stays in the center. |

## Acceptance criteria

- [x] On every screen, the winning card lifts during the 2 second hold. The highlight stays
- [x] When that pause ends, the cards of a trick that does not end the round travel to the winner's chip and snap down
- [x] `card.mp3` plays once for each of those cards, back to back, as it does now
- [x] No new sound file, and no praise mark or score pop
- [x] The last trick of a round stays in the center. The round result still opens after the same pause
- [x] A bid, the turn mark, the deal, and the played-card landing in [V3-001](V3-001-card-landing.md) stay as they are
- [x] [product/look.md](../../product/look.md) records the lift, the travel, and the snap
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can win a trick that does not end the round and see the winning card lift, then the cards travel and snap onto the winner, and hear `card.mp3` once per card. The last trick of a round stays in the center until the round result. A bid, the turn, the deal, and a played card's own landing are unchanged.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | Written by [PREP-009](../prep/PREP-009-won-trick-task.md). Unstarted. |
| 2026-10-15 | agent | The winning card lifts during the 2 second hold. Cards of a trick that does not end the round then travel to the winner and snap. The last trick of a round stays in the center. |
