# Development process

Work moves in one direction. A later stage starts only after the user accepts the previous one.

Current state: functional rules are reviewed in `docs/game/rules.md`. D1–D4 are done. The next task is N1 in `docs/tasks.md`. Digital behavior, architecture, and implementation are not started.

1. Document functional rules in `docs/game/rules.md`.
2. Document digital behavior in `docs/game/digital.md`.
3. Draw architecture under `docs/architecture/`.
4. Write tasks in `docs/tasks.md`.
5. Implement one task at a time.

Every decision is an ADR in `docs/adr/` before it is treated as decided. The index is `docs/adr/README.md`. The process itself is [ADR 0001](adr/0001-development-process.md).

## Gates

**Functional rules.** Tabletop game only: players, cards, setup, turns, legal actions, winning, and scoring. No screens, stacks, storage, networking, or code. Ask for the rules. Do not invent them.

**Digital behavior.** How the accepted rules run in software: what a player sees and does, what the program enforces, and what state must be remembered. Starts only after the functional rules are accepted. No diagrams, tasks, or code in this pass.

**Architecture.** Mermaid diagrams under `docs/architecture/`, drawn from the two game documents. No tasks and no code in this pass.

**Tasks.** Cut from the accepted architecture into `docs/tasks.md`. Each task has an id, a one-line outcome, a status (`todo`, `doing`, or `done`), a diagram link, and ADR links.

**Implementation.** Exactly one task is `doing`. Code for that task only. Mark it `done` when the code matches the diagram and the ADRs. If a new decision appears, write an ADR and accept it before coding that choice. If the code would change the architecture, stop, update the diagram and the tasks, then resume.

## Who reads what

Agents follow `AGENTS.md` and the skill for the current stage:

- `.cursor/skills/document-game/SKILL.md`
- `.cursor/skills/architect-game/SKILL.md`
- `.cursor/skills/implement-task/SKILL.md`
- `.cursor/skills/write-adr/SKILL.md`
