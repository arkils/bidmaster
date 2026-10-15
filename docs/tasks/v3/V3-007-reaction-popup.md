# V3-007: Reaction popup

| Field | Value |
| --- | --- |
| **ID** | V3-007 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

The centered emoji button and the bottom row stay. Tapping the button opens the ten choices in a floating popup.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [v3/V3-006-reaction-picker.md](V3-006-reaction-picker.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked on 2026-10-15 to keep this layout and bring back the popup. | The choices open in a popup over the cards. |

## Acceptance criteria

- [x] The centered emoji button stays under the hand. Copy link, Rules, and Dashboard stay at the bottom
- [x] Tapping the button opens the ten choices in a floating popup. The hand and the bottom row do not move
- [x] Tapping a choice sends it and closes the popup. Tapping the button again closes it without sending
- [x] There is still no text field. The bubble and the 5 second hold stay as they are
- [x] [product/look.md](../../product/look.md) records the popup
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can open a room, tap the centered emoji button, and choose a reaction from a popup. Copy link, Rules, and Dashboard stay at the bottom while it is open.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Keep this layout, and bring back the popup for choosing a reaction. |
| 2026-10-15 | agent | The ten choices open in a floating popup under the emoji button. The hand and the bottom row stay put. |
| 2026-10-15 | user | The popup should open over the cards, not below the button. |
| 2026-10-15 | agent | The popup opens over the hand. Copy link, Rules, and Dashboard stay at the bottom. |
