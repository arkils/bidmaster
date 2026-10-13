# 0007. API Gateway and live updates

Date: 2026-10-13

## Status

ACCEPTED

## Context

[Decision 0006](0006-react-and-python.md) left open how the React website calls the Python Lambda functions. The user asked whether an Application Load Balancer or a direct Lambda call is better, and how every player in a room hears a bid, a card, or a score change. [Decision 0002](0002-serverless-hosting.md) says the site is idle when nobody is playing.

## Decision

Use two API Gateway APIs in Mumbai (`ap-south-1`), both behind CloudFront:

- An HTTP API for short actions: create a room, join a room, and load the room.
- A WebSocket API for the time a player is in a room.

Playing feels like a live table on a site such as chess.com: a connection stays open, an action is checked and saved, and the result is pushed to the other players in the room. API Gateway holds those connections. Lambda runs only for the action.

The React app does not call Lambda with AWS credentials. There is no Application Load Balancer.

When a player connects, the Python function stores that connection with the room in DynamoDB. When a player takes an action, the function checks the rules, writes the match, and pushes the resulting public state to every connection in that room. A player's own cards are sent only on that player's connection. After a round is scored, the push includes the cumulative scores, the ranking, and the round's gain or loss for the graph.

When the player leaves, the function drops the connection. With nobody connected, there is no live channel left running.

## How a push works

API Gateway holds each open WebSocket. Lambda runs only for a moment, then stops. The function does not keep a socket to the browsers.

1. The React app opens a WebSocket for the room. API Gateway accepts it and runs the Python connect function. That function stores the connection id with the room id in DynamoDB, then stops. The socket stays open on API Gateway.
2. A player sends an action, such as a bid or a card. API Gateway runs the Python action function and gives it that player's connection id and the action.
3. The function loads the match from DynamoDB, applies the rules, and saves the match.
4. The function loads the connection ids stored for that room. It asks the API Gateway Management API to post a message to each of those ids. API Gateway writes that message onto the socket it is already holding for that player.
5. The public message is the bid, the card, the trick, or the new scores, ranking, and graph point. The player's own cards are posted only to that player's connection id.
6. When the browser closes the socket, API Gateway runs the disconnect function. That function deletes the connection id. A post to a dead connection gets a gone response, and the function deletes that id too.

A room of 3 to 10 players is one short loop of posts. Other rooms have their own connection ids, so a push stays inside the room where the action happened.

## Options considered

- Application Load Balancer in front of Lambda. The balancer exists all month, including when nobody is playing, so it conflicts with decision 0002. It also cannot hold a live channel open into a Lambda function for the whole match. A balancer in front of a server that stays up would keep that channel, and that server is the option decision 0002 rejected.
- A direct Lambda invoke from the browser, using AWS credentials in the page. The page could call any function the credentials allow. Those credentials do not belong in a public website.
- A Lambda function URL. The browser can send one HTTP request and get one response. It does not fan that result out to the other players.
- SNS and SQS between Lambdas. A function can publish an event, and another function can read it from a queue. That is useful when several backend workers must each handle the same event. A browser cannot subscribe to the topic or the queue. The event still needs a WebSocket, or a poll, to reach the other players. For a room of 3 to 10 people, the function that saved the match can push to those players itself. The extra topic and queue would add a hop and a delay.
- HTTP API plus polling. The React app asks for the room every second or two. This is simple, and it is idle when nobody is asking. Players see a bid or a card only on the next poll.
- HTTP API for create, join, and load, plus a WebSocket API for the room. Create and join stay short requests. Inside the room, one player's action is pushed to the others. API Gateway charges while a player is connected, and that charge ends when they disconnect. The functions must remember connection ids.

## Rationale

The game is turn-based, and every player at the table needs to see the same bid, card, and score. A WebSocket push does that. API Gateway stays idle when the room is empty, which matches decision 0002. The load balancer, a credentialed invoke, and SNS or SQS do not deliver that push to the browsers.

## Consequences

- DynamoDB keeps connection ids for the players currently in a room, as well as the room and the match.
- The Python functions use the API Gateway management API to post to those connections.
- CloudFront remains the URL the browser uses. The HTTP API and the WebSocket API sit behind it.
- Polling remains available if this push path proves too much for version 1. That change needs this decision to be revisited.
- On 2026-10-13 the user left a further choice pending. OQ-18 in `docs/open-questions.md` asks whether a container should start with the match, hold the match, and keep the live connections. That container is not accepted. This decision stays the current record, and OQ-18 may replace the Lambda push.

## Revisit triggers

- The cost of open WebSocket connections during a long match is too high.
- API Gateway WebSocket limits block a normal room of 3 to 10 players.
- The user would rather poll than keep connection ids.
- The user accepts a server that stays running, which would reopen decision 0002.
- OQ-18 is answered in favor of a container that holds the live match.
