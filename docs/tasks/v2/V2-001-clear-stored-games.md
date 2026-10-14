# V2-001: Clear stored games

| Field | Value |
| --- | --- |
| **ID** | V2-001 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | delivery |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

An operator can delete every stored room from the deployed DynamoDB table and refresh the CloudFront cache before the actual deployment. The step is written down, and the website still has no delete action.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [01-development-gate.md](../../01-development-gate.md)
- [x] [architecture/data-model.md](../../architecture/data-model.md)
- [x] [architecture/delivery.md](../../architecture/delivery.md)
- [x] [decisions/0004-s3-lambda-dynamodb.md](../../decisions/0004-s3-lambda-dynamodb.md)
- [x] [decisions/0005-mumbai-region.md](../../decisions/0005-mumbai-region.md)
- [x] [decisions/0010-cdk-typescript-from-laptop.md](../../decisions/0010-cdk-typescript-from-laptop.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked for this operator step on 2026-10-15. | — |

## Acceptance criteria

- [x] A script deletes every item in the rooms table of the `Bidmaster` stack in `ap-south-1`
- [x] The same script refreshes the CloudFront cache for the site
- [x] A preview is the default, and deletion runs only with `--yes`
- [x] The script finds the table and the distribution from the stack
- [x] [clear-stored-data.md](../../architecture/clear-stored-data.md) says when to run it, what it clears, and what stays
- [x] The website still has no action that deletes a room
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later operator can run `scripts/clear-stored-games.py`, preview the stored rooms, and with `--yes` remove them and refresh the site cache, using [clear-stored-data.md](../../architecture/clear-stored-data.md) alone.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | agent | The user asked for a version 2 prep that clears DynamoDB games and refreshes stored AWS data before the actual deployment. |
| 2026-10-15 | agent | Wrote the script and [clear-stored-data.md](../../architecture/clear-stored-data.md). Games are the rooms table. The refresh is a CloudFront invalidation of `/*`. The script was not run against AWS. |
