# IMPL-008: Adjective-animal room ids

| Field | Value |
| --- | --- |
| **ID** | IMPL-008 |
| **Track** | Implementation |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | IMPL-003 |
| **Blocks** | — |
| **Completed** | 2026-10-14 |

## Summary

A new room id is one adjective and one animal, joined by a hyphen. The words come from a library. The hand-written word tuple in the room API is gone.

## Read first

- [x] [product/journeys.md](../../product/journeys.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)
- [x] [impl/IMPL-003-room.md](IMPL-003-room.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | The user asked for an adjective-animal id from a library such as `unique-names-generator`. That package is JavaScript. Create room runs in the Python API, which reserves the id. Where the words are chosen is not settled. | The user chose the Python package [unique-names-generator](https://pypi.org/project/unique-names-generator/). The API keeps choosing the id. |

## Acceptance criteria

- [x] A new room id is lowercase `adjective-animal`, two alphabetic words, and still matches the two-word form in [product/journeys.md](../../product/journeys.md)
- [x] The same word is not used on both sides. The hand-written word tuple is not the source
- [x] The API still refuses to reuse an id that already belongs to a room record
- [x] Typing the id and opening `/{roomId}` still work
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

Create room on the deploy returns an adjective-animal id, and a later task can keep using that id as the room record name.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Logged from the user. Not started. The current tuple is an implementation choice in the Python room function. |
| 2026-10-14 | agent | Done. Create room uses unique-names-generator 1.0.2, adjectives then animals, lowercase, hyphen. Live ids included determined-tortoise and naked-canid. |
