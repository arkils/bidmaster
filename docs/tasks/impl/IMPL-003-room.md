# IMPL-003: Room before the match starts

| Field | Value |
| --- | --- |
| **ID** | IMPL-003 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | TODO |
| **Priority** | Blocking |
| **Blocked by** | IMPL-002 |
| **Blocks** | IMPL-004 |
| **Completed** | — |

## Summary

A named player can create a room, share it, join it, and leave it before the match starts. The other players in that room see joins and leaves while they have it open.

## Read first

- [ ] [product/journeys.md](../../product/journeys.md)
- [ ] [product/requirements.md](../../product/requirements.md)
- [ ] [product/non-functional.md](../../product/non-functional.md)
- [ ] [architecture/contracts.md](../../architecture/contracts.md)
- [ ] [architecture/data-model.md](../../architecture/data-model.md)
- [ ] [decisions/0007-api-gateway-and-live-updates.md](../../decisions/0007-api-gateway-and-live-updates.md)
- [ ] [decisions/0008-iot-core-notifications.md](../../decisions/0008-iot-core-notifications.md)
- [ ] [decisions/0009-player-id.md](../../decisions/0009-player-id.md)
- [ ] [impl/IMPL-002-name.md](IMPL-002-name.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. These journeys are confirmed. Starting the match is IMPL-004. | — |

## Acceptance criteria

- [ ] Create room returns a new room id of two ordinary words joined by a hyphen, in the style of `funny-monkey`, and a URL whose last part is that id
- [ ] The host is seat 1. The match has not started. The id does not reuse an id that already belongs to a room record
- [ ] A friend can join by opening that URL, and a player can join by typing the room id. The name popup comes first when that browser has no name
- [ ] Join returns the seated players in join order, earliest first. Each player is a seat number and a name. Two players may share a name. Responses do not include other players' ids
- [ ] A join that would seat an 11th player is refused with the message “room is full”
- [ ] A player id that is already seated, before the start, keeps that seat and updates the seat's name from the cookie
- [ ] An unknown room id is refused
- [ ] Before the start, the host can leave. The player who joined next becomes the host and seat 1. The remaining players stay in join order and are numbered again from 1
- [ ] When that host was the only player, the room has no seated player and the room id stays reserved
- [ ] A leave by a player who is not the host is not applied
- [ ] Load before the start returns the room id and the joined players in join order, each as a seat number and a name
- [ ] A seated player can subscribe to the room topic and to that player id's topic. A player id that is not seated is refused. Knowing the room id is not enough
- [ ] A successful join or leave publishes a room notice with the seats in order. The leave notice shows the new host as seat 1 when someone remains
- [ ] A missed notice is repaired by loading the room
- [ ] The page works in a computer browser and in a phone browser
- [ ] Status updated in [backlog.md](../backlog.md)

## Definition of done

Several browsers can gather in one unstarted room on the deploy from IMPL-001, see the seat list change when someone joins or the host leaves, and a later task can start that match.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Authored by PREP-002. Not started. Build GO is not recorded. |
