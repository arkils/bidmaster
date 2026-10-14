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
| Discovery | `DISC-` | `docs/tasks/discovery/` | Done |
| Review | `REV-` | `docs/tasks/review/` | Done |
| Planning | `PREP-` | `docs/tasks/prep/` | Now. Authors `IMPL-*.md` for one agreed milestone slice. No code |
| Implementation | `IMPL-` | `docs/tasks/impl/` | Now. Code to that file’s acceptance criteria |

Planning may add `PREP-*` files. It writes `IMPL-*.md` files only after the user agrees that slice. Those files stay unstarted until **Build GO**.

## Status

`TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`, `CANCELLED`.

## Priority

`Blocking`, `Important`, or `Can defer`.

## Template

Copy `docs/tasks/TEMPLATE.md`. Keep the metadata table, the read-first checklist, the open-questions table, the acceptance criteria, the definition of done, and the notes log. The definition of done is one paragraph: what a later agent can do from the documents that task wrote, without guessing. Mark the task `DONE` in the file and in `docs/tasks/backlog.md` when the acceptance criteria and that paragraph are met.
