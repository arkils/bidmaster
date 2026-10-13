# REV-007: Synthesis

| Field | Value |
| --- | --- |
| **ID** | REV-007 |
| **Track** | Review |
| **Phase** | Pre-Development Review |
| **Component** | docs / review |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | REV-006 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

Disposition each finding from REV-001 through REV-006. Do not edit the product or architecture documents to repair them unless the user asks for that repair.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [tasks/review/REV-001-product-documents.md](REV-001-product-documents.md)
- [x] [tasks/review/REV-002-architecture.md](REV-002-architecture.md)
- [x] [tasks/review/REV-003-data-model.md](REV-003-data-model.md)
- [x] [tasks/review/REV-004-contracts.md](REV-004-contracts.md)
- [x] [tasks/review/REV-005-non-functional.md](REV-005-non-functional.md)
- [x] [tasks/review/REV-006-delivery.md](REV-006-delivery.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| [OQ-23](../../open-questions.md) | When the room is outside 3 to 10 players before the start, how can the host still reach a startable room? | Answered 2026-10-14. The 11th player, and a player joining after the start, see “room is full”. If the host leaves before the start, the next player becomes host. |
| [OQ-24](../../open-questions.md) | May a player outside India wait longer than 2 seconds on a bid or a card? | Answered 2026-10-14. That extra wait is acceptable. Applied by [REV-008](REV-008-apply-findings.md). |

## Acceptance criteria

- [x] Each finding F-1 through F-19 has a disposition in this file
- [x] The product and architecture documents were not edited to repair them, unless the user explicitly asked
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read this file and know, for each finding, whether it stands, whether it is already covered by another finding, or whether it waits on the user.

## Dispositions

Recorded on 2026-10-14. **Stands** means a later repair can close the gap from documents that already settle the fact. **Covered by** means the same gap is already named, and the repair of that finding includes the place named here. **Waits on the user** means the documents do not settle which repair is right. This task does not apply the repairs.

| ID | Disposition | What a later agent does |
| --- | --- | --- |
| F-1 | Stands | The rules already give a shared rank when the score and the successful-bid count are both equal, and a shared win when that rank is the highest. The journey stops after “more successful bids rank higher,” and the vision says “a winner.” The requirements already point at the rules for rank. The repair adds the shared rank and the shared win to the journey, and states a shared win in the vision. It also writes that same pair into the data model, which is F-8. |
| F-2 | Stands | The opening of `docs/game/rules.md` still says digital behavior is the next pass. Version 1’s digital behavior is the product documents. The repair changes that status line. The tabletop rules stay the rules. |
| F-3 | Stands | OQ-13 is answered. Decision 0004 and the overview already name S3, Lambda, and DynamoDB. The consequences of decision 0003 already point at 0004. The repair updates the Decision section of 0003 so that section points at 0004. |
| F-4 | Stands | The status of decision 0007 and the whole of decision 0008 already drop the WebSocket path, the connection ids, and the short HTTP list. Decision 0008 and the contracts already include start, a bid, trump, a card, and the list of matches on the HTTP API. The repair rewrites the Decision section, the push steps, the rationale, and the early consequences of 0007 so they match that status. Notices follow 0008. |
| F-5 | Stands | Decision 0008 already keeps the MQTT session while a player has the room open, and it already says nothing stays running when nobody is connected. Lambda still runs for a request and then stops. The repair adds that distinction to the sentence “No process stays running between requests” in decision 0002, and to the non-functional bullets named in F-14. |
| F-6 | Stands | Decisions 0009 and 0010 are accepted. The overview already mentions 0009. The repair extends the diagram row in `docs/architecture/README.md` so it cites 0009 and 0010 with 0002 through 0008. |
| F-7 | Stands | In decision 0005, “One table holds every match” argues for one region. The vision, the requirements, and the overview do not choose how many DynamoDB tables exist. The repair rewords that option so it stays an argument for Mumbai. It does not record a table count. |
| F-8 | Covered by F-1 | The data model’s kept-match paragraph stops at the same incomplete rank. The repair of F-1 writes the shared rank and the shared win there too. The requirements still point at the rules. |
| F-9 | Stands | The section before the start already fixes the host’s choice of round-1 opener on the match. The kept-match list omits that seat. The rules move that seat one place clockwise every round. The repair adds that seat to the stored match. A look back still shows the round points, the ranking, and the graph, and it still omits cards, bids, and trump. |
| F-10 | Stands | The start notice already names the round-1 opener. The rules already move that seat clockwise. Load already includes whose turn it is. The Play a card output and the scored-round room notice do not name the seat that bids first in the new round. The repair makes that seat visible to the other players on that notice, without requiring a reload. A missed notice is still repaired by loading the room. |
| F-11 | Stands | [OQ-23](../../open-questions.md) is answered. The repair refuses a join that would seat an 11th player, and a join after the match has started, with the error message “room is full”. Before the start, if the host leaves, the player who joined next becomes the host and seat 1. The remaining players stay in join order. Start still requires 3 to 10 seated players. |
| F-12 | Stands | Start already sends every seated player’s cards on that player’s private topic. The private-notice section already publishes a dealt hand to that player. The repair makes Play a card, when it deals the next round, publish each seated player’s new hand on that player’s topic. |
| F-13 | Stands | Decision 0008 already says the room topic carries the bid and the played card. Load already includes the bids and the cards in the trick. The repair states that the bid notice includes the bid number, and that the card notice includes that card’s suit and rank. The trump suit, the winning seat, and the round points stay as written. |
| F-14 | Covered by F-5 | The same MQTT-session tension sits in the non-functional requirements: “No process stays up for the match,” the live table, and IoT Core metering a connection only while a player is subscribed. The repair of F-5 points those bullets at the session decision 0008 already keeps, and at nothing staying running when nobody is connected. |
| F-15 | Stands | OQ-21 already states no cost ceiling, and it already places CloudFront on the AWS free tier. The repair says that free-tier sentence is not a spending cap. Decision 0002’s “costs nothing while idle” stays a description of the idle site. |
| F-16 | Stands | [OQ-24](../../open-questions.md) is answered. The extra wait from outside India may pass 2 seconds, and that wait is acceptable. The repair states that in the non-functional requirements. A delay of 1 or 2 seconds remains the ordinary feel. The cold start may still be slower. |
| F-17 | Stands | Decision 0005 and the overview already keep CloudFront as the global front door, and they place S3, Lambda, DynamoDB, API Gateway, and IoT Core in Mumbai. The repair says the laptop deploy creates that global distribution together with the Mumbai resources. It does not place CloudFront in `ap-south-1`. |
| F-18 | Stands | The laptop app already talks to the deployed services, with no stand-in. The local-run sentence names create, join, load, bids, cards, and notices. The repair adds start, trump, and the list of matches to that sentence. |
| F-19 | Stands | Decision 0010 and OQ-22 already use one deploy, and the laptop app uses it. The repair states that a room created from the laptop is on that same deploy. It does not add a second environment. |

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Seeded after REV-006. Not started. The individual reviews are done. |
| 2026-10-14 | agent | Dispositioned F-1 through F-19. F-8 is covered by F-1. F-14 is covered by F-5. F-11 waits on OQ-23. F-16 waits on OQ-24. Did not edit the product or architecture documents. |
| 2026-10-14 | agent | User answered OQ-23. F-11 now stands. The 11th player and a mid-match join see “room is full”. If the host leaves before the start, the next player becomes host. Journeys and contracts were not edited. |
| 2026-10-14 | agent | User answered OQ-24. That extra wait is acceptable. F-16 now stands. [REV-008](REV-008-apply-findings.md) applies the standing repairs. |
