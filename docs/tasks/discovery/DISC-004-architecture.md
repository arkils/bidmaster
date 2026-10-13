# DISC-004: Architecture overview

| Field | Value |
| --- | --- |
| **ID** | DISC-004 |
| **Track** | Discovery |
| **Phase** | Discovery & Architecture |
| **Component** | docs / architecture |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | DISC-003 |
| **Blocks** | DISC-005 |
| **Completed** | 2026-10-13 |

## Summary

An architecture overview describes how version 1 is structured. Stack choices that are hard to reverse are ADRs in `docs/decisions/`, status PROPOSED until the user accepts them.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [decisions/README.md](../../decisions/README.md)
- [x] [decisions/0000-template.md](../../decisions/0000-template.md)
- [x] [decisions/0001-documentation-driven-phases.md](../../decisions/0001-documentation-driven-phases.md)
- [x] [architecture/README.md](../../architecture/README.md)
- [x] [adr/README.md](../../adr/README.md)
- [x] [product/journeys.md](../../product/journeys.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| OQ-11 | Is version 1 a serverless website that stays idle until someone plays? | Yes. [Decision 0002](../../decisions/0002-serverless-hosting.md) is ACCEPTED. |
| OQ-12 | Which company hosts the version-1 website? | AWS, with CloudFront as the front door. [Decision 0003](../../decisions/0003-aws-cloudfront.md) is ACCEPTED. |
| OQ-13 | Which AWS services run a request and store the room behind CloudFront? | S3, Lambda, and DynamoDB. [Decision 0004](../../decisions/0004-s3-lambda-dynamodb.md) is ACCEPTED. |
| OQ-14 | Do those services live in one region, and which region? | Mumbai, `ap-south-1`. [Decision 0005](../../decisions/0005-mumbai-region.md) is ACCEPTED. |
| OQ-15 | What language is the website and the Lambda code written in? | React and Python. [Decision 0006](../../decisions/0006-react-and-python.md) is ACCEPTED. |
| OQ-16 | How does the React website call the Python Lambda functions? | An HTTP API. [Decision 0007](../../decisions/0007-api-gateway-and-live-updates.md) is ACCEPTED. [Decision 0008](../../decisions/0008-iot-core-notifications.md) later replaced the WebSocket push. |

## Acceptance criteria

- [x] [architecture/overview.md](../../architecture/overview.md) matches the confirmed scope
- [x] The overview is listed in [architecture/README.md](../../architecture/README.md)
- [x] Each stack choice is an ADR with context, decision, options considered, rationale, consequences, and revisit triggers
- [x] No application code is written
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can see how the site is hosted and which accepted decision chose each service.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-13 | agent | Seeded. Blocked by DISC-003. Architecture is intentionally not drafted yet. |
| 2026-10-13 | agent | DISC-003 is done. Started this task. Asked OQ-11 before writing a hosting decision. |
| 2026-10-13 | agent | User accepted OQ-11. Wrote decision 0002 as ACCEPTED and a vendor-free overview. Asked OQ-12. |
| 2026-10-13 | agent | User chose AWS and CloudFront. Wrote decision 0003 as ACCEPTED. Asked OQ-13. |
| 2026-10-13 | agent | User accepted S3, Lambda, and DynamoDB, and many concurrent matches on a public global site. Wrote decision 0004 as ACCEPTED. Asked OQ-14. |
| 2026-10-13 | agent | User chose Mumbai because the project is in India. Wrote decision 0005 as ACCEPTED. Asked OQ-15. |
| 2026-10-13 | agent | User chose React for the website and Python for Lambda. Wrote decision 0006 as ACCEPTED. Asked OQ-16. |
| 2026-10-13 | agent | User asked about an ALB, a direct Lambda call, and live updates. Wrote decision 0007 as PROPOSED. Waiting for acceptance. |
| 2026-10-13 | agent | User asked about SNS and SQS. Recorded them as an option in decision 0007. The proposal stays PROPOSED. |
| 2026-10-13 | agent | User accepted the live table on the serverless site. Decision 0007 is ACCEPTED. Overview updated. Acceptance criteria met. |
| 2026-10-13 | agent | Decision 0008 superseded the WebSocket half of decision 0007. The overview now shows IoT Core. This task stays DONE. |
