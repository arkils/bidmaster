# IMPL-005: Bid and trump

| Field | Value |
| --- | --- |
| **ID** | IMPL-005 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | match |
| **Status** | TODO |
| **Priority** | Blocking |
| **Blocked by** | IMPL-004 |
| **Blocks** | IMPL-006 |
| **Completed** | — |

## Summary

Players bid in turn for the current round, the rules reject an illegal bid, and the player who must choose trump does so. The other players see the bid and the trump without reloading.

## Read first

- [ ] [product/journeys.md](../../product/journeys.md)
- [ ] [architecture/contracts.md](../../architecture/contracts.md)
- [ ] [architecture/data-model.md](../../architecture/data-model.md)
- [ ] [game/rules.md](../../game/rules.md)
- [ ] [impl/IMPL-004-start.md](IMPL-004-start.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. Playing a card is IMPL-006. | — |

## Acceptance criteria

- [ ] Only the seated player whose turn it is can submit one whole-number bid from 0 through the cards dealt this round. A second bid, a bid out of turn, or a bid outside that range is not applied, and version 1 adds no further sentence for those cases
- [ ] The last bid of the round is rejected when it would make the sum of bids equal the number of tricks in the round. The surfaced sentence is that the bid would make the total equal the tricks in the round
- [ ] A stored bid is kept on that seat and published on the room topic, including the bid number
- [ ] When every seat has bid, the seat that selects trump is the first seat in that round's bidding order to bid the highest number. When every bid is 0, the seat that bid first that round selects trump
- [ ] That seat's player chooses one of clubs, diamonds, hearts, or spades. The suit stays fixed for the round. Any other caller or suit is not applied, and version 1 adds no further sentence
- [ ] The trump suit is published on the room topic. The seat that bid first this round leads the first trick
- [ ] Load includes the bids already stored and the trump suit once chosen. It does not include other players' cards
- [ ] A missed notice is repaired by loading the room
- [ ] The page works in a computer browser and in a phone browser
- [ ] Status updated in [backlog.md](../backlog.md)

## Definition of done

A started round can collect every bid, name trump, and show both to the room. Cards are still a later task.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Authored by PREP-002. Not started. Build GO is not recorded. |
