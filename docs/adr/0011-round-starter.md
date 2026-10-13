# 0011. Round starter

Date: 2026-10-12

## Status

Withdrawn. The rule is recorded in [docs/game/rules.md](../game/rules.md).

## Context

Round 1 needs an opening bidder, and each round needs a leader for the first trick. Later rounds need a determined next starter. See `docs/game/rules.md`.

## Decision

Any player may bid first in round 1. That player also leads the first trick of the round.

Each new round, the opening bidder and first-trick leader move one seat clockwise. Cards and bids continue clockwise, so the player who bid first in one round bids last in the next. The last bidder must still keep the sum of bids different from the cards dealt to each player.

The winner of a trick leads the following trick inside the same round.

## Consequences

The round-1 starter is not fixed to a particular seat. Choosing which of the legal seats that is belongs to match setup. The last-bidder restriction moves with the rotation.
