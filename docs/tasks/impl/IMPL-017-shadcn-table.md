# IMPL-017: Shell and table restyle

| Field | Value |
| --- | --- |
| **ID** | IMPL-017 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | web |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-016 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

The home page, the name dialog, the room controls, and the scoreboard use shadcn/ui on Tailwind. The felt is an oval, the seat chips read as names at a table, and the cards read as cards. The layout in the look record stays.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [decisions/0011-tailwind-shadcn.md](../../decisions/0011-tailwind-shadcn.md)
- [x] [decisions/0006-react-and-python.md](../../decisions/0006-react-and-python.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [impl/IMPL-016-own-seat-on-felt.md](IMPL-016-own-seat-on-felt.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user chose shadcn/ui and Tailwind for the shell, plus a custom table, on 2026-10-14. | [Decision 0011](../../decisions/0011-tailwind-shadcn.md) is ACCEPTED. |

## Acceptance criteria

- [x] [product/look.md](../../product/look.md) records the oval felt, the seat chips, the card face, the phase line, and that shell controls use the tokens through Tailwind. `web/src/tokens.css` is that theme
- [x] The name dialog, the home actions, the room controls, the bid field, the trump choices, and the scoreboard table use the shared button, field, dialog, select, and table styles
- [x] An empty match list says there are no matches yet. Each past match is one link with the date, the room id, and the seats separated
- [x] The scoreboard graph keeps its axes, and the Points and Rounds labels sit outside the plot
- [x] The felt is an oval with a darker rim and an inner shadow. The caller's chip stays inside it, along the bottom. Other seats stay clockwise and do not cover the trump mark, the trick, or each other
- [x] A face-up card has a large rank in the corner, one large suit mark in the center, a thin border, and a shadow. The hand is one row under the table and may overlap. Ten cards fit without the page scrolling sideways
- [x] A phase line sits with the hand: "Your bid", "Choose trump", or whose turn it is. It does not cover a seat, the trump mark, or the trick
- [x] On a phone, the bid field and the Bid button are full width, the own chip is inside the felt, and the page does not scroll sideways
- [x] Hearts and diamonds stay red. Clubs and spades stay near-black. The dashboard stays a scoreboard
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A player opening the site sees a stone page with shared controls, an oval olive table, and a hand of cards under it. The dashboard is still the scoreboard, with labels that do not sit on the axes.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | user | The home page, the room, and the dashboard are not acceptable. Use a free React component library for the shell and redraw the table. shadcn/ui and Tailwind were chosen. |
| 2026-10-14 | agent | Done. The shell uses the shared controls. The felt is an oval. On a 390px-wide phone the page does not scroll sideways, the bid field and Bid button are full width, and the caller's chip stays inside the felt. Ten cards fit on a desktop without the page scrolling sideways. The scoreboard labels sit outside the axes. |
| 2026-10-14 | agent | A 10-player match, flying-giraffe, keeps every name on one line. The chips stay on the felt and do not cover each other, on a wide window and at 390px. |
