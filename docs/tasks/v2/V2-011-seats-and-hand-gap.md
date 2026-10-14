# V2-011: Seats near the rim, and a steady hand row

| Field | Value |
| --- | --- |
| **ID** | V2-011 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Other players sit closer to the rim of the oval, so the center stays open on a phone. The caller's chip sits just inside the gold rail. After the last card is played, the hand row keeps its height, so Copy link, Leave room, and Dashboard do not move up.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | Where the chosen trump mark should sit. | Not this task. It stays a card in the center. A later task can move it. |

## Acceptance criteria

- [x] Other seats sit close to the rim, farther out than before, and still inside the oval
- [x] The caller's chip sits inside the felt, just inside the gold rail along the bottom
- [x] After the last card of the hand is played, the empty row keeps the height of one card
- [x] Copy link, Leave room, and Dashboard stay in place when that row is empty
- [x] [product/look.md](../../product/look.md) records the rim seats and the steady hand row
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can see the other seats near the rim, the caller's chip just inside the gold rail, and the controls under the table unmoved after the last card, and can read that in `docs/product/look.md`.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Player chips should sit closer to the edge of the oval, especially on a phone. After the last card, Copy link and Dashboard were jumping up. The empty space should stay, and those buttons should not move. |
| 2026-10-15 | user | The chosen trump mark stays in the center and blocks the table. Suggest a better place. Do not move it. |
| 2026-10-15 | agent | The seat and hand-row changes were already in the page before this file existed. This task records them and is closed. Trump was not moved. A small suit mark at the top of the oval, just inside the gold rim, was the suggestion. The four choice cards can stay in the center only while someone is choosing. |
