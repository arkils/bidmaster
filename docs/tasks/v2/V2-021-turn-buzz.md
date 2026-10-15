# V2-021: Buzz on a waiting turn

| Field | Value |
| --- | --- |
| **ID** | V2-021 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

When it is a player's turn, that player's screen waits 5 seconds, then plays the buzz. It plays again every 5 seconds until the turn ends. A phone vibrates at those same moments when the browser allows it.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [v2/V2-010-bid-sound.md](V2-010-bid-sound.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for this on 2026-10-15. | The buzz starts at 5 seconds and repeats every 5 seconds. A phone vibrates then too, when the browser allows it. |

## Acceptance criteria

- [x] The buzz does not play when the turn begins
- [x] The first buzz plays 5 seconds after that player's screen shows the turn
- [x] Another buzz plays every 5 seconds after that, for as long as it is still that player's turn
- [x] The buzz stops when the turn passes, and it does not play on another player's turn
- [x] The clip is the buzz file the user places in `web/public`. The expected name is `buzz.mp3`
- [x] At each buzz, a phone vibrates once when `navigator.vibrate` is available
- [x] A browser that refuses vibration still plays the buzz
- [x] [product/look.md](../../product/look.md) records the 5 second buzz and the phone vibration
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can leave a turn waiting, hear nothing until 5 seconds, then hear the buzz every 5 seconds until the turn ends, and can read that in `docs/product/look.md`.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | On a player's turn, play a repeating buzz. It must not start at the beginning of the turn. It starts at 5 seconds. The user will put the buzz file in `web/public`. They also asked whether a phone can vibrate. Not started. |
| 2026-10-15 | agent | `web/public` has `bid.mp3` and `card.mp3`, and no buzz file yet. A phone page can call `navigator.vibrate`. Android Chrome usually vibrates. iPhone Safari does not. The buzz still plays there. |
| 2026-10-15 | agent | `buzz.mp3` plays 5 seconds after the turn is shown, then every 5 seconds, and stops when the turn passes. Each buzz calls `navigator.vibrate(200)`. A thrown vibration still leaves the buzz playing. Checked in the browser: no buzz at 4.2 seconds, one at 5.7 seconds, a second at 10.7 seconds, and none after the turn moved on. |
