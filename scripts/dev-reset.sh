#!/usr/bin/env bash
# Free the dev port, clear Next's dev lock, then start hot-reload dev server.
# Usage: npm run dev:reset
# Optional: PORT=3005 npm run dev:reset

set -u

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT" || exit 1

if [[ -x "$ROOT/.tools/node/bin/node" ]]; then
  export PATH="$ROOT/.tools/node/bin:$PATH"
fi

PORT="${PORT:-3000}"

echo ""
echo "→ Portfolio dev reset (live reload)"
echo "→ Open: http://localhost:${PORT} (or http://127.0.0.1:${PORT})"
echo ""

if command -v lsof >/dev/null 2>&1; then
  if lsof -ti:"$PORT" >/dev/null 2>&1; then
    echo "→ Stopping whatever is listening on port ${PORT}..."
    lsof -ti:"$PORT" | xargs kill -9 2>/dev/null || true
    sleep 0.5
  else
    echo "→ Port ${PORT} is free."
  fi
else
  echo "→ (lsof not found; skipping port cleanup)"
fi

echo "→ Removing Next.js dev lock (if any)..."
rm -f .next/dev/lock 2>/dev/null || true

echo "→ Starting: npm run dev"
echo ""

exec env PORT="$PORT" npm run dev
