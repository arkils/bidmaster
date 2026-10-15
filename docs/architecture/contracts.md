# Interface contracts

Status: recorded by [DISC-006](../tasks/discovery/DISC-006-interface-contracts.md). These operations match the journeys, the [data model](data-model.md), and decisions [0007](../decisions/0007-api-gateway-and-live-updates.md) and [0008](../decisions/0008-iot-core-notifications.md).

The React app calls the HTTP API behind CloudFront. Live notices are MQTT messages on AWS IoT Core. The browser cookie holds the typed name and a player id. Giving a name is not a call: both values are written in the browser. See [decision 0009](../decisions/0009-player-id.md). There is no user account and no API Gateway WebSocket.

On every HTTP call the caller is that browser. The player id identifies the player. The screen shows the name and does not print the seat number. Seats are numbered from 1 in join order. The host is seat 1. A message still carries that seat number and the name on the seat, so two players with the same name stay distinct. Responses and room notices do not include other players' ids, and they do not include how many cards another player still holds. The caller's own id stays in the cookie. A missed notice is repaired by loading the room again. DynamoDB remains the match.

A call that the rules or the journeys forbid is not applied. The match stays as it was. Version 1 does not add a program message for every illegal or out-of-turn action. The rejection sentence the rules already state is named on **Submit a bid**. **Join a room** names the message “room is full” when the room already has 10 players, and when the match has already started.

## Create a room

- Caller: the host, after the cookie has a name and a player id.
- Channel: HTTP API.
- Inputs: the host's name and player id.
- Outputs: a new room id of two ordinary words joined by a hyphen, in the style of `funny-monkey`, and a URL whose last part is that id. The host is seat 1. The match has not started.
- Errors: none beyond a missing name. The site asks for the name before it offers Create room, so this call is made with a name. The new id does not reuse an id that already belongs to a room record. A started match keeps its id. An unstarted room is also a room record, and no operation deletes it, so that id stays reserved too.

## Join a room

- Caller: a friend who opened the room URL, or a player who typed the room id. The cookie already has a name and a player id.
- Channel: HTTP API.
- Inputs: the room id, the player's name, and the player's id.
- Outputs: the room id, and the joined players in join order, earliest first. Each player is a seat number and a name. Two players may have the same name.
- Errors: there is no room with that id. The room already has 10 players, so this player would be the 11th. The join is not applied, and the error message is “room is full”. The match has already started, so seating is fixed. The join is not applied, and the error message is “room is full”. The caller's player id is already seated and the match has not started, so the call does not add a second seat. It updates that seat's name from the cookie and returns the room.

## Leave the room

- Caller: the host, before the match starts.
- Channel: HTTP API.
- Inputs: the room id and the host's player id.
- Outputs: the host is no longer seated. When another player remains, the player who joined next becomes the host and seat 1. The remaining players are returned in join order, earliest first, numbered again from 1. When the host was the only player, the room has no seated player. The room id stays reserved.
- Errors: the match has already started, so the leave is not applied. The caller is not the host, so the leave is not applied. Version 1 adds no further sentence for those two cases.

## Load a room

- Caller: a browser that knows the room id. This is also how the dashboard looks back at a match, including a browser that is not seated and has no player id.
- Channel: HTTP API.
- Inputs: the room id, and the caller's player id when the cookie has one.
- Outputs before the match starts: the room id and the joined players in join order. Each player is a seat number and a name.
- Outputs after the match starts: the date the host started it, the players in seat order as a seat number and the name they used in this match, and the points each player gained or lost in each scored round. The current round, while it is still being played, includes the bids already submitted, the trump suit once chosen, the tricks already won, the cards in the trick in progress, and whose turn it is. Each of those is tied to a seat number. While a scored round is waiting, the output includes the time it was scored. The caller's own cards are included only when the caller's player id is seated. Scored rounds do not include cards, bids, or trump.
- Errors: there is no room with that id.

Cumulative scores, rank, and the graph are calculated from the round points. Rank follows `docs/game/rules.md`.

## Start the match

- Caller: the host.
- Channel: HTTP API.
- Inputs: the room id, the host's player id, and the seated player who bids first in round 1. That player is chosen by seat, so two players with the same name stay distinct.
- Outputs: the match has started on this date. Seating is the join order, fixed now. The chosen seat bids first in round 1 and leads the first trick. The first hand has been dealt. Each seated player's cards are not in this response. They go out on that player id's private topic.
- Errors: the caller is not the host. The room has fewer than 3 or more than 10 joined players. The chosen seat is not occupied. The match has already started. In each of these cases the start is not applied.

## Submit a bid

