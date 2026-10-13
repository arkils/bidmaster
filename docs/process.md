# Development process

Superseded for day-to-day work on 2026-10-13. The active loop is root `AGENTS.md` and [00-discovery-status.md](00-discovery-status.md). This page stays as the record of the earlier five-step loop. The successor ADR is [0001](decisions/0001-documentation-driven-phases.md) and is PROPOSED.

Work moves in one direction. A later stage starts only after the user accepts the previous one.

Current state: functional rules are reviewed in `docs/game/rules.md`. D1–D4 are done. The next task is N1 in `docs/tasks.md`. Digital behavior, architecture, and implementation are not started.

1. Document functional rules in `docs/game/rules.md`.
2. Document digital behavior in `docs/game/digital.md`.
3. Draw architecture under `docs/architecture/`.
4. Write tasks in `docs/tasks.md`.
5. Implement one task at a time.

Game rules and digital behavior are recorded in `docs/game/` and are decided when the user accepts that document. Application decisions are ADRs in `docs/adr/` before they are treated as decided. The index is `docs/adr/README.md`. The process itself is [ADR 0001](adr/0001-development-process.md). Which records belong in which place is [ADR 0017](adr/0017-rules-live-in-game-docs.md).

## Gates

**Functional rules.** Tabletop game only: players, cards, setup, turns, legal actions, winning, and scoring. No screens, stacks, storage, networking, or code. Ask for the rules. Do not invent them. The record is `docs/game/rules.md`.

**Digital behavior.** How the accepted rules run in software: what a player sees and does, what the program enforces, and what state must be remembered. Starts only after the functional rules are accepted. The record is `docs/game/digital.md`. No diagrams, tasks, or code in this pass. An application choice made during this pass still gets an ADR.

**Architecture.** Mermaid diagrams under `docs/architecture/`, drawn from the two game documents. No tasks and no code in this pass.

**Tasks.** Cut from the accepted architecture into `docs/tasks.md`. Each task has an id, a one-line outcome, a status (`todo`, `doing`, or `done`), a diagram link, and ADR links.

**Implementation.** Exactly one task is `doing`. Code for that task only. Mark it `done` when the code matches the diagram and the ADRs. If a new application decision appears, write an ADR and accept it before coding that choice. If the code would change the architecture, stop, update the diagram and the tasks, then resume.

## Who reads what

Agents follow `AGENTS.md` and the skill for the current stage:

- `.cursor/skills/document-game/SKILL.md`
- `.cursor/skills/architect-game/SKILL.md`
- `.cursor/skills/implement-task/SKILL.md`
- `.cursor/skills/write-adr/SKILL.md`
