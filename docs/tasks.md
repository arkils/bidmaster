# Tasks

Historical task list from the earlier process. The active backlog is [tasks/backlog.md](tasks/backlog.md). Do not start N1 from this page. Coding waits for Review GO, then Planning, then Build GO.

Tasks are grouped. Exactly one task may be `doing`. New tasks start as `todo`.

Discovery of the tabletop rules is done. The next group is Digital. Architecture and implementation tasks are not created until those gates in [ADR 0001](adr/0001-development-process.md) open. Digital tasks depend on [ADR 0002](adr/0002-discovery-tasks.md).

The next task is **N1**. Do not start N2 or later in the same change.

## Discovery

### D1 — Discover who plays and how the game is set up
- Status: done
- Outcome: `docs/game/rules.md` records the players, the deal size, and the round sequence
- Diagram: none
- Rules: [docs/game/rules.md](game/rules.md)

### D2 — Discover the cards and the deck
- Status: done
- Outcome: `docs/game/rules.md` records the deck, private hands, and undealt cards
- Diagram: none
- Rules: [docs/game/rules.md](game/rules.md)

### D3 — Discover turns and legal actions
- Status: done
- Outcome: `docs/game/rules.md` records bidding, trump, and trick play
- Diagram: none
- Rules: [docs/game/rules.md](game/rules.md)

### D4 — Discover winning and scoring
- Status: done
- Outcome: `docs/game/rules.md` records scoring and the tie break
- Diagram: none
- Rules: [docs/game/rules.md](game/rules.md)

## Digital

Historical notes. The active requirements are `docs/product/requirements.md`. Do not start N1 from this section, and do not treat the bullets below as confirmed.

These points were stated earlier. DISC-002 classified them:

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
