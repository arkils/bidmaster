# Requirements

Status: recorded by [DISC-002](../tasks/discovery/DISC-002-requirements.md) and extended during [DISC-003](../tasks/discovery/DISC-003-user-journeys.md) when the user confirmed how a room works. Each item traces to the vision or to that confirmation.

## CONFIRMED

- Version 1 is a website people open in a browser. The site is responsive. It works on a computer and on a phone. Native Android and iOS apps were left for later. Version 3, below, makes them the same website on a phone home screen.
- The site is serverless on AWS. CloudFront is the front door. S3, Lambda, and DynamoDB run in Mumbai (`ap-south-1`). S3 holds the website files, Lambda runs each request, and DynamoDB stores the rooms and matches. See decisions [0002](../decisions/0002-serverless-hosting.md), [0003](../decisions/0003-aws-cloudfront.md), [0004](../decisions/0004-s3-lambda-dynamodb.md), and [0005](../decisions/0005-mumbai-region.md).
- Many matches can run at the same time. Each match belongs to its own room.
- The website is on the public internet. A player still enters a room by its URL or its room id.
- A player can create a room.
- The first time a person arrives, a popup asks for their name before anything else. The host enters this name before creating a room. The site stores that name and a player id in a cookie. The player id is generated once on that browser and is not shown. The screen shows the name. See [decision 0009](../decisions/0009-player-id.md).
- After the name is entered, the website offers Create room and Join room.
- Creating a room produces a URL. The room id is the last part of that URL.
- The room id is two ordinary words joined by a hyphen, in the style of `funny-monkey`. It is easy to remember. It is not a string of random characters.
- The host can copy the URL and send it to a friend.
- A friend who opens that URL joins the room. If the site does not yet have their name, the name popup comes first.
- A player can instead choose Join room, type the room id, and join with the name already entered.
- A join that would seat an 11th player is refused. The player sees the error message “room is full”. A join after the match has started is refused with that same message.
- The host starts as the player who created the room. Before the match starts, if the host leaves, the player who joined next after that host becomes the host and seat 1. The players still in the room stay in join order, earliest first. When the host thinks everyone has joined, the host chooses which player bids first in round 1, then starts the match. That player also leads the first trick. A match still starts only when 3 to 10 players are seated.
- Seating order is the order in which players joined the room, earliest first. The first host's join time is the time the room was created. Play proceeds clockwise through that order.
- An invited player can join the room.
- Players in the room can play a complete match under `docs/game/rules.md`.
- A rules page explains how to play, following `docs/game/rules.md`. Home links to it below Create room and Join room. A room links to it beside Copy link and Dashboard. The page links back to that room, or back to home when it was opened from home. Opening it does not ask for a name and does not join a room.
- When the host starts the match, the players stay on the room page and play from there.
- The screen shows each player's name and does not print a seat number. Seats stay numbered in the stored match and in messages, so two players can share a name.
- When a round is scored, the next round does not start. The last trick keeps its pause, then every player sees that round's result. The host, seat 1, can press OK at once. Any other seated player can press OK after 5 seconds. One accepted OK hides the result for everyone. The next round is dealt only then. After the last round, OK hides the result and deals nothing further.
- A dashboard shows each player's cumulative score for this match, starting at 0 and updating when a round is scored. It includes a ranking table of those scores, ranked by `docs/game/rules.md`. It includes a graph with one line per player, showing how many points that player gained or lost in each scored round, and a second graph whose lines start at 0 and show each player's cumulative score after every scored round. After the match has started, anyone can open `/dashboard/{roomId}` and watch those scores, without a seat and without a name. That page does not join the room.
- DynamoDB keeps every match the host has started, including after everyone has left. The kept record is the date the match started, the room id as its name, the players who were there (each with a player id and the name they used), and the points each player gained or lost in each scored round. See [the data model](../architecture/data-model.md).
- From the dashboard, a player can open an earlier match by its room id and see every scored round of that match: the cumulative scores, the ranking, and both graphs. The dashboard also lists the matches stored for this browser's player id.
- Version 1 is not a source of income.
- Version 1 has no public lobby. A game starts from an invitation.
- While players are in a room, the table is live. One player's action is published to the others through AWS IoT Core. See [decision 0008](../decisions/0008-iot-core-notifications.md). The HTTP API remains [decision 0007](../decisions/0007-api-gateway-and-live-updates.md). The dashboard listens on its own connection. Opening it does not stop live updates on the room.

## Version 3

CONFIRMED on 2026-10-15. These are the target. They are not build tasks, and none of them is in progress.

- The table should hold a player the way a short video holds a viewer, and the way a children's show holds a child. Each moment is attractive, rewarding, and already pulling toward the next bid, card, or trick. The draw is the look, the motion, and the feel of the screen. It is not a new way to start the next match. The rules in `docs/game/rules.md` stay the game. Which motions, sounds, and rewards do that are not chosen yet.
- The page shows ads on the side. Version 3 is a source of income. Version 1 stays "not a source of income," above. Which ad network, and what a phone does when there is no side column, are not chosen yet.
- Android and iOS are the same website, installed on a phone home screen. There is no native app and no store binary. The phone browser already works, above. Being installable is the new part.

A public lobby, accounts, and any retention that blocks Leave room stay out of this target.

## PROPOSED

None.

## FUTURE

None.

## Classified out

These sentences appear only in the Digital section of `docs/tasks.md`. They are not requirements.

- A program message for every illegal or out-of-turn action. Where `docs/game/rules.md` already states a rejection, that text stays in the rules.
- A review of a finished match that shows every deal, bid, trump, and trick. The dashboard's look back at each round's points is CONFIRMED above. It is not this review.
- A rules engine kept separate from the interface. The Python functions on the HTTP and IoT path still apply `docs/game/rules.md`. That is not a separate rules service.
- An authoritative server for online play, meaning a server process that stays up for the match. Lambda checks each action and then stops. That is the accepted design, and it is not this item.

Creating a room and joining it are CONFIRMED above, from the vision. Web play is CONFIRMED above. Android and iOS are the version 3 website, above. Where `docs/game/rules.md` already states a rejection, that text stays in the rules. It is not restated here as a new digital requirement.
