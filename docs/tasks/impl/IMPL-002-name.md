# IMPL-002: Name and player id

| Field | Value |
| --- | --- |
| **ID** | IMPL-002 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | website |
| **Status** | TODO |
| **Priority** | Blocking |
| **Blocked by** | IMPL-001 |
| **Blocks** | IMPL-003 |
| **Completed** | — |

## Summary

The first visit asks for a name. The site stores that name and a player id in a cookie, shows the name, and then offers Create room and Join room.

## Read first

- [ ] [product/journeys.md](../../product/journeys.md)
- [ ] [product/requirements.md](../../product/requirements.md)
- [ ] [product/non-functional.md](../../product/non-functional.md)
- [ ] [architecture/contracts.md](../../architecture/contracts.md)
- [ ] [decisions/0009-player-id.md](../../decisions/0009-player-id.md)
- [ ] [impl/IMPL-001-deploy.md](IMPL-001-deploy.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. Giving a name is confirmed, and it is not an HTTP call. | — |

## Acceptance criteria

- [ ] The first thing a new visitor sees is a popup that asks for a name
- [ ] After the name is entered, the popup closes and the site shows Create room and Join room
- [ ] The cookie stores the typed name and a player id generated once on that browser
- [ ] The screen shows the name. It does not show the player id
- [ ] A later visit, while the cookie is present, does not ask for the name again and still knows both values
- [ ] Giving a name does not call the HTTP API
- [ ] The page works in a computer browser and in a phone browser
- [ ] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later task can create or join a room with the name and player id already in the cookie, without asking the player for an account.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Authored by PREP-002. Not started. Build GO is not recorded. |
