# Data model

Status: recorded by [DISC-005](../tasks/discovery/DISC-005-data-model.md). It matches the confirmed product and [decision 0008](../decisions/0008-iot-core-notifications.md).

DynamoDB is the store. The browser cookie holds the typed name and a player id generated once on that browser. The screen shows the name and hides the player id. There is no user account. See [decision 0009](../decisions/0009-player-id.md).

## Kept match

CONFIRMED on 2026-10-14, from the user's answer to OQ-17. DynamoDB keeps every match the host has started. It keeps that match after everyone has left the room. The record does not expire.

A kept match has:

- The date the host started it.
- The room id, which is the name of the match, in the style of `funny-monkey`.
- The players who were seated when the match started, in seat order. Seats are numbered from 1. The host is seat 1. Each seat has a player id and the name that player used in this match. The screen shows the name and does not print the seat number. A message still carries the seat number and the name, so two players with the same name stay distinct.
- The seat that bids first in round 1. Each later round moves that seat one place clockwise, as `docs/game/rules.md` requires.
- The result of each round that has been scored. For each player, that result is the points gained or lost in that round.

The dashboard opens a kept match by its room id and shows all of those rounds: cumulative scores, the ranking, the graph of each round's gain or loss, and the graph of each player's running total from 0. It also lists every kept match whose seats include this browser's player id. Cumulative scores are the sum of the round results. Rank follows `docs/game/rules.md`. A higher cumulative score ranks first. When scores are equal, more successful bids rank higher. When the score and the number of successful bids are both equal, those players share the rank. Players who share the highest rank share the win. A successful bid is a round whose points are positive, which is the exact-bid rule in `docs/game/rules.md`.

One room id names one room record. A later room does not reuse an id that already belongs to a room record. A started match keeps that id. An unstarted room is not a past match and is not listed as a result. The website has no action that deletes a room, so its id stays reserved. Before the actual deployment, an operator can clear every stored room with the script in [clear-stored-data.md](clear-stored-data.md). After that script runs, those room ids are free.

## What looking back does not include

CONFIRMED. A review of every deal, bid, trump, and trick is classified out in `docs/product/requirements.md`. The dashboard's look back shows the round results above. It does not show each card, and it does not show the seat that bids first in round 1. That seat stays on the stored match so a later round's opener can be told.

## While a round is being played

CONFIRMED for the product because version 1 plays `docs/game/rules.md` (OQ-2) and [decision 0008](../decisions/0008-iot-core-notifications.md) says Lambda loads the match from DynamoDB to apply those rules.

Until the current round is scored, the match also holds the state of that round: each player's hand, the bids already submitted, the trump suit once it is chosen, the tricks already won, the trick in progress, and whose turn it is. A hand, a bid, a played card, a trick winner, and the turn are tied to a seat. The hand is also tied to that seat's player id. Those cards are sent only to that player. When the round is scored, the points become a kept round result and the match records the time of that result. The next round is not dealt yet. Seat 1 can accept the result at once. Another seated player can accept it 5 seconds after that time. One accept clears the waiting result. If another round remains, it is dealt then. If that was the last round, the match is over and nothing further is dealt. The cards, bids, and trump of a scored round are not part of the history the dashboard shows later. The load does not include how many cards each other player still holds.

Opening the room id loads this same match. An unfinished match is still that match: the rounds already scored, and the round still in progress.

## Before the host starts the match

The room holds the room id, the host's player id and name, and each joined player with their player id, their name, and the time they joined. Two joined players may use the same name. Their player ids differ. Seat order is that join order, earliest first. The first host's join time is the time the room was created. Before the match starts, a player who joins again with the same player id keeps that seat and the seat's name becomes the name in the cookie. Before the match starts, if the host leaves, that player is no longer seated. The player who joined next becomes the host. Seats are numbered again from 1 in the join order of the players who remain, so the new host is seat 1. A room already has at most 10 seated players. When the host starts the match, those seated players, their names, and the host's choice of which seat bids first in round 1, are fixed on the match.

## Relationships

- A room id names at most one match.
- A match has 3 to 10 players, fixed when the host starts it.
- A match has one kept result per scored round, and one points number per seated player in that round.
- The number of rounds, and how many cards each round deals, come from the player count and `docs/game/rules.md`. They are calculated, not chosen separately. That calculation is CONFIRMED for the product by OQ-2.

## Not stored

- API Gateway connection ids. Live notices use AWS IoT Core. See [decision 0008](../decisions/0008-iot-core-notifications.md).
- A reaction. It is a live notice only. The match does not keep it, and reloading the room does not bring it back.
- A user account or a password. There is still no public lobby. A past match is opened by its room id. The only match list is the one for the player id in this browser's cookie.
- The cards, bids, and trump of a scored round, as a history the dashboard shows later.
