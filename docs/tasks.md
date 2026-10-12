# Tasks

Tasks are grouped. Exactly one task may be `doing`. New tasks start as `todo`.

Discovery of the tabletop rules is done. The next group is Digital. Architecture and implementation tasks are not created until those gates in [ADR 0001](adr/0001-development-process.md) open. Digital tasks depend on [ADR 0002](adr/0002-discovery-tasks.md).

The next task is **N1**. Do not start N2 or later in the same change.

## Discovery

### D1 — Discover who plays and how the game is set up
- Status: done
- Outcome: `docs/game/rules.md` records the players, the deal size, and the round sequence
- Diagram: none
- ADRs: [0003](adr/0003-match-structure.md), [0012](adr/0012-maximum-deal.md)

### D2 — Discover the cards and the deck
- Status: done
- Outcome: `docs/game/rules.md` records the deck, private hands, and undealt cards
- Diagram: none
- ADRs: [0007](adr/0007-standard-deck.md), [0014](adr/0014-private-hands.md), [0015](adr/0015-undealt-cards.md)

### D3 — Discover turns and legal actions
- Status: done
- Outcome: `docs/game/rules.md` records bidding, trump, and trick play
- Diagram: none
- ADRs: [0004](adr/0004-bidding.md), [0005](adr/0005-trump-selection.md), [0008](adr/0008-bid-range.md), [0009](adr/0009-clockwise-order.md), [0010](adr/0010-trick-play.md), [0011](adr/0011-round-starter.md)

### D4 — Discover winning and scoring
- Status: done
- Outcome: `docs/game/rules.md` records scoring and the tie break
- Diagram: none
- ADRs: [0006](adr/0006-scoring.md), [0013](adr/0013-tie-break.md)

## Digital

Write `docs/game/digital.md`. Record what the user describes. Do not invent behavior, draw architecture, or write code.

These points were stated earlier and still need to be confirmed in that document:

- One player creates a room and others join.
- The program rejects illegal and out-of-turn actions and explains an illegal last bid.
- A completed match can be reviewed: players, seating, each round's cards dealt, bids, trump, tricks won, round points, cumulative score, and the final ranking.
- The rules engine is separate from the interface, and the server is authoritative for online play.
- The game is for web, Android, and iOS.

### N1 — How a match is formed
- Status: todo
- Outcome: `docs/game/digital.md` records how players enter a match, how seating is fixed, and how the round-1 starter is chosen
- Diagram: none
- ADRs: [0002](adr/0002-discovery-tasks.md)

### N2 — What a player sees and does
- Status: todo
- Outcome: `docs/game/digital.md` records the information and actions at deal, bid, trump, play, and score
- Diagram: none
- ADRs: [0002](adr/0002-discovery-tasks.md)

### N3 — What the program enforces
- Status: todo
- Outcome: `docs/game/digital.md` records illegal bids, illegal cards, out-of-turn actions, and that the rules engine is separate from the interface
- Diagram: none
- ADRs: [0002](adr/0002-discovery-tasks.md)

### N4 — What is remembered
- Status: todo
- Outcome: `docs/game/digital.md` records the state kept during a match and what a player can review after it ends
- Diagram: none
- ADRs: [0002](adr/0002-discovery-tasks.md)

### N5 — Where the game runs
- Status: todo
- Outcome: `docs/game/digital.md` records the clients and whether a server is authoritative
- Diagram: none
- ADRs: [0002](adr/0002-discovery-tasks.md)
