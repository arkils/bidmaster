# Non-functional requirements

Status: recorded by [DISC-007](../tasks/discovery/DISC-007-non-functional-requirements.md). A quality below is CONFIRMED only when the user or an earlier document already says it. A number the user has not given is not written here.

## CONFIRMED

### Who can play together

- Version 1 is for people who already play this game, each in their own invited group. The website is public and global. A player still enters a room by invitation. There is no public lobby.
- One match has 3 to 10 players, as `docs/game/rules.md` requires.
- Many matches can run at the same time. Each match belongs to its own room. No maximum count was stated.
- Players can open the site from outside India. The room and the match live in Mumbai (`ap-south-1`). A player far from Mumbai waits longer on each bid and card. That extra wait may pass 2 seconds, and it is acceptable. Confirmed 2026-10-14. See [decision 0005](../decisions/0005-mumbai-region.md).
- The website is responsive. It works in a computer browser and in a phone browser. Confirmed 2026-10-14. Native Android and iOS apps stay FUTURE.

### What stays private

- A player sees only their own cards. Those cards are sent only on that player id's topic, and only in a load response for that player id.
- The screen shows the typed name. It does not show the player id.
- A public message names a player by seat number and the name on that seat. It does not include other players' ids.
- The dashboard lists only the matches stored for the player id in this browser's cookie. It is not a list of every match on the site.
- Anyone who knows a room id can open that match and see its public result: the date, the names, the seats, and each round's points. During a round still being played, that also includes the bids, the trump, the played cards, and whose turn it is. It does not include the other players' cards.
- There is no account and no password. Clearing the cookie, or using another browser, starts a new player id. Older matches stay stored under the old id.

### What use feels like

- The site is idle when nobody is playing. Lambda runs when a request arrives, then stops. While a player has the room open, IoT Core keeps that player's MQTT session, including the gaps between actions. When nobody is connected, nothing stays running. A cold start can delay the first request after a quiet period. See [decision 0002](../decisions/0002-serverless-hosting.md) and [decision 0008](../decisions/0008-iot-core-notifications.md).
- CloudFront is the front door, on the AWS free tier. That free tier is not a spending cap. API Gateway and DynamoDB stay in place: the HTTP API remains, and the store keeps the rooms and matches. They are not a server that stays running. Confirmed 2026-10-14. IoT Core meters a connection only while a player is subscribed, and that ends when they disconnect. IoT Core is not a server that stays running for the match.
- Version 1 states no uptime percentage and no cost ceiling.
- While players are in a room, the table is live. One player's action is published to the others. A missed notice is repaired by loading the room.
- A bid or a card should feel real-time. A delay of 1 or 2 seconds is acceptable. There is no stricter limit. Confirmed 2026-10-14. The first request after a quiet period can be slower, because a cold start can delay it. That cold start is already a consequence of [decision 0002](../decisions/0002-serverless-hosting.md). A player far from Mumbai may also wait longer than 2 seconds, and that extra wait is acceptable.
- Play starts on the room page. After the match has started, anyone can open its dashboard and watch the cumulative scores, the rank, the graph of each round's gain or loss, and the graph of each player's running total. The home list of matches stays limited to this browser.
- A started match is kept, and it does not expire.
- Version 1 is not a source of income.

## OPEN

None.

## FUTURE

- An Android app.
- An iOS app.

