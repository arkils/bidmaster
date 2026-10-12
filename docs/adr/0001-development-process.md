# 0001. Development process

Date: 2026-10-12

## Status

Accepted

## Context

Bidmaster is a digital copy of a card game. The rules are not written yet. Implementation before the rules, the digital behavior, and the architecture would freeze choices that have not been examined.

## Decision

Work follows this order:

1. Document functional rules in `docs/game/rules.md`.
2. Document digital behavior in `docs/game/digital.md`.
3. Draw architecture under `docs/architecture/`.
4. Write tasks in `docs/tasks.md` from that architecture.
5. Implement one task at a time.

Each stage starts only after the previous one is accepted. Exactly one task may be `doing`. Every decision is an ADR in `docs/adr/` before it is treated as decided.

Agents follow `AGENTS.md` and the skills in `.cursor/skills/`. The human-readable loop is `docs/process.md`.

## Consequences

Game rules, digital behavior, diagrams, tasks, and code wait until their gate opens. A change that contradicts an accepted document or diagram stops implementation until the document, the diagram, and the tasks are updated. Each new choice adds an ADR and an index row.
