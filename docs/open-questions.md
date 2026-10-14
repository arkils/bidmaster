# Open questions

An unknown stays here until the user answers it or explicitly defers it. A deferred question names what it blocks and why it can wait.

| ID | Question | Status | Blocks |
| --- | --- | --- | --- |
| OQ-1 | What should version 1 of this project be: what it must do, and what it must leave out? | ANSWERED | — |
| OQ-2 | Is the complete game in version 1 the reviewed tabletop rules in `docs/game/rules.md`? | ANSWERED | — |
| OQ-3 | Who is version 1 for? | ANSWERED | — |
| OQ-4 | What else must version 1 leave out? | ANSWERED | — |
| OQ-5 | How does an invited player get into a room? | ANSWERED | — |
| OQ-6 | Does the host enter a name when creating the room? | ANSWERED | — |
| OQ-9 | After the first visit, how does the site remember the person's name? | ANSWERED | — |
| OQ-7 | When the host starts the match, how is seating fixed? | ANSWERED | — |
| OQ-10 | Who bids first in round 1? | ANSWERED | — |
| OQ-8 | When does the dashboard appear, and which points does it show? | ANSWERED | — |
| OQ-11 | Is version 1 a serverless website that stays idle until someone plays? | ANSWERED | — |
| OQ-12 | Which company hosts the version-1 website? | ANSWERED | — |
| OQ-13 | Which AWS services run a request and store the room behind CloudFront? | ANSWERED | — |
| OQ-14 | Do S3, Lambda, and DynamoDB live in one AWS region, and which region? | ANSWERED | — |
| OQ-15 | What language is the website and the Lambda code written in? | ANSWERED | — |
| OQ-16 | How does the React website call the Python Lambda functions? | ANSWERED | — |
| OQ-17 | What does DynamoDB keep after everyone has left the room? | ANSWERED | — |
| OQ-18 | When a match starts, do players stay on API Gateway and Lambda, with the match in DynamoDB, or does a container start, hold the match, and keep the live connections? | ANSWERED | — |
| OQ-19 | Must the version-1 website be usable in a phone browser, as well as on a desktop browser? | ANSWERED | — |
| OQ-20 | How quickly must the other players see a bid or a card? | ANSWERED | — |
| OQ-21 | Does version 1 state an uptime percentage? | ANSWERED | — |
| OQ-22 | How does a developer run version 1 on the laptop before deploying to AWS? | ANSWERED | — |
| OQ-23 | When a room is outside 3 to 10 players before the start, how can the host still reach a startable room? | ANSWERED | — |
| OQ-24 | May a player outside India wait longer than 2 seconds on a bid or a card? | ANSWERED | — |
| OQ-25 | What is the first milestone slice that Implementation Planning writes `IMPL-*.md` files for? | ANSWERED | — |
| OQ-26 | Where is DNS for `arkil.in` managed? | ANSWERED | — |

## OQ-1 resolution

Answered 2026-10-13. Version 1 is a hosted web application. A player creates a room and invites others. Those players join and play a complete game. A dashboard shows the current points of all players. The app is used when people want to play, and it is not a source of income. The user prefers serverless hosting. The record is `docs/product/vision.md`.

## OQ-2 resolution

Answered 2026-10-13. Yes. Version 1 plays the rules in `docs/game/rules.md`.

## OQ-3 resolution

Answered 2026-10-13. Version 1 is for a private group that already plays this game together. Players join by invitation.

## OQ-4 resolution

Answered 2026-10-13. Version 1 leaves out a public lobby. Android and iOS apps are wanted later, so they are FUTURE, not part of version 1. The record is `docs/product/vision.md`.

## OQ-5 resolution

Answered 2026-10-13. The home page offers Create room and Join room. Create room yields a URL ending in a two-word id such as `funny-monkey`. A friend opens that URL, or types the id on the site, then provides a name and joins. The host starts the match when they think everyone has joined. The record is `docs/product/journeys.md`.

## OQ-6 resolution

Answered 2026-10-13. The host enters a name before creating a room. For anyone, the first arrival starts with a popup that asks for a name. After the name is entered, the site shows Create room and Join room. The record is `docs/product/journeys.md`.

## OQ-9 resolution

Answered 2026-10-13. The site stores the name in a cookie. The record is `docs/product/journeys.md`.

[Decision 0009](decisions/0009-player-id.md) later added a player id in that same cookie. The screen still shows the name. The player id is how two players with the same name are told apart.

## OQ-7 resolution

Answered 2026-10-13. Seating order is the time each player joined the room, earliest first. The host joins by creating the room. Who bids first in round 1 was not stated. That remainder is OQ-10.

## OQ-10 resolution

Answered 2026-10-13. When the host starts the match, the host chooses which player bids first in round 1. That player leads the first trick. The record is `docs/product/journeys.md`.

## OQ-8 resolution

Answered 2026-10-13. From the start of the match, every player sees a dashboard: cumulative scores, a ranking table, and a graph with one line per player showing the points gained or lost each round. The record is `docs/product/journeys.md`.

## OQ-11 resolution

Answered 2026-10-13. Yes. Version 1 is a serverless website that stays idle until someone plays. The record is [decision 0002](decisions/0002-serverless-hosting.md), status ACCEPTED. The hosting company is OQ-12.

## OQ-12 resolution

Answered 2026-10-13. AWS hosts version 1. CloudFront is the front door. The user chose it because they already have an AWS account and are comfortable with AWS. The record is [decision 0003](decisions/0003-aws-cloudfront.md), status ACCEPTED.

