# PREP-003: First version 3 slice

| Field | Value |
| --- | --- |
| **ID** | PREP-003 |
| **Track** | Planning |
| **Phase** | Version 3 Planning |
| **Component** | docs / tasks |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Propose the first version 3 slice from the confirmed target. Record it as PROPOSED. Do not write implementation task files until the user agrees the slice.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [product/look.md](../../product/look.md)
- [x] [tasks/README.md](../README.md)
- [x] [prep/PREP-001-milestone-slice.md](PREP-001-milestone-slice.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| [OQ-27](../../open-questions.md) | What is the first version 3 slice that planning writes task files for? | Answered 2026-10-15. The user chose option A. |

## Acceptance criteria

- [x] Options, trade-offs, and one recommendation are written in this file
- [x] The user has agreed the slice, and that agreement is recorded in [open-questions.md](../../open-questions.md)
- [x] This task does not add an implementation task file
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read the agreed slice and write implementation task files for that slice only, without guessing which of the three version 3 outcomes are in it and which wait.

## Agreement

The user chose option A on 2026-10-15. The first slice is the look, the motion, and the feel of play. Side ads and the home-screen install wait. Recorded in [OQ-27](../../open-questions.md).

## Proposal

Written on 2026-10-15 as a proposal. The version 3 target in [vision.md](../../product/vision.md) has three outcomes. The rules in `docs/game/rules.md` stay the game. A public lobby, accounts, and any retention that blocks Leave room stay out. The shipped site already has a card sound, a bid sound, a turn buzz, a trick pause, and the emerald and gold table.

Which motions, sounds, and rewards make the table hold a player are not chosen. Which ad network, and what a phone does when there is no side column, are not chosen. The installable website is the outcome with the least left open: the same site on a phone home screen, with no native app and no store binary.

### Option A — The feel of the table

Recommended. The first slice is the look, the motion, and the feel of play. Each bid, card, and trick should pull toward the next one. Side ads and the home-screen install wait.

This is the outcome the user named as the point of version 3. It does not change the match. It also does not name the motions yet. After this slice is agreed, the next planning task asks which moments get that treatment, and only then writes implementation task files. Writing those files in this task would invent the motions.

### Option B — The installable website

The first slice is the same website installed on an Android or iOS home screen. No native app and no store binary. The feel of the table and the side ads wait.

This outcome is already specific. It does not need a new ad network or a new animation. It also does not do the thing the user called the main point of version 3. A player who already opens the site in a phone browser gains a home-screen icon.

### Option C — Ads on the side

The first slice is ads beside the page on a wide screen. The feel of the table and the home-screen install wait.

Version 3 is a source of income, and version 1 stays "not a source of income." The ad network is not chosen, and a phone has no side column. Those two facts have to be settled before any task file can say what to build. Ads beside the table can also fight the feel of play if they are built first.

### Option D — All three outcomes

One list of task files covers the feel, the side ads, and the home-screen install.

The list would have to invent the motions and the ad network before the user has chosen them. This phase writes one slice, and it does not design the whole of version 3 in one pass.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Recorded that version 3 planning may start. |
| 2026-10-15 | agent | Proposed option A, the feel of the table. OQ-27 stays open. No implementation task file written. |
| 2026-10-15 | agent | The user chose option A. Recorded that in OQ-27 and in the version 3 sections of the product docs. No implementation task file written. |
