# 0003. AWS and CloudFront

Date: 2026-10-13

## Status

ACCEPTED

## Context

[Decision 0002](0002-serverless-hosting.md) made version 1 a serverless website and left the hosting company open. The user already has an AWS account and is comfortable with AWS. On 2026-10-13 the user chose CloudFront on AWS.

## Decision

AWS hosts version 1. CloudFront is the front door players open.

CloudFront delivers the site. It does not, by itself, run a match or keep a room. S3 holds the website files, Lambda runs a request, and DynamoDB stores the room and the match. See [decision 0004](0004-s3-lambda-dynamodb.md). OQ-13 is answered.

## Options considered

- AWS, with CloudFront as the front door. Uses the account and the tools the user already knows. The game still needs other AWS services behind CloudFront for request work and for storage.
- Cloudflare. Aimed at sites that are idle most of the time. It would be a second account and a second set of tools.
- Vercel. A compact home for a website and request work. Same drawback: a new account beside the AWS account the user already uses.

## Rationale

The user chose AWS and CloudFront because the account already exists and they are comfortable there. Decision 0002 still stands: the site stays idle when nobody is playing.

## Consequences

- Later stack choices stay inside AWS.
- S3, Lambda, and DynamoDB are [decision 0004](0004-s3-lambda-dynamodb.md).
- A future Android or iOS app is still FUTURE and is outside this decision.

## Revisit triggers

- The user wants a host other than AWS.
- CloudFront cannot sit in front of the request work and the store this game needs.
- The AWS cost while the site is idle stops being acceptable.
