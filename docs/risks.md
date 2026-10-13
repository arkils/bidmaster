# Risks

| ID | Risk | Impact | Status |
| --- | --- | --- | --- |
| R-1 | [ADR 0001](adr/0001-development-process.md) (Accepted) and root `AGENTS.md` describe different processes until [decision 0001](decisions/0001-documentation-driven-phases.md) is accepted. | A later agent can follow the old loop and start digital behavior or code early. | OPEN. Root `AGENTS.md` is the active agent. Banners on `docs/process.md`, `docs/tasks.md`, and `docs/adr/README.md` point here. |
| R-2 | Earlier digital notes in `docs/tasks.md` get treated as version-1 requirements. | Scope freezes before the user confirms the product. | Addressed 2026-10-13. DISC-002 classifies them in `docs/product/requirements.md`. |
| R-3 | Discovery writes the architecture before version-1 scope is confirmed. | Stack and data choices get made for a product the user has not accepted. | Addressed for the stack on 2026-10-13. Decisions 0002 through 0007 are ACCEPTED after the vision, requirements, and journeys. DISC-005 still must not store data the user has not confirmed. |
