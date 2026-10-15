# V2-022: Keep the room live while the dashboard is open

| Field | Value |
| --- | --- |
| **ID** | V2-022 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | dashboard |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

A dashboard tab listens on its own connection. Opening it does not disconnect the room tab. The room keeps the player's private hand. The dashboard receives only the public room notices.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)
- [x] [v2/V2-020-public-dashboard.md](V2-020-public-dashboard.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user reported this on 2026-10-15. | The dashboard uses a separate subscriber. The room connection stays up. |

## Acceptance criteria

- [x] Opening `/dashboard/{roomId}` in a second tab does not stop live updates on the room tab
- [x] A bid, a trump choice, or a played card still appears on the room tab without a refresh while that dashboard stays open
- [x] The dashboard still updates its scores from the public room notices
- [x] The dashboard connection does not subscribe to the player's private hand
- [x] The room tab still receives that player's own cards
- [x] [architecture/contracts.md](../../architecture/contracts.md) records that a dashboard connection is separate from the seated player's connection
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can keep the room open, open the dashboard in another tab, play a card, and see the room update without a refresh. `docs/architecture/contracts.md` says the two connections are separate.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Opening the dashboard in a new tab stops live updates on the room. A refresh brings them back. The dashboard can be opened by anyone, so it should have its own subscriber and should not affect the game. Not started. |
| 2026-10-15 | agent | Both tabs call `watchRoom` with the same player id. The MQTT client id is that id plus the room id, with punctuation removed. AWS IoT allows one connection per client id, so the dashboard tab disconnects the room tab. The room does not recover until it connects again. The dashboard also subscribes to the private hand because it presents itself as the seated player. The fix is a fresh watcher id for each dashboard page, subscribed only to the public room topic. The room tab keeps `playerId` plus the room id, and keeps the private hand. |
| 2026-10-15 | agent | The dashboard connects with a fresh id and does not subscribe to the private hand. The room keeps the player id and the private hand. Checked in the browser: the room connection used the seated id `p1`, and the dashboard connection used a different id. |
