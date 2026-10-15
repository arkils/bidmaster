# V3-017: Last trick of the match

| Field | Value |
| --- | --- |
| **ID** | V3-017 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-16 |

## Summary

The user reports that the last trick of the game stays on the table and does not travel to the winner.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [v3/V3-003-won-trick.md](V3-003-won-trick.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | Should the last trick of a round travel to the winner, or only the last trick of the match? | Answered 2026-10-16. The last trick of every round, including the end of the match. The score still opens after the same pause. |

## Acceptance criteria

- [x] The last trick of every round, including the last trick of the match, travels to the winner's seat and snaps down, on every screen
- [x] `card.mp3` plays once for each of those cards
- [x] The round result still opens after the same pause
- [x] [product/look.md](../../product/look.md) records the change
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can finish the agreed last trick and see those cards leave the center for the winner, instead of remaining on the table.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-16 | user | On the last trick of the game the remaining cards stay on the table. The trick-end animation does not start. |
| 2026-10-16 | agent | Logged. A trick that ends a round is skipped on purpose: after the 2 second hold it stays in the center, and the round result opens. That includes the last trick of the match. Not implemented in this pass. |
| 2026-10-16 | user | The last trick of every round should travel to the winner, including the end of the match. The score still opens after the same pause. |
| 2026-10-16 | agent | A trick that ends the round now travels to the winner after the same 2 second pause. The round result still opens on that pause, and the cards fly above it. |
