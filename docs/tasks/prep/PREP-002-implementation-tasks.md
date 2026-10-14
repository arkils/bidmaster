# PREP-002: Implementation tasks for version 1

| Field | Value |
| --- | --- |
| **ID** | PREP-002 |
| **Track** | Planning |
| **Phase** | Implementation Planning |
| **Component** | docs / tasks |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | PREP-001 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

Write the `IMPL-*.md` files for the version-1 slice agreed in [OQ-25](../../open-questions.md). Leave them unstarted. Do not write code. Do not check **Build GO**.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [prep/PREP-001-milestone-slice.md](PREP-001-milestone-slice.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [architecture/overview.md](../../architecture/overview.md)
- [x] [architecture/data-model.md](../../architecture/data-model.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)
- [x] [architecture/delivery.md](../../architecture/delivery.md)
- [x] [game/rules.md](../../game/rules.md)
- [x] [TEMPLATE.md](../TEMPLATE.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| [OQ-25](../../open-questions.md) | What is the first milestone slice? | Answered. All of version 1. |

## Acceptance criteria

- [x] [IMPL-001](../impl/IMPL-001-deploy.md) through [IMPL-007](../impl/IMPL-007-look-back.md) exist
- [x] Together they cover the confirmed version-1 journeys, the contracts, and the laptop deploy
- [x] Android, iOS, a public lobby, income, a trick-by-trick review, a separate rules engine, and a long-running match server are not tasks
- [x] Each implementation file is `TODO` and unstarted
- [x] **Build GO** stays unchecked
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can implement [IMPL-001](../impl/IMPL-001-deploy.md) through [IMPL-007](../impl/IMPL-007-look-back.md) one file at a time after **Build GO**, and can see which confirmed behavior each file owns.

## Task order

The order follows the journeys in `docs/product/journeys.md`. [IMPL-001](../impl/IMPL-001-deploy.md) is first because the laptop has no stand-in for the deployed services. The later files then follow **Give a name**, the room before the start, **Start the match**, play, and **Look back at a match**.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | PREP-001 is done. The user chose all of version 1. Wrote IMPL-001 through IMPL-007 as TODO. Did not check Build GO. Drafted the Development agent and did not copy it to the root. |
