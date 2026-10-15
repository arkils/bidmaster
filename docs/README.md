# Bidmaster docs

Source of truth is `docs/`. Root `AGENTS.md` is the active phase agent. Chat history is not a requirement, a decision, or a task.

Version 2 closed on 2026-10-15. The product and architecture documents describe that site. Version 3 development started on 2026-10-15. The target is in [product/vision.md](product/vision.md). [V3-001](tasks/v3/V3-001-card-landing.md) through [V3-017](tasks/v3/V3-017-last-trick.md) are done.

## How to read this repo

Start at `docs/00-discovery-status.md`. It names the phase, the active task, and the next step. Then use the backlog.

| Need | Document |
| --- | --- |
| What phase we are in | [00-discovery-status.md](00-discovery-status.md) |
| Whether coding may start | [01-development-gate.md](01-development-gate.md) |
| What to do next | [tasks/backlog.md](tasks/backlog.md) |
| What the product is | [product/vision.md](product/vision.md) |
| What it must do | [product/requirements.md](product/requirements.md) |
| What version 1 must be like in use | [product/non-functional.md](product/non-functional.md) |
| How a player moves through version 1 | [product/journeys.md](product/journeys.md) |
| How the site looks | [product/look.md](product/look.md) |
| How version 1 is structured | [architecture/overview.md](architecture/overview.md) |
| What version 1 stores | [architecture/data-model.md](architecture/data-model.md) |
| What the browser and the backend say to each other | [architecture/contracts.md](architecture/contracts.md) |
| How version 1 is deployed | [architecture/delivery.md](architecture/delivery.md) |
| How to clear stored rooms before the actual deployment | [architecture/clear-stored-data.md](architecture/clear-stored-data.md) |
| What is undecided | [open-questions.md](open-questions.md) |
| What we are assuming | [assumptions.md](assumptions.md) |
| What can go wrong | [risks.md](risks.md) |
| What is decided | [decisions/README.md](decisions/README.md) |
| How agents change phase | [agent/README.md](agent/README.md) |
| How to pick up a task | [tasks/README.md](tasks/README.md) |

## Labels

Use these words the same way in every doc:

| Label | Meaning |
| --- | --- |
| CONFIRMED | The user accepted this statement. |
| PROPOSED | Written down for review. Not accepted yet. |
| FUTURE | Wanted later. Outside the current version. |
| OPEN | Unknown. See `open-questions.md`. |

An assumption is never a confirmed requirement. Put it in `assumptions.md`.

## Prior material

These files predate this process. Read them as source material. Re-classify anything you use into the documents above.

- Tabletop rules, reviewed under the earlier loop: `docs/game/rules.md`
- Earlier task list: `docs/tasks.md`
- Earlier ADRs: `docs/adr/README.md`
- Earlier loop, kept for the record: `docs/process.md`

## Standing rules

The active phase agent repeats these. They also live here so a phase change cannot drop them.

1. `docs/` is the source of truth. Trust docs and the active task file over chat memory.
2. One unblocked task at a time: lowest ID, status `TODO`, not blocked. Set `IN_PROGRESS`, finish, then set `DONE` in the task file and `docs/tasks/backlog.md`.
3. Read the task’s **Read first** list completely before the work.
4. Update an existing document instead of creating a duplicate.
5. Add a document when it becomes useful. Do not design the whole system in one pass.
6. Do not make a significant decision silently. Ask when it is unknown. When several approaches are valid, explain options, trade-offs, and one recommendation, then wait.
7. Separate CONFIRMED, PROPOSED, FUTURE, and OPEN.
8. Record a hard-to-reverse decision as an ADR. Status stays PROPOSED until the user agrees.
9. Do not expand agreed scope without the user’s approval.
10. Do not change architecture inside a coding task. If a task conflicts with docs, stop and escalate.
11. During discovery, ask one question at a time.
12. During Development, a bug or change request is logged and written up as `IMPL-*.md` in that pass. Implementation is a later pass.
13. Reviews find and document. A synthesis task dispositions findings. A later task applies the fixes.
