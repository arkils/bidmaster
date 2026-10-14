# IMPL-009: Dashboard on its own page

| Field | Value |
| --- | --- |
| **ID** | IMPL-009 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | dashboard |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-004 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

The score, ranking, and graph are a separate page at `/dashboard/{roomId}`. Starting the match opens that page. The room page at `/{roomId}` no longer shows them.

## Read first

- [x] [product/journeys.md](../../product/journeys.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)
- [x] [impl/IMPL-004-start.md](IMPL-004-start.md)
- [x] [impl/IMPL-007-look-back.md](IMPL-007-look-back.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user set the path on 2026-10-14. | — |

## Acceptance criteria

- [x] After the host starts the match, the browser opens `/dashboard/{roomId}`, in the style of `/dashboard/funny-monkey`
- [x] That page shows the date, each cumulative score, the ranking table, and the graph with one line per player. With no scored round, every score is 0 and the graph has no points
- [x] `/{roomId}` does not show that score table, ranking, or graph. It still shows the seats and, for a seated player, only that player's cards
- [x] Opening `/dashboard/{roomId}` directly loads the same dashboard for a started match. An unknown room id is refused. An unstarted room does not show a dashboard
- [x] The page works in a computer browser and in a phone browser
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A started match has its dashboard at `/dashboard/{roomId}`, and [IMPL-007](IMPL-007-look-back.md) can open that same page for a later look back.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Logged from the user. Not started. The path is recorded in [product/journeys.md](../../product/journeys.md). |
| 2026-10-14 | agent | Done. Starting slim-moose opened https://dyqrtt5df9uyr.cloudfront.net/dashboard/slim-moose. The room page keeps the seats and the caller's cards. |
