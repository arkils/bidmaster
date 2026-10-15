# V3-002: Reaction emojis and short lines

| Field | Value |
| --- | --- |
| **ID** | V3-002 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | TODO |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | — |

## Summary

A seated player can tap a reaction emoji or a short prepared line. Every seated player sees who sent it. There is no typed chat. Do not start this task until the user records that version 3 build may start.

## Read first

- [ ] [product/vision.md](../../product/vision.md)
- [ ] [product/look.md](../../product/look.md)
- [ ] [architecture/contracts.md](../../architecture/contracts.md)
- [ ] [architecture/data-model.md](../../architecture/data-model.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked on 2026-10-15 for reaction emojis and short prepared lines posted to everyone. | The set and the behavior are the acceptance criteria below. |

## Acceptance criteria

- [ ] A seated player on the room page can send one of these emojis: 👏 😂 🔥 😮 😬
- [ ] That same player can send one of these lines: Nice one, Well bid, Wow, Unlucky, Good game
- [ ] The player cannot type a message
- [ ] Every seated player sees the sender's name and that emoji or line
- [ ] One reaction shows at a time. A newer one replaces it. It leaves after 3 seconds
- [ ] The dashboard does not show reactions. A player who has left cannot send one
- [ ] A reaction is not stored on the match. Reloading the room does not bring it back
- [ ] The bid, the trump, the trick, the scores, and the card landing in [V3-001](V3-001-card-landing.md) stay as they are
- [ ] [product/look.md](../../product/look.md) and [architecture/contracts.md](../../architecture/contracts.md) record the reaction
- [ ] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can sit at a started table, send one of the five emojis or five lines, and see that name and reaction on the other seated screens for 3 seconds. The match record does not keep it, and the dashboard stays a scoreboard.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Add reaction emojis and short prepared messages that players can post to everyone. |
| 2026-10-15 | agent | Wrote the unstarted task. The set is the five emojis and five lines in the acceptance criteria. No application code. |
