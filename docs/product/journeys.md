# User journeys

Status: recorded by [DISC-003](../tasks/discovery/DISC-003-user-journeys.md). Each journey below is CONFIRMED unless a step says otherwise.

## Give a name

- Person: anyone opening the site for the first time. That includes the host and a friend.
- Start: they open the website and the site does not yet have their name.
- Steps:
  1. A popup asks for their name. This is the first thing the site asks.
  2. They enter the name.
- End: the popup closes, and the site shows Create room and Join room. The site stores the name in a cookie. On a later visit, while that cookie is present, the popup stays closed and the site still knows the name.

## Create a room

- Person: the host. This is the player who creates the room.
- Start: the host has entered their name, and the site is showing Create room and Join room.
- Steps:
  1. The host chooses Create room.
  2. The site creates a room and shows a URL. The last part of the URL is the room id, for example `funny-monkey`.
  3. The host can copy that URL and send it to a friend.
- End: the room exists, and the host has a URL to share. The host's name is the name they entered before this step.

The room id is two ordinary words joined by a hyphen, in the style of `funny-monkey`. It is easy to read, say, and remember. It is not a string of random characters.

## Join from the shared URL

- Person: a friend who received the URL.
- Start: the friend opens the URL.
- Steps:
  1. If the site does not yet have their name, the name popup in **Give a name** comes first.
  2. The friend joins that room, using the name already entered.
- End: the friend is in the room. The match has not started.

## Join by room id

- Person: a player who knows the room id.
- Start: the player has entered their name, and the site is showing Create room and Join room.
- Steps:
  1. The player chooses Join room.
  2. The player enters the room id, for example `funny-monkey`.
  3. The player joins the room, using the name already entered.
- End: the player is in the room. The match has not started.

## Start the match

- Person: the host.
- Start: the room is open and other players have joined.
- Steps:
  1. The host decides that everyone who should play has joined. A match has 3 to 10 players, as `docs/game/rules.md` requires, so the host starts only when the room is in that range.
  2. The host chooses which player bids first in round 1. That player also leads the first trick.
  3. The host starts the match.
- End: the match starts. Seating is fixed at that moment, and the round-1 first bidder is the player the host chose.

Seating order is the order in which players joined the room, earliest first. The host joins by creating the room, so that time is the host's join time. Later players take the following seats. Play proceeds clockwise through that order, as `docs/game/rules.md` already requires. In later rounds, the first bidder moves one seat clockwise, as those rules already require.

## Play the match

- Person: every player in the match.
- Start: the host has started the match.
- Steps: the players play the match in `docs/game/rules.md`. That is a deal, a private hand, a bid from each player, a trump suit, tricks until the dealt cards are gone, a round score, and the next round, through the last round. A player sees only their own cards.
- End: the players are ranked by those rules, and the dashboard shows that result.

## Dashboard

- Person: every player in the room.
- Start: the match has started. The dashboard is on screen from that moment.
- What it shows:
  1. Each player's cumulative score for this match. Every score starts at 0 and updates when a round is scored.
  2. A table that ranks the players and shows each cumulative score. Rank follows `docs/game/rules.md`: a higher cumulative score ranks first. When scores are equal, more successful bids rank higher.
  3. A graph with one line per player. For each round that has been scored, the line shows how many points that player gained or lost in that round.
- End: after the last round is scored, the table shows the final ranking and the graph includes every round.
