# 0005. Trump selection

Date: 2026-10-12

## Status

Proposed

## Context

One player must choose trump after the bids are locked. Shared high bids need a single winner. See `docs/game/rules.md`.

## Decision

Trump is chosen once and stays fixed for the round. Every round has a trump. The chooser names one of the four suits in the standard deck.

The chooser is the first player in that round's bidding order who bid the highest number. A later equal bid does not take the choice. When every bid is 0, the first player to bid that round chooses trump.

## Consequences

Shared high bids, including a high bid of 0, are decided by bidding order. The chooser cannot leave the round without a trump suit.
