# User journeys

Status: recorded by [DISC-003](../tasks/discovery/DISC-003-user-journeys.md). Each journey below is CONFIRMED unless a step says otherwise.

## Give a name

- Person: anyone opening the site for the first time. That includes the host and a friend.
- Start: they open the website and the site does not yet have their name.
- Steps:
  1. A popup asks for their name. This is the first thing the site asks.
  2. They enter the name.
- End: the popup closes, and the site shows Create room and Join room. The site stores two values in a cookie: the name they typed, and a player id generated once on this browser. The screen shows the name. It does not show the player id. On a later visit, while that cookie is present, the popup stays closed and the site still knows both values. See [decision 0009](../decisions/0009-player-id.md).

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
- End: the friend is in the room. The match has not started. A join that would seat an 11th player is refused, and the friend sees the message “room is full”. A join after the match has started is refused with that same message.

## Join by room id

- Person: a player who knows the room id.
- Start: the player has entered their name, and the site is showing Create room and Join room.
- Steps:
  1. The player chooses Join room.
  2. The player enters the room id, for example `funny-monkey`.
  3. The player joins the room, using the name already entered.
- End: the player is in the room. The match has not started. A join that would seat an 11th player is refused, and the player sees the message “room is full”. A join after the match has started is refused with that same message. An id that is not two words with a hyphen, or that names no room, stays on this page. The join field stays open, the address does not change, and the message is “there is no room with that id”.

## The host leaves before the start

- Person: the host.
- Start: the room exists and the match has not started.
- Steps:
  1. The host leaves the room.
  2. The player who joined next after that host becomes the host.
- End: the players still in the room stay in join order, earliest first. Seats are numbered again from 1, so the new host is seat 1. When the host was the only player, the room has no seated player and the room id stays reserved. A match still starts only when 3 to 10 players are seated.

## Start the match

- Person: the host.
- Start: the room is open and other players have joined.
- Steps:
  1. The host decides that everyone who should play has joined. A match has 3 to 10 players, as `docs/game/rules.md` requires, so the host starts only when the room is in that range.
  2. The host chooses which player bids first in round 1. That player also leads the first trick.
  3. The host starts the match.
- End: the match starts. Seating is fixed at that moment, and the round-1 first bidder is the player the host chose.

Seating order is the order in which players joined the room, earliest first. The player who creates the room is the first host, so that time is the first host's join time. If that host leaves before the start, the player who joined next becomes the host and seat 1. Later players take the following seats. Play proceeds clockwise through that order, as `docs/game/rules.md` already requires. In later rounds, the first bidder moves one seat clockwise, as those rules already require.

## Play the match

- Person: every player in the match.
- Start: the host has started the match. The players are on the room page.
- Steps: the players play the match in `docs/game/rules.md`. That is a deal, a private hand, a bid from each player, a trump suit, tricks until the dealt cards are gone, a round score, and the next round, through the last round. A player sees only their own cards. The screen shows names and does not print seat numbers. When a round is scored, the last trick keeps its pause, then the result stays up until the host, or any player after 5 seconds, presses OK. That OK hides the result for everyone, and the next round starts only then. After the last round, OK hides the result and deals nothing further.
- End: the players are ranked by those rules, and the dashboard shows that result.

## Rules

- Person: anyone, including a player who has not given a name.
- Start: the home page, or a room.
- Steps:
  1. From home, Rules sits below Create room and Join room and opens `/rules`.
  2. From a room, Rules sits with Copy link and Dashboard and opens `/rules/{roomId}`.
  3. The page explains the match in `docs/game/rules.md`. Opening it does not join the room.
- End: Home returns to the home page. Room returns to the room the player left. The dashboard uses that same word.

## Dashboard

- Person: anyone with the dashboard address, including a player in the match.
- Start: the match has started. Play stays on the room page, at `/{roomId}`. The dashboard is at `/dashboard/{roomId}`, for example `/dashboard/funny-monkey`. Opening it does not ask for a name and does not join the room. It listens on its own connection, so the room page keeps its own.
- What it shows:
  1. Each player's cumulative score for this match. Every score starts at 0 and updates when a round is scored.
  2. A table that ranks the players and shows each cumulative score. Rank follows `docs/game/rules.md`: a higher cumulative score ranks first. When scores are equal, more successful bids rank higher. When the score and the number of successful bids are both equal, those players share the rank. Players who share the highest rank share the win.
  3. A graph with one line per player. For each round that has been scored, the line shows how many points that player gained or lost in that round.
  4. A second graph with one line per player. Each line starts at 0 and, after every scored round, shows that player's cumulative score.
- End: after the last round is scored, the table shows the final ranking and both graphs include every round.

## Look back at a match

- Person: a player who knows a match's room id.
- Start: the host has started that match. The players may already have left.
- Steps:
  1. The player opens the dashboard for that room id, for example `funny-monkey`.
  2. The dashboard shows the date the match started, the players who were there, and every round that has been scored.
  3. For those rounds it shows the same views as the live dashboard: cumulative scores, the ranking, the graph of points gained or lost each round, and the graph of each player's running total.
- End: the player has seen that match's results. The cards, bids, and trump of those rounds are not part of this view.

The dashboard also lists the matches this browser's player id sat in. Each entry shows the date, the room id, and the names the players used. Opening one shows that match's rounds, as above. Another browser, or this browser after the cookie is cleared, has a different player id and does not show this list.
