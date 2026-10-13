# 0004. S3, Lambda, and DynamoDB

Date: 2026-10-13

## Status

ACCEPTED

## Context

[Decision 0003](0003-aws-cloudfront.md) made CloudFront the front door and left the request work and the room store open. On 2026-10-13 the user accepted S3, Lambda, and DynamoDB. The user also said many matches can run at the same time, because the website is public and global.

## Decision

Behind CloudFront:

- S3 holds the website files.
- Lambda runs the request work and then stops.
- DynamoDB stores the rooms and the matches.

Many matches may be in progress at the same time. Each match belongs to its own room.

The AWS region for these three services is Mumbai, `ap-south-1`. See [decision 0005](0005-mumbai-region.md).

## Options considered

- S3, Lambda, and DynamoDB. All three are idle when unused. DynamoDB can hold many rooms at once. The site is three services to wire together.
- Lambda@Edge or CloudFront Functions alone. They sit on CloudFront, and they are a poor place to keep a long card match and a shared store.
- A server that stays running behind CloudFront. One process could hold many matches in memory. It conflicts with [decision 0002](0002-serverless-hosting.md), which keeps the site idle when nobody is playing.

## Rationale

The user accepted this set. It stays inside AWS, stays idle when quiet, and can hold more than one match at a time.

## Consequences

- A room and its match are DynamoDB items, not memory inside a Lambda process.
- Two rooms do not share a match.
- The website remains available on the public internet, and players join a room by its URL or its id. There is still no public lobby. See `docs/product/vision.md`.
- The region is Mumbai. See [decision 0005](0005-mumbai-region.md).

## Revisit triggers

- DynamoDB cannot represent the match at a cost the project can accept.
- Lambda limits block a normal match.
- The user wants a different store or a different runtime.
