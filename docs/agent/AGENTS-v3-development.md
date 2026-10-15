# Version 3 Development agent

Promoted to root `AGENTS.md` on 2026-10-15, when the user recorded that version 3 build may start. The root file is the active copy. Do not edit this draft except to fix broken links.

Source of truth is `docs/`. Trust `docs/` and the active task file over chat memory.

## Role

Development. Implement one `V3-*` task at a time, inside that file’s acceptance criteria.

## Current phase

Version 3 Development. This phase starts only when the user records that version 3 build may start.

The **Build GO** recorded on 2026-10-14 covered version 1. It does not start this phase.

Code is allowed only inside the one `V3-*` task that is `IN_PROGRESS`.

## Gates

You do not grant GO. The user records it.

Do not expand a task past its acceptance criteria. If the task conflicts with the confirmed product or an accepted decision, stop and escalate.

## Absolute rules

1. `docs/` is the source of truth. Trust docs and the active task file over chat memory.
2. Pick one unblocked task at a time: lowest ID, status `TODO`, not blocked. Set it `IN_PROGRESS`, do the work, then set it `DONE` in both the task file and `docs/tasks/backlog.md` before starting another. If a task is already `IN_PROGRESS`, finish it before taking another.
3. Read the task’s **Read first** list completely before doing the work.
4. Update an existing document instead of creating a duplicate.
5. Add a document when it becomes useful. Do not design the whole system in one pass.
6. Do not make a significant decision silently. If it is unknown, ask. If several approaches are valid, explain options, trade-offs, and one recommendation, then wait for agreement before writing it as decided.
7. Separate **CONFIRMED**, **PROPOSED**, **FUTURE**, and **OPEN**. An assumption is never a confirmed requirement. Record assumptions in `docs/assumptions.md`, unknowns in `docs/open-questions.md`, and risks in `docs/risks.md`.
8. Record a hard-to-reverse decision as an ADR: context, decision, options considered, rationale, consequences, revisit triggers. Status is PROPOSED until the user agrees, then ACCEPTED. Index: `docs/decisions/README.md`. Template: `docs/decisions/0000-template.md`.
9. Do not expand agreed scope without the user’s approval.
10. Do not change architecture inside a coding task. If a task conflicts with docs, stop and escalate.
11. Ask one question at a time when the active task is blocked on a fact the docs do not settle.
12. When the user reports a bug or change request: log it and author the task file in that pass. Do not change code in that pass. Implement it only in a later pass, and only while that task is `IN_PROGRESS`.
13. Do not reopen a finished review. Reviews find and document. A synthesis task dispositions findings. A later task applies the fixes.
14. Do not change application code unless one `V3-*` task is `IN_PROGRESS` and the change is inside that task’s acceptance criteria. Author the task first.

## What this phase writes

Code for the one `V3-*` task that is `IN_PROGRESS`, and the status updates that task requires. Do not change application code when no task is `IN_PROGRESS`.

The first task is [V3-001](../tasks/v3/V3-001-card-landing.md). Side ads and the home-screen install are not tasks until a later planning pass adds them.

## Key documents

- `docs/00-discovery-status.md` — phase, progress, next step
- `docs/tasks/backlog.md` — which task is active
- The active `V3-*.md` file
- The product documents named in that file’s **Read first** list

## Session start

1. Read `docs/00-discovery-status.md`.
2. Read `docs/tasks/backlog.md`.
3. Continue the `V3-*` task that is `IN_PROGRESS`. If none is, take the lowest-ID `V3-*` that is `TODO` and not blocked.
4. Read that task’s **Read first** list completely before writing.

## Q&A

Answer questions about the project with `.cursor/skills/ask-project/SKILL.md`. That skill does not replace this file and does not authorize work outside the active task.
