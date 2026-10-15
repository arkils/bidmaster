# V2-024: Total points graph

| Field | Value |
| --- | --- |
| **ID** | V2-024 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | dashboard |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

The dashboard keeps the graph of points gained or lost each round, and adds a second graph of each player's running total.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [v2/V2-017-graph-markers.md](V2-017-graph-markers.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user confirmed this on 2026-10-15. | Each line starts at 0 and, after every scored round, shows that player's cumulative score. |

## Acceptance criteria

- [x] The existing graph still shows how many points each player gained or lost in each scored round
- [x] A second graph shows one line per player, starting at 0, then that player's cumulative score after each scored round
- [x] Both graphs mark the scored round numbers, and a point range that includes every point drawn
- [x] With no scored round, both graphs show the axes and no round numbers
- [x] Opening an earlier match shows the same two graphs
- [x] The names and colors are shared, and each name stays free of a seat number
- [x] [product/look.md](../../product/look.md), [product/journeys.md](../../product/journeys.md), [product/requirements.md](../../product/requirements.md), [product/vision.md](../../product/vision.md), and [product/non-functional.md](../../product/non-functional.md) record the second graph
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can open a dashboard with two scored rounds and see one line per player for the round points and a second line per player for the running totals, including the start at 0.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Add a graph of the progress of total points. Confirmed: each line starts at 0 and moves to the cumulative score after each scored round. |
| 2026-10-15 | agent | Checked in the browser. Round points for +10 then +2, and −5 then +8, stayed on the first graph. The second graph drew 0, 10, 12 and 0, −5, 3. With no scored round, both graphs showed only the axes. |
