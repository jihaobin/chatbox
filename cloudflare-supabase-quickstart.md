# Cloudflare + Supabase Quickstart

## 1. Prepare local files

```bash
chmod +x ./deploy-cloudflare-supabase.sh
./deploy-cloudflare-supabase.sh
```

## 2. Create Supabase schema

1. Open Supabase project dashboard.
2. Go to SQL Editor.
3. Paste and run `supabase-init.sql`.

## 3. Install and login Cloudflare Wrangler

```bash
bun add -g wrangler
wrangler login
```

## 4. Configure Worker

1. Edit `wrangler.toml`.
2. Replace:
   - `name`
   - `CORS_ORIGIN`
   - `SUPABASE_URL`

## 5. Set Worker secrets

```bash
wrangler secret put OPENAI_API_KEY
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
```

## 6. Set web env vars in Cloudflare Pages

Set these in Pages Project Settings > Environment Variables:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Value format:

- `NEXT_PUBLIC_API_URL=https://<your-worker>.workers.dev/v1`
- `NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>`

## 7. Deploy Worker

```bash
wrangler deploy
```

## 8. Deploy web to Cloudflare Pages

Build settings:

- Framework preset: Next.js
- Build command: `bun run --filter=web build`
- Build output directory: `.next`

## 9. Verify

1. Open `https://<pages-project>.pages.dev`
2. Send one message in chat.
3. Confirm API calls hit Worker and data appears in Supabase.
