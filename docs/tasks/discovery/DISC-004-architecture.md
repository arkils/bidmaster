# DISC-004. Architecture overview

## ID

`DISC-004`

## Track

Discovery

## Phase

Discovery & Architecture

## Component

Architecture

## Status

`DONE`

## Priority

Blocking

## Blocked by

DISC-003

## Blocks

DISC-005

## Summary

An architecture overview describes how version 1 is structured. Stack choices that are hard to reverse are ADRs in `docs/decisions/`, status PROPOSED until the user accepts them.

## Read first

- `docs/00-discovery-status.md`
- `docs/product/vision.md`
- `docs/product/requirements.md`
- `docs/decisions/README.md`
- `docs/decisions/0000-template.md`
- `docs/decisions/0001-documentation-driven-phases.md`
- `docs/architecture/README.md`
- `docs/adr/README.md`
- The journeys document written by DISC-003

## Open questions

- OQ-11. Answered 2026-10-13. [Decision 0002](../../decisions/0002-serverless-hosting.md) is ACCEPTED.
- OQ-12. Answered 2026-10-13. [Decision 0003](../../decisions/0003-aws-cloudfront.md) is ACCEPTED.
- OQ-13. Answered 2026-10-13. [Decision 0004](../../decisions/0004-s3-lambda-dynamodb.md) is ACCEPTED.
- OQ-14. Answered 2026-10-13. [Decision 0005](../../decisions/0005-mumbai-region.md) is ACCEPTED. Mumbai, `ap-south-1`.
- OQ-15. Answered 2026-10-13. [Decision 0006](../../decisions/0006-react-and-python.md) is ACCEPTED. React and Python.
- OQ-16. Answered 2026-10-13. [Decision 0007](../../decisions/0007-api-gateway-and-live-updates.md) is ACCEPTED. HTTP API and WebSocket API.

## Acceptance criteria

- `docs/architecture/` has an overview that matches the confirmed scope.
- The overview is listed in `docs/architecture/README.md`.
- Each stack choice is an ADR with context, decision, options considered, rationale, consequences, and revisit triggers.
- No application code is written.

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

## Definition of done

- Every acceptance criterion is met.
- Status is `DONE` in this file and in `docs/tasks/backlog.md`.
- Assumptions, open questions, and risks touched by this task are updated in their registers.
- No code was written.
