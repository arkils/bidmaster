# V2-010: Play a sound when a bid is chosen

| Field | Value |
| --- | --- |
| **ID** | V2-010 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

When any player chooses a bid, every table plays `web/public/bid.mp3` once. A bid already on the table when it opens does not play.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-031-card-mp3.md](../impl/IMPL-031-card-mp3.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user added `web/public/bid.mp3` on 2026-10-15. | That file plays once when a bid is stored. |

## Acceptance criteria

- [x] Choosing a bid plays `bid.mp3` once on every player's table
- [x] A bid that is already stored when the table opens does not play
- [x] The next round starting, which clears the bids, does not play
- [x] A played card still plays `card.mp3`
- [x] [product/look.md](../../product/look.md) records that a chosen bid plays `bid.mp3`
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can hear `bid.mp3` once when any player’s bid is stored, and can read that in `docs/product/look.md`.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | `web/public/bid.mp3` is in the public folder. Use it when any player chooses a bid. |
| 2026-10-15 | agent | A new bid loads `/bid.mp3` once. A bid already stored when the table opens does not play. A new round that clears the bids does not play. A played card still loads `/card.mp3`. |
