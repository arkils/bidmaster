# V2-006: Add a card favicon

| Field | Value |
| --- | --- |
| **ID** | V2-006 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | web |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

The site has a favicon of a playing card, in the emerald and gold of the page. The browser tab shows that mark.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [decisions/0011-tailwind-shadcn.md](../../decisions/0011-tailwind-shadcn.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked on 2026-10-15 for a generated card favicon on the site. | — |

## Acceptance criteria

- [x] A card image is generated and stored for the site to serve
- [x] `web/index.html` points the favicon at that image
- [x] The mark is a playing card in the page colors: warm white, emerald, and antique gold
- [x] The result is recorded in [look.md](../../product/look.md)
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can open the site and see the card in the browser tab, and can read in `docs/product/look.md` which file that mark is.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | The user asked for a task only. `web/index.html` has no icon link. `web/public` has `card.mp3` and no image. Not started. |
| 2026-10-15 | agent | Generated a warm-white card with a gold edge and an emerald club. It is `web/public/favicon.png`, linked from `web/index.html`. |
