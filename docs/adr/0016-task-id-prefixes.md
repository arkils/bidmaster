# 0016. Task id prefixes

Date: 2026-10-13

## Status

Proposed

## Context

Task ids in `docs/tasks.md` use a one-letter prefix: Discovery is `D`, and the Digital group is `N`. The letter `N` does not name its group. Discovery, testing, and implementation need prefixes that can be read as the group. See `docs/tasks.md` and [ADR 0001](0001-development-process.md).

## Decision

Task ids use these prefixes:

- Discovery: `Disc`
- Testing: `Test`
- Implementation: `Impl`

The number stays on the prefix, as in `Disc1`. This ADR does not name the Digital group.

## Consequences

Once accepted, Discovery tasks `D1`–`D4` are renamed `Disc1`–`Disc4` everywhere those ids appear. Testing and implementation tasks use `Test` and `Impl` when those groups are created. [ADR 0001](0001-development-process.md) still decides when a group may be created and when implementation may start. The Digital ids stay `N` until that prefix is chosen.
