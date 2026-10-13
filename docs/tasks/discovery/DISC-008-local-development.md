# DISC-008: Local development and delivery

| Field | Value |
| --- | --- |
| **ID** | DISC-008 |
| **Track** | Discovery |
| **Phase** | Discovery & Architecture |
| **Component** | docs / architecture |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | DISC-007 |
| **Blocks** | DISC-009 |
| **Completed** | 2026-10-14 |

## Summary

The approach for local development and delivery is written down: how a developer runs version 1, and how a build reaches the people who use it. Tooling choices that are hard to reverse are ADRs.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [decisions/README.md](../../decisions/README.md)
- [x] [decisions/0000-template.md](../../decisions/0000-template.md)
- [x] [architecture/overview.md](../../architecture/overview.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [open-questions.md](../../open-questions.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| OQ-22 | How does a developer run version 1 on the laptop before deploying to AWS? | The React app on the laptop talks to the deployed AWS services. There is no local stand-in. [Decision 0010](../../decisions/0010-cdk-typescript-from-laptop.md) is ACCEPTED. |

## Acceptance criteria

- [x] A delivery document exists and is linked from [README.md](../../README.md)
- [x] It says how version 1 is run locally and how it is delivered
- [x] A hard-to-reverse tooling choice is an ADR. [Decision 0010](../../decisions/0010-cdk-typescript-from-laptop.md) is ACCEPTED
- [x] No scripts or configuration files were added in this task
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can deploy with AWS CDK in TypeScript from a laptop, and can run the React app on that laptop against the deployed AWS services.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-13 | agent | Seeded. Blocked by DISC-007. |
| 2026-10-14 | agent | DISC-007 is done. Started this task. User chose AWS CDK in TypeScript, deployed from a laptop. Wrote decision 0010 as ACCEPTED. Asked OQ-22. No code was written. |
| 2026-10-14 | agent | User answered OQ-22. The local React app talks to the deployed AWS services. Acceptance criteria met. No code was written. |
