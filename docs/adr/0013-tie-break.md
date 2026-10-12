# 0013. Tie break

Date: 2026-10-12

## Status

Proposed

## Context

[ADR 0006](0006-scoring.md) ranks players by cumulative score and leaves equal scores unresolved. See `docs/game/rules.md`.

## Decision

A successful bid is one round in which the tricks won equal the bid. The tie break counts those rounds. It does not add up the bid numbers.

Cumulative score is compared first. A higher score ranks above a lower score. The successful-bid count is used only when those scores are equal. The player with more successful bids then ranks higher. When the score and that count are both equal, the players share the same rank, including a shared win.

## Consequences

Every round result must keep whether the bid was exact, not only the points. No further tie break is used after the successful-bid count.
