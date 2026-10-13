# 0002. Serverless hosting

Date: 2026-10-13

## Status

ACCEPTED

## Context

Version 1 is a website for a private group that plays when they want to. It is not a source of income. [DISC-004](../tasks/discovery/DISC-004-architecture.md) asked whether the site should stay idle until someone opens it. The user accepted that on 2026-10-13.

## Decision

Version 1 is a serverless website. Work runs when a player makes a request, and the site is idle when nobody is playing. No process stays running between requests.

The hosting company is AWS, and CloudFront is the front door. See [decision 0003](0003-aws-cloudfront.md).

## Options considered

- Serverless hosting. The site wakes for a request and costs nothing while idle. Room and match data must live in storage, because there is no process to hold them in memory. A cold start can delay the first request after a quiet period.
- A server that stays running. The match can sit in memory, and the first click is simpler. The server costs money and needs attention while nobody is playing.

## Rationale

The user accepted the serverless option. It matches a group that plays occasionally and a product that does not earn money.

## Consequences

- Later architecture keeps shared room and match state in storage that outlives a single request.
- The hosting company is AWS, and CloudFront is the front door. See [decision 0003](0003-aws-cloudfront.md).
- Android and iOS apps remain FUTURE. This decision covers the version-1 website.

## Revisit triggers

- The group plays often enough that waking on each request gets in the way.
- The user wants a machine that stays up.
- A chosen host cannot keep the site idle at a cost the project can accept.
