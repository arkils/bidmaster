# 0014. Private hands

Date: 2026-10-12

## Status

Proposed

## Context

Bidding and trump selection depend on what a player knows. The rules did not say when a hand may be seen, or by whom. See `docs/game/rules.md`.

## Decision

Each player sees only their own cards. Those cards may be looked at before that player bids.

## Consequences

Bids and the trump choice are made with knowledge of one's own hand. Other hands stay hidden until the cards are played.
