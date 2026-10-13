---
name: implement-task
description: Historical method for writing docs/tasks.md and implementing one task under the previous process. Do not use it to choose work. The active agent is root AGENTS.md. Use only when an active task file names this skill.
---

# Tasks, then one task

**Do not execute this skill.** On 2026-10-13 the active process moved to root `AGENTS.md`. The sections below are the previous method, kept so links still resolve. They do not choose the next task.

Read `.cursor/skills/write-adr/SKILL.md` before recording any new decision.

## Write tasks

Create or update `docs/tasks.md` only after the user has accepted the diagrams in `docs/architecture/`. Cut tasks from that architecture. Do not add a task that the diagrams do not cover.

Use the entry format already in `docs/tasks.md`: id, outcome, status, diagram link, ADR links. New tasks start as `todo`.

## Implement one task

Implement only when the user asks to implement. Set exactly one task to `doing`. Leave every other task `todo` or `done`.

Change only the code that task needs. Do not start the next task in the same change.

Mark the task `done` only when its code matches the linked diagram and ADRs.

If the task needs a decision that has no ADR, write the ADR and wait for it to be accepted before coding that choice.

If the code would contradict the architecture, stop. Update the diagram, the ADRs, and the task list, then resume that same task.
