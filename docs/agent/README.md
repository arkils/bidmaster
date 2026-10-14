# Agent archives

Source of truth for the active role is root `AGENTS.md`. This folder keeps the instructions each phase actually used.

## Archive policy

On every phase change:

1. Copy the current root `AGENTS.md` to `docs/agent/agent-{phase-slug}.md`.
2. Put this header at the top: archived date, phase name, link to the new root `AGENTS.md`, and “do not edit except to fix broken links.”
3. Replace root `AGENTS.md` with the next phase’s instructions.
4. Update `docs/00-discovery-status.md` with the phase name and date.
5. Keep archives. Do not delete them.

Draft the next phase’s `AGENTS-*.md` in this folder before the gate. Promote that draft to root only when the user records GO.

| File | What it is |
| --- | --- |
| `agent-{phase-slug}.md` | Frozen copy of a root `AGENTS.md` that has been replaced. |
| `AGENTS-{phase-slug}.md` | Draft for the next phase. Not active until it is copied to the root. |

[AGENTS-pre-development-review.md](AGENTS-pre-development-review.md) was copied to the root on 2026-10-14, when the user recorded Review GO. That root file is archived as [agent-pre-development-review.md](agent-pre-development-review.md).

[AGENTS-implementation-planning.md](AGENTS-implementation-planning.md) was copied to the root on 2026-10-14, when the user recorded that Implementation Planning may start. That root file is archived as [agent-implementation-planning.md](agent-implementation-planning.md).

[AGENTS-development.md](AGENTS-development.md) was copied to the root on 2026-10-14, when the user recorded **Build GO**. Root `AGENTS.md` is the active development agent.

## Archives

| File | Phase | Archived |
| --- | --- | --- |
| [agent-prior-process.md](agent-prior-process.md) | Prior process (rules, then digital behavior) | 2026-10-13 |
| [agent-discovery-architecture.md](agent-discovery-architecture.md) | Discovery & Architecture | 2026-10-14 |
| [agent-pre-development-review.md](agent-pre-development-review.md) | Pre-Development Review | 2026-10-14 |
| [agent-implementation-planning.md](agent-implementation-planning.md) | Implementation Planning | 2026-10-14 |
