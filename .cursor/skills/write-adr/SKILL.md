---
name: write-adr
description: Historical method for writing docs/adr records under the previous process. New ADRs go in docs/decisions/. Do not use this skill to choose work. The active agent is root AGENTS.md. Use only when an active task file names this skill.
---

# Write an ADR

**Do not execute this skill.** On 2026-10-13 the active process moved to root `AGENTS.md`. New ADRs use `docs/decisions/0000-template.md` and `docs/decisions/README.md`. The sections below are the previous method, kept so links still resolve.

An application choice is not decided until an ADR exists and the user has accepted it. Game rules and digital behavior are decided in `docs/game/`, not here. See ADR 0017 in `docs/adr/0017-rules-live-in-game-docs.md`. Check `docs/adr/README.md` for the next number. Use four digits: `0002`, `0003`, and so on. `0001` is the development process.

Create `docs/adr/NNNN-short-title.md` and add a row to the index.

## Template

```markdown
# NNNN. Short title

Date: YYYY-MM-DD

## Status

Proposed

## Context

What forced the choice. Link the game doc, diagram, or task that raised it.

## Decision

The choice, in one place.

## Consequences

What becomes easier, what becomes harder, and what later work must respect.
```

Set status to `Accepted` only after the user accepts it. Until then, later stages must not build on that choice.

One decision per ADR. Do not bury a second choice in Consequences.
