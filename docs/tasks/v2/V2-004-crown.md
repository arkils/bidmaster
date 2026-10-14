# V2-004: Seat the crown on the title

| Field | Value |
| --- | --- |
| **ID** | V2-004 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | web |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

The gold crown sits just above BidMaster, in the gap between the gold lines. If that mark still floats too high, it is replaced with a smaller crown that fits there.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [decisions/0011-tailwind-shadcn.md](../../decisions/0011-tailwind-shadcn.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for this on 2026-10-15. The crown on the home page sits too high above the title. | — |

## Acceptance criteria

- [x] The crown is close to the word BidMaster, not floating in the space above the title
- [x] If the current mark cannot sit there, a different crown is used and it still reads as a small gold crown
- [x] The gold lines beside BidMaster stay
- [x] The result is recorded in [look.md](../../product/look.md)
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can open the home page, see the crown sitting on the title, and read in `docs/product/look.md` which mark is used.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | The user asked for tasks only. `.brand` pads the title and `.brand-crown` is absolutely placed at the top of that padding, so the mark sits high. Not started. |
| 2026-10-15 | agent | Replaced the wide mark with a smaller crown and seated it on the word. The gold lines stay. Checked on the home page. |
