# Tasks

Source of truth for what to do next is `docs/tasks/backlog.md`, then the task file it names. Root `AGENTS.md` says whether that work may include code.

## Pick up a task

1. Read `docs/00-discovery-status.md`.
2. In `docs/tasks/backlog.md`, find the one task that is `IN_PROGRESS`. Continue it.
3. If none is `IN_PROGRESS`, take the lowest ID with status `TODO` whose **Blocked by** tasks are all `DONE`. Ignore `BLOCKED`, `DONE`, and `CANCELLED`.
4. Set that task to `IN_PROGRESS` in the task file and in the backlog.
5. Read its **Read first** list completely. Then do the work.
6. When the acceptance criteria and the definition of done are met, set it to `DONE` in both places before starting another task.

One task is `IN_PROGRESS` at a time.

## Tracks

| Track | Prefix | Folder | When |
| --- | --- | --- | --- |
| Discovery | `DISC-` | `docs/tasks/discovery/` | Now |
| Review | `REV-` | `docs/tasks/review/` | After the documentation gate PASS |
| Planning | `PREP-` | `docs/tasks/prep/` | After Review GO. Authors `IMPL-*.md` for one milestone slice. No code |
| Implementation | `IMPL-` | `docs/tasks/impl/` | After Build GO. Code to that file’s acceptance criteria |

Leave Review, Planning, and Implementation files for their phases. Do not create them early.

## Status

`TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`, `CANCELLED`.

## Priority

`Blocking`, `Important`, or `Can defer`.

## Template

Copy `docs/tasks/TEMPLATE.md`. Keep every field. The definition of done is the same on every task: the acceptance criteria are met, both status fields are `DONE`, and no rule in `docs/README.md` was skipped to get there.
