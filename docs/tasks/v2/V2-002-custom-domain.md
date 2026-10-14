# V2-002: Host at bidmaster.arkil.in

| Field | Value |
| --- | --- |
| **ID** | V2-002 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | delivery |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Players open the deployed site at `https://bidmaster.arkil.in`. The same CloudFront distribution stays the front door. The CloudFront domain name keeps working.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [01-development-gate.md](../../01-development-gate.md)
- [x] [open-questions.md](../../open-questions.md)
- [x] [architecture/delivery.md](../../architecture/delivery.md)
- [x] [architecture/overview.md](../../architecture/overview.md)
- [x] [decisions/0003-aws-cloudfront.md](../../decisions/0003-aws-cloudfront.md)
- [x] [decisions/0005-mumbai-region.md](../../decisions/0005-mumbai-region.md)
- [x] [decisions/0010-cdk-typescript-from-laptop.md](../../decisions/0010-cdk-typescript-from-laptop.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| [OQ-26](../../open-questions.md) | Where is DNS for `arkil.in` managed? | GoDaddy. Records are added there by hand. |

## Acceptance criteria

- [x] `https://bidmaster.arkil.in` serves the deployed site
- [x] The certificate covers `bidmaster.arkil.in` and CloudFront uses it
- [x] The laptop deploy creates or updates that name on the existing distribution
- [x] [delivery.md](../../architecture/delivery.md) records the hostname players open and the GoDaddy records
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A player can open `https://bidmaster.arkil.in` and reach this deploy, and a later agent can see that hostname in `docs/architecture/delivery.md` without guessing how DNS was attached.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | The user asked to host the site as `bidmaster.arkil.in`. Logged the task. Waiting on OQ-26 before changing the deploy. |
| 2026-10-15 | agent | DNS is at GoDaddy. The certificate stack is `BidmasterCert` in `us-east-1`. CloudFront uses that certificate for `bidmaster.arkil.in`. Deploy was not run. The task stays in progress until the GoDaddy certificate CNAME exists and the hostname serves the site. |
| 2026-10-15 | agent | The user added both GoDaddy CNAMEs. Deploy finished. `https://bidmaster.arkil.in` returns the site, and `/api/health` returns ok. |
