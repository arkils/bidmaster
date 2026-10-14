# bidmaster

One AWS deploy, from this laptop, into Mumbai (`ap-south-1`). CloudFront is the global front door. The React app calls that deploy. There is no local stand-in.

```bash
cd web && npm install
cd ../infra && npm install
npx cdk bootstrap aws://ACCOUNT/ap-south-1
npx cdk bootstrap aws://ACCOUNT/us-east-1
npm run deploy
```

Players open `https://bidmaster.arkil.in`. DNS for `arkil.in` is at GoDaddy. The certificate check and the `bidmaster` CNAME are added there by hand. The steps are in `docs/architecture/delivery.md`. The deploy prints `SiteUrl` and `DistributionDomain`.

To run the React app on the laptop against the same deploy:

```bash
cd web
VITE_API_BASE=https://SITE_URL npm run dev
```

Use the `SiteUrl` value, without a trailing slash.

Before that deploy is treated as the real site, clear the practice rooms. The steps are in `docs/architecture/clear-stored-data.md`.

```bash
AWS_PROFILE=bidmaster-prod python3 scripts/clear-stored-games.py
AWS_PROFILE=bidmaster-prod python3 scripts/clear-stored-games.py --yes
```
