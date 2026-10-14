# IMPL-006: Play the match

| Field | Value |
| --- | --- |
| **ID** | IMPL-006 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | match |
| **Status** | TODO |
| **Priority** | Blocking |
| **Blocked by** | IMPL-005 |
| **Blocks** | IMPL-007 |
| **Completed** | — |

## Summary

Players play the cards of each round under `docs/game/rules.md`. A finished round updates the dashboard. The match continues until the last round is scored and the ranking is final.

## Read first

- [ ] [product/journeys.md](../../product/journeys.md)
- [ ] [product/requirements.md](../../product/requirements.md)
- [ ] [product/non-functional.md](../../product/non-functional.md)
- [ ] [architecture/contracts.md](../../architecture/contracts.md)
- [ ] [architecture/data-model.md](../../architecture/data-model.md)
- [ ] [game/rules.md](../../game/rules.md)
- [ ] [impl/IMPL-005-bid-and-trump.md](IMPL-005-bid-and-trump.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. Looking back after the fact is IMPL-007. | — |

## Acceptance criteria

- [ ] Only the seated player whose turn it is can play one card from that player's hand. A card the player does not hold, a play out of turn, or a failure to follow the led suit is not applied, and version 1 adds no further sentence
- [ ] Tricks follow `docs/game/rules.md`: clockwise play, follow suit, trump, the trick winner leads the next trick, and the round ends when the dealt cards are gone
- [ ] The room notice for a card includes that card's suit and rank. When the trick is complete it includes the winning seat and the seat that leads next
- [ ] When the round's cards are gone, each seat's points follow the exact-bid scoring in `docs/game/rules.md` and are stored as that round's result. The room notice includes those points, the cumulative scores, the ranking, and that round's gain or loss for the graph
- [ ] Rank follows `docs/game/rules.md`. When the score and the number of successful bids are both equal, those players share the rank. Players who share the highest rank share the win
- [ ] The dashboard updates from that notice: cumulative scores, the ranking table, and one line per player
- [ ] When another round is dealt, the seat that bids first moves one place clockwise, each player's new hand goes only on that player id's private topic, and the room notice names that seat. Scored rounds do not keep cards, bids, or trump for the dashboard to show later
- [ ] While the round continues, the caller's remaining cards go only on that player id's private topic
- [ ] When the last round is scored, the notice includes the final ranking and no further hand is dealt
- [ ] Load of a match in progress returns the scored rounds' points, the current round's bids, trump, won tricks, cards in the trick, and whose turn it is, plus the caller's own cards only. A missed notice is repaired by loading the room
- [ ] The page works in a computer browser and in a phone browser
- [ ] Status updated in [backlog.md](../backlog.md)

## Definition of done

Three to ten players can play a complete match on the deploy, see each card and each scored round without reloading, and see the final ranking on the dashboard.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Authored by PREP-002. Not started. Build GO is not recorded. |
