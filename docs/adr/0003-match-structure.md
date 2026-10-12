# 0003. Match structure

Date: 2026-10-12

## Status

Proposed

## Context

The functional rules need a fixed shape for who plays and how deals change across a match. Card rank, trump play, and the numeric cap on the deal are still open. See `docs/game/rules.md`.

## Decision

A match has 3 to 10 players in a fixed seating order. Every player is dealt the same number of cards in a round.

M is the largest equal deal the 52-card deck allows, as in [ADR 0012](0012-maximum-deal.md). Deals run from M down to 1, the one-card round is played a second time, then deals run back up to M. M is dealt on the first and last rounds. A round is scored before the next deal.

## Consequences

Match length is 2M rounds. Five players play 20 rounds. Six players play 16 rounds.
