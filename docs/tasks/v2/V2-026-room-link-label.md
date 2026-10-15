# V2-026: One label for the room link

| Field | Value |
| --- | --- |
| **ID** | V2-026 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | rules |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

The dashboard and the rules page both link back to the room, and those links should use the same word.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [v2/V2-025-rules-page.md](V2-025-rules-page.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | Which word do both links use? | Room. The user confirmed this on 2026-10-15. |

## Acceptance criteria

- [x] The dashboard link and the rules-page link to the room use the same word
- [x] From home, the rules page still links back to home
- [x] [product/look.md](../../product/look.md) and [product/journeys.md](../../product/journeys.md) use that word
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can open the dashboard and the rules page from the same room and see the same word on the link back.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | The dashboard says Room and the rules page says Table, for the same page. Not started. |
| 2026-10-15 | user | Both links say Room. |
| 2026-10-15 | agent | Checked in the browser. `/rules/funny-monkey` and the dashboard both show Room and both point at `/funny-monkey`. `/rules` still shows Home. Not deployed. |
