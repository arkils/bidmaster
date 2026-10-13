# Architecture

DISC-004 is done. The overview matches the confirmed product.

Each diagram is Mermaid in its own markdown file in this directory. List it in the table when it is added, and link the ADRs in `docs/decisions/` that decided the structure.

| Diagram | What it shows | Status |
| --- | --- | --- |
| [overview.md](overview.md) | Browser, CloudFront, a React site on S3, API Gateway HTTP and WebSocket, Python Lambda, and DynamoDB in Mumbai, with many matches at once. Decisions [0002](../decisions/0002-serverless-hosting.md) through [0007](../decisions/0007-api-gateway-and-live-updates.md) are ACCEPTED. | Recorded |
