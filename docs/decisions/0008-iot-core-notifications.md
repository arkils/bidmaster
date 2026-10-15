# 0008. IoT Core notifications

Date: 2026-10-13

## Status

ACCEPTED. Amended on 2026-10-15 for the public dashboard and for accepting a scored round. The current behavior is below. The contracts are the detailed record.

## Context

[Decision 0007](0007-api-gateway-and-live-updates.md) used an API Gateway WebSocket so that, after Lambda saved a bid or a card, it could post the result to every connection in the room. On 2026-10-13 the user asked whether a broker topic could carry that notice instead: Lambda publishes after it stores the match, and each open session for the room receives the message. The same day the user asked to finalize that approach, and said they wanted IoT in the design. OQ-18 asked whether a container should start with the match and hold both the match and the live connections. The user declined that container.

## Decision

AWS IoT Core in Mumbai (`ap-south-1`) is the notification carrier. The match stays in DynamoDB. Python Lambda remains the runtime. No container starts when a match begins. API Gateway keeps its HTTP API and drops its WebSocket API.

- The HTTP API, behind CloudFront, handles the operations in [the contracts](../architecture/contracts.md): create, join, leave before the match starts, load, start, a bid, trump, a card, accepting a scored round, and the list of matches for one player id. Playing the last card of a round stores the score. It does not deal the next round.
- Lambda checks the rules, writes the match to DynamoDB, publishes one notice, and stops.
- A shared topic for the room carries the bid, the played card, the trick, a scored round that is waiting, and the accept that continues or ends the match. A player in that message is a seat number plus the name on the seat. The screen shows the name and does not print the seat number.
- A separate topic for each player id carries only that player's cards. The visible name is not the topic key. See [decision 0009](0009-player-id.md).
- An IoT authorizer, itself a Python Lambda, allows the room topic for a player id that has joined that room. After the match has started, it also allows the room topic for a browser that is only watching. That watcher does not receive a player's cards. A dashboard uses its own connection, so opening it does not replace the room's. Before the match starts, knowing the room id is not enough to subscribe, and it is never enough to join the match.
- With nobody connected, nothing stays running. This matches [decision 0002](0002-serverless-hosting.md).

## How a notice works

IoT Core holds each MQTT session. Lambda runs only for a moment, then stops. The function does not keep a socket to the browsers.

1. The React app on the room page subscribes to the room topic and to that player id's topic. A dashboard subscribes only to the room topic, with its own id. IoT Core runs the authorizer. The authorizer reads the room in DynamoDB. Before the match starts, it allows the subscription only when that player id has joined. After the match starts, a watcher may subscribe to the room topic and not to a player's cards.
2. A player sends an action, such as a bid or a card, on the HTTP API. API Gateway runs the Python action function.
3. The function loads the match from DynamoDB, applies the rules, and saves the match.
4. The function publishes the public result to the room topic. It publishes that player's cards only to that player id's topic.
5. IoT Core delivers the room message to every subscriber in that room, and the hand message to that player alone.
6. When the browser ends the session, the subscriptions end with it. Other rooms have their own topics, so a notice stays inside the room where the action happened.

A missed notice is repaired by loading the match again through the HTTP API. DynamoDB is the match. The topic is the notice.

## Options considered

- API Gateway WebSocket, as in decision 0007. Lambda stores connection ids and posts to each one. The room stays idle when empty. The user preferred a topic over that connection list.
- A container that starts with the match and holds the match and the live connections. A container that stays up all month conflicts with decision 0002. The user declined a container per match.
- A public shared MQTT broker. A browser can subscribe, and the service can sit outside the account. Anyone who knows the room id can watch the match, and a shared topic would deliver the same payload, including a private hand, to every subscriber.
- AWS IoT Core in this account. Lambda publishes after the save. Browsers subscribe. The broker is idle when the room is empty, and it stays in Mumbai. A private topic keeps each hand with that player. The authorizer checks the join.

## Rationale

The user chose IoT Core as the notice path and asked to keep Lambda, the HTTP API, S3, and DynamoDB. The game is turn-based, and every player at the table needs the same bid, card, and score. A room topic does that. A per-player topic keeps the private hand. No container is required, because the match remains a DynamoDB item and the open sessions are MQTT subscriptions on IoT Core.

## Consequences

- Decision 0007's HTTP API remains. Its WebSocket API, connection-id list, and Management API posts are superseded by this decision.
- DynamoDB keeps the room and the match. It does not keep API Gateway connection ids.
- IoT Core runs in `ap-south-1`, with S3, Lambda, DynamoDB, and API Gateway.
- The React app subscribes to IoT Core for the time the player has the room open. Create, join, load, and match actions stay on the HTTP API behind CloudFront.
- The authorizer is a Python Lambda. It runs when a player subscribes, then stops.
- OQ-18 is answered: the live match is in DynamoDB, and no container starts with the match. OQ-17 is answered: a started match stays after the room is empty, as the date, the room id, the players, and each round's points. See `docs/architecture/data-model.md`.

## Revisit triggers

- IoT Core connection or message cost, or its limits, get in the way of a normal room of 3 to 10 players.
- The user wants the API Gateway WebSocket push back.
- The user wants a container to hold the live match.
- The private-topic split cannot keep a hand to the player who holds it.
