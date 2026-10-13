---
name: document-game
description: Historical method for writing docs/game rules and digital behavior under the previous process. Do not use it to choose work. The active agent is root AGENTS.md. Use only when an active task file names this skill.
---

# Document the game

**Do not execute this skill.** On 2026-10-13 the active process moved to root `AGENTS.md`. The sections below are the previous method, kept so links still resolve. They do not choose the next task.

Functional rules come first. Digital behavior is a later pass. Both are recorded in `docs/game/`. Read `.cursor/skills/write-adr/SKILL.md` only when a choice is an application decision.

## Functional rules

`docs/game/rules.md` is the record of the tabletop rules. D1–D4 are done. Change that file only when the user corrects a rule. A rule does not get an ADR.

## Digital behavior

The current work is `docs/tasks.md`. Start with N1. Write `docs/game/digital.md`.

Describe how the accepted rules run in software: what a player sees and does, what the program enforces, and what state must be remembered. Do not draw architecture, write tasks, or write code in this pass.

Digital behavior is decided in `docs/game/digital.md`. An application choice, such as who is authoritative or how the software is structured, gets an ADR before it is treated as decided. Link those ADRs from `docs/game/digital.md`.

If a digital choice would change a functional rule, stop and update `docs/game/rules.md` first.
