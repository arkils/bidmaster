# Clear stored data

Recorded by [V2-001](../tasks/v2/V2-001-clear-stored-games.md) on 2026-10-15. This is an operator step for the actual deployment. The website still has no action that deletes a room.

## Why this exists

Version 1 play has been against the one laptop deploy. DynamoDB keeps every room after people leave, and the table uses a retain policy, so a later deploy leaves those records in place. Before that deploy is treated as the real site, the practice rooms have to be removed.

## What is stored

The rooms table in the `Bidmaster` stack, in Mumbai (`ap-south-1`), holds every unstarted room and every started match. The key of each item is `roomId`. That table is the only store of games.

The CloudFront distribution caches the website files from S3. The `/api/*` behavior already skips that cache. Live notices go through IoT Core and are not kept as match records. Player names and player ids live in each browser's cookie.

## What the script does

`scripts/clear-stored-games.py` reads the `Bidmaster` stack and checks that it has one DynamoDB table and one CloudFront distribution.

A preview prints the table name, how many rooms are stored, and the distribution id:

```bash
AWS_PROFILE=bidmaster-prod python3 scripts/clear-stored-games.py
```

The same command with `--yes` deletes every room and asks CloudFront to fetch `/*` again:

```bash
AWS_PROFILE=bidmaster-prod python3 scripts/clear-stored-games.py --yes
```

Use the same AWS account and profile as the laptop deploy. The script needs the AWS CLI. It does not take a table name or a distribution id, so it stays pointed at this stack.

After `--yes`, those room ids are free. The table, the site files in S3, Lambda, the HTTP API, and the IoT authorizer stay in place. A browser keeps its own name and player id until that browser's cookie is cleared.

Run the preview first. `--yes` removes every stored room in that account, including a match someone is still playing.
