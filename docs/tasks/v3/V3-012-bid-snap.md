# V3-012: Bid snap

| Field | Value |
| --- | --- |
| **ID** | V3-012 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

On every screen, a newly stored bid snaps into the center chip and into that seat's gold box together. `bid.mp3` still plays once.

## Read first

- [x] [product/vision.md](../../product/vision.md)
- [x] [product/look.md](../../product/look.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [prep/PREP-013-bid-and-deal.md](../prep/PREP-013-bid-and-deal.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. [OQ-34](../../open-questions.md) is answered. | Snap into the center and onto the seat. |

## Acceptance criteria

- [x] On every screen, the new center chip snaps into the center, and the number snaps into that seat's gold box, together
- [x] `bid.mp3` plays once, as it does now. No new sound file
- [x] A bid already stored when the table opens does not play, and the next round clearing those bids does not play
- [x] The bid buttons, the disabled last number, and the turn arrival stay as they are
- [x] [product/look.md](../../product/look.md) records the snap
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can store a bid and see the center chip and the seat number snap in together, on every screen, and hear `bid.mp3` once. Opening a table that already has bids does not play. The bid buttons and the turn arrival are unchanged.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | Written by [PREP-013](../prep/PREP-013-bid-and-deal.md). Unstarted. |
| 2026-10-15 | agent | A new bid snaps into the center chip and the seat's gold box together. The existing bid sound still plays once. |
