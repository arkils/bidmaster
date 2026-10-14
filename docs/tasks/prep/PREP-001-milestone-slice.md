# PREP-001: First milestone slice

| Field | Value |
| --- | --- |
| **ID** | PREP-001 |
| **Track** | Planning |
| **Phase** | Implementation Planning |
| **Component** | docs / tasks |
| **Status** | DONE |
| **Priority** | Blocking |
| **Blocked by** | — |
| **Blocks** | PREP-002 |
| **Completed** | 2026-10-14 |

## Summary

Propose the first milestone slice from the confirmed product and architecture. Record it as PROPOSED. Do not write `IMPL-*.md` files until the user agrees the slice.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [01-development-gate.md](../../01-development-gate.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [decisions/README.md](../../decisions/README.md)
- [x] [product/vision.md](../../product/vision.md)
- [x] [product/requirements.md](../../product/requirements.md)
- [x] [product/journeys.md](../../product/journeys.md)
- [x] [product/non-functional.md](../../product/non-functional.md)
- [x] [architecture/overview.md](../../architecture/overview.md)
- [x] [architecture/data-model.md](../../architecture/data-model.md)
- [x] [architecture/contracts.md](../../architecture/contracts.md)
- [x] [architecture/delivery.md](../../architecture/delivery.md)
- [x] [tasks/README.md](../README.md)

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| [OQ-25](../../open-questions.md) | What is the first milestone slice? | Answered 2026-10-14. The user chose option C. The slice is all of version 1. |

## Acceptance criteria

- [x] Options, trade-offs, and one recommendation are written in this file
- [x] Option B stays an unaccepted recommendation
- [x] The user has agreed the slice, and that agreement is recorded in [open-questions.md](../../open-questions.md)
- [x] This task does not add an `IMPL-*.md` file
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can read the agreed slice and write `IMPL-*.md` files for that slice only, without guessing which journeys are in it and which wait.

## Agreement

The user chose option C on 2026-10-14. The slice is all of version 1, recorded in [OQ-25](../../open-questions.md). Option B was the recommendation and was not accepted.

## Proposal

Written on 2026-10-14 as a proposal. The agreement above is the choice.

The confirmed product is a complete invited match, a live dashboard, and a look back by room id. Delivery has no local stand-in: the React app on the laptop talks to the deployed AWS services. Planning writes `IMPL-*.md` files for one slice, not for every journey at once.

### Option A — Deployed shell

The laptop deploy creates CloudFront, S3, a React page, API Gateway, Lambda, DynamoDB, and IoT Core. A person can open the site. The page does not ask for a name and does not create a room.

This proves [decision 0010](../../decisions/0010-cdk-typescript-from-laptop.md) and the idle hosting in [decision 0002](../../decisions/0002-serverless-hosting.md). It does not exercise a confirmed journey. The next slice would still have to add the cookie, the room, and the live seat list before anyone can gather.

### Option B — Waiting room

Recommended. The first slice is the site through a room that has not started.

In: the name and player id in the cookie; Create room; join from the URL; join by room id; leave before the start, including the next player becoming host; “room is full” when a join would seat an 11th player; load of that unstarted room; the room notices for join and leave. The laptop deploy creates the AWS resources those calls use. The React app on the laptop talks to that deploy.

Out: start, bid, trump, a card, the private hand, the dashboard, the look back, and the list of matches. A join after the match has started is out because this slice does not start a match.

This follows the journeys in `docs/product/journeys.md` from **Give a name** through **The host leaves before the start**. It stops before **Start the match**. The contracts for create, join, leave, load before the start, subscribe, and the join and leave notices already describe it. The match rules in `docs/game/rules.md` stay for a later slice.

### Option C — Version 1 in one slice

One list of `IMPL-*.md` files covers the name, the room, the complete match, the dashboard, and the look back.

A coding agent would still implement one file at a time after **Build GO**. The list would decide the whole build order before any of it runs. This phase writes one slice, and it does not design the whole system in one pass.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-14 | agent | Opened after the user recorded that Implementation Planning may start. Proposed option B, the waiting room. OQ-25 stays open. No IMPL file written. |
| 2026-10-14 | agent | The user chose option C, all of version 1 in one slice. Recorded that in OQ-25. Option B stays unaccepted. This task adds no IMPL file. |
