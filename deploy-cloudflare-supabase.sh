#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ ! -f "$ROOT_DIR/wrangler.toml.example" ]; then
  echo "wrangler.toml.example not found"
  exit 1
fi

if [ ! -f "$ROOT_DIR/.env.cloudflare-supabase.example" ]; then
  echo ".env.cloudflare-supabase.example not found"
  exit 1
fi

if [ ! -f "$ROOT_DIR/supabase-init.sql" ]; then
  echo "supabase-init.sql not found"
  exit 1
fi

if [ -f "$ROOT_DIR/wrangler.toml" ]; then
  echo "wrangler.toml already exists, skip"
else
  cp "$ROOT_DIR/wrangler.toml.example" "$ROOT_DIR/wrangler.toml"
  echo "created wrangler.toml"
fi

if [ -f "$ROOT_DIR/.env.cloudflare-supabase" ]; then
  echo ".env.cloudflare-supabase already exists, skip"
else
  cp "$ROOT_DIR/.env.cloudflare-supabase.example" "$ROOT_DIR/.env.cloudflare-supabase"
  echo "created .env.cloudflare-supabase"
fi

echo "done"
echo "1) edit $ROOT_DIR/wrangler.toml"
echo "2) edit $ROOT_DIR/.env.cloudflare-supabase"
echo "3) run supabase-init.sql in Supabase SQL Editor"
