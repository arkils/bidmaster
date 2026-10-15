# Tasks

Source of truth for what to do next is `docs/tasks/backlog.md`, then the task file it names. Root `AGENTS.md` says whether that work may include code.

## Pick up a task

1. Read `docs/00-discovery-status.md`.
2. In `docs/tasks/backlog.md`, find the one task that is `IN_PROGRESS`. Continue it.
3. If none is `IN_PROGRESS`, take the lowest version 3 `PREP-*` that is `TODO` and not blocked. Do not start a `V3-*` task until the user records that version 3 build may start. Application code stays forbidden until then.
4. Set that task to `IN_PROGRESS` in the task file and in the backlog.
5. Read its **Read first** list completely. Then do the work.
6. When the acceptance criteria and the definition of done are met, set it to `DONE` in both places before starting another task.

One task is `IN_PROGRESS` at a time.

## Tracks

| Track | Prefix | Folder | When |
| --- | --- | --- | --- |
| Discovery | `DISC-` | `docs/tasks/discovery/` | Done |
| Review | `REV-` | `docs/tasks/review/` | Done |
| Planning | `PREP-` | `docs/tasks/prep/` | Version 1 planning is done through PREP-002. Version 3 planning is done through PREP-006. No code |
| Implementation | `IMPL-` | `docs/tasks/impl/` | Version 1 is done through IMPL-031 |
| Version 2 prep | `V2-` | `docs/tasks/v2/` | Closed on 2026-10-15, through V2-027 |
| Version 3 | `V3-` | `docs/tasks/v3/` | [V3-001](v3/V3-001-card-landing.md) and [V3-002](v3/V3-002-reactions.md) are written and unstarted |

Planning may add `PREP-*` files. It writes `IMPL-*.md` files only after the user agrees that slice. Those files stay unstarted until **Build GO**.

## Status

`TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`, `CANCELLED`.

## Priority

`Blocking`, `Important`, or `Can defer`.

## Template

Copy `docs/tasks/TEMPLATE.md`. Keep the metadata table, the read-first checklist, the open-questions table, the acceptance criteria, the definition of done, and the notes log. The definition of done is one paragraph: what a later agent can do from the documents that task wrote, without guessing. Mark the task `DONE` in the file and in `docs/tasks/backlog.md` when the acceptance criteria and that paragraph are met.
