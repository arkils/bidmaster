# Product vision

Status: recorded by [DISC-001](../tasks/discovery/DISC-001-product-vision.md). Statements below use the labels in `docs/README.md`.

## What we are building

CONFIRMED. Version 1 is a working web application: a page hosted on the internet where people play.

## Who it is for

CONFIRMED on 2026-10-13. People who already play this game, each in their own invited group. The website is public and global, and many matches can run at the same time. A player still joins a room by invitation.

## Version 1

CONFIRMED on 2026-10-13:

- The application is a website. It is responsive, and it works on a computer and on a phone.
- It is a serverless website on AWS. Decisions [0002](../decisions/0002-serverless-hosting.md), [0003](../decisions/0003-aws-cloudfront.md), [0004](../decisions/0004-s3-lambda-dynamodb.md), and [0005](../decisions/0005-mumbai-region.md) are accepted. CloudFront is the front door. S3, Lambda, and DynamoDB run in Mumbai (`ap-south-1`). Many matches can run at the same time. The site is idle when nobody is playing.
- The first time someone arrives, a popup asks for their name. The site stores that name and a player id in a cookie. The screen shows the name. After that, they choose Create room or Join room. The room has a memorable two-word id in its URL, in the style of `funny-monkey`. A player joins by opening that URL or by typing the id. The host starts the match when they think everyone has joined, and chooses who bids first in round 1. Seats follow the order in which players joined.
- Invited players can join that room and play a complete game.
- That game is the tabletop rules in `docs/game/rules.md`: a match of 3 to 10 players, equal deals, bids, trump, tricks, exact-bid scoring, and a winner after the last round. Players who share the highest rank share the win.
- A dashboard shows each player's cumulative score, a ranking table, a graph with one line per player for how many points they gained or lost each round, and a second graph of each player's running total from 0. Play starts on the room page. After the match has started, anyone can open that dashboard by its room id and watch the scores, without joining. DynamoDB keeps every started match, and the same dashboard shows that result for every round. It can also list the matches this browser's player id played.

## Non-goals

CONFIRMED. Version 1 is not a source of income.

CONFIRMED. Version 1 has no public lobby. A game starts from an invitation.

FUTURE. Android and iOS apps are wanted after version 1.

## Source material

`docs/game/rules.md` is the version-1 game. Confirmed 2026-10-13.

The Digital section of `docs/tasks.md` listed earlier ideas. Room creation and joining are confirmed above. Android and iOS are FUTURE, above. A trick-by-trick review of a finished match, a separate rules engine, and an authoritative server stay unaccepted. Looking back at each round's points is confirmed above. DISC-002 classifies the rest in `docs/product/requirements.md`.
