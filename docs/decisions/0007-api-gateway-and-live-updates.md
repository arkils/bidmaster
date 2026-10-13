# 0007. API Gateway and live updates

Date: 2026-10-13

## Status

ACCEPTED

The HTTP API in this decision remains. The WebSocket API, the connection-id list, and the Management API posts are superseded by [decision 0008](0008-iot-core-notifications.md). AWS IoT Core carries the live notices. No container starts when a match begins.

## Context

[Decision 0006](0006-react-and-python.md) left open how the React website calls the Python Lambda functions. The user asked whether an Application Load Balancer or a direct Lambda call is better, and how every player in a room hears a bid, a card, or a score change. [Decision 0002](0002-serverless-hosting.md) says the site is idle when nobody is playing.

## Decision

The React app calls Python Lambda through an HTTP API on API Gateway, in Mumbai (`ap-south-1`), behind CloudFront. The React app does not call Lambda with AWS credentials. There is no Application Load Balancer.

The HTTP API handles the operations in [the contracts](../architecture/contracts.md): create, join, leave before the match starts, load, start, a bid, trump, a card, and the list of matches for one player id.

Live notices are AWS IoT Core. [Decision 0008](0008-iot-core-notifications.md) is that path. This decision does not use an API Gateway WebSocket, connection ids in DynamoDB, or Management API posts. Lambda checks the rules, writes the match, publishes one notice, and stops.

## How a notice works

See [decision 0008](0008-iot-core-notifications.md). Lambda runs only for the action. IoT Core keeps each MQTT session while that player has the room open, and it delivers the notice. With nobody connected, nothing stays running.

## Options considered

These options were considered on 2026-10-13. The WebSocket option was the original choice. [Decision 0008](0008-iot-core-notifications.md) replaced that push. The HTTP API remains.

- Application Load Balancer in front of Lambda. The balancer exists all month, including when nobody is playing, so it conflicts with decision 0002. It also cannot hold a live channel open into a Lambda function for the whole match. A balancer in front of a server that stays up would keep that channel, and that server is the option decision 0002 rejected.
- A direct Lambda invoke from the browser, using AWS credentials in the page. The page could call any function the credentials allow. Those credentials do not belong in a public website.
- A Lambda function URL. The browser can send one HTTP request and get one response. It does not fan that result out to the other players.
- SNS and SQS between Lambdas. A function can publish an event, and another function can read it from a queue. That is useful when several backend workers must each handle the same event. A browser cannot subscribe to the topic or the queue. The event still needs a WebSocket, or a poll, to reach the other players. For a room of 3 to 10 people, the function that saved the match can push to those players itself. The extra topic and queue would add a hop and a delay.
- HTTP API plus polling. The React app asks for the room every second or two. This is simple, and it is idle when nobody is asking. Players see a bid or a card only on the next poll.
- HTTP API for create, join, and load, plus a WebSocket API for the room. Create and join stay short requests. Inside the room, one player's action is pushed to the others. API Gateway charges while a player is connected, and that charge ends when they disconnect. The functions must remember connection ids.

## Rationale

The game is turn-based, and every player at the table needs to see the same bid, card, and score. The HTTP API carries each action. [Decision 0008](0008-iot-core-notifications.md) carries the notice. With nobody connected, nothing stays running, which matches [decision 0002](0002-serverless-hosting.md).

## Consequences

- The HTTP API remains. Decision 0008 carries the notices.
- DynamoDB keeps the room and the match. It does not keep API Gateway connection ids.
- CloudFront remains the URL the browser uses for the site and the HTTP API.
- On 2026-10-13 the user accepted [decision 0008](0008-iot-core-notifications.md). IoT Core replaced the original WebSocket push. OQ-18 was answered against a per-match container. The match stays in DynamoDB.

## Revisit triggers

- The notice path's cost or limits get in the way. Those triggers are in [decision 0008](0008-iot-core-notifications.md).
- The user accepts a server that stays running, which would reopen decision 0002.
- OQ-18 was answered on 2026-10-13 against a container. [Decision 0008](0008-iot-core-notifications.md) is the current notice path.
