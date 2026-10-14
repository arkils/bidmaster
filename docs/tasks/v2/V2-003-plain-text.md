# V2-003: Restyle plain sentences

| Field | Value |
| --- | --- |
| **ID** | V2-003 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | web |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Every sentence that is still default body text uses the shell: centered, in the page's type and color. Buttons, the scoreboard, cards, and the gold turn line stay as they are.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [decisions/0011-tailwind-shadcn.md](../../decisions/0011-tailwind-shadcn.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for this on 2026-10-15, from the home page where "No matches yet." sits in plain type at the left. | — |

## Acceptance criteria

- [x] "No matches yet." is centered and uses the shell type and color
- [x] The same treatment covers "Started" plus the date, "No scored round yet.", "The ranking is final.", "This room has no seated player. The room id stays reserved.", and an error line
- [x] The graph color key names use that same type
- [x] Headings, buttons, table cells, cards, the room id, and the gold turn line are left as already agreed
- [x] The result is recorded in [look.md](../../product/look.md)
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can open the home page, the dashboard, and an empty room and see those sentences in the shell type, centered, and can read that treatment in `docs/product/look.md`.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | The user asked for tasks only. "No matches yet." is a left-aligned `text-sm` paragraph under the centered "Your matches" heading. The other plain sentences are listed in the acceptance criteria. Not started. |
| 2026-10-15 | agent | Those sentences use `.note`, centered in the muted green-gray. An error uses `.note-alert` and stays red. Checked on the home page. |
