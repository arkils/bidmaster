# DISC-007: Non-functional requirements

| Field | Value |
| --- | --- |
| **ID** | DISC-007 |
| **Track** | Discovery |
| **Phase** | Discovery & Architecture |
| **Component** | docs / product |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | DISC-006 |
| **Blocks** | DISC-008 |
| **Completed** | 2026-10-14 |

## Summary

Version 1’s non-functional requirements are written down: the qualities the user expects, such as who can play together, what must stay private, and what “done” feels like in use. Numbers are CONFIRMED only when the user gives them.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [architecture/overview.md](../../architecture/overview.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [risks.md](../../risks.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| OQ-19 | Must the version-1 website be usable in a phone browser, as well as on a desktop browser? | Yes. The website is responsive. It works on a computer and on a phone. Native Android and iOS apps stay FUTURE. |
| OQ-20 | How quickly must the other players see a bid or a card? | It should feel real-time. A delay of 1 or 2 seconds is acceptable. There is no stricter limit. |
| OQ-21 | Does version 1 state an uptime percentage? | No uptime percentage and no cost ceiling. CloudFront is on the free tier. Lambda wakes per request. API Gateway and DynamoDB stay in place. |

## Acceptance criteria

- [x] A non-functional requirements document exists and is linked from [README.md](../../README.md)
- [x] Each requirement is CONFIRMED, PROPOSED, or FUTURE
- [x] A target without a user-given number is OPEN, not invented
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can see the confirmed qualities of use, including a phone and a computer browser, a live delay of 1 or 2 seconds, and no stated uptime percentage or cost ceiling.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-13 | agent | Seeded. Blocked by DISC-006. |
| 2026-10-14 | agent | DISC-006 is done. Started this task. Wrote the qualities already confirmed in the vision, requirements, and decisions. Asked OQ-19. No number was invented. |
| 2026-10-14 | agent | User answered OQ-19. The website is responsive on a computer and on a phone. Asked OQ-20. |
| 2026-10-14 | agent | User answered OQ-20. Real-time feel, 1 or 2 seconds acceptable, no stricter limit. Cold start stays the decision 0002 exception. Asked OQ-21. |
| 2026-10-14 | agent | User answered OQ-21. No uptime percentage and no cost ceiling. Acceptance criteria met. |
