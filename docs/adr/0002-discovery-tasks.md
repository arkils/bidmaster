# 0002. Discovery tasks

Date: 2026-10-12

## Status

Proposed

## Context

[ADR 0001](0001-development-process.md) writes tasks only after an accepted architecture diagram. The game rules are not documented yet, so there is no diagram to cut tasks from. The first work is to discover and record the game. That work needs a task group of its own.

## Decision

`docs/tasks.md` is grouped. The first group is Discovery.

Discovery tasks may be written before any architecture diagram. Their outcome is an accepted section of `docs/game/rules.md` or `docs/game/digital.md`. They record what the user describes. They do not invent rules, and they do not include screens, stacks, or code.

Tasks for architecture and implementation still wait until the gates in [ADR 0001](0001-development-process.md) open. Exactly one task may be `doing`.

## Consequences

The backlog can list discovery work now. A discovery task is not `doing` until the user asks to start it. Implementation tasks remain blocked on an accepted diagram. Process files stay as ADR 0001 wrote them until this ADR is accepted.
