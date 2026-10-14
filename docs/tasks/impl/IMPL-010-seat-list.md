# IMPL-010: Seat list shows one number

| Field | Value |
| --- | --- |
| **ID** | IMPL-010 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-003 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

A seated player is shown once, as the seat number and the name. The room list no longer prints the number twice.

## Read first

- [x] [product/journeys.md](../../product/journeys.md)
- [x] [impl/IMPL-003-room.md](IMPL-003-room.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user reported the doubled number on 2026-10-14. | — |

## Acceptance criteria

- [x] The room seat list shows each player once, as the seat number and the name, in the style of `1. Asha`
- [x] The same list does not show `1. 1. Asha`
- [x] Seat order is still join order, earliest first
- [x] The page works in a computer browser and in a phone browser
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A player looking at a room sees each seat number once.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Logged from the user. Not started. The room list is an ordered list, and each row also includes the seat number. |
| 2026-10-14 | agent | Done. https://dyqrtt5df9uyr.cloudfront.net/slim-moose shows `1. Asha`, `2. Bea`, `3. Cid`. |
