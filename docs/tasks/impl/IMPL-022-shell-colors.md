# IMPL-022: Shell colors

| Field | Value |
| --- | --- |
| **ID** | IMPL-022 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | shell |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-021 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

The page, the buttons, and the scoreboard share one warm set of colors with the olive felt. The felt color stays.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [decisions/0011-tailwind-shadcn.md](../../decisions/0011-tailwind-shadcn.md)
- [x] [impl/IMPL-021-seat-spread.md](IMPL-021-seat-spread.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | Which colors, given that the felt stays. | The user asked for a combination on 2026-10-14 and left the choice open. The page is warm linen `#f4f1e8`. A filled button uses the felt rim `#3e4a28`. An outline button uses that same rim for its border and text. The scoreboard header is a pale olive `#e4e8d6`. The felt stays `#6d7a4a`. |

## Acceptance criteria

- [x] The felt color is unchanged
- [x] The page, the filled button, the outline button, and the scoreboard header belong to one warm set with that felt
- [x] [product/look.md](../../product/look.md) records the page, the buttons, and the scoreboard header
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

The page, the buttons, and the scoreboard read as one family with the olive table. The felt color is the same.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | The background and the secondary colors on the buttons and the scoreboard do not match. Choose a combination. The table color stays. |
| 2026-10-14 | agent | Done. The page is warm linen `#f4f1e8`. Filled buttons and outline buttons use the felt rim `#3e4a28`. The scoreboard header is pale olive `#e4e8d6`. The felt stays `#6d7a4a`. |
