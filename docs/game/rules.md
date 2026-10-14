# BidMaster functional rules

Status: reviewed. These are the tabletop rules. Version 1’s digital behavior is the product documents under `docs/product/`.

This is the tabletop game. Rooms, stored history, and clients are outside this document.

A match is a sequence of rounds. A round is a deal, a bid from each player, a trump suit, then tricks until the dealt cards are gone. The match winner is the highest rank after the cumulative score and the successful-bid tie break.

## Players and setup

A match has 3 to 10 players. Seating order is fixed for the match. That order is the turn order.

Every player is dealt the same number of cards in a round. M is the largest number of cards that can be dealt equally from the 52-card deck: the greatest whole number for which M multiplied by the number of players is at most 52. M is never more than 10.

## Round progression

Rounds deal M cards, then one fewer each round, down to 1. The one-card round is then played a second time. Deals then increase by one each round, back to M. M is dealt on the first round and again on the last round. The number of rounds is 2M. Because M is never more than 10, a match has at most 20 rounds.

When M is 5, the deals are 5, 4, 3, 2, 1, 1, 2, 3, 4, 5. That is 10 rounds.

Three players could be dealt 17, because 3 × 17 = 51. M is 10. Four players could be dealt 13, because 4 × 13 = 52. M is 10. Five players give M = 10, because 5 × 10 = 50 and 5 × 11 = 55. Each of those matches deals 10 on the first round and again on the last round, and has 20 rounds. Cards that are not dealt stay out of that round.

Six players cannot be dealt 9 cards, because 6 × 9 = 54. M = 8, because 6 × 8 = 48. That match has 16 rounds.

The next round starts only after the current round has been scored.

## Bidding

Players bid before any card is played. Bidding follows seating order, clockwise. Each player submits one bid. A legal bid is a whole number from 0 through the number of cards dealt to each player this round. A submitted bid cannot be changed.

Any player may bid first in round 1. That same player leads the first trick of the round.

The player who bids first moves one seat clockwise every round. Bidding still goes clockwise around the table, so the player who bid first in one round bids last in the next round. The last bidder remains bound by the rule that the sum of bids must not equal the cards dealt to each player.

There are as many tricks in the round as cards dealt to each player. The sum of all bids must not equal that number.

The last player to bid must choose a bid that keeps the sum different from the cards dealt to each player. Any other bid from that player is rejected. The rejection states that the bid would make the total equal the tricks in the round.

Four players, 7 cards each:

- The first three bids are 2, 1, and 3. The total is 6.
- The last player cannot bid 1, because the total would be 7.
- The last player must bid a different legal number.

## Trump

After every bid is locked, a trump suit is selected and stays fixed for the round. Every round has a trump. The chooser names one of the four suits.

The player who selects trump is the first player in that round's bidding order to bid the highest number. A later player who bids the same number does not take the choice. When every bid is 0, the highest bid is 0, so the player who bid first that round selects trump.

Bidding order A: 2, B: 4, C: 4, D: 1. B selects trump.

## Deck

The deck is a standard 52-card deck. There are four suits: clubs, diamonds, hearts, and spades. Each suit has one card of each rank: Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, and King. There are no jokers.

In every suit, from lowest to highest, the ranks are 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.

The full deck is shuffled before every round. Each player is dealt a hand and may look at it before bidding. A player sees only their own cards.

Cards that are not dealt stay out of that round. They are not played and they are not trump. Before the next round is shuffled, those cards are returned to the deck.

## Tricks

Each trick, every player plays one card. Play proceeds clockwise. One player wins the trick and gains one trick for the round. The winner of a trick leads the next trick. Play continues until every dealt card has been played.

The first card of a trick sets the led suit. A player who still holds that suit must play it. A player with no card of the led suit may play any other card. That card does not have to be trump.

Trump beats every card that is not trump. If more than one trump is played, the higher trump wins. If no trump is played, the highest card of the led suit wins. A card that is neither trump nor the led suit cannot win the trick.

Hearts are led, and spades are trump. The Ace of hearts loses to the 2 of spades. The King of spades beats the 2 of spades. With no spade played, the Ace of hearts beats the King of hearts, and a diamond cannot win.

The player who bids first in that round leads the first trick. The winner of a trick leads the next trick.

## Scoring

A player scores only by matching their bid exactly. The size of a miss does not change the points. The score is negative when the tricks won differ from the bid.

A bid of 0 scores +10 when exact and −10 otherwise.

A bid greater than 0 scores +(bid × 11) when exact and −(bid × 11) otherwise.

| Bid | Tricks won | Points |
| ---: | ---: | ---: |
| 0 | 0 | +10 |
| 0 | 1 | −10 |
| 1 | 1 | +11 |
| 1 | 0 | −11 |
| 2 | 2 | +22 |
| 2 | 3 | −22 |
| 5 | 5 | +55 |
| 5 | 4 | −55 |

The round score is added to that player's cumulative match score.

## Match end

After the last round is scored, players are ranked by cumulative score, highest first. A higher score always ranks above a lower score.

A successful bid is a round in which the tricks won equal the bid. Only when two or more players have the same cumulative score does the count of successful bids apply. That count is the number of exact rounds. It does not add the bid numbers together, so exact bids of 4 and 1 count as two successes. The player with more successful bids ranks higher. When the score and the number of successful bids are both equal, those players share the same rank.

The highest rank wins the match. Players who share that rank share the win.
