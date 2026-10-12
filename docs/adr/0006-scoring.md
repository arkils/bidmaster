# 0006. Scoring

Date: 2026-10-12

## Status

Proposed

## Context

Round points have to depend on whether the tricks won equal the bid. A bid of 0 cannot use a multiple of the bid, because that multiple is 0. See `docs/game/rules.md`.

## Decision

An exact bid scores points. Any other result scores the negative of those points. The size of the miss does not change the points.

A bid of 0 scores 10. A bid greater than 0 scores bid × 11. The round score is added to the cumulative match score. The highest cumulative score wins the match.

## Consequences

A miss by one trick and a miss by many tricks cost the same. Equal match scores are ranked by [ADR 0013](0013-tie-break.md).
