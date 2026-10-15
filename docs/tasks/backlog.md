# Backlog

One task is `IN_PROGRESS` at a time. If none is, take the lowest `TODO` whose blockers are `DONE`. Status here and in the task file stay the same.

The user recorded **Review GO** on 2026-10-14, that Implementation Planning may start on 2026-10-14, and **Build GO** on 2026-10-14. That Build GO covered version 1. The user recorded that version 3 planning may start on 2026-10-15, and that version 3 build may start on 2026-10-15. Code is allowed only inside the one `V3-*` task that is `IN_PROGRESS`.

| ID | Status | Priority | Blocked by | Summary |
| --- | --- | --- | --- | --- |
| [DISC-001](discovery/DISC-001-product-vision.md) | DONE | Blocking | — | Product vision, version-1 scope, and explicit non-goals |
| [DISC-002](discovery/DISC-002-requirements.md) | DONE | Blocking | DISC-001 | Requirements split into CONFIRMED, PROPOSED, and FUTURE |
| [DISC-003](discovery/DISC-003-user-journeys.md) | DONE | Blocking | DISC-002 | User journeys |
| [DISC-004](discovery/DISC-004-architecture.md) | DONE | Blocking | DISC-003 | Architecture overview and ADRs for stack choices |
| [DISC-005](discovery/DISC-005-data-model.md) | DONE | Blocking | DISC-004 | Data model |
| [DISC-006](discovery/DISC-006-interface-contracts.md) | DONE | Blocking | DISC-005 | API or interface contracts |
| [DISC-007](discovery/DISC-007-non-functional-requirements.md) | DONE | Blocking | DISC-006 | Non-functional requirements |
| [DISC-008](discovery/DISC-008-local-development.md) | DONE | Blocking | DISC-007 | Local development and delivery approach |
| [DISC-009](discovery/DISC-009-documentation-gate.md) | DONE | Blocking | DISC-008 | Documentation gate |
| [REV-001](review/REV-001-product-documents.md) | DONE | Blocking | — | Review vision, requirements, and journeys against the rules |
| [REV-002](review/REV-002-architecture.md) | DONE | Blocking | REV-001 | Review the architecture overview and accepted decisions |
| [REV-003](review/REV-003-data-model.md) | DONE | Blocking | REV-002 | Review the data model against the overview and the confirmed product |
| [REV-004](review/REV-004-contracts.md) | DONE | Blocking | REV-003 | Review the interface contracts against the data model and the journeys |
| [REV-005](review/REV-005-non-functional.md) | DONE | Blocking | REV-004 | Review the non-functional requirements against the confirmed product |
| [REV-006](review/REV-006-delivery.md) | DONE | Blocking | REV-005 | Review delivery against the accepted decisions and the confirmed product |
| [REV-007](review/REV-007-synthesis.md) | DONE | Blocking | REV-006 | Disposition the review findings |
| [REV-008](review/REV-008-apply-findings.md) | DONE | Blocking | REV-007 | Apply the review findings |
| [PREP-001](prep/PREP-001-milestone-slice.md) | DONE | Blocking | — | Propose the first milestone slice |
| [PREP-002](prep/PREP-002-implementation-tasks.md) | DONE | Blocking | PREP-001 | Write the version-1 implementation tasks |
| [IMPL-001](impl/IMPL-001-deploy.md) | DONE | Blocking | — | Deploy from the laptop |
| [IMPL-002](impl/IMPL-002-name.md) | DONE | Blocking | IMPL-001 | Name and player id |
| [IMPL-003](impl/IMPL-003-room.md) | DONE | Blocking | IMPL-002 | Room before the match starts |
| [IMPL-008](impl/IMPL-008-room-names.md) | DONE | Important | IMPL-003 | Adjective-animal room ids |
| [IMPL-004](impl/IMPL-004-start.md) | DONE | Blocking | IMPL-003 | Start the match |
| [IMPL-009](impl/IMPL-009-dashboard-url.md) | DONE | Important | IMPL-004 | Dashboard on its own page |
| [IMPL-010](impl/IMPL-010-seat-list.md) | DONE | Important | IMPL-003 | Seat list shows one number |
| [IMPL-005](impl/IMPL-005-bid-and-trump.md) | DONE | Blocking | IMPL-004 | Bid and trump |
| [IMPL-006](impl/IMPL-006-play.md) | DONE | Blocking | IMPL-005 | Play the match |
| [IMPL-007](impl/IMPL-007-look-back.md) | DONE | Blocking | IMPL-006 | Look back at a match |
| [IMPL-011](impl/IMPL-011-card-table.md) | DONE | Important | IMPL-007 | Card table look |
| [IMPL-012](impl/IMPL-012-table-play.md) | DONE | Important | IMPL-011 | Table play layout |
| [IMPL-013](impl/IMPL-013-seat-circle.md) | DONE | Important | IMPL-012 | Seats in a circle |
| [IMPL-014](impl/IMPL-014-own-seat.md) | DONE | Important | IMPL-013 | Own seat chip |
| [IMPL-015](impl/IMPL-015-deal-cap.md) | DONE | Important | IMPL-006 | Deal at most 10 |
| [IMPL-016](impl/IMPL-016-own-seat-on-felt.md) | DONE | Important | IMPL-014 | Own seat on the felt |
| [IMPL-017](impl/IMPL-017-shadcn-table.md) | DONE | Important | IMPL-016 | Shell and table restyle |
| [IMPL-018](impl/IMPL-018-table-comments.md) | DONE | Important | IMPL-017 | Table comments |
| [IMPL-019](impl/IMPL-019-seat-scores.md) | DONE | Important | IMPL-018 | Seat bid and tricks |
| [IMPL-020](impl/IMPL-020-center-and-room-name.md) | DONE | Important | IMPL-019 | Center, turn line, and room name |
| [IMPL-021](impl/IMPL-021-seat-spread.md) | DONE | Important | IMPL-020 | Small table, page, and names |
| [IMPL-022](impl/IMPL-022-shell-colors.md) | DONE | Important | IMPL-021 | Shell colors |
| [IMPL-023](impl/IMPL-023-under-table-align.md) | DONE | Important | IMPL-022 | Align the controls under the table |
| [IMPL-024](impl/IMPL-024-play-sound-and-turn.md) | DONE | Important | IMPL-023 | Play sound and turn mark |
| [IMPL-025](impl/IMPL-025-emerald-gold.md) | DONE | Important | IMPL-022 | Royal emerald and gold |
| [IMPL-026](impl/IMPL-026-last-bid.md) | DONE | Important | IMPL-025 | Disable the last bidder's forbidden number |
| [IMPL-027](impl/IMPL-027-round-result.md) | DONE | Important | IMPL-026 | Pause for the round result |
| [IMPL-028](impl/IMPL-028-trump-cards.md) | DONE | Important | IMPL-027 | Trump choice as four cards |
| [IMPL-029](impl/IMPL-029-card-rank.md) | DONE | Important | IMPL-028 | Keep the rank in the left corner |
| [IMPL-030](impl/IMPL-030-result-ok.md) | DONE | Important | IMPL-029 | Dismiss the round result |
| [IMPL-031](impl/IMPL-031-card-mp3.md) | DONE | Important | IMPL-030 | Use the new card sound |

