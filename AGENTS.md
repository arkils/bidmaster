# Bidmaster agent

## Current state

Functional rules are written and reviewed in `docs/game/rules.md`. Discovery tasks D1–D4 are `done`. Do not reopen them unless the user corrects a rule.

The next task is **N1** in `docs/tasks.md`. It is `todo`. Digital behavior is not written yet. `docs/game/digital.md` does not exist.

Do not draw architecture or write code in this pass. Architecture and implementation tasks are not created yet.

## Order

Do not skip a gate.

1. Document functional rules in `docs/game/rules.md`. This step is done.
2. Document digital behavior in `docs/game/digital.md`. This is the current step. Work N1, then N2, then N3, then N4, then N5.
3. Draw architecture under `docs/architecture/`.
4. Write implementation tasks in `docs/tasks.md` from that architecture.
5. Implement one task at a time.

Read the matching skill before the stage you are in:

- Digital behavior: `.cursor/skills/document-game/SKILL.md`
- Architecture: `.cursor/skills/architect-game/SKILL.md`
- Tasks or implementation: `.cursor/skills/implement-task/SKILL.md`
- Any decision: `.cursor/skills/write-adr/SKILL.md`

A decision is not decided until an ADR in `docs/adr/` records it. The index is `docs/adr/README.md`. Rules ADRs 0003–0015 are proposed.

One task may have status `doing`. Do not change code for a later task in the same change. If implementation needs a new decision, write the ADR first. If implementation would change the architecture, stop, update the diagram and the tasks, then resume.

The human-readable loop is `docs/process.md`. Do not invent rules or digital behavior. Ask, then document what the user describes.
