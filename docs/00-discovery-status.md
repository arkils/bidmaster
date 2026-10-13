# Discovery status

| | |
| --- | --- |
| Phase | Discovery & Architecture |
| Phase started | 2026-10-13 |
| Agent | Project architect (`AGENTS.md`) |
| Code | Not allowed |
| Active task | [DISC-005](tasks/discovery/DISC-005-data-model.md) — `IN_PROGRESS` |
| Documentation gate | Not run |
| Review GO | Not recorded |
| Build GO | Not recorded |

## Progress

DISC-001, DISC-002, and DISC-003 are done. Journeys in `docs/product/journeys.md` cover the name cookie, rooms, join order, the host's choice of first bidder, the match in `docs/game/rules.md`, and a dashboard with scores, rank, and a per-round graph. The website is public and global. Many invited matches can run at once. There is no public lobby, and it is not a source of income. Android and iOS apps are FUTURE. DISC-004 is done. Decisions 0002 through 0007 are accepted: serverless hosting on AWS in Mumbai, CloudFront, S3, a React site, Python Lambda, DynamoDB, and API Gateway HTTP plus WebSocket. Whether a container takes over when a match starts is still open (OQ-18). What DynamoDB keeps after a room empties is also open (OQ-17) and waits on that choice.

## What we are not doing yet

Coding waits for **Review GO**, then Planning, then **Build GO**.

Until those gates:

- No application, infrastructure, configuration, or script code.
- No Review, Planning, or Implementation task files. Those are created in their own phases.
- The architecture overview is recorded. The data model waits on where the live match runs, and on what is kept after a room empties.
- Review GO and Build GO stay unchecked in `docs/01-development-gate.md`. This file cannot grant them.

## Next step

Answer OQ-18 in `docs/open-questions.md`: when a match starts, whether players stay on API Gateway and Lambda or a container holds the match and the live connections. DISC-005 stays `IN_PROGRESS`. The data model stays unwritten until that answer, and until OQ-17.
