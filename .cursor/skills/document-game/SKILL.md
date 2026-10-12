---
name: document-game
description: Documents bidmaster card-game rules and, only after those rules are accepted, how the game runs in software. Use when the user describes the game, rules, or functionality, or when writing docs/game/rules.md or docs/game/digital.md.
---

# Document the game

Functional rules come first. Digital behavior is a later pass. Read `.cursor/skills/write-adr/SKILL.md` for every decision.

## Functional rules

`docs/game/rules.md` is written. D1–D4 are done. Change that file only when the user corrects a rule, and update the matching ADR.

## Digital behavior

The current work is `docs/tasks.md`. Start with N1. Write `docs/game/digital.md`.

Describe how the accepted rules run in software: what a player sees and does, what the program enforces, and what state must be remembered. Do not draw architecture, write tasks, or write code in this pass.

Each digital decision gets an ADR before it is treated as decided. Link those ADRs from `docs/game/digital.md`.

If a digital choice would change a functional rule, stop and update `docs/game/rules.md` and its ADRs first.
