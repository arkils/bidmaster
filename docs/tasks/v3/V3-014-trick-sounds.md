# V3-014: One card sound per gathered card

| Field | Value |
| --- | --- |
| **ID** | V3-014 |
| **Track** | Version 3 |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-16 |

## Summary

When a trick that does not end the round travels to the winner, `card.mp3` plays once for every card in that trick.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [v3/V3-003-won-trick.md](V3-003-won-trick.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. [look.md](../../product/look.md) already requires one sound for each card. | Play once per card that travels. |

## Acceptance criteria

- [x] A trick of 4 cards plays `card.mp3` four times, back to back, as those cards travel to the winner
- [x] A trick of 5 cards plays it five times. The count is the number of cards in the trick, for any number of players
- [x] The sounds are not cut off when the cards arrive
- [x] The last trick of a round also plays once per card, because those cards travel to the winner too
- [x] No new sound file. A bid, the turn, the deal, and a single played card stay as they are
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can win a trick that does not end the round and hear `card.mp3` once for each card traveling to the winner. Four cards play four times. Five cards play five times.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | At the end of a trick the card sound plays only twice while the cards go to the winner. A 4-player trick should play 4 times, and a 5-player trick should play 5 times. |
| 2026-10-15 | agent | Logged. The gather sounds are timers spaced 170ms apart, and those timers are cleared when the flights finish, so later sounds never play. Not implemented in this pass. |
| 2026-10-16 | agent | The gather sounds stay scheduled after the flights finish. A 4-card trick played four times and a 5-card trick played five times after the travel had already ended. |
