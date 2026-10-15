# PREP-013: How a bid and a new deal feel

| Field | Value |
| --- | --- |
| **ID** | PREP-013 |
| **Track** | Planning |
| **Phase** | Version 3 Development |
| **Component** | docs / tasks |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Propose how a stored bid and a new deal feel. Record each as PROPOSED. Do not write implementation task files until the user agrees both treatments.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/look.md](../../product/look.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| [OQ-34](../../open-questions.md) | How does a stored bid land so that it pulls toward the next bid? | Answered 2026-10-15. The user chose option A. |
| [OQ-35](../../open-questions.md) | How does a new deal arrive so that it pulls toward the first bid? | Answered 2026-10-15. The user chose option A. |

## Acceptance criteria

- [x] Options, trade-offs, and one recommendation are written for the bid and for the deal
- [x] The user has agreed both treatments, and that agreement is recorded in [open-questions.md](../../open-questions.md)
- [x] [V3-012](../v3/V3-012-bid-snap.md) and [V3-013](../v3/V3-013-deal-snap.md) were written after that agreement, and both stay `TODO`
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can write one unstarted task for the bid and one unstarted task for the deal, without guessing the motion, the sound, or whether the center bid chips, the round result, or the turn arrival change.

## Agreement

The user chose option A for both on 2026-10-15.

A stored bid snaps into the center and into that seat's gold box, together, on every screen. `bid.mp3` still plays once. No new sound. Recorded in [OQ-34](../../open-questions.md). The task is [V3-012](../v3/V3-012-bid-snap.md), and it is unstarted.

A new hand lifts into the row and snaps down, staggered a little, on the caller's screen. No new sound. Recorded in [OQ-35](../../open-questions.md). The task is [V3-013](../v3/V3-013-deal-snap.md), and it is unstarted.

## Proposal

Written on 2026-10-15 as a proposal. A played card, a won trick, and a turn arrival are done. [look.md](../../product/look.md) already plays `bid.mp3` once when a bid is stored, shows that bid in the center and on the seat, and deals a new hand with a short slide after the round result is accepted. These two moments are the remainder of slice 1. Side ads and the home-screen install stay out.

### A bid

#### Option A — Snap into the center and onto the seat

Recommended. On every screen, the new center chip snaps into the center, and the number snaps into that seat's gold box, together. `bid.mp3` still plays once. No new sound. A bid already stored when the table opens still does not play. The bid buttons, the disabled last number, and the clearing of bids at the next round stay as they are. The turn arrival stays as it is.

The pull is the number landing in both places the table already watches. It uses the same snap as the turn mark. It does not send a flight from buttons the other players cannot see.

#### Option B — The bidder's number travels

On the bidder's own screen, the tapped number lifts off the button, travels to the center chip and the seat, and snaps down. Other screens only see the snap. `bid.mp3` still plays once.

That matches a played card. The other players still miss the flight, and the bid has two destinations instead of one.

#### Option C — Leave the bid as it is

The sound, the center chip, and the seat number stay exactly as they are. This moment adds nothing.

### A new deal

#### Option A — The hand lifts and snaps in

Recommended. On the caller's screen, the new hand lifts into the row and snaps down. The cards are staggered a little, so the row reads as a deal. No new sound. `card.mp3` stays the sound of a played card. Other players still do not see the hand. The round result still waits for OK, and the deal still starts only then. After the last round, OK still deals nothing. The turn arrival and a stored bid stay as they are.

The pull is the hand arriving as one snap, ready for the first bid. A flight of up to 10 cards would hold the table longer than the other motions in this slice.

#### Option B — Each card flies from the center

The cards travel one by one from the center of the felt into the hand, then snap down. No new sound.

That looks like a deal from a deck. It is also the longest motion in the slice, and it plays on top of the moment the round result has just closed.

#### Option C — Leave the deal as it is

The short slide stays exactly as it is. This moment adds nothing.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | Opened after the user asked to decide the bid and the new deal, then write the tasks. Proposed option A for each. OQ-34 and OQ-35 stay open. No implementation task file written. |
| 2026-10-15 | agent | The user chose option A for both. Wrote V3-012 and V3-013. Left both unstarted. |
