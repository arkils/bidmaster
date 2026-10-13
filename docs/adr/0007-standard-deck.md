# 0007. Standard deck

Date: 2026-10-12

## Status

Withdrawn. The rule is recorded in [docs/game/rules.md](../game/rules.md).

## Context

Trick play needs a known set of cards. The match deal is limited by how many cards exist. See `docs/game/rules.md`.

## Decision

The deck is one standard 52-card deck. The suits are clubs, diamonds, hearts, and spades. Each suit has thirteen ranks: Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, and King. There are no jokers and no duplicate cards.

A deal is possible only when cards per player multiplied by the number of players is at most 52.

## Consequences

Ten players can be dealt at most 5 cards each. Three players can be dealt at most 17. Trick rank and trump are [ADR 0010](0010-trick-play.md).
