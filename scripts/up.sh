#!/usr/bin/env bash
# One command after clone or when node_modules is missing: install deps + dev server.
# Uses .tools/node/bin when present (same as dev:local).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
if [[ -x "$ROOT/.tools/node/bin/node" ]]; then
  export PATH="$ROOT/.tools/node/bin:$PATH"
fi
cd "$ROOT"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js not found on PATH."
  echo "Install Node 20 (see package.json engines and .nvmrc), or place a portable Node at .tools/node — see LOCAL-DEV.txt"
  exit 1
fi

major="$(node -p "process.versions.node.split('.')[0]")"
if [[ "$major" != "20" ]]; then
  echo "Warning: this repo targets Node 20.x; you have $(node -v)"
fi

if [[ ! -d node_modules ]] || [[ ! -x node_modules/.bin/next ]]; then
  echo "→ Installing dependencies..."
  npm install
fi

echo "→ Starting dev server (Ctrl+C to stop)..."
exec npm run dev
