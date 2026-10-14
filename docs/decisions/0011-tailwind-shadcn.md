# 0011. Tailwind and shadcn for the shell

Date: 2026-10-14

## Status

ACCEPTED

## Context

[IMPL-011](../tasks/impl/IMPL-011-card-table.md) through [IMPL-016](../tasks/impl/IMPL-016-own-seat-on-felt.md) drew the room as a card table with hand-written CSS. On 2026-10-14 the user said that page, the home page, and the dashboard were not usable and did not look acceptable, and asked for a free React component library. [Decision 0006](0006-react-and-python.md) already keeps the website in React.

The felt, the seats, and the card faces are not something a component library ships. The buttons, the name dialog, the forms, and the scoreboard are.

## Decision

The website stays React. The shell uses [shadcn/ui](https://ui.shadcn.com/) on Tailwind CSS: the name dialog, buttons, fields, the bids-first select, and the scoreboard table. Those components are copied into the web app. The felt, the seat chips, and the card faces stay custom and read the same color tokens.

Colors, type, and motion durations stay in `web/src/tokens.css`. That file is the Tailwind theme. A later restyle edits [product/look.md](../product/look.md), then the tokens.

## Options considered

- Mantine for the shell, and a custom table. No Tailwind. A heavier theme sits beside the tokens.
- shadcn/ui and Tailwind for the shell, and a custom table. The defaults look designed. Styling moves to Tailwind, with the tokens still in one file.
- A component library for the shell only, leaving the olive rectangle and the card faces as they were.
- No component library. Restyle only the table.

## Rationale

The user chose shadcn/ui and Tailwind for the shell, plus a custom table, on 2026-10-14. React stays as decision 0006 set it.

## Consequences

- New shell styling uses Tailwind utility classes and the shadcn components in the web app.
- `web/src/tokens.css` is the Tailwind theme. Components use those tokens. The card table may use the same tokens from CSS.
- The dashboard stays a scoreboard. It does not become a felt table.
- The hand, the seat circle, the trump mark, and whose turn is marked stay as [product/look.md](../product/look.md) records them.

## Revisit triggers

- The user wants the shell off Tailwind.
- The user wants a different component library.
- Tailwind or the copied shadcn components cannot be served as static files from S3 through CloudFront.
