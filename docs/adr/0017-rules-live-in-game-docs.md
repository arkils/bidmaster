# 0017. Rules live in game docs

Date: 2026-10-13

## Status

Proposed

## Context

[ADR 0001](0001-development-process.md) says every decision is an ADR before it is treated as decided. The tabletop rules were written in `docs/game/rules.md` and copied again into ADRs 0003–0015. Those records are the game, not choices about how the application is built.

## Decision

Game rules and digital behavior are recorded only in `docs/game/`. `docs/game/rules.md` holds the tabletop rules. `docs/game/digital.md` holds how those rules run in software. A rule or a digital behavior is decided when the user accepts it in that document.

`docs/adr/` records application decisions: the development process, task identifiers, architecture boundaries, the stack, and which part of the software is authoritative. A game rule does not get an ADR.

## Consequences

ADRs 0003–0015 are withdrawn. Their text already lives in `docs/game/rules.md`. [ADR 0001](0001-development-process.md) still sets the stage order. It no longer requires an ADR for each game rule. Later work writes rules and digital behavior in `docs/game/`, and writes an ADR only for an application choice.
