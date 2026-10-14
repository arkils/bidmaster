# IMPL-031: Use the new card sound

| Field | Value |
| --- | --- |
| **ID** | IMPL-031 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-030 |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

A played card and a won trick use `web/public/card.mp3`. The old `card.wav` is no longer played.

## Read first

- [x] [product/look.md](../../product/look.md)
- [x] [impl/IMPL-024-play-sound-and-turn.md](IMPL-024-play-sound-and-turn.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user added `web/public/card.mp3` on 2026-10-15. | That file is the card sound. `card.wav` is not played. |

## Acceptance criteria

- [x] Playing a card plays `card.mp3` once
- [x] A won trick still plays one sound per card, back to back, and each of those sounds is `card.mp3`
- [x] `card.wav` is not requested
- [x] When the sound plays, and how many times, stays as it is now
- [x] [product/look.md](../../product/look.md) records that the card sound is `card.mp3`
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

The card sound the player hears is the file in `web/public/card.mp3`.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | `web/public/card.mp3` is in the public folder. Use it as the card sound instead of the old one. Not started. |
| 2026-10-15 | agent | A played card and each card of a won trick load `/card.mp3`. `card.wav` is no longer in the site. |
