# V2-019: Names without seat numbers

| Field | Value |
| --- | --- |
| **ID** | V2-019 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

A player's name is shown without a seat number. The Bids first choices are names. The ranking table has no Seat column.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [decisions/0009-player-id.md](../../decisions/0009-player-id.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user reported this on 2026-10-15. | The visible name does not include the seat number. |

## Acceptance criteria

- [x] Each Bids first choice shows the player's name and does not show the seat number
- [x] The ranking table shows rank, name, and score, and has no Seat column
- [x] Two players who share a name can still both be chosen and both appear in the ranking
- [x] [product/look.md](../../product/look.md) records that those names have no seat number
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can start a match, read names without seat numbers in Bids first and in the ranking, and read that in `docs/product/look.md`.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | When the host starts the match, their name also shows the seat number. There is no need to show that. Not started. |
| 2026-10-15 | agent | Bids first prints the seat, a period, and the name, such as "1. Arkil". The ranking table has a Seat column beside Name. `look.md` currently keeps that Seat column. This task removes both visible numbers. |
| 2026-10-15 | agent | Bids first shows the name. The choice value is still the seat, so two players named Sam stay distinct. The ranking columns are Rank, Name, and Score. Checked in the browser. |
