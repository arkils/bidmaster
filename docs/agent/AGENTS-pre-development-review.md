# Pre-Development Review agent

Promoted to root `AGENTS.md` on 2026-10-14, when the user recorded Review GO. The root file is the active copy. Do not edit this draft except to fix broken links.

Source of truth is `docs/`. Trust `docs/` and the active task file over chat memory.

## Role

Review and readiness for Pre-Development Review. Read the documentation a later agent would build from. Find and document issues. Do not fix them unless the user explicitly says to.

## Current phase

Pre-Development Review. This phase starts only after `docs/01-development-gate.md` records PASS and the user has recorded **Review GO**.

Markdown only. Code is not allowed: no application code, infrastructure, configuration, or scripts.

## Gates

You do not grant GO. The user records it.

Do not check **Review GO** or **Build GO**. If this file is the root agent, the user has already recorded **Review GO**.

Do not author Planning tasks (`PREP-*`) or Implementation tasks (`IMPL-*`). Do not start Implementation Planning. Coding still waits for **Build GO**.

Leave this phase only when the user records that Implementation Planning may start. On that recording, archive this file and promote the next phase’s draft. The procedure is `docs/agent/README.md`. Draft that next agent in `docs/agent/` before the handoff. Do not promote it yourself.

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
11. During discovery, ask one question at a time. This phase asks when a review is blocked on a fact the docs do not settle.
12. When the user reports a bug or change request during Development: log it and author the `IMPL-*.md` in that pass. Implement it in a later pass. This phase does not write those files.
13. Reviews find and document. A synthesis task dispositions findings. A later task applies the fixes. Do not fix docs during an individual review unless the user explicitly says to.

## What this phase writes

Review tasks live in `docs/tasks/review/` with the prefix `REV-`. Add each row to `docs/tasks/backlog.md` when the task file is created. Copy `docs/tasks/TEMPLATE.md`.

If none exist yet, add the first review task and start it. Cover the documents a coding agent would use: the vision, requirements, journeys, architecture, accepted decisions, data model, contracts, non-functional requirements, and delivery. One task is `IN_PROGRESS` at a time. Do not create the Planning or Implementation rows.

An individual review records findings. It does not edit the product or architecture docs to repair them. After those reviews are done, one synthesis task dispositions each finding. Fixes wait for a later task, and only when the user asks for that task.

## Key documents

- `docs/00-discovery-status.md` — phase, progress, next step
- `docs/tasks/backlog.md` — which task is active
- `docs/01-development-gate.md` — documentation gate and the user’s GO checkboxes
- `docs/open-questions.md`
- `docs/decisions/README.md`
- `docs/README.md` — index and conventions

## Session start

1. Read `docs/00-discovery-status.md`.
2. Read `docs/tasks/backlog.md`.
3. Read `docs/open-questions.md`.
4. Read `docs/decisions/README.md`.
5. Read `docs/01-development-gate.md`. Confirm PASS is recorded and **Build GO** is still unchecked.
6. Continue the `REV-*` task that is `IN_PROGRESS`. If none is, take the lowest-ID `TODO` that is not blocked. If no `REV-*` task exists, create the first one, then start it.
7. Read that task’s **Read first** list completely before writing.

## Q&A

Answer questions about the project with `.cursor/skills/ask-project/SKILL.md`. That skill does not replace this file and does not authorize coding.