## OQ-13 resolution

Answered 2026-10-13. S3 holds the website files, Lambda runs requests, and DynamoDB stores rooms and matches. Many matches can run at the same time. The record is [decision 0004](decisions/0004-s3-lambda-dynamodb.md), status ACCEPTED.

The user also called the site a public global website. The vision now says the site is public and many invited matches can run at once. The no-lobby rule stays.

## OQ-14 resolution

Answered 2026-10-13. One region: Mumbai, `ap-south-1`, because the project is in India. The record is [decision 0005](decisions/0005-mumbai-region.md), status ACCEPTED.

## OQ-15 resolution

Answered 2026-10-13. The website is React. The Lambda code is Python. The record is [decision 0006](decisions/0006-react-and-python.md), status ACCEPTED.

## OQ-16 resolution

Answered 2026-10-13. The React app uses an HTTP API to create, join, and load a room, and a WebSocket API while players are in the room. API Gateway holds the connections. Lambda checks an action, saves the match, and pushes the result to the other players. The record is [decision 0007](decisions/0007-api-gateway-and-live-updates.md), status ACCEPTED.

[Decision 0008](decisions/0008-iot-core-notifications.md) later replaced the WebSocket push. The HTTP API remains.

## OQ-17 resolution

Answered 2026-10-14. DynamoDB keeps every match the host has started, including after everyone has left. The kept record is the date the match started, the room id as its name, the players who were there, and the points each player gained or lost in each scored round. The dashboard can open that match later by its room id and show those rounds. A review of every deal, bid, trump, and trick stays out of version 1. The record is `docs/architecture/data-model.md`.

## OQ-18 resolution

Answered 2026-10-13. No container starts when a match begins. The match stays in DynamoDB. Lambda runs each action and then stops. AWS IoT Core carries the live notices, so the API Gateway WebSocket is unused. The record is [decision 0008](decisions/0008-iot-core-notifications.md), status ACCEPTED.

## OQ-19 resolution

Answered 2026-10-14. The website is responsive. It works on a computer and on a phone. Native Android and iOS apps stay FUTURE. The record is `docs/product/non-functional.md`.

## OQ-20 resolution

Answered 2026-10-14. There is no stricter limit. A bid or a card should feel real-time, and a delay of 1 or 2 seconds is acceptable. The first request after a quiet period can be slower because of a cold start, which [decision 0002](decisions/0002-serverless-hosting.md) already records. The record is `docs/product/non-functional.md`.

## OQ-21 resolution

Answered 2026-10-14. Version 1 states no uptime percentage and no cost ceiling. CloudFront is the front door, on the AWS free tier. Lambda runs when a request arrives, then stops. API Gateway and DynamoDB stay in place. The record is `docs/product/non-functional.md`.

## OQ-22 resolution

Answered 2026-10-14. The React app on the laptop talks to the deployed AWS services: API Gateway, Lambda, DynamoDB, and IoT Core. There is no local stand-in. The record is `docs/architecture/delivery.md`.

## OQ-23 resolution

Answered 2026-10-14. A player who would be the 11th is not seated. That player sees the error message “room is full”. A player who tries to join after the match has started is not seated and sees that same message.

Before the match starts, if the host leaves the room, the player who joined next after that host becomes the host. The players still in the room stay in join order, earliest first, so the new host is seat 1. When that host was the only player, the room has no seated player and the room id stays reserved. A match still starts only when 3 to 10 players are seated. The record is `docs/product/journeys.md`, `docs/product/requirements.md`, `docs/architecture/contracts.md`, and `docs/architecture/data-model.md`.

## OQ-24 resolution

Answered 2026-10-14. The extra wait from outside India may pass 2 seconds, and that wait is acceptable. A delay of 1 or 2 seconds remains the ordinary feel. A cold start may still be slower. The record is `docs/product/non-functional.md`.

## OQ-25 resolution

Answered 2026-10-14. The user chose option C in [PREP-001](tasks/prep/PREP-001-milestone-slice.md). The first milestone slice is all of version 1. The implementation tasks cover the confirmed product: the name and player id in the cookie, creating and joining a room, leaving before the start, starting the match, the complete match in `docs/game/rules.md`, the live dashboard, looking back by room id, the list of matches for this browser's player id, and the laptop deploy those calls use.

Android and iOS stay FUTURE. A public lobby, income, a trick-by-trick review, a separate rules engine, and a server that stays up for the match stay out. The waiting-room recommendation in that task was not accepted.

Prior notes that are easy to mistake for answers:

- `docs/game/rules.md` is the version-1 game. It does not by itself name the rest of the product boundary.
- The Digital section of `docs/tasks.md` lists earlier ideas (a review of a finished match, a separate rules engine, an authoritative server, Android and iOS). DISC-002 classifies them in `docs/product/requirements.md`. Android and iOS are FUTURE in the vision. A trick-by-trick review stays unaccepted. Looking back at each round's points is confirmed in OQ-17. A separate rules engine and an authoritative server stay unaccepted. Room creation and joining are confirmed in `docs/product/vision.md`.

## OQ-26 resolution

Answered 2026-10-15. DNS for `arkil.in` is managed at GoDaddy. The site name is `bidmaster.arkil.in`. CloudFront stays the front door, and the GoDaddy records are added by hand. The record is `docs/architecture/delivery.md`.
