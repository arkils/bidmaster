# IMPL-030: Dismiss the round result

| Field | Value |
| --- | --- |
| **ID** | IMPL-030 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-029 |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

OK on the round result hides that popup for every player, and the result is a table. Seat 1 can press OK at once. After 5 seconds, any seated player can.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-027-round-result.md](IMPL-027-round-result.md)
- [x] [impl/IMPL-017-shadcn-table.md](IMPL-017-shadcn-table.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user showed the popup on 2026-10-15. | One OK hides it on every screen. The result is a table of name, bid, tricks, and points. |

## Acceptance criteria

- [x] After 5 seconds, any seated player's OK hides the popup on every player's screen, including a player who did not press it
- [x] Seat 1 can still press OK before those 5 seconds, and that OK hides the popup for everyone
- [x] An OK before 5 seconds from anyone except seat 1 is still refused
- [x] After a successful OK, the next round is dealt, or the match ends when that round was the last. The popup does not come back while that round's result is already accepted
- [x] The popup shows one table: name, bid, tricks, and points for the round just scored. The columns line up. Points keep their sign. The table uses the same header and rows as the scoreboard
- [x] On a phone the popup stays on the screen and the page does not scroll sideways
- [x] [product/look.md](../../product/look.md) records the result table
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

One accepted OK removes the round result from every screen, and the result is a table of name, bid, tricks, and points.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | The round result does not disappear after anyone clicks OK. It should disappear if anyone clicks OK after 5 seconds. The result inside the popup should be a clearer table. Not started. |
| 2026-10-15 | agent | Accepting the result now keeps the waiting stamp on the stored room, so the save can clear it. A continued notice drops the popup on the other screens. The popup table has Name, Bid, Tricks, and Points. |
