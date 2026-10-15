# V3-004: Reaction speech bubble

| Field | Value |
| --- | --- |
| **ID** | V3-004 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | V3-003 |
| **Completed** | 2026-10-15 |

## Summary

A reaction shows on the sender's seat as a comic speech bubble. It no longer sits in the line under the table.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [v3/V3-002-reactions.md](V3-002-reactions.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user reported the placement on 2026-10-15. | The bubble is on the sender's seat. |

## Acceptance criteria

- [x] The emoji or line appears on the sender's seat chip, on every seated player's room page
- [x] It is a comic speech bubble: a light box with a dark outline and a tail pointing at that chip
- [x] The chip still shows the sender's name. The bubble shows the emoji or the line
- [x] One reaction shows at a time. A newer one replaces it, on the new sender's chip. It leaves after 3 seconds
- [x] The ten send controls stay under the hand. There is still no text field
- [x] The line under the table no longer shows the reaction
- [x] The dashboard does not show it. The match still does not store it
- [x] The bid, the trump, the trick, the scores, and the card landing stay as they are
- [x] [product/look.md](../../product/look.md) records the bubble
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can send a reaction and see a comic speech bubble on that player's seat, with a tail pointing at the chip, for 3 seconds. The controls under the hand stay the way to send it, and the dashboard stays a scoreboard.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | A reaction appears at the bottom with the other updates. It should be visible on the player's seat, in a comic speech bubble. |
| 2026-10-15 | agent | Logged the task. No application code in this pass. |
| 2026-10-15 | agent | The reaction sits on the sender's seat chip as a comic speech bubble. The line under the table is gone. The ten controls stay under the hand. |
