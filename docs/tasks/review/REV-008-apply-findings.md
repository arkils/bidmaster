# REV-008: Apply the review findings

| Field | Value |
| --- | --- |
| **ID** | REV-008 |
| **Track** | Review |
| **Phase** | Pre-Development Review |
| **Component** | docs / review |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | REV-007 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

Apply the standing repairs in [REV-007](REV-007-synthesis.md). Record the answer to OQ-24 in the document that owns it. F-8 is applied with F-1. F-14 is applied with F-5.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [tasks/review/REV-007-synthesis.md](REV-007-synthesis.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [game/rules.md](../../game/rules.md)
- [x] [architecture/README.md](../../architecture/README.md)
- [x] [architecture/overview.md](../../architecture/overview.md)
- [x] [architecture/data-model.md](../../architecture/data-model.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)
- [x] [architecture/delivery.md](../../architecture/delivery.md)
- [x] [decisions/0002-serverless-hosting.md](../../decisions/0002-serverless-hosting.md)
- [x] [decisions/0003-aws-cloudfront.md](../../decisions/0003-aws-cloudfront.md)
- [x] [decisions/0005-mumbai-region.md](../../decisions/0005-mumbai-region.md)
- [x] [decisions/0007-api-gateway-and-live-updates.md](../../decisions/0007-api-gateway-and-live-updates.md)
- [x] [decisions/0008-iot-core-notifications.md](../../decisions/0008-iot-core-notifications.md)
- [x] [decisions/0010-cdk-typescript-from-laptop.md](../../decisions/0010-cdk-typescript-from-laptop.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| [OQ-24](../../open-questions.md) | May a player outside India wait longer than 2 seconds on a bid or a card? | Answered 2026-10-14. That extra wait is acceptable. |

## Acceptance criteria

- [x] Each standing finding in REV-007 is applied in the document that owns it
- [x] F-8 is applied with F-1, and F-14 is applied with F-5
- [x] OQ-24 is answered in [open-questions.md](../../open-questions.md) and in the non-functional requirements
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read the product and architecture documents and follow them without the gaps F-1 through F-19 named. OQ-24 is answered.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | User answered OQ-24 and asked for the repair. Started from the REV-007 dispositions. |
| 2026-10-14 | agent | Applied F-1 through F-19 in the owning documents. OQ-24 is answered. The extra wait outside India may pass 2 seconds. |
