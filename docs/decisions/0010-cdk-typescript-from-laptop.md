# 0010. CDK in TypeScript, deployed from a laptop

Date: 2026-10-14

## Status

ACCEPTED

## Context

[DISC-008](../tasks/discovery/DISC-008-local-development.md) asks how version 1 is delivered. On 2026-10-14 the user said the infrastructure code is written in AWS CDK using TypeScript, and that it is deployed from a laptop. [Decision 0006](0006-react-and-python.md) already says the website is React and the Lambda code is Python.

## Decision

The AWS resources are described by an AWS CDK application written in TypeScript. A developer deploys that application by running the deploy from a laptop. The deploy creates S3, API Gateway, Lambda, DynamoDB, and IoT Core in Mumbai (`ap-south-1`). It also creates CloudFront as the global front door. CloudFront is not placed in `ap-south-1`.

The CDK application describes CloudFront, S3, API Gateway, Lambda, DynamoDB, and IoT Core. The same deploy puts the current React build and the current Python functions in place. There is no separate delivery service. There is one deploy. A room created from the laptop is on that same deploy.

The website stays React. The Lambda functions stay Python. TypeScript here is the infrastructure language only.

## Options considered

- AWS CDK in TypeScript, deployed from a laptop. One description of the stack, applied by a person from their machine. A third language sits beside React and Python.
- The same CDK application, deployed by a pipeline. The laptop is not required for each deploy. The user asked for the laptop.
- Hand-written CloudFormation, Terraform, or clicks in the console. Each can create the same services. The user asked for CDK in TypeScript.

## Rationale

The user chose CDK in TypeScript and a deploy that runs on a laptop. React and Python stay as decision 0006 decided them.

## Consequences

- Version 1 has three languages: TypeScript for infrastructure, React for the website, Python for Lambda.
- Delivery does not depend on a build server. The laptop uses credentials for the AWS account.
- No infrastructure code is written in this decision. The description is the record. The code waits for Build GO.
- The React app on the laptop talks to the deployed AWS services. It does not use a local stand-in. See `docs/architecture/delivery.md`.

## Revisit triggers

- The user wants a pipeline to deploy instead of a laptop.
- The user wants the infrastructure written in Python or in the React language.
- CDK drops the TypeScript style this project uses.
