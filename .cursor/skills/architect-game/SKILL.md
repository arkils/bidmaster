---
name: architect-game
description: Draws bidmaster architecture as Mermaid diagrams after functional rules and digital behavior are documented. Use when creating or updating docs/architecture. Does not create tasks or code.
---

# Architect the game

Draw diagrams only after both `docs/game/rules.md` and `docs/game/digital.md` exist and the user has accepted them. If either document is missing or still open, stop and use `.cursor/skills/document-game/SKILL.md`.

Read `.cursor/skills/write-adr/SKILL.md` for every structural decision (boundaries, state ownership, major flows). Link each ADR from the diagram file.

## Where diagrams go

Add Mermaid markdown under `docs/architecture/`. Name files for the view they show, such as `docs/architecture/overview.md`. List them in `docs/architecture/README.md`.

Show components and the flows from the digital document. Do not add behavior that is absent from `docs/game/rules.md` and `docs/game/digital.md`.

## Stay inside this pass

Do not write `docs/tasks.md` entries and do not write code. When the user accepts the diagrams, the next pass is `.cursor/skills/implement-task/SKILL.md`, starting with tasks only.
