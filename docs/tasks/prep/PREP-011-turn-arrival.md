# PREP-011: How a turn arrives

| Field | Value |
| --- | --- |
| **ID** | PREP-011 |
| **Track** | Planning |
| **Phase** | Version 3 Development |
| **Component** | docs / tasks |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | PREP-010 |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Propose how a turn arrives so that it pulls the player to act. Record it as PROPOSED. Do not write an implementation task file until the user agrees the treatment.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/look.md](../../product/look.md)
- [x] [prep/PREP-010-next-moment.md](PREP-010-next-moment.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| [OQ-33](../../open-questions.md) | How does a turn arrive so that it pulls the player to act? | Answered 2026-10-15. The user chose option A. |

## Acceptance criteria

- [x] Options, trade-offs, and one recommendation are written in this file
- [x] The user has agreed the treatment, and that agreement is recorded in [open-questions.md](../../open-questions.md)
- [x] This task does not add an implementation task file
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read the agreed treatment and write one implementation task for that arrival only, without guessing whether the work also adds a new sound, changes the 10 second buzz, or restyles a bid, the deal, a played card, or a won trick.

## Agreement

The user chose option A on 2026-10-15. When the turn moves to a seat, that chip lifts and the ring, the glow, and the star snap on. Every screen sees it. No new sound. The buzz still waits 10 seconds, and it still plays only on that player's own screen. A bid, the deal, a played card, and a won trick stay as they are. Recorded in [OQ-33](../../open-questions.md).

## Proposal

Written on 2026-10-15 as a proposal. [OQ-32](../../open-questions.md) agreed that the next moment is a turn arriving. [look.md](../../product/look.md) already marks that seat, on every screen, with a thick gold ring, a continuing glow, and a star. On that player's own screen, `buzz.mp3` starts 10 seconds after the turn is shown and repeats until the turn ends. It does not play when the turn begins. A legal hand card is already raised only on that player's turn to play.

### Option A — The chip lifts as the mark snaps on

Recommended. When the turn moves to a seat, that chip lifts and the ring, the glow, and the star snap on. Every screen sees it. No new sound. The buzz still waits 10 seconds, and it still plays only on that player's own screen. A bid, the deal, a played card, and a won trick stay as they are.

The pull is the seat rising into the mark that is already there. It uses the same lift and snap as a played card and a winning card. The late buzz stays the reminder, not the arrival.

### Option B — A sound the moment the turn begins

The ring, the glow, and the star stay as they are. `buzz.mp3` also plays as soon as the turn is shown, on that player's own screen, and the 10 second repeat stays.

That calls at once. [look.md](../../product/look.md) already keeps the buzz off the first moment of the turn. Playing it immediately would alarm every bid, trump choice, and card.

### Option C — Leave the turn as it is

The ring, the glow, the star, and the delayed buzz stay exactly as they are. This moment adds nothing.

The moment is then agreed and untreated. The next feel task would not change the arrival.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | Opened after the user asked to start the turn-arrival decision. Proposed option A, the chip lifts as the mark snaps on. OQ-33 stays open. No implementation task file written. |
| 2026-10-15 | agent | The user chose option A. Recorded in OQ-33. No implementation task file written. |