The order is a chain. Split or reorder a later task only after discovery shows the product needs a different cut. Do that in the task’s notes log and in this table before starting the reordered work.

## Version 2 preps

Version 2 closed on 2026-10-15. This table is the record. Do not add a version 3 task in this table. Version 3 planning is the next table.

| ID | Status | Priority | Blocked by | Summary |
| --- | --- | --- | --- | --- |
| [V2-001](v2/V2-001-clear-stored-games.md) | DONE | Important | — | Clear stored games before the actual deployment |
| [V2-002](v2/V2-002-custom-domain.md) | DONE | Important | — | Host the site at bidmaster.arkil.in |
| [V2-003](v2/V2-003-plain-text.md) | DONE | Important | — | Restyle plain sentences |
| [V2-004](v2/V2-004-crown.md) | DONE | Important | — | Seat the crown on the title |
| [V2-005](v2/V2-005-table-depth.md) | DONE | Important | — | Give the felt a lit center, texture, and a raised gold rim |
| [V2-006](v2/V2-006-favicon.md) | DONE | Important | — | Add a card favicon |
| [V2-007](v2/V2-007-trick-pause.md) | DONE | Important | — | Highlight the winning card, then wait 2 seconds |
| [V2-008](v2/V2-008-crown-lift.md) | DONE | Important | — | Lift the crown off the letters |
| [V2-009](v2/V2-009-wrong-room-id.md) | DONE | Important | — | Stay on the page for a wrong room id |
| [V2-010](v2/V2-010-bid-sound.md) | DONE | Important | — | Play a sound when a bid is chosen |
| [V2-011](v2/V2-011-seats-and-hand-gap.md) | DONE | Important | — | Seats near the rim, and a steady hand row |
| [V2-012](v2/V2-012-stadium-table.md) | DONE | Important | — | Change the oval felt to a stadium |
| [V2-013](v2/V2-013-trump-above-table.md) | DONE | Important | — | Trump above the stadium, trick of 10 in the center |
| [V2-014](v2/V2-014-trump-chooser-refresh.md) | DONE | Important | — | Update the trump chooser without a refresh |
| [V2-015](v2/V2-015-last-trick-pause.md) | DONE | Important | — | Pause 2 seconds before the round result |
| [V2-016](v2/V2-016-trump-gap.md) | DONE | Important | — | Reserve the trump mark so the table does not drop |
| [V2-017](v2/V2-017-graph-markers.md) | DONE | Important | — | Mark rounds and a point range on the dashboard graph |
| [V2-018](v2/V2-018-start-in-room.md) | DONE | Important | — | Stay in the room when the match starts |
| [V2-019](v2/V2-019-name-without-seat.md) | DONE | Important | — | Show names without seat numbers |
| [V2-020](v2/V2-020-public-dashboard.md) | DONE | Important | — | Let anyone watch a started dashboard |
| [V2-021](v2/V2-021-turn-buzz.md) | DONE | Important | — | Buzz 5 seconds into a player's turn, then every 5 seconds |
| [V2-022](v2/V2-022-dashboard-listener.md) | DONE | Important | — | Give the dashboard its own live connection |
| [V2-023](v2/V2-023-buzz-interval.md) | DONE | Important | — | Buzz 10 seconds into a turn, then every 10 seconds |
| [V2-024](v2/V2-024-total-graph.md) | DONE | Important | — | Add a graph of each player's running total |
| [V2-025](v2/V2-025-rules-page.md) | DONE | Important | — | Add a rules page and link it from home and the room |
| [V2-026](v2/V2-026-room-link-label.md) | DONE | Important | — | Use Room for the link back to the room |
| [V2-027](v2/V2-027-close-v2.md) | DONE | Important | — | Close version 2 and match the documents to the site |

