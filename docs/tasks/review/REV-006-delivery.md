# REV-006: Delivery

| Field | Value |
| --- | --- |
| **ID** | REV-006 |
| **Track** | Review |
| **Phase** | Pre-Development Review |
| **Component** | docs / architecture |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | REV-005 |
| **Blocks** | REV-007 |
| **Completed** | 2026-10-14 |

## Summary

Review how version 1 is run on a laptop and how a build reaches AWS. Record findings. Do not edit those documents to repair them.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [architecture/delivery.md](../../architecture/delivery.md)
- [x] [architecture/overview.md](../../architecture/overview.md)
- [x] [decisions/0010-cdk-typescript-from-laptop.md](../../decisions/0010-cdk-typescript-from-laptop.md)
- [x] [decisions/0005-mumbai-region.md](../../decisions/0005-mumbai-region.md)
- [x] [decisions/0006-react-and-python.md](../../decisions/0006-react-and-python.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [product/vision.md](../../product/vision.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None at the start of this task. | Ask only if the review is blocked on a fact the docs do not settle. |

## Acceptance criteria

- [x] Findings are recorded in this file, including a review that finds none
- [x] The delivery document and the documents it was checked against were not edited to repair them
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read this file and know whether delivery agrees with the accepted decisions and the confirmed product.

## Findings

Checked on 2026-10-14. These points agree. One CDK application in TypeScript is deployed from a laptop. There is no pipeline. The website stays React. Lambda stays Python. TypeScript is only the infrastructure language. The deploy creates and updates S3, API Gateway, Lambda, DynamoDB, and IoT Core, and it puts the current React build and the current Python functions in place. The React app on the laptop uses that deploy. It does not run a stand-in. Players of the deployed site open CloudFront. The account credentials are for the laptop deploy. [Decision 0007](../../decisions/0007-api-gateway-and-live-updates.md) still says the React app does not call Lambda with AWS credentials.

| ID | Finding |
| --- | --- |
| F-17 | [architecture/delivery.md](../../architecture/delivery.md) and [decision 0010](../../decisions/0010-cdk-typescript-from-laptop.md) say the deploy into Mumbai creates CloudFront together with the regional services. [Decision 0005](../../decisions/0005-mumbai-region.md) and the overview keep CloudFront as the global front door and place S3, Lambda, DynamoDB, API Gateway, and IoT Core in Mumbai. A later agent can place CloudFront itself in `ap-south-1`. |
| F-18 | The local-run sentence names create, join, load, bids, cards, and notices. The HTTP API also covers start, trump, and the list of matches. The sentence does not say those use the deployed services too. |
| F-19 | One deploy is described, and the laptop app uses it. No second environment is named. A room created from the laptop is on the same deploy players open. |

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Seeded after REV-005. Not started. |
| 2026-10-14 | agent | Reviewed delivery against the overview, decisions 0005, 0006, and 0010, the vision, and the non-functional requirements. Recorded F-17 through F-19. Did not edit those documents. |
