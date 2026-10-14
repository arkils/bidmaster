# Delivery

Status: recorded by [DISC-008](../tasks/discovery/DISC-008-local-development.md).

## How a build reaches the site

CONFIRMED on 2026-10-14. See [decision 0010](../decisions/0010-cdk-typescript-from-laptop.md).

The AWS resources are an AWS CDK application written in TypeScript. A developer deploys it from a laptop. That deploy creates and updates S3, API Gateway, Lambda, DynamoDB, and IoT Core in Mumbai (`ap-south-1`), and it creates and updates CloudFront as the global front door. CloudFront is not placed in `ap-south-1`. The deploy puts the current React build and the current Python functions in place.

The website stays React. The Lambda code stays Python. TypeScript is only the infrastructure language.

CONFIRMED on 2026-10-15. Players open `https://bidmaster.arkil.in`. DNS for `arkil.in` is managed at GoDaddy. CloudFront stays the front door. The certificate for that name is requested in `us-east-1`, which is where CloudFront reads certificates. S3, Lambda, DynamoDB, API Gateway, and IoT Core stay in Mumbai.

The deploy prints `SiteUrl` as `https://bidmaster.arkil.in` and `DistributionDomain` as the `cloudfront.net` name. That `cloudfront.net` name keeps serving the site. In GoDaddy, on `arkil.in`, add two CNAME records:

1. The certificate check. While `BidmasterCert` is still creating, open AWS Certificate Manager in `us-east-1` and copy the CNAME for `bidmaster.arkil.in`. In GoDaddy the name is that host with `.arkil.in` removed, so a name ACM shows as `_abc.bidmaster.arkil.in` is entered as `_abc.bidmaster`. The value is the ACM target, ending in `acm-validations.aws`.
2. The site name. Type CNAME, name `bidmaster`, value the `DistributionDomain` output.

`us-east-1` is bootstrapped once, with `npx cdk bootstrap aws://ACCOUNT/us-east-1`, before the first deploy that requests the certificate. The deploy waits until the certificate check CNAME is in place.

No pipeline is required for that deploy. The laptop uses the AWS account credentials. There is one deploy. A room created from the laptop is on that same deploy.

Before that deploy is treated as the real site, practice rooms are cleared with the operator script in [clear-stored-data.md](clear-stored-data.md). The website still has no delete action.

## How version 1 is run locally

CONFIRMED on 2026-10-14. The React app on the laptop talks to the AWS services from that deploy. Create, join, leave, load, start, bids, trump, cards, the list of matches, and notices use API Gateway, Lambda, DynamoDB, and IoT Core. The Mumbai services are in `ap-south-1`. CloudFront is the global front door. The laptop does not run a stand-in for those services.
