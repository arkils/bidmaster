# IMPL-021: Small table, page, and names

| Field | Value |
| --- | --- |
| **ID** | IMPL-021 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-020 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

When only a few players are seated, their chips sit around the oval, far enough apart to look like people at a table. The page background is a lighter color so the felt and the chips stand out. Seat lists show names, not seat numbers.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-018-table-comments.md](IMPL-018-table-comments.md)
- [x] [impl/IMPL-014-own-seat.md](IMPL-014-own-seat.md)
- [x] [impl/IMPL-016-own-seat-on-felt.md](IMPL-016-own-seat-on-felt.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | Which light page color, so the olive felt, the white cards, the gold, and the blue stand out. | The page is a light cool gray, `#e6ebf0`. The felt, the cards, the gold, and the blue stay as they are. The user asked for a light color and left the choice open on 2026-10-14. |

## Acceptance criteria

- [x] With 3 players, the two other seats are far apart around the oval. They are not both clustered beside the caller's chip at the bottom
- [x] The caller's chip stays inside the felt, along the bottom. Seat order stays clockwise from the caller's left
- [x] With 10 players, the chips still fit inside the felt. They do not cover the trump mark, the trick, the center bids, or each other. On a phone the page does not scroll sideways
- [x] The page background is the light cool gray `#e6ebf0`. The felt, the cards, the gold, and the blue are unchanged
- [x] Your matches lists seat names only, with no seat numbers. The color key under the scoreboard graph lists each name with its color, and no seat number. The ranking table still has its Seat column
- [x] [product/look.md](../../product/look.md) records the spread of a small table, the page color, and the name-only lists
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A 3-player table looks like three people sitting around the oval. A 10-player table still fits. The page is a light cool gray. Your matches and the graph key show names without seat numbers.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | On a 3-player table, Nia, Bea, and Cid sit close together near the bottom. When there are few players they should still be far from each other, so it looks like they are sitting at the table. Not started. |
| 2026-10-14 | user | The page background does not look good, and the other colors do not stand out. Keep it light, and choose the color. Your matches shows seat numbers, such as "1. Nia". Names are enough. The color key under the graph also shows those numbers, and it should not. Same task. Not started. |
| 2026-10-14 | user | Start this task. |
| 2026-10-14 | agent | Done. On sympathetic-scallop, Bea and Cid sit on opposite sides and Nia stays at the bottom. Ten seats on flying-giraffe fit on a wide window and at 390px. The page is `#e6ebf0`. Your matches and the graph key show names only. |
