# V2-020: Watch a dashboard without playing

| Field | Value |
| --- | --- |
| **ID** | V2-020 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | dashboard |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Anyone can open `/dashboard/{roomId}` and watch that match's scores. They do not need to be seated, and they do not need to have given a name. A started match stays watchable.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for this on 2026-10-15. | The dashboard URL is public for a started match. |

## Acceptance criteria

- [x] Opening `/dashboard/{roomId}` shows the scoreboard when the match has started, for a browser that is not seated
- [x] That page does not ask for a name and does not join the room
- [x] The scores, the ranking, and the graph update while the match is played
- [x] A dashboard URL for a match that has not started does not show a scoreboard
- [x] The home list of matches stays limited to the matches stored for this browser
- [x] Joining the room to play is still refused after the match has started
- [x] [product/journeys.md](../../product/journeys.md), [product/requirements.md](../../product/requirements.md), and [architecture/contracts.md](../../architecture/contracts.md) record that a started dashboard is public
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can open a started match's dashboard in a browser that never joined, see the scores update, and read that in the journeys, the requirements, and the contracts.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | The dashboard URL should open without the player being in the game. After the game has started, anyone can open the dashboard and watch the score. Not started. |
| 2026-10-15 | agent | The page asks for a name before it loads a room. The dashboard load sends that browser's player id. A visitor who is not seated still has to pass the name dialog. This task makes the started dashboard readable without a seat and without a name. |
| 2026-10-15 | agent | A started dashboard loads with no name and no seat. A watcher may subscribe to the room topic only. Checked in the browser with no cookie: the scoreboard showed Rank, Name, and Score, and an unstarted dashboard said the match has not started. Joining a started room is still refused in the room API. |
