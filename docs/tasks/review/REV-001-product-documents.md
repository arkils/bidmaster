# REV-001: Product documents

| Field | Value |
| --- | --- |
| **ID** | REV-001 |
| **Track** | Review |
| **Phase** | Pre-Development Review |
| **Component** | docs / product |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | — |
| **Blocks** | REV-002 |
| **Completed** | 2026-10-14 |

## Summary

Review the vision, the requirements, and the journeys against each other and against the tabletop rules. Record findings. Do not edit those documents to repair them.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [game/rules.md](../../game/rules.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. This review is not blocked on an unsettled fact. | Findings below wait for the synthesis task. |

## Acceptance criteria

- [x] Findings are recorded in this file
- [x] The vision, requirements, journeys, and rules were not edited to repair them
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read this file and know where the vision, the requirements, and the journeys agree with the tabletop rules, and which two gaps were found.

## Findings

Checked on 2026-10-14. These points agree across the vision, the requirements, the journeys, and `docs/game/rules.md`: the name and the hidden player id in the cookie, the two-word room id, both ways to join, the host choosing the round-1 opener among the players the rules already allow, seating by join time and clockwise play, a match of 3 to 10 players, the live dashboard of cumulative scores and per-round gain or loss, a look back that omits cards, bids, and trump, no public lobby, no income, and Android and iOS as FUTURE.

| ID | Finding |
| --- | --- |
| F-1 | [product/journeys.md](../../product/journeys.md) restates rank as a higher cumulative score first, then more successful bids. [game/rules.md](../../game/rules.md) also says that when the score and the number of successful bids are both equal, those players share the rank, and players who share the highest rank share the win. The vision says “a winner” after the last round. The requirements point at the rules for rank, so the full rule is still in force. The journey reads as if the two sentences are the whole rule. |
| F-2 | The opening of [game/rules.md](../../game/rules.md) still says digital behavior is the next pass. That is the earlier process. Version 1’s digital behavior is the product documents. A later agent can go looking for a digital-behavior document this process does not use. |

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | User recorded Review GO. Reviewed the vision, requirements, and journeys against the rules. Recorded F-1 and F-2. Did not edit those documents. |
