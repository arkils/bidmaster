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

## Version 2

CONFIRMED on 2026-10-15. Version 2 is finished. It keeps version 1 and adds what the version 2 tasks shipped:

- Players open `https://bidmaster.arkil.in`.
- A rules page explains the match. Opening it does not ask for a name and does not join a room.
- The screen shows each player's name and does not print a seat number. The stored match still numbers the seats.
- A scored round stays on the table until the host, or any player after 5 seconds, presses OK. The next round starts only then.
- Anyone can watch a started match's dashboard. That page has its own live connection, so opening it does not stop the room.
- A bid, a played card, and a player's own turn have the sounds in [look.md](look.md).

## Version 3

CONFIRMED on 2026-10-15. Version 3 is the target. It is not built, and no version 3 task is in progress. It keeps version 2 and aims at three outcomes:

- The table should hold a player the way a short video holds a viewer, and the way a children's show holds a child. Each moment is attractive, rewarding, and already pulling toward the next bid, card, or trick. The draw is the look, the motion, and the feel of the screen. It is not a new way to start the next match. The rules in `docs/game/rules.md` stay the game. Which motions, sounds, and rewards do that are not chosen yet.
- The page shows ads on the side. Version 3 is a source of income. Which ad network, and what a phone does when there is no side column, are not chosen yet.
- Android and iOS are the same website, installed on a phone home screen. There is no native app and no store binary. The site already works in a phone browser. Being installable is the new part.

A public lobby, accounts, and any retention that blocks Leave room stay out of this target.

CONFIRMED on 2026-10-15. The first slice is the look, the motion, and the feel of play. Side ads and the home-screen install wait. The first moment is a played card leaving the hand and landing in the trick. On the screen of the player who played it, that card lifts, travels to its place in the trick, and snaps down. `card.mp3` still plays once. No new sound and no score pop. A hand stays flat until it is that player's turn. A bid, the turn mark, a won trick, and a new deal stay as they are. The record of the choices is [OQ-27](../open-questions.md), [OQ-28](../open-questions.md), and [OQ-29](../open-questions.md).

CONFIRMED on 2026-10-15. A seated player can send a reaction to the others at the table: one of 👏 😂 🔥 😮 😬, or one of these lines: Nice one, Well bid, Wow, Unlucky, Good game. The player cannot type a message. The dashboard does not show it, and the match does not store it. The task is [V3-002](../tasks/v3/V3-002-reactions.md). It is unstarted.

## Non-goals

CONFIRMED. Version 1 is not a source of income. Version 3 drops that non-goal. The page shows ads on the side.

CONFIRMED. There is no public lobby. A game starts from an invitation.

## Source material

`docs/game/rules.md` is the version-1 game. Confirmed 2026-10-13.

The Digital section of `docs/tasks.md` listed earlier ideas. Room creation and joining are confirmed above. Android and iOS are the version 3 website, above. A trick-by-trick review of a finished match, a separate rules engine, and an authoritative server stay unaccepted. Looking back at each round's points is confirmed above. DISC-002 classifies the rest in `docs/product/requirements.md`.
