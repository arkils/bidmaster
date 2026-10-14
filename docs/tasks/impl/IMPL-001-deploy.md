# IMPL-001: Deploy from the laptop

| Field | Value |
| --- | --- |
| **ID** | IMPL-001 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | delivery |
| **Status** | TODO |
| **Priority** | Blocking |
| **Blocked by** | — |
| **Blocks** | IMPL-002 |
| **Completed** | — |

## Summary

A developer deploys version 1 from a laptop. The deploy creates the accepted AWS services, publishes the React build and the Python functions, and the React app on the laptop talks to that deploy.

## Read first

- [ ] [00-discovery-status.md](../../00-discovery-status.md)
- [ ] [01-development-gate.md](../../01-development-gate.md)
- [ ] [architecture/delivery.md](../../architecture/delivery.md)
- [ ] [architecture/overview.md](../../architecture/overview.md)
- [ ] [decisions/0010-cdk-typescript-from-laptop.md](../../decisions/0010-cdk-typescript-from-laptop.md)
- [ ] [decisions/0002-serverless-hosting.md](../../decisions/0002-serverless-hosting.md)
- [ ] [decisions/0003-aws-cloudfront.md](../../decisions/0003-aws-cloudfront.md)
- [ ] [decisions/0004-s3-lambda-dynamodb.md](../../decisions/0004-s3-lambda-dynamodb.md)
- [ ] [decisions/0005-mumbai-region.md](../../decisions/0005-mumbai-region.md)
- [ ] [decisions/0006-react-and-python.md](../../decisions/0006-react-and-python.md)
- [ ] [decisions/0008-iot-core-notifications.md](../../decisions/0008-iot-core-notifications.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The deploy is confirmed. | — |

## Acceptance criteria

- [ ] The AWS resources are an AWS CDK application written in TypeScript
- [ ] A deploy from a laptop creates S3, API Gateway, Lambda, DynamoDB, and IoT Core in Mumbai (`ap-south-1`), and CloudFront as the global front door
- [ ] CloudFront is not placed in `ap-south-1`
- [ ] That same deploy puts the current React build and the current Python functions in place
- [ ] There is one deploy, and no pipeline is required
- [ ] The React app on the laptop calls that deploy. It does not use a local stand-in for API Gateway, Lambda, DynamoDB, or IoT Core
- [ ] The website is React and the Lambda functions are Python. TypeScript is only the infrastructure language
- [ ] A person can open the deployed site through CloudFront
- [ ] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later task can add the name, the room, and the match on this deploy, without inventing a second environment or a local stand-in.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Authored by PREP-002. Not started. Build GO is not recorded. |
