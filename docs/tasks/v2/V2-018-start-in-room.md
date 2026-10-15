# V2-018: Stay in the room when the match starts

| Field | Value |
| --- | --- |
| **ID** | V2-018 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

When the host starts the match, every player stays on the room page. The table is where play begins. The dashboard stays available from its link.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/look.md](../../product/look.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user reported this on 2026-10-15. | Starting the match opens the room for every player. |

## Acceptance criteria

- [x] The host who presses Start match lands on the room page
- [x] Each other player who is already in the room stays on the room page when the match starts
- [x] The room page shows the table for the started match
- [x] Dashboard still opens from its link, at `/dashboard/{roomId}`
- [x] [product/journeys.md](../../product/journeys.md) and [product/requirements.md](../../product/requirements.md) say the players play from the room when the match starts
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can start a match and see every seated player on the room page, and can read that in the journeys and the requirements.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | When all players are joined and the host starts the match, all players go to the dashboard. They should go to the room instead. Not started. |
| 2026-10-15 | agent | The host's start call opens `/dashboard/{roomId}`. A started notice on the room page does the same. The requirements currently say every player sees the dashboard from the moment the match starts. This task changes that. |
| 2026-10-15 | agent | Start reloads the room and stays on it. A started notice no longer leaves the room. Checked in the browser: Start match left the address on the room, the table showed the bid, and the Dashboard link was still there. |
