# REV-004: Interface contracts

| Field | Value |
| --- | --- |
| **ID** | REV-004 |
| **Track** | Review |
| **Phase** | Pre-Development Review |
| **Component** | docs / architecture |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | REV-003 |
| **Blocks** | REV-005 |
| **Completed** | 2026-10-14 |

## Summary

Review the interface contracts against the journeys, the data model, and the accepted notice path. Record findings. Do not edit those documents to repair them.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)
- [x] [architecture/data-model.md](../../architecture/data-model.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [game/rules.md](../../game/rules.md)
- [x] [decisions/0007-api-gateway-and-live-updates.md](../../decisions/0007-api-gateway-and-live-updates.md)
- [x] [decisions/0008-iot-core-notifications.md](../../decisions/0008-iot-core-notifications.md)
- [x] [decisions/0009-player-id.md](../../decisions/0009-player-id.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None at the start of this task. | Ask only if the review is blocked on a fact the docs do not settle. |

## Acceptance criteria

- [x] Findings are recorded in this file, including a review that finds none
- [x] The contracts and the documents they were checked against were not edited to repair them
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read this file and know whether each contract agrees with the journeys, the data model, and the rules.

## Findings

Checked on 2026-10-14. These points agree. Giving a name is not a call. Create, join, load, start, a bid, trump, a card, and the match list are HTTP. Live notices are IoT Core, with a private topic for a hand. The player id is the caller. A public fact is a seat number and a name. The last-bidder rejection uses the sentence already in the rules, and other illegal actions are not applied and add no further sentence. Start deals the first hand to every seated player on that player’s private topic, and it names the round-1 opener. Trump selection and the first lead match the rules. Load hides other players’ cards and omits cards, bids, and trump from scored rounds. List my matches returns the date, the room id, and the names, and it is not a list of every match.

| ID | Finding |
| --- | --- |
| F-10 | When the dealt cards of a round are gone, **Play a card** scores the round and deals the next one. That output and the scored-round room notice give the points, the scores, the ranking, and the graph. They do not name the seat that bids first in the new round. The rules move that seat one place clockwise. **Load a room** includes whose turn it is, so a reload can supply it. The notice the other players receive does not. |
| F-11 | **Join a room** does not refuse an 11th player. **Start the match** is not applied when the room has fewer than 3 or more than 10 players. No operation removes a seated player before the start. The host can be left unable to start, which the journey requires once the people who should play have joined. |
| F-12 | **Start the match** sends every seated player’s cards on that player’s private topic. **Play a card**, when it deals the next round, says the caller’s cards go on that caller’s topic. The private-notice section says a dealt hand is published to that player. A later agent can deal the next round and notify only the player who played the last card. |
| F-13 | The room notice for a bid says a bid was stored on a seat. The notice for a card says a card was played from a seat. Neither sentence says the message includes the bid number or the card’s suit and rank. The trump suit, the winning seat, and the round points are stated. **Load a room** does include the bids and the cards in the trick. |

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Seeded after REV-003. Not started. |
| 2026-10-14 | agent | Reviewed the contracts against the journeys, the data model, the rules, and decisions 0007, 0008, and 0009. Recorded F-10 through F-13. Did not edit those documents. |
