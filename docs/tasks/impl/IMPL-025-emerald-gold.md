# IMPL-025: Royal emerald and gold

| Field | Value |
| --- | --- |
| **ID** | IMPL-025 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | shell |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-022 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

The room and the dashboard use the royal emerald and gold theme from the mock. The layout and the game behavior stay.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [decisions/0011-tailwind-shadcn.md](../../decisions/0011-tailwind-shadcn.md)
- [x] [impl/IMPL-022-shell-colors.md](IMPL-022-shell-colors.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user gave the palette on 2026-10-14. | The hex values in the notes log are the theme. |

## Acceptance criteria

- [x] The page is warm ivory `#F5F0E6`. The felt is deep emerald `#064E36` with a forest highlight `#0B6042` and a thin antique-gold trim `#C89A45`
- [x] Cards are warm white `#FFFCF7`. Hearts and diamonds are `#C52D22`. Clubs and spades are `#1E1D1A`. Text is charcoal `#29271F`
- [x] A bid number is pale amber `#F6E3BF` with dark gold `#B87516`. A tricks-won number is soft blue `#DCE6FF` with royal blue `#244FC5`
- [x] The seat to move has a bright gold outline `#E4AD3D` and a soft gold glow. The turn line is a golden-yellow pill `#F5CC70` with deep emerald text
- [x] A filled button is antique gold. An outline button is warm white with a beige border `#DDD3BF`. The scoreboard header is deep emerald with warm white text, ivory rows, and beige separators
- [x] The seat positions, the bids, the tricks, and the scores behave as they did
- [x] [product/look.md](../../product/look.md) records the theme
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

The room and the dashboard read as royal emerald and gold. The game plays as before.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | The mock is the theme to use. Page `#F5F0E6`, felt `#064E36`, highlight `#0B6042`, trim `#C89A45`, cards `#FFFCF7`, text `#29271F`, muted text `#657467`, turn border `#E4AD3D`, turn pill `#F5CC70`, bid `#F6E3BF` / `#B87516`, won `#DCE6FF` / `#244FC5`, suits `#C52D22` and `#1E1D1A`, lines `#DDD3BF`. Do not change the rules or the behavior. Asked now, ahead of IMPL-023 and IMPL-024. |
| 2026-10-14 | agent | Done. flying-giraffe and its dashboard use the emerald felt, gold trim, ivory page, gold turn mark, and emerald scoreboard header. Ten seats still fit at 718px and at 390px. |
| 2026-10-14 | user | The crown above BidMaster is cropped. |
| 2026-10-14 | agent | The crown now sits inside the title, above the word, so the points are not cut off. |
