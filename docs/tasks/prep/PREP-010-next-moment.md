# PREP-010: Which remaining moment is next

| Field | Value |
| --- | --- |
| **ID** | PREP-010 |
| **Track** | Planning |
| **Phase** | Version 3 Development |
| **Component** | docs / tasks |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Propose which remaining moment of slice 1 is treated next. Record it as PROPOSED. Do not write an implementation task file until the user agrees the moment.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/look.md](../../product/look.md)
- [x] [prep/PREP-007-next-feel.md](PREP-007-next-feel.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| [OQ-32](../../open-questions.md) | Which remaining moment of slice 1 is treated next? | Answered 2026-10-15. The user chose option A. |

## Acceptance criteria

- [x] Options, trade-offs, and one recommendation are written in this file
- [x] The user has agreed the moment, and that agreement is recorded in [open-questions.md](../../open-questions.md)
- [x] This task does not add an implementation task file
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read the agreed moment and write one implementation task for that moment only, without guessing whether the work also restyles a bid, a turn, or a new deal.

## Agreement

The user chose option A on 2026-10-15. The next moment is a turn arriving. A bid and a new deal stay as they are. How that arrival pulls the player to act is [OQ-33](../../open-questions.md). Recorded in [OQ-32](../../open-questions.md).

## Proposal

Written on 2026-10-15 as a proposal. [vision.md](../../product/vision.md) still leaves a bid, the turn, and a new deal unchosen. A played card and a won trick are done. [look.md](../../product/look.md) already gives a bid a sound and a center chip, a turn a gold ring, a glow, a star, and a buzz after 10 seconds, and a new hand a short slide.

This task names the one moment the next feel task may deepen. The rules stay the game. Side ads and the home-screen install stay out.

### Option A — Your turn

Recommended. The next tasks treat the moment a turn arrives: the ring, the glow, the star, and the pull to act. A bid and the deal stay as they are.

A turn arrives for every bid, trump choice, and card. The card landing and the won trick already answer a play. The open gap is the call to act before that play. The buzz already calls a quiet player back after 10 seconds, so the work is the arrival of the turn, not a louder alarm.

### Option B — A bid

The next tasks treat a chosen bid: the sound and the bid appearing for the table. The turn and the deal stay as they are.

A bid opens the round, once per player. `bid.mp3` and the center chip already mark it. It does not cover the turns that follow, when a player must play a card.

### Option C — A new deal

The next tasks treat the new hand sliding in. A bid and the turn stay as they are.

The deal starts a round, once. The short slide is already there. It does not pull through the bids and cards in the middle of the round.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | Opened after the user asked to choose a remaining decision for slice 1. Proposed option A, your turn. OQ-32 stays open. No implementation task file written. |
| 2026-10-15 | agent | The user chose option A. Recorded in OQ-32. No implementation task file written. |
