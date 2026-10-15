# PREP-007: Which moment is next

| Field | Value |
| --- | --- |
| **ID** | PREP-007 |
| **Track** | Planning |
| **Phase** | Version 3 Development |
| **Component** | docs / tasks |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Propose which moment of play is treated after the played card. Record it as PROPOSED. Do not write an implementation task file until the user agrees the moment.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/look.md](../../product/look.md)
- [x] [prep/PREP-004-feel-moments.md](PREP-004-feel-moments.md)
- [x] [v3/V3-001-card-landing.md](../v3/V3-001-card-landing.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| [OQ-30](../../open-questions.md) | Which moment of play is treated after the played card? | Answered 2026-10-15. The user chose option A. |

## Acceptance criteria

- [x] Options, trade-offs, and one recommendation are written in this file
- [x] The user has agreed the moment, and that agreement is recorded in [open-questions.md](../../open-questions.md)
- [x] This task does not add an implementation task file
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read the agreed moment and write one implementation task for that moment only, without guessing whether the work also restyles a bid, a turn, a won trick, or a new deal.

## Agreement

The user chose option A on 2026-10-15. The next moment is a won trick. A bid, the turn mark, and a new deal stay as they are. How that payoff pulls toward the next lead is [OQ-31](../../open-questions.md). Recorded in [OQ-30](../../open-questions.md).

## Proposal

Written on 2026-10-15 as a proposal. [OQ-28](../../open-questions.md) kept a bid, a turn, a won trick, and a new deal as they are while the first moment was a played card. [V3-001](../v3/V3-001-card-landing.md) is done: on the player's own screen that card lifts, travels, and snaps. [look.md](../../product/look.md) still gives a bid a sound, a turn a gold ring, a glow, a star, and a buzz after 10 seconds, a finished trick a 2 second highlight and a move to the winner, and a new hand a short slide.

This task does not replace those. It names the one moment the next feel task may deepen. The rules stay the game. Reactions stay [V3-002](../v3/V3-002-reactions.md). Side ads and the home-screen install stay out.

### Option A — The won trick

Recommended. The next tasks treat the payoff after the last card: the winning card held in the center, then the cards moving to the winner. A bid, the turn mark, and the deal stay as they are.

The card now travels and snaps. The moment that answers that landing is the trick paying off. It is rarer than a single card, and the 2 second pause is already a held breath, so the work is to make that payoff pull toward the next lead, not to invent a second reward on every card.

### Option B — Your turn

The next tasks treat the moment a turn arrives: the ring, the glow, the star, and the pull to act. The won trick, a bid, and the deal stay as they are.

The turn is when a player can drift away. The buzz already calls them back after 10 seconds. Starting here would change that call. It would not answer the card that just landed.

### Option C — A bid

The next tasks treat a chosen bid: the sound and the bid appearing for the table. The turn, the won trick, and the deal stay as they are.

A bid opens the round, before any card. `bid.mp3` already marks it. Deepening it next leaves the trick that follows a played card as it is now.

### Option D — A new deal

The next tasks treat the new hand sliding in. A bid, the turn, and the won trick stay as they are.

The deal starts a round. It does not answer the card that just snapped into the trick. The short slide is already there.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | Opened after the user asked for a planning task for the next feel moment. Proposed option A, the won trick. OQ-30 stays open. No implementation task file written. |
| 2026-10-15 | agent | The user chose option A. Recorded in OQ-30. No implementation task file written. |
