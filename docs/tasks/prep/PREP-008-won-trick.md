# PREP-008: How a won trick pays off

| Field | Value |
| --- | --- |
| **ID** | PREP-008 |
| **Track** | Planning |
| **Phase** | Version 3 Development |
| **Component** | docs / tasks |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | PREP-007 |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Propose how a won trick pays off so that it pulls toward the next lead. Record it as PROPOSED. Do not write an implementation task file until the user agrees the treatment.

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
| [OQ-31](../../open-questions.md) | How does a won trick pay off so that it pulls toward the next lead? | Answered 2026-10-15. The user chose option A. |

## Acceptance criteria

- [x] Options, trade-offs, and one recommendation are written in this file
- [x] The user has agreed the treatment, and that agreement is recorded in [open-questions.md](../../open-questions.md)
- [x] This task does not add an implementation task file
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read the agreed treatment and write one implementation task for that payoff only, without guessing whether the work also adds a new sound, a score pop, or a change to a bid, the turn, the deal, or the played-card landing.

## Agreement

The user chose option A on 2026-10-15. During the 2 second hold, the winning card lifts. The cards of a trick that does not end the round then travel to the winner's chip and snap down. `card.mp3` still plays once for each of those cards. No new sound and no score pop. The last trick of a round stays in the center, and the round result still opens after the pause. Recorded in [OQ-31](../../open-questions.md).

## Proposal

Written on 2026-10-15 as a proposal. [OQ-30](../../open-questions.md) agreed that the next moment is a won trick. [look.md](../../product/look.md) already holds every finished trick in the center for 2 seconds with the winning card highlighted. After that pause, the cards of a trick that does not end the round move to the winner, and one `card.mp3` plays for each of those cards, back to back. The round result opens only after that same pause. The last trick of a round does not move to a seat.

### Option A — Lift, travel, and snap onto the winner

Recommended. During the 2 second hold, the winning card lifts. When the pause ends, the cards of a trick that does not end the round travel to the winner's chip and snap down there. `card.mp3` still plays once for each of those cards, back to back. No new sound file. No praise mark and no score pop. The last trick of a round still stays in the center, and the round result still opens after the pause. A bid, the turn mark, the deal, and the played-card landing stay as they are.

The pull is the winning card rising, then the whole trick landing on the player who leads next. It uses the same lift, travel, and snap as a played card, once per trick.

### Option B — A reward on the winner

The cards still move as they do now. When the trick is taken, the winner's chip flashes and a small praise mark pops beside it.

That cheers the payoff. It also adds a mark the rules do not give: points arrive at the end of the round, not when one trick is taken. The existing pause and move would stay flat underneath the new mark.

### Option C — Leave the payoff as it is

The 2 second highlight and the move to the winner stay exactly as they are. This moment adds nothing.

The moment is then agreed and untreated. The next feel task would not change the payoff.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | Opened after the user chose the won trick in PREP-007. Proposed option A, lift, travel, and snap onto the winner. OQ-31 stays open. No implementation task file written. |
| 2026-10-15 | agent | The user chose option A. Recorded in OQ-31. No implementation task file written. |
