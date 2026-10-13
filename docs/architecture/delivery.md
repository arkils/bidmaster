# Delivery

Status: recorded by [DISC-008](../tasks/discovery/DISC-008-local-development.md).

## How a build reaches the site

CONFIRMED on 2026-10-14. See [decision 0010](../decisions/0010-cdk-typescript-from-laptop.md).

The AWS resources are an AWS CDK application written in TypeScript. A developer deploys it from a laptop. That deploy creates and updates S3, API Gateway, Lambda, DynamoDB, and IoT Core in Mumbai (`ap-south-1`), and it creates and updates CloudFront as the global front door. CloudFront is not placed in `ap-south-1`. The deploy puts the current React build and the current Python functions in place.

CloudFront remains the URL people open. The website stays React. The Lambda code stays Python. TypeScript is only the infrastructure language.

No pipeline is required for that deploy. The laptop uses the AWS account credentials. There is one deploy. A room created from the laptop is on that same deploy.

## How version 1 is run locally

CONFIRMED on 2026-10-14. The React app on the laptop talks to the AWS services from that deploy. Create, join, leave, load, start, bids, trump, cards, the list of matches, and notices use API Gateway, Lambda, DynamoDB, and IoT Core. The Mumbai services are in `ap-south-1`. CloudFront is the global front door. The laptop does not run a stand-in for those services.
