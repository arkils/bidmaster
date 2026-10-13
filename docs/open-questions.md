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
| OQ-17 | What does DynamoDB keep after everyone has left the room? | OPEN | DISC-005 |
| OQ-18 | When a match starts, do players stay on API Gateway and Lambda, with the match in DynamoDB, or does a container start, hold the match, and keep the live connections? | OPEN | DISC-005 |

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

## OQ-17

A finished-match review is classified out of version 1 in `docs/product/requirements.md`. DISC-005 does not decide what DynamoDB keeps after the room is empty until the user answers. This waits on OQ-18, because the answer depends on where the live match lives.

## OQ-18

The user asked on 2026-10-13 whether, once a match starts, a container should hold the match state and the live connections, while create, join, and load stay on Lambda. That choice is unanswered. [Decision 0007](decisions/0007-api-gateway-and-live-updates.md) stays ACCEPTED as the current record. The container is not accepted. The data model stays unwritten until this is answered.

Prior notes that are easy to mistake for answers:

- `docs/game/rules.md` is the version-1 game. It does not by itself name the rest of the product boundary.
- The Digital section of `docs/tasks.md` lists earlier ideas (a review of a finished match, a separate rules engine, an authoritative server, Android and iOS). DISC-002 classifies them in `docs/product/requirements.md`. Android and iOS are FUTURE in the vision. The other three stay unaccepted. Room creation and joining are confirmed in `docs/product/vision.md`.
