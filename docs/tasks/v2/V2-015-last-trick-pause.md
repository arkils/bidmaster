# V2-015: Pause before the round result

| Field | Value |
| --- | --- |
| **ID** | V2-015 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

The last trick of a round keeps the same 2 second pause as any other trick. The round result popup opens only after that pause.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [v2/V2-007-trick-pause.md](V2-007-trick-pause.md)
- [x] [tasks/impl/IMPL-027-round-result.md](../impl/IMPL-027-round-result.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user reported this on 2026-10-15. | The last trick waits 2 seconds, then the round result opens. |

## Acceptance criteria

- [x] When the last card of the last trick is played, the cards stay in the center and the winning card stays highlighted for 2 seconds
- [x] The round result popup opens only after that pause
- [x] A trick that does not end the round still waits 2 seconds, then the cards move to the winner
- [x] The host can still press OK at once once the popup is open, and any other player can press OK after 5 seconds from the score
- [x] [product/look.md](../../product/look.md) records that the last trick waits 2 seconds before the round result
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can play the last card of a round, see the winning card highlighted for 2 seconds, and see the round result only after that. `docs/product/look.md` says so.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | The 2 second pause after a won trick does not run when it is the last trick and the round ends. The round result popup opens immediately. Not started. |
| 2026-10-15 | agent | Scoring the last trick sets `resultAt` in the same response. The room page opens the result as soon as `resultAt` is set, so it covers the pause. |
| 2026-10-15 | agent | The popup waits 2 seconds when the score arrives while the room is already open. Opening a room that is already scored shows the popup at once. Checked in the browser: the winning card stayed highlighted, the popup was absent at 1.2 seconds and open with OK after 2 seconds. A trick that did not end the round left the center after the pause and did not open the popup. |
