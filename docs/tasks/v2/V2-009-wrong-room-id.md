# V2-009: Stay on the page for a wrong room id

| Field | Value |
| --- | --- |
| **ID** | V2-009 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | web |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

A room id that names no room does not change the address. The home page stays up, the join field stays open, and the message is “there is no room with that id”.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for this on 2026-10-15. | — |

## Acceptance criteria

- [x] Typing a two-word id that names no room leaves the address unchanged
- [x] The join field stays open so another id can be entered
- [x] The message is “there is no room with that id”, the same as an id with no hyphen
- [x] Opening an address for a missing room returns to that same home page and message
- [x] A real room id still opens the room
- [x] The result is recorded in [journeys.md](../../product/journeys.md)
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can type a missing room id, stay on the home page with the join field open, and read that behavior in `docs/product/journeys.md`.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | A well-formed id used to call `go` before the join, so a missing room changed the address. An id with no hyphen already stayed and showed the message. Checked `missing-room` on the home form and by opening that address. Both stay on `/` with the join field open. |
