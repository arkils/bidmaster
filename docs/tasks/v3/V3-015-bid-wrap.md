# V3-015: Bid chips wrap sooner on a phone

| Field | Value |
| --- | --- |
| **ID** | V3-015 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

On a phone, stored bids wrap to the next row sooner and keep space around them, including when the names are long.

## Read first

- [x] [product/look.md](../../product/look.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked on 2026-10-15 to wrap the bids earlier and keep more margin. | A long name takes its own row. Short names can still share a row. |

## Acceptance criteria

- [x] On a phone, stored bid chips wrap before they crowd the center, with space between them and clear of the seats
- [x] A long name keeps its chip on its own row and does not force the row to the edge
- [x] Short names still share a row when they fit
- [x] [product/look.md](../../product/look.md) records the phone wrap
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can open a phone-width table while several players with long names have bid, and see the chips wrap early with space around them.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | While everyone is bidding, a phone has little horizontal room. The chips do wrap, but they should wrap sooner and keep more margin. Long names clutter more than short ones. Test with long names. |
| 2026-10-15 | agent | On a phone the bid list is inset. Long names each take a row and stay clear of the seats. Short names still share a row. Checked at 390 and 360 pixels wide. |
