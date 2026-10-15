# PREP-004: Which moment gets the feel

| Field | Value |
| --- | --- |
| **ID** | PREP-004 |
| **Track** | Planning |
| **Phase** | Version 3 Planning |
| **Component** | docs / tasks |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | PREP-003 |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Propose which moment of play the first version 3 slice treats. Record it as PROPOSED. Do not write implementation task files until the user agrees the moment.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/look.md](../../product/look.md)
- [x] [prep/PREP-003-v3-slice.md](PREP-003-v3-slice.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| [OQ-28](../../open-questions.md) | Which moment of play does the first version 3 slice treat? | Answered 2026-10-15. The user chose option A. |

## Acceptance criteria

- [x] Options, trade-offs, and one recommendation are written in this file
- [x] The user has agreed the moment, and that agreement is recorded in [open-questions.md](../../open-questions.md)
- [x] This task does not add an implementation task file
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read the agreed moment and write implementation task files for that moment only, without guessing whether the slice also restyles the turn, the trick, or the deal.

## Agreement

The user chose option A on 2026-10-15. The first moment is a played card leaving the hand and landing in the trick. A bid, a turn, a won trick, and a new deal stay as they are. Recorded in [OQ-28](../../open-questions.md).

## Proposal

Written on 2026-10-15 as a proposal. [OQ-27](../../open-questions.md) agreed that the first slice is the look, the motion, and the feel of play. [look.md](../../product/look.md) already gives a bid a sound, a played card a slide and a sound, a finished trick a 2 second highlight and a move to the winner, a new hand a short slide, and a turn a gold ring, a glow, a star, and a buzz after 10 seconds.

This task does not replace those. It names the one moment the first implementation tasks may deepen. The rules stay the game. Side ads and the home-screen install stay out.

### Option A — The played card

Recommended. The first tasks treat the card leaving the hand and landing in the trick. A bid, a turn, a won trick, and a new deal stay as they are.

A card is the beat that repeats most often in a round. The slide and `card.mp3` are already there, so the work is to make that landing pull toward the next card, not to invent a second game. The other moments can follow in later slices once this one shows the feel.

### Option B — Your turn

The first tasks treat the moment a turn arrives: the ring, the glow, the star, and the pull to act. The card, the trick, and the deal stay as they are.

The turn is when a player can drift away. The buzz already calls them back after 10 seconds. Starting here would change that call. It would not change the repeated beat of the cards themselves.

### Option C — The won trick

The first tasks treat the payoff: the winning card held in the center, then the cards moving to the winner. A single card landing, the turn, and the deal stay as they are.

This is the reward. It happens once per trick, not once per card, so the pull is rarer. The 2 second pause is already a held breath. Deepening it first leaves the ordinary card play flat.

### Option D — The whole beat

The first tasks treat the turn arriving, the card landing, and the trick paying off, as one loop.

That is closer to a clip that will not let go. It is also three moments at once. This phase does not design the whole feel in one pass.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | Opened after the user chose option A in PREP-003. Proposed option A, the played card. OQ-28 stays open. No implementation task file written. |
| 2026-10-15 | agent | The user chose option A. Recorded that in OQ-28 and in the version 3 sections of the product docs. No implementation task file written. |
