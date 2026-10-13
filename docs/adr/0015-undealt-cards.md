# 0015. Undealt cards

Date: 2026-10-12

## Status

Withdrawn. The rule is recorded in [docs/game/rules.md](../game/rules.md).

## Context

An equal deal from 52 cards can leave cards unused. Those cards need a place during the round and before the next deal. See `docs/game/rules.md`.

## Decision

The full deck is shuffled before every round. Cards that are not dealt stay out of that round. They are not played and they are not trump. They are returned to the deck before the next round is shuffled.

## Consequences

A five-player round of 10 leaves 2 cards unused, and those 2 cards can appear in later rounds. Trump comes only from the chooser, not from a turned undealt card.
