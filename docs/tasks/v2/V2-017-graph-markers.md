# V2-017: Mark the dashboard graph

| Field | Value |
| --- | --- |
| **ID** | V2-017 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | dashboard |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

The dashboard graph marks each scored round on the rounds axis, and marks a point scale that covers every point drawn in the frame.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [product/requirements.md](../../product/requirements.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for this on 2026-10-15. | Round numbers sit on the rounds axis. The point marks are a range that includes every point in the frame. |

## Acceptance criteria

- [x] Each scored round has its round number on the rounds axis
- [x] The points axis shows a numeric range
- [x] That range includes the lowest and the highest point drawn, so every point stays inside the frame
- [x] The range changes when a newly scored round falls outside the previous marks
- [x] A dashboard with no scored round still shows the axes, with no round numbers yet
- [x] The same marks appear when an earlier match is opened from the dashboard
- [x] [product/look.md](../../product/look.md) records the round numbers and the point range
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can open a dashboard with several scored rounds, read the round numbers and a point range that contains every plotted point, and read the same in `docs/product/look.md`.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Add markers on the dashboard graph: the round number, and a dynamic point range that covers all the points in the frame. Not started. |
| 2026-10-15 | agent | The graph draws the lines and the words Points and Rounds. It does not print a round number or a point value. The vertical scale already uses the lowest and highest point, including 0, but those numbers are not shown. |
| 2026-10-15 | agent | Round numbers sit under the axis. The point marks are a step that contains the lowest and highest point. Checked in the browser: an empty graph showed only Points and Rounds; three rounds were numbered 1, 2, and 3 inside −40 to 60; a later pair of −80 and 100 used −100 to 100, and every point stayed inside the frame. The same graph is used for an earlier match. |
