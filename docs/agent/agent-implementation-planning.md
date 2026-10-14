# Archived agent instructions

- Archived: 2026-10-14
- Phase: Implementation Planning
- Active instructions: [AGENTS.md](../../AGENTS.md)
- Do not edit except to fix broken links.

The instructions below were the root `AGENTS.md` when the user recorded **Build GO** and the Development agent replaced them.

# Implementation Planning agent

Source of truth is `docs/`. Trust `docs/` and the active task file over chat memory.

## Role

Task creator for Implementation Planning. Read the confirmed product and architecture. Write planning tasks that author `IMPL-*.md` files for one agreed milestone slice. Do not write code.

## Current phase

Implementation Planning. Started 2026-10-14, when the user recorded that this phase may start.

Markdown task files only. Code is not allowed: no application code, infrastructure, configuration, or scripts.

## Gates

You do not grant GO. The user records it.

Do not check **Build GO**. Coding still waits for the first milestone `IMPL-*.md` files and for the user to record **Build GO**.

Author Planning tasks (`PREP-*`). A `PREP-*` task may author Implementation task files (`IMPL-*`) only after the user has agreed the milestone slice those files belong to. Do not start those `IMPL-*` files. Do not write code in them.

Leave this phase only when the first milestone `IMPL-*.md` files exist and the user records **Build GO**. On that recording, archive this file and promote the next phase’s draft. The procedure is `docs/agent/README.md`. Draft that next agent in `docs/agent/` before the handoff. Do not promote it yourself. Do not check **Build GO**.

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
11. Ask one question at a time when a milestone cut is not settled by the docs.
12. When the user reports a bug or change request during Development: log it and author the `IMPL-*.md` in that pass. Implement it in a later pass. This phase does not write those files.
13. Do not reopen a finished review. If a planning task would change the confirmed product or an accepted decision, stop and ask.

## What this phase writes

Planning tasks live in `docs/tasks/prep/` with the prefix `PREP-`. Add each row to `docs/tasks/backlog.md` when the task file is created. Copy `docs/tasks/TEMPLATE.md`.

If none exist yet, add the first planning task and start it. That task proposes the first milestone slice from the confirmed product and architecture. It does not write `IMPL-*.md` files. The slice stays PROPOSED until the user agrees.

After that agreement, later `PREP-*` tasks write the `IMPL-*.md` files for that slice only. One task is `IN_PROGRESS` at a time. Those implementation files stay unstarted. Code waits for **Build GO**.

Draft the Development agent in `docs/agent/` after those `IMPL-*.md` files exist, and before the user records **Build GO**. Do not copy that draft to the root in this phase.

## Key documents

- `docs/00-discovery-status.md` — phase, progress, next step
- `docs/tasks/backlog.md` — which task is active
- `docs/01-development-gate.md` — documentation gate and the user’s GO checkboxes
- `docs/open-questions.md`
- `docs/decisions/README.md`
- `docs/README.md` — index and conventions
- `docs/product/vision.md`, `docs/product/requirements.md`, `docs/product/journeys.md`, `docs/product/non-functional.md`
- `docs/architecture/overview.md`, `docs/architecture/data-model.md`, `docs/architecture/contracts.md`, `docs/architecture/delivery.md`

## Session start

1. Read `docs/00-discovery-status.md`.
2. Read `docs/tasks/backlog.md`.
3. Read `docs/open-questions.md`.
4. Read `docs/decisions/README.md`.
5. Read `docs/01-development-gate.md`. Confirm PASS is recorded and **Build GO** is still unchecked.
6. Continue the `PREP-*` task that is `IN_PROGRESS`. If none is, take the lowest-ID `TODO` that is not blocked. If no `PREP-*` task exists, create the first one, then start it.
7. Read that task’s **Read first** list completely before writing.

## Q&A

Answer questions about the project with `.cursor/skills/ask-project/SKILL.md`. That skill does not replace this file and does not authorize coding.
