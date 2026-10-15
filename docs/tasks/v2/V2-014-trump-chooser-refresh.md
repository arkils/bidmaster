# V2-014: Update the trump chooser without a refresh

| Field | Value |
| --- | --- |
| **ID** | V2-014 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

The player who chooses trump sees the small suit mark and the cleared center as soon as the choice is accepted. A manual refresh is not required.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [v2/V2-013-trump-above-table.md](V2-013-trump-above-table.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user reported this on 2026-10-15. | The chooser's own screen updates when the suit is accepted. |

## Acceptance criteria

- [x] After the chooser taps a suit, that screen leaves the four cards and shows the small suit mark above the stadium
- [x] That change happens without a manual refresh
- [x] The other players still see the same mark without a refresh
- [x] A refused choice still leaves the four cards up
- [x] [product/look.md](../../product/look.md) records that the chooser's screen updates when the suit is accepted
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can tap a trump suit and see the mark above the stadium on that same screen, without refreshing, and can read that in `docs/product/look.md`.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | For the person who selects the trump, the screen does not update unless they refresh. Not started. |
| 2026-10-15 | agent | The tap stores the suit and returns the room with trump. The live notice then loads the room again. That load can put the chooser back on the four cards. A later refresh shows the stored suit. |
| 2026-10-15 | agent | A trump notice puts the suit on the current round at once. A later load of the same round that is missing the suit keeps the suit already on screen. A refused tap leaves the four cards. Checked in the browser: hearts replaced the four cards with the mark, and the table did not move. |
