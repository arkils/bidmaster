# 0009. Clockwise order

Date: 2026-10-12

## Status

Proposed

## Context

Bidding and card play share a direction around the table. [ADR 0004](0004-bidding.md) left that direction open. See `docs/game/rules.md`.

## Decision

The opening bidder moves one seat clockwise each round. Cards in a trick are played clockwise, in the same direction.

## Consequences

Turn order does not reverse between bidding and play. Who opens round 1, and who leads the first trick, are [ADR 0011](0011-round-starter.md).
