# REV-002: Architecture and accepted decisions

| Field | Value |
| --- | --- |
| **ID** | REV-002 |
| **Track** | Review |
| **Phase** | Pre-Development Review |
| **Component** | docs / architecture |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | REV-001 |
| **Blocks** | REV-003 |
| **Completed** | 2026-10-14 |

## Summary

Review the architecture overview and accepted decisions 0002 through 0010 against the confirmed product. Record findings. Do not edit those documents to repair them.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [architecture/overview.md](../../architecture/overview.md)
- [x] [architecture/README.md](../../architecture/README.md)
- [x] [decisions/README.md](../../decisions/README.md)
- [x] [decisions/0002-serverless-hosting.md](../../decisions/0002-serverless-hosting.md)
- [x] [decisions/0003-aws-cloudfront.md](../../decisions/0003-aws-cloudfront.md)
- [x] [decisions/0004-s3-lambda-dynamodb.md](../../decisions/0004-s3-lambda-dynamodb.md)
- [x] [decisions/0005-mumbai-region.md](../../decisions/0005-mumbai-region.md)
- [x] [decisions/0006-react-and-python.md](../../decisions/0006-react-and-python.md)
- [x] [decisions/0007-api-gateway-and-live-updates.md](../../decisions/0007-api-gateway-and-live-updates.md)
- [x] [decisions/0008-iot-core-notifications.md](../../decisions/0008-iot-core-notifications.md)
- [x] [decisions/0009-player-id.md](../../decisions/0009-player-id.md)
- [x] [decisions/0010-cdk-typescript-from-laptop.md](../../decisions/0010-cdk-typescript-from-laptop.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None at the start of this task. | Ask only if the review is blocked on a fact the docs do not settle. |

## Acceptance criteria

- [x] Findings are recorded in this file, including a review that finds none
- [x] The overview and the decisions were not edited to repair them
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read this file and know whether the overview and the accepted decisions agree with the confirmed product.

## Findings

Checked on 2026-10-14. These points agree. The site is serverless on AWS. CloudFront is the front door for the site and the HTTP API. S3 holds the React files. Python Lambda runs a request and stops. DynamoDB stores the rooms and matches. S3, Lambda, DynamoDB, API Gateway, and IoT Core are in Mumbai. CloudFront is the exception and stays the global front door. Many matches can run at once. There is no public lobby. The player id sits beside the visible name. No container starts with a match. The overview and decision 0008 use IoT Core for live notices, and the diagram sends that path to the browser rather than through CloudFront. Decision 0010 keeps TypeScript on the CDK deploy from a laptop. React and Python stay as decision 0006 set them. Android and iOS stay FUTURE.

| ID | Finding |
| --- | --- |
| F-3 | The Decision section of [decision 0003](../../decisions/0003-aws-cloudfront.md) still says the service that runs a request, and the service that stores the room, stay open, and it points at OQ-13. OQ-13 is answered. [Decision 0004](../../decisions/0004-s3-lambda-dynamodb.md) and the overview name S3, Lambda, and DynamoDB. The consequences of 0003 already point at 0004. The decision body does not. |
| F-4 | The Decision section, the push steps, the rationale, and the early consequences of [decision 0007](../../decisions/0007-api-gateway-and-live-updates.md) still specify a WebSocket API, connection ids in DynamoDB, and an HTTP API limited to create, join, and load. The status block and [decision 0008](../../decisions/0008-iot-core-notifications.md) say that WebSocket path is superseded. The current HTTP API also covers start, a bid, trump, a card, and the list of matches. A later agent can implement the older path from the body of 0007. |
| F-5 | [Decision 0002](../../decisions/0002-serverless-hosting.md) says no process stays running between requests. The overview and [decision 0008](../../decisions/0008-iot-core-notifications.md) say IoT Core keeps the MQTT session while the player has the room open, including the gaps between actions. Decision 0008 says this matches 0002 when nobody is connected. Both sentences are in force, and they cover different stretches of time. |
| F-6 | The diagram row in [architecture/README.md](../../architecture/README.md) cites decisions 0002 through 0008. [Decision 0009](../../decisions/0009-player-id.md) and [decision 0010](../../decisions/0010-cdk-typescript-from-laptop.md) are accepted. The overview mentions 0009. The index does not mention 0009 or 0010. |
| F-7 | The Mumbai option in [decision 0005](../../decisions/0005-mumbai-region.md) says “One table holds every match.” In that paragraph it argues for one region. It can also be read as a choice of a single DynamoDB table. The vision, the requirements, and the overview do not choose how many tables. |

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Seeded after REV-001. Not started. |
| 2026-10-14 | agent | Reviewed the overview and decisions 0002 through 0010 against the vision and requirements. Recorded F-3 through F-7. Did not edit those documents. |
