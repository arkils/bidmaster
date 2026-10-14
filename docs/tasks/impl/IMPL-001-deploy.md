# IMPL-001: Deploy from the laptop

| Field | Value |
| --- | --- |
| **ID** | IMPL-001 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | delivery |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | — |
| **Blocks** | IMPL-002 |
| **Completed** | 2026-10-14 |

## Summary

A developer deploys version 1 from a laptop. The deploy creates the accepted AWS services, publishes the React build and the Python functions, and the React app on the laptop talks to that deploy.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [01-development-gate.md](../../01-development-gate.md)
- [x] [architecture/delivery.md](../../architecture/delivery.md)
- [x] [architecture/overview.md](../../architecture/overview.md)
- [x] [decisions/0010-cdk-typescript-from-laptop.md](../../decisions/0010-cdk-typescript-from-laptop.md)
- [x] [decisions/0002-serverless-hosting.md](../../decisions/0002-serverless-hosting.md)
- [x] [decisions/0003-aws-cloudfront.md](../../decisions/0003-aws-cloudfront.md)
- [x] [decisions/0004-s3-lambda-dynamodb.md](../../decisions/0004-s3-lambda-dynamodb.md)
- [x] [decisions/0005-mumbai-region.md](../../decisions/0005-mumbai-region.md)
- [x] [decisions/0006-react-and-python.md](../../decisions/0006-react-and-python.md)
- [x] [decisions/0008-iot-core-notifications.md](../../decisions/0008-iot-core-notifications.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The deploy is confirmed. | — |

## Acceptance criteria

- [x] The AWS resources are an AWS CDK application written in TypeScript
- [x] A deploy from a laptop creates S3, API Gateway, Lambda, DynamoDB, and IoT Core in Mumbai (`ap-south-1`), and CloudFront as the global front door
- [x] CloudFront is not placed in `ap-south-1`
- [x] That same deploy puts the current React build and the current Python functions in place
- [x] There is one deploy, and no pipeline is required
- [x] The React app on the laptop calls that deploy. It does not use a local stand-in for API Gateway, Lambda, DynamoDB, or IoT Core
- [x] The website is React and the Lambda functions are Python. TypeScript is only the infrastructure language
- [x] A person can open the deployed site through CloudFront
- [x] Taggable resources carry `Project=bidmaster` and `ManagedBy=cdk`, and the site, API, function, table, and CloudFront distribution also carry a `Name` tag beginning with `bidmaster-`
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later task can add the name, the room, and the match on this deploy, without inventing a second environment or a local stand-in.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Authored by PREP-002. Not started. Build GO is not recorded. |
| 2026-10-14 | agent | The user recorded Build GO. Started. The room table key is the room id, because the data model says one room id names one room record. |
| 2026-10-14 | agent | CDK synth succeeded. The laptop deploy to AWS was not run. The task stays in progress until CloudFront serves the site. |
| 2026-10-14 | agent | The user said not to deploy. The AWS credentials are wrong. |
| 2026-10-14 | agent | The user asked for project tags before any deploy. Tag keys are Project, ManagedBy, and Name. The IoT policy resource has no tag property; its name stays bidmaster-player. |
| 2026-10-14 | agent | Deployed with the bidmaster-prod profile. Site URL is https://dyqrtt5df9uyr.cloudfront.net. Health returns ok. CloudFront tags are Project, ManagedBy, and Name. |
