# V3-005: Reactions stay on their own seats

| Field | Value |
| --- | --- |
| **ID** | V3-005 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | V3-003 |
| **Completed** | 2026-10-15 |

## Summary

Several comic speech bubbles can sit on the table at once, one on each sender's seat. Each bubble stays for 5 seconds. A newer reaction from that same seat replaces only that bubble.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)
- [x] [v3/V3-004-reaction-bubble.md](V3-004-reaction-bubble.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user set the hold on 2026-10-15. | Each seat keeps its own bubble for 5 seconds. A new send from that seat replaces it. |

## Acceptance criteria

- [x] A reaction stays on the sender's seat for 5 seconds, then leaves
- [x] Another player's reaction does not remove it. Several seats can show a bubble at the same time
- [x] A newer reaction from the same seat replaces that seat's bubble and starts a new 5 seconds. Other seats keep theirs
- [x] The bubble stays a comic speech bubble on that seat chip. The chip still shows the name. The bubble shows only the emoji or the line
- [x] The ten send controls stay under the hand. There is still no text field
- [x] The dashboard does not show a reaction. The match still does not store one
- [x] [product/look.md](../../product/look.md) and [architecture/contracts.md](../../architecture/contracts.md) record the 5 second hold and that several bubbles can show at once
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can have two seated players send reactions and see both bubbles on their own seats at the same time. Each leaves after 5 seconds. A second send from one of them replaces only that player's bubble.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | A reaction should stay for 5 seconds unless that same person sends another. Other players' reactions stay, so several bubbles can be on the table at once. |
| 2026-10-15 | agent | Logged the task. No application code in this pass. |
| 2026-10-15 | agent | Each seat keeps its own bubble for 5 seconds. A newer send from that seat replaces only that bubble. |
