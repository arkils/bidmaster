# Requirements

Status: recorded by [DISC-002](../tasks/discovery/DISC-002-requirements.md) and extended during [DISC-003](../tasks/discovery/DISC-003-user-journeys.md) when the user confirmed how a room works. Each item traces to the vision or to that confirmation.

## CONFIRMED

- Version 1 is a website people open in a browser.
- The site is serverless on AWS. CloudFront is the front door. S3, Lambda, and DynamoDB run in Mumbai (`ap-south-1`). S3 holds the website files, Lambda runs each request, and DynamoDB stores the rooms and matches. See decisions [0002](../decisions/0002-serverless-hosting.md), [0003](../decisions/0003-aws-cloudfront.md), [0004](../decisions/0004-s3-lambda-dynamodb.md), and [0005](../decisions/0005-mumbai-region.md).
- Many matches can run at the same time. Each match belongs to its own room.
- The website is on the public internet. A player still enters a room by its URL or its room id.
- A player can create a room.
- The first time a person arrives, a popup asks for their name before anything else. The host enters this name before creating a room. The site stores that name in a cookie and uses it on later visits while the cookie is present.
- After the name is entered, the website offers Create room and Join room.
- Creating a room produces a URL. The room id is the last part of that URL.
- The room id is two ordinary words joined by a hyphen, in the style of `funny-monkey`. It is easy to remember. It is not a string of random characters.
- The host can copy the URL and send it to a friend.
- A friend who opens that URL joins the room. If the site does not yet have their name, the name popup comes first.
- A player can instead choose Join room, type the room id, and join with the name already entered.
- The host is the player who created the room. When the host thinks everyone has joined, the host chooses which player bids first in round 1, then starts the match. That player also leads the first trick.
- Seating order is the order in which players joined the room, earliest first. The host's join time is the time the room was created. Play proceeds clockwise through that order.
- An invited player can join the room.
- Players in the room can play a complete match under `docs/game/rules.md`.
- From the moment the match starts, every player in the room sees a dashboard. It shows each player's cumulative score for this match, starting at 0 and updating when a round is scored. It includes a ranking table of those scores, ranked by `docs/game/rules.md`. It includes a graph with one line per player, showing how many points that player gained or lost in each scored round.
- Version 1 is not a source of income.
- Version 1 has no public lobby. A game starts from an invitation.
- While players are in a room, the table is live. One player's action is pushed to the others. See [decision 0007](../decisions/0007-api-gateway-and-live-updates.md).

## PROPOSED

None. What DynamoDB keeps after everyone leaves a room is still open. See OQ-17 in `docs/open-questions.md`.

## FUTURE

- An Android app.
- An iOS app.

## Classified out

These sentences appear only in the Digital section of `docs/tasks.md`. They are not requirements.

- A program message for every illegal or out-of-turn action. Where `docs/game/rules.md` already states a rejection, that text stays in the rules.
- A review of a finished match, including every deal, bid, trump, and trick.
- A rules engine kept separate from the interface.
- An authoritative server for online play.

Creating a room and joining it are CONFIRMED above, from the vision. Web play is CONFIRMED above. Android and iOS are FUTURE above. Where `docs/game/rules.md` already states a rejection, that text stays in the rules. It is not restated here as a new digital requirement.