- Caller: the seated player whose turn it is to bid.
- Channel: HTTP API.
- Inputs: the room id, the caller's player id, and one whole-number bid.
- Outputs: the bid is stored on the caller's seat. When every seated player has bid, the response gives the seat that selects trump, by the rule in `docs/game/rules.md`: the first seat in that round's bidding order to bid the highest number. When every bid is 0, the seat that bid first that round selects trump.
- Errors: the rules reject a last bid that would make the sum of bids equal the number of tricks in the round. The surfaced sentence is that the bid would make the total equal the tricks in the round. Any other bid the rules forbid is not applied, and version 1 adds no further sentence. That includes a bid that is not a whole number from 0 through the cards dealt this round, a second bid by the same player, and a bid from a player whose turn it is not.

## Select trump

- Caller: the player id seated in the seat that selects trump, after every bid of this round is stored.
- Channel: HTTP API.
- Inputs: the room id, the caller's player id, and one of the four suits: clubs, diamonds, hearts, or spades.
- Outputs: that suit is trump for this round and stays fixed. The seat that bid first this round leads the first trick.
- Errors: bids for this round are not all stored, the caller is not the player id in the seat that selects trump, or the suit is not one of the four. The selection is not applied, and version 1 adds no further sentence.

## Play a card

- Caller: the seated player whose turn it is to play.
- Channel: HTTP API.
- Inputs: the room id, the caller's player id, and one card from that player's hand.
- Outputs: the card is in the trick, tied to the caller's seat. When the trick is complete, the output gives the winning seat. That seat leads the next trick, unless the round's dealt cards are gone. When the round's dealt cards are gone, the output includes each seat's points for the round, added to the kept results, and the time that result was scored. This call does not deal the next round. The table stays on that result until **Accept the round result**. The caller's cards are not in this response. When the round continues, the caller's remaining cards go out on that player id's private topic.
- Errors: a play the rules forbid is not applied, and version 1 adds no further sentence. That includes a card the player does not hold, a play when it is not that player's turn, and a failure to follow the led suit while the player still holds that suit.

## Accept the round result

- Caller: a seated player, while a scored round is waiting.
- Channel: HTTP API.
- Inputs: the room id and the caller's player id.
- Outputs: the waiting result is cleared for every subscriber. When another round remains, that round is dealt. The rules move the first bidder one place clockwise from the previous round, and the notice names that seat. Each seated player's new hand goes out on that player's private topic. When the accepted result was the last round, the match is over, the ranking is final, and no hand is dealt.
- Errors: no result is waiting. The caller is not seated. The caller is not seat 1, and 5 seconds have not passed since the score. The accept is not applied.

## Subscribe

- Caller: the browser of a player who has joined the room, or a browser watching a started match.
- Channel: AWS IoT Core. The authorizer is a Python Lambda.
- Inputs: the room id and an id. A seated player's room page uses that player's id. A dashboard page uses a different id for that page, even when the browser belongs to a seated player. That id is not the seated player's id.
- Outputs: the subscription is allowed for the room topic. The seated player's room page may also subscribe to that player id's topic for that same room, and that connection stays up while a dashboard is open. A dashboard receives the room's public notices and not a player's cards.
- Errors: there is no such room. The match has not started and the id is not seated. The subscription is refused. A dashboard is not given a player's topic. Joining the room to play is still refused after the match has started.

## Room notice

- Caller: Lambda, after it has saved a successful join, leave, start, bid, trump, card, or accepted result.
- Channel: the room's shared IoT topic. Every allowed subscriber for that room receives the same message.
- Inputs: none from the browser. Lambda publishes.
- Outputs: one of these public facts, and no player's cards. Each player in a notice is a seat number and the name on that seat.
  - A player joined, with the joined seats in order.
  - The host left before the start, with the remaining seats in order. The new host is seat 1.
  - The match started, with the seat order and the seat that bids first in round 1.
  - A bid was stored on a seat, including the bid number. When bidding is complete, the seat that selects trump.
  - The trump suit.
  - A card played from a seat, including that card's suit and rank, the winning seat when the trick is complete, and the seat that leads next.
  - A scored round is waiting: each seat's points gained or lost, the cumulative scores, the ranking, and that round's gain or loss for the graph. The next round is not dealt in this notice.
  - The waiting result was accepted. When another round is dealt, the notice names the seat that bids first. When the match is over, the notice says so and no hand is dealt. Ranking names each seat.
- Errors: none. A subscriber who missed a notice loads the room.

## Private notice

- Caller: Lambda, after it has dealt a hand or applied a card that player played.
- Channel: that player's IoT topic.
- Inputs: none from the browser. Lambda publishes.
- Outputs: that player's current cards, and nothing for any other player.
- Errors: none. A player who missed it loads the room and receives only their own cards.

## List my matches

- Caller: the browser whose cookie has a player id.
- Channel: HTTP API.
- Inputs: the caller's player id.
- Outputs: the kept matches in which that player id was seated. Each entry has the date the match started, the room id, and the seated players in seat order under the names they used. Opening one is **Load a room**.
- Errors: the cookie has no player id. The list is empty when that id has not sat in a started match. This is not a list of every match on the site.
