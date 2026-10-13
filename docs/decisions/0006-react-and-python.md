# 0006. React and Python

Date: 2026-10-13

## Status

ACCEPTED

## Context

[Decision 0004](0004-s3-lambda-dynamodb.md) split the system into website files on S3 and request work on Lambda. [DISC-004](../tasks/discovery/DISC-004-architecture.md) asked what language those parts use. On 2026-10-13 the user chose React for the website and Python for the Lambda code.

## Decision

The website is a React application. Lambda functions are written in Python.

The HTTP API sits between CloudFront and Lambda. See [decision 0007](0007-api-gateway-and-live-updates.md). Live notices go through AWS IoT Core. No container takes over once a match starts. See [decision 0008](0008-iot-core-notifications.md).

## Options considered

- React in the browser and Python on Lambda. The pages, the ranking table, and the graph are React. The match rules run in Python, next to DynamoDB. Two languages, with a clear split.
- TypeScript for both. One language for the pages and the functions. The user asked for Python on the backend.
- Python for both. Lambda would be Python, and the browser UI would not be React. The user asked for React on the website.

## Rationale

The user chose this split. React is the website. Python is the backend code in Lambda.

## Consequences

- Game rules that must be the same for every player run in the Python functions, which read and write DynamoDB.
- The React app is what the player sees: the name popup, create and join, the match, the ranking table, and the graph.
- A later choice still has to say how the React app invokes the Python functions. That choice is [decision 0007](0007-api-gateway-and-live-updates.md) and [decision 0008](0008-iot-core-notifications.md).
- Infrastructure is TypeScript on AWS CDK, deployed from a laptop. See [decision 0010](0010-cdk-typescript-from-laptop.md). The website stays React and Lambda stays Python.

## Revisit triggers

- The user wants one language for the pages and the functions.
- Lambda drops the Python runtime the project is using.
- The React app cannot be served as static files from S3 through CloudFront.
