# IMPL-027: Pause for the round result

| Field | Value |
| --- | --- |
| **ID** | IMPL-027 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-026 |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

When a round is scored, the next round does not start. Every player sees a popup with that round's result. The host can dismiss it at once. After 5 seconds, any player can. One OK hides the popup for everyone, and only then does the next round begin.

## Read first

- [x] [game/rules.md](../../game/rules.md)
- [x] [product/look.md](../../product/look.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [impl/IMPL-006-play.md](IMPL-006-play.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user described the pause on 2026-10-15. | The popup is the round just scored. The host is seat 1. One OK hides it for every player. |

## Acceptance criteria

- [x] Scoring a round does not deal the next round. The table stays on the finished round until the popup is dismissed
- [x] Every player in the room sees the same popup. It lists each player by name, with that round's bid, tricks won, and points. Points follow the scoring already in the rules
- [x] The host, seat 1, can press OK as soon as the popup is shown. For the first 5 seconds, no other player's OK is accepted
- [x] After 5 seconds from when the popup is shown, any seated player can press OK
- [x] One accepted OK hides the popup on every player's screen. The next round is dealt only then, and bidding starts under the existing rules
- [x] After the last round, OK hides the popup and does not deal another round. The match ends and ranks as it does now
- [x] A player who opens the room while the result is waiting sees the same popup. The dashboard stays a scoreboard
- [x] [product/look.md](../../product/look.md) records the round-result popup
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A scored round stays on screen until the host, or any player after 5 seconds, presses OK. That OK clears the popup for everyone, and the next round starts only then.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | When a round ends, the next round starts immediately. That should not happen. Show a popup with the result of the current round. The host can click OK at once. Anyone can click OK after 5 seconds. That OK removes the popup from every player's screen, and then the next round can begin. Not started. |
| 2026-10-15 | agent | Scoring a round stores the points and keeps that round on the table. The next deal waits for OK. Seat 1 can accept at once. Another seat is refused until 5 seconds after the result. One OK deals the next round, or ends the match when it was the last round. The room load includes the waiting result. |
