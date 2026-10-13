# Architecture

DISC-004 is done. The overview matches the confirmed product. The data model is [data-model.md](data-model.md), recorded by DISC-005. The interface contracts are [contracts.md](contracts.md), recorded by DISC-006.

Each diagram is Mermaid in its own markdown file in this directory. List it in the table when it is added, and link the ADRs in `docs/decisions/` that decided the structure.

| Diagram | What it shows | Status |
| --- | --- | --- |
| [overview.md](overview.md) | Browser, CloudFront, a React site on S3, an HTTP API, Python Lambda, DynamoDB, and AWS IoT Core in Mumbai, with many matches at once. Decisions [0002](../decisions/0002-serverless-hosting.md) through [0010](../decisions/0010-cdk-typescript-from-laptop.md) are ACCEPTED, including [0009](../decisions/0009-player-id.md) and [0010](../decisions/0010-cdk-typescript-from-laptop.md). | Recorded |
