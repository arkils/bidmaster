# PREP-005: How a played card lands

| Field | Value |
| --- | --- |
| **ID** | PREP-005 |
| **Track** | Planning |
| **Phase** | Version 3 Planning |
| **Component** | docs / tasks |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | PREP-004 |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Propose how a played card leaves the hand and lands in the trick so the landing pulls toward the next card. Record it as PROPOSED. Do not write implementation task files until the user agrees the treatment.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/look.md](../../product/look.md)
- [x] [prep/PREP-004-feel-moments.md](PREP-004-feel-moments.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| [OQ-29](../../open-questions.md) | How does a played card land so that it pulls toward the next card? | Answered 2026-10-15. The user chose option A. |

## Acceptance criteria

- [x] Options, trade-offs, and one recommendation are written in this file
- [x] The user has agreed the treatment, and that agreement is recorded in [open-questions.md](../../open-questions.md)
- [x] This task does not add an implementation task file
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read the agreed treatment and write implementation task files for that landing only, without guessing whether the slice also adds a new sound, a score pop, or a change to the trick, the turn, or the deal.

## Agreement

The user chose option A on 2026-10-15. A played card lifts, travels, and snaps. `card.mp3` still plays once. No new sound and no score pop. The option also said the next legal cards are raised as the card settles. [look.md](../../product/look.md) already keeps a hand flat until it is that player's turn, so the remaining cards do not rise the instant a card is played. They rise on the next turn, as they do now. Recorded in [OQ-29](../../open-questions.md).

## Proposal

Written on 2026-10-15 as a proposal. [OQ-28](../../open-questions.md) agreed that the first moment is a played card. [look.md](../../product/look.md) already slides that card into the trick and plays `card.mp3` once. Motion is snappy. A legal card on the player's turn is already raised. A card the rules do not allow stays flat.

### Option A — Lift, travel, and snap

Recommended. The card lifts off the hand, travels to its place in the trick, and snaps down. `card.mp3` still plays once. As that card settles, the next legal cards in the hand are raised, so the hand is already offering the next play. No new sound file. No score pop. The turn mark, the won-trick pause, and the deal stay as they are.

The pull is the card itself and the hand waiting under it. It keeps the snappy motion in [look.md](../../product/look.md) and does not add a second reward on every card.

### Option B — A reward on every card

The card still slides. Landing also flashes the card and pops a small praise mark, and the sound is stronger than `card.mp3`.

That is closer to a show that cheers every beat. It also fires on every card of a 10-card trick, on every seat. The table can become noisy, and the existing card sound would be replaced or covered. The rules do not give a point for one card.

### Option C — Leave the landing as it is

The slide and `card.mp3` stay exactly as version 2 shipped them. This slice adds nothing to the card.

The moment is then agreed and untreated. The first slice would not change the feel the user asked for.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | Opened after the user chose the played card in PREP-004. Proposed option A, lift, travel, and snap. OQ-29 stays open. No implementation task file written. |
| 2026-10-15 | agent | The user chose option A. The off-turn hand stays flat, as look.md already requires. Recorded in OQ-29. No implementation task file written. |
