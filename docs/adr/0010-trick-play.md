# 0010. Trick play

Date: 2026-10-12

## Status

Proposed

## Context

A trick needs a legal card and a single winner. The deck ranks were not ordered for play. See `docs/game/rules.md`.

## Decision

The led suit is the suit of the first card in the trick. A player who holds that suit must play it. A player with none of that suit may play any other card, including a non-trump.

In every suit, from lowest to highest: 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.

Any trump beats any non-trump. The higher trump wins when more than one trump is played. When no trump is played, the highest card of the led suit wins. Any other suit cannot win the trick.

## Consequences

Following suit is checked before the winner is chosen. A void player is not required to play trump. Who leads the first trick of a round is not part of this decision.
