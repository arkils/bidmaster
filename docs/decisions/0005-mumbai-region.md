# 0005. Mumbai region

Date: 2026-10-13

## Status

ACCEPTED

## Context

[Decision 0004](0004-s3-lambda-dynamodb.md) placed the website files, the request work, and the room store on S3, Lambda, and DynamoDB, and left the AWS region open. On 2026-10-13 the user said the project is in India and the region should be Mumbai.

## Decision

S3, Lambda, and DynamoDB run in AWS Mumbai, `ap-south-1`.

CloudFront still serves the website to browsers. Players can open the site from outside India. The room and the match live in Mumbai.

## Options considered

- One region, Mumbai. Players in India get the shorter path to Lambda and DynamoDB. A player far from Mumbai waits longer on each bid and card. One table holds every match.
- One region somewhere else. It would be a worse fit for a project based in India.
- A copy of the data in several regions. Nearby players would wait less. One room would be harder to keep as a single match.

## Rationale

The user chose Mumbai because the project is in India. One region keeps each match in one place, which matches decision 0004.

## Consequences

- Later AWS resources for version 1 go in `ap-south-1`, except CloudFront, which is the global front door from decision 0003.
- A player outside India can play. Their actions travel to Mumbai.
- This decision does not limit the audience to India. The site stays public, and rooms stay invitation-only.

## Revisit triggers

- Most players are outside India and the wait to Mumbai gets in the way.
- The user moves the project to another place.
- AWS retires or renames `ap-south-1`.
