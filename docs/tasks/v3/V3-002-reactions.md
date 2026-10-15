# V3-002: Reaction emojis and short lines

| Field | Value |
| --- | --- |
| **ID** | V3-002 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

A seated player can tap a reaction emoji or a short prepared line. Every seated player sees who sent it. There is no typed chat.

## Read first

- [x] [product/vision.md](../../product/vision.md)
- [x] [product/look.md](../../product/look.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)
- [x] [architecture/data-model.md](../../architecture/data-model.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked on 2026-10-15 for reaction emojis and short prepared lines posted to everyone. | The set and the behavior are the acceptance criteria below. |

## Acceptance criteria

- [x] A seated player on the room page can send one of these emojis: 👏 😂 🔥 😮 😬
- [x] That same player can send one of these lines: Nice one, Well bid, Wow, Unlucky, Good game
- [x] The player cannot type a message
- [x] Every seated player sees the sender's name and that emoji or line
- [x] One reaction shows at a time. A newer one replaces it. It leaves after 3 seconds
- [x] The dashboard does not show reactions. A player who has left cannot send one
- [x] A reaction is not stored on the match. Reloading the room does not bring it back
- [x] The bid, the trump, the trick, the scores, and the card landing in [V3-001](V3-001-card-landing.md) stay as they are
- [x] [product/look.md](../../product/look.md) and [architecture/contracts.md](../../architecture/contracts.md) record the reaction
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can sit at a started table, send one of the five emojis or five lines, and see that name and reaction on the other seated screens for 3 seconds. The match record does not keep it, and the dashboard stays a scoreboard.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Add reaction emojis and short prepared messages that players can post to everyone. |
| 2026-10-15 | agent | Wrote the unstarted task. The set is the five emojis and five lines in the acceptance criteria. No application code. |
| 2026-10-15 | agent | A seated player sends one of the ten reactions. The room page shows the name and the reaction for 3 seconds. The match does not store it, and the dashboard does not show it. |
| 2026-10-15 | user | The reaction appears at the bottom. It should sit on the player's seat in a comic speech bubble. Logged as [V3-004](V3-004-reaction-bubble.md). |
