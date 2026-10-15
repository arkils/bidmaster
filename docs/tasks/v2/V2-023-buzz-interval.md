# V2-023: Buzz every 10 seconds

| Field | Value |
| --- | --- |
| **ID** | V2-023 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

The buzz starts 10 seconds after the turn is shown, then plays again every 10 seconds until the turn ends.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [v2/V2-021-turn-buzz.md](V2-021-turn-buzz.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for this on 2026-10-15. | The first buzz starts at 10 seconds, and each following buzz waits 10 seconds. |

## Acceptance criteria

- [x] The first buzz plays 10 seconds after that player's screen shows the turn
- [x] Each following buzz plays 10 seconds after the previous one, while it is still that player's turn
- [x] The buzz still stops when the turn passes, and it still does not play on another player's turn
- [x] A phone still vibrates once at each buzz when the browser allows it
- [x] [product/look.md](../../product/look.md) records the 10 second gap
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can leave a turn waiting, hear nothing until 10 seconds, hear the next buzz at 20 seconds, and read that in `docs/product/look.md`.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Make the buzz interval 10 seconds. Not started. |
| 2026-10-15 | agent | The first wait and the repeat are both 5 seconds in `web/src/App.tsx`. The first wait stays 5 seconds, which is when the buzz is allowed to start. The repeat becomes 10 seconds. |
| 2026-10-15 | user | It should start after 10 seconds and repeat after 10. |
| 2026-10-15 | agent | Both waits are 10 seconds. The buzz does not play at 5 seconds. Not started. |
| 2026-10-15 | agent | Both waits are `TURN_BUZZ_MS`, 10 seconds. Checked in the browser: no buzz at 6 seconds, one at 11 seconds, and a second at 21 seconds. |
