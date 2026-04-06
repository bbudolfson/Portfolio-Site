#!/usr/bin/env bash
# Same PATH logic as dev-with-tools.sh; runs static build + local server (matches Netlify output).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
if [[ -x "$ROOT/.tools/node/bin/node" ]]; then
  export PATH="$ROOT/.tools/node/bin:$PATH"
fi
cd "$ROOT"
exec npm run preview
