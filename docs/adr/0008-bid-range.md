# 0008. Bid range

Date: 2026-10-12

## Status

Proposed

## Context

[ADR 0004](0004-bidding.md) requires a non-negative bid and leaves the upper bound open. The last-bidder check needs the full set of legal bids. See `docs/game/rules.md`.

## Decision

A legal bid is a whole number from 0 through the number of cards dealt to each player in that round.

## Consequences

In a 7-card round the legal bids are 0, 1, 2, 3, 4, 5, 6, and 7, before the last-bidder restriction removes one of them. A bid above the cards dealt is rejected.
