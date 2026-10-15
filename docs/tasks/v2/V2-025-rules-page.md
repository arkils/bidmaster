# V2-025: Rules page

| Field | Value |
| --- | --- |
| **ID** | V2-025 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | rules |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

A rules page explains how to play, from `docs/game/rules.md`. Home and the room link to it, and the page links back to the table.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [game/rules.md](../../game/rules.md)
- [x] [product/look.md](../../product/look.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [product/requirements.md](../../product/requirements.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for this on 2026-10-15. | The page is `/rules`. From a room it is `/rules/{roomId}`, and Table returns to that room. From home, Home returns to the home page. |

## Acceptance criteria

- [x] The page states the tabletop rules in `docs/game/rules.md`: players, deals, bidding, trump, the deck, tricks, scoring, and the winner
- [x] Home shows Rules below Create room and Join room
- [x] The room shows Rules beside Copy link and Dashboard
- [x] From a room, the rules page links back to that table
- [x] From home, the rules page links back to home
- [x] Opening the page does not ask for a name and does not join a room
- [x] [product/look.md](../../product/look.md), [product/journeys.md](../../product/journeys.md), and [product/requirements.md](../../product/requirements.md) record the page
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can open Rules from home and from a room, read how the match is played, and return to the table they left.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Add a page like the dashboard that says the rules and how to play. Link it below Create room and Join room, beside Copy link and Dashboard, and link back to the table. Write it from the rules documents. Do not deploy yet. |
| 2026-10-15 | agent | Checked in the browser. `/rules` opened with no name dialog and linked Home. On the home page Rules sat below Create room and Join room. In a room, Copy link, Rules, and Dashboard shared one row, and on a phone they stacked full width. `/rules/rules-room` linked Table back to that room and did not join. Not deployed. |
