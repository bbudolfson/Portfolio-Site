#!/usr/bin/env bash
# Use project-local Node from .tools/node when present; otherwise use your PATH (e.g. nvm, Homebrew).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
if [[ -x "$ROOT/.tools/node/bin/node" ]]; then
  export PATH="$ROOT/.tools/node/bin:$PATH"
fi
cd "$ROOT"
exec npm run dev
