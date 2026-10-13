---
name: ask-project
description: >-
  Answers questions about this repository from docs/ only. Cite the file.
  Do not invent architecture or authorize coding. Use when the user asks what
  the project is, what is decided, what is open, what the scope is, or what to
  do next. Does not replace root AGENTS.md.
---

# Ask the project

Answer from `docs/` only. Cite the file. Do not invent architecture. Do not authorize coding. Root `AGENTS.md` stays the phase agent. This skill does not replace it.

## Before answering

Read, in this order, and stop when the question is answered:

1. `docs/00-discovery-status.md`
2. `docs/tasks/backlog.md`
3. `docs/open-questions.md`
4. `docs/decisions/README.md`
5. The specific doc the question names, or the index row in `docs/README.md`

Trust these over chat memory. If the docs disagree, say so and cite both. The active agent file wins over an archive.

## How to answer

- Cite the path for each claim.
- Use the doc’s own labels: CONFIRMED, PROPOSED, FUTURE, OPEN.
- A PROPOSED ADR is not a decision. Say that it is proposed.
- An assumption in `docs/assumptions.md` is not a requirement.
- If the docs do not say, answer that it is not written. Point at the open question or the task that would record it.
- Do not add an approach, a stack, or a design the docs do not already contain.
- Do not mark a task done, record Review GO, record Build GO, or tell the user that coding may start.

## Phase limits

Read root `AGENTS.md` for whether code is allowed. This skill never widens that. During Discovery & Architecture, refuse requests to write code and point at `docs/01-development-gate.md`.
