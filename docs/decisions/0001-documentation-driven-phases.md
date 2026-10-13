# 0001. Documentation-driven phases

Date: 2026-10-13

## Status

PROPOSED

## Context

[ADR 0001](../adr/0001-development-process.md) is Accepted. It orders work as functional rules, digital behavior, architecture diagrams, a single `docs/tasks.md`, then one coding task. Root `AGENTS.md` followed that loop. The tabletop rules are reviewed in `docs/game/rules.md`. Digital behavior, architecture, and code have not started.

The user instructed a replacement on 2026-10-13: a later agent with no chat history must be able to read the repo and know what we are building, why, how it is designed, what is decided, what is open, and what to do next. Coding stays behind two user-recorded gates.

## Decision

Work moves through four phases. Root `AGENTS.md` is the active phase agent and is replaced only when the user records the gate for the next phase. The copy that was replaced is archived under `docs/agent/`.

| Phase | Agent role | May write | Gate to enter | Gate to leave |
| --- | --- | --- | --- | --- |
| Discovery & Architecture | Project architect | Markdown only | Start | Documentation gate PASS, then the user records Review GO |
| Pre-Development Review | Review & readiness | Markdown only. Reviews find issues; they do not fix them | Review GO is not yet recorded, but the doc gate has PASS | User records Review GO |
| Implementation Planning | Task creator | Markdown task files only. No code | Review GO | First milestone `IMPL-*.md` files exist and the user records Build GO |
| Development | Development | Code, but only inside one `IMPL-*` task’s acceptance criteria | Build GO | — |

The user records GO. An agent does not grant it.

Standing rules, task tracks, and status values are in `docs/README.md` and `docs/tasks/README.md`.

## Options considered

- Keep the Accepted five-step loop in `docs/adr/0001-development-process.md`. It already matches the reviewed rules and the unstarted digital tasks. It does not separate a review phase from fixes, and it does not require Review GO or Build GO before code.
- Four phases with archived agent instructions, one task file at a time, and user-recorded Review GO and Build GO. This is the option the user specified.

## Rationale

The user specified the four-phase loop so the repo, not the chat, carries the process. Review GO stops discovery from sliding into task authoring. Build GO stops task authoring from sliding into code. Archiving each `AGENTS.md` keeps the instructions a phase actually used.

## Consequences

Root `AGENTS.md` is the Discovery agent as of 2026-10-13. `docs/adr/0001-development-process.md` stays Accepted until the user accepts this record; agents follow root `AGENTS.md` in the meantime. New ADRs are written here, not in `docs/adr/`. Review, Planning, and Implementation task files are created in their own phases. Code waits for Review GO, then Planning, then Build GO.

## Revisit triggers

- The user rejects this process or changes a gate.
- A phase cannot be executed as written.
- Accepted `docs/adr/0001` and this record still disagree after the user has been asked to accept or amend this ADR.
