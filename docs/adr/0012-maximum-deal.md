# 0012. Maximum deal

Date: 2026-10-12

## Status

Withdrawn. The rule is recorded in [docs/game/rules.md](../game/rules.md).

## Context

A standard 52-card deck cannot deal every player the same large hand. The earlier rules left M configurable. See `docs/game/rules.md`.

## Decision

M is the greatest whole number such that M multiplied by the number of players is at most 52.

Five players start at 10, because 5 × 10 = 50 and 5 × 11 = 55. Six players cannot start at 9, because 6 × 9 = 54. Six players start at 8, because 6 × 8 = 48.

## Consequences

M is fixed by the player count. It is not chosen separately for each match. Match length, including the repeated one-card round, is [ADR 0003](0003-match-structure.md).
