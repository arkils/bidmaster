---
name: write-adr
description: Writes Nygard architecture decision records for bidmaster. Use when any rule, digital behavior, architecture, stack, or implementation choice is made, and before that choice is treated as decided.
---

# Write an ADR

A choice is not decided until an ADR exists and the user has accepted it. Check `docs/adr/README.md` for the next number. Use four digits: `0002`, `0003`, and so on. `0001` is the development process.

Create `docs/adr/NNNN-short-title.md` and add a row to the index.

## Template

```markdown
# NNNN. Short title

Date: YYYY-MM-DD

## Status

Proposed

## Context

What forced the choice. Link the game doc, diagram, or task that raised it.

## Decision

The choice, in one place.

## Consequences

What becomes easier, what becomes harder, and what later work must respect.
```

Set status to `Accepted` only after the user accepts it. Until then, later stages must not build on that choice.

One decision per ADR. Do not bury a second choice in Consequences.
