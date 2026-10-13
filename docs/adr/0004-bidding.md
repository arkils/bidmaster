# 0004. Bidding

Date: 2026-10-12

## Status

Withdrawn. The rule is recorded in [docs/game/rules.md](../game/rules.md).

## Context

Each round needs one prediction per player before cards are played, and the predictions must not account for every trick exactly. See `docs/game/rules.md`.

## Decision

Each player submits one bid before any card is played. A bid is not negative, and a submitted bid cannot be changed. Bidding follows seating order. The player who bids first changes every round.

The number of tricks in the round equals the cards dealt to each player. The sum of all bids must not equal that number. The last bidder's bid is rejected when it would make the sum equal that number. The rejection states that reason.

## Consequences

Earlier bids can force the last bid away from exactly one number. The legal range is [ADR 0008](0008-bid-range.md). Clockwise order is [ADR 0009](0009-clockwise-order.md). The round-1 opening bidder stays unresolved and is not part of this decision.