## Version 3 planning

Started 2026-10-15. These tasks do not write code. Implementation task files wait until the user agrees the slice.

| ID | Status | Priority | Blocked by | Summary |
| --- | --- | --- | --- | --- |
| [PREP-003](prep/PREP-003-v3-slice.md) | DONE | Blocking | — | Propose the first version 3 slice |
| [PREP-004](prep/PREP-004-feel-moments.md) | DONE | Blocking | PREP-003 | Propose which moments get the first feel of play |
| [PREP-005](prep/PREP-005-card-landing.md) | DONE | Blocking | PREP-004 | Propose how a played card lands |
| [PREP-006](prep/PREP-006-card-task.md) | DONE | Blocking | PREP-005 | Write the unstarted card-landing task |
| [PREP-007](prep/PREP-007-next-feel.md) | DONE | Blocking | — | Propose which moment of play is next |
| [PREP-008](prep/PREP-008-won-trick.md) | DONE | Blocking | PREP-007 | Propose how a won trick pays off |
| [PREP-009](prep/PREP-009-won-trick-task.md) | DONE | Blocking | PREP-008 | Write the unstarted won-trick task |
| [PREP-010](prep/PREP-010-next-moment.md) | DONE | Blocking | — | Propose which remaining moment of slice 1 is next |
| [PREP-011](prep/PREP-011-turn-arrival.md) | DONE | Blocking | PREP-010 | Propose how a turn arrives |
| [PREP-012](prep/PREP-012-turn-task.md) | DONE | Blocking | PREP-011 | Write the unstarted turn-arrival task |
| [PREP-013](prep/PREP-013-bid-and-deal.md) | DONE | Blocking | — | Propose how a bid and a new deal feel |

## Version 3

Started 2026-10-15, when the user recorded that version 3 build may start.

| ID | Status | Priority | Blocked by | Summary |
| --- | --- | --- | --- | --- |
| [V3-001](v3/V3-001-card-landing.md) | DONE | Blocking | — | A played card lifts, travels, and snaps |
| [V3-002](v3/V3-002-reactions.md) | DONE | Important | — | Reaction emojis and short lines for the table |
| [V3-003](v3/V3-003-won-trick.md) | DONE | Important | — | A won trick lifts, travels, and snaps onto the winner |
| [V3-004](v3/V3-004-reaction-bubble.md) | DONE | Important | — | A reaction sits on the sender's seat as a comic bubble |
| [V3-005](v3/V3-005-reaction-hold.md) | DONE | Important | — | Several reaction bubbles can sit on their own seats for 5 seconds |
| [V3-006](v3/V3-006-reaction-picker.md) | DONE | Important | — | Reactions open from one centered emoji button |
| [V3-007](v3/V3-007-reaction-popup.md) | DONE | Important | — | Reaction choices open in a popup |
| [V3-008](v3/V3-008-reaction-emoji.md) | DONE | Important | — | A larger emoji in a thin bubble with no shadow |
| [V3-009](v3/V3-009-trump-on-table.md) | DONE | Important | — | The trump icon sits on the felt above the trick |
| [V3-010](v3/V3-010-trump-card.md) | DONE | Important | — | Trump on the felt is a small card |
| [V3-011](v3/V3-011-turn-arrival.md) | DONE | Important | — | The seat chip lifts when the turn arrives |
| [V3-012](v3/V3-012-bid-snap.md) | DONE | Important | — | A stored bid snaps into the center and onto the seat |
| [V3-013](v3/V3-013-deal-snap.md) | DONE | Important | — | A new hand lifts and snaps into the row |
| [V3-014](v3/V3-014-trick-sounds.md) | DONE | Important | — | One card sound for each card traveling to the winner |
| [V3-015](v3/V3-015-bid-wrap.md) | DONE | Important | — | Bid chips wrap sooner on a phone |
| [V3-016](v3/V3-016-card-from-seat.md) | DONE | Important | — | A played card comes from the hand, or from that player's seat |
| [V3-017](v3/V3-017-last-trick.md) | DONE | Important | — | The last trick of every round travels to the winner |
| [V3-018](v3/V3-018-card-crosses.md) | DONE | Important | — | A played card crosses the felt from the player |
| [V3-019](v3/V3-019-turn-star.md) | DONE | Important | — | The turn star sits outside the gold ring |
