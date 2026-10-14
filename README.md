# bidmaster

One AWS deploy, from this laptop, into Mumbai (`ap-south-1`). CloudFront is the global front door. The React app calls that deploy. There is no local stand-in.

```bash
cd web && npm install
cd ../infra && npm install
npx cdk bootstrap aws://ACCOUNT/ap-south-1
npm run deploy
```

The deploy prints `SiteUrl`. Open that URL.

To run the React app on the laptop against the same deploy:

```bash
cd web
VITE_API_BASE=https://SITE_URL npm run dev
```

Use the `SiteUrl` value, without a trailing slash.
