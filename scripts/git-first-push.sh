#!/usr/bin/env bash
# First-time push to GitHub. Requires Apple Command Line Tools: xcode-select --install
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! git --version >/dev/null 2>&1; then
  echo "Git is not usable yet. Install Apple Command Line Tools:"
  echo "  xcode-select --install"
  echo "Then run this script again. See SETUP-GITHUB.txt in the project root."
  exit 1
fi

if [[ -z "$(git config user.email 2>/dev/null)" ]]; then
  echo "Set your Git identity once, then re-run this script:"
  echo '  git config --global user.name "Your Name"'
  echo '  git config --global user.email "you@example.com"'
  exit 1
fi

if [[ -d .git ]]; then
  echo "→ Repository already initialized (.git exists)."
else
  echo "→ git init"
  git init
fi

echo "→ git add ."
git add .

if git diff --cached --quiet; then
  echo "Nothing to commit (already committed or empty after .gitignore)."
else
  echo "→ git commit"
  git commit -m "first commit"
fi

echo "→ git branch -M main"
git branch -M main

ORIGIN_URL="https://github.com/bbudolfson/Portfolio-Site.git"
if git remote get-url origin >/dev/null 2>&1; then
  echo "→ Remote 'origin' exists, setting URL to ${ORIGIN_URL}"
  git remote set-url origin "$ORIGIN_URL"
else
  echo "→ git remote add origin"
  git remote add origin "$ORIGIN_URL"
fi

echo "→ git push -u origin main"
git push -u origin main

echo ""
echo "Done. Next: Netlify → Import from Git → select this repo (see SETUP-GITHUB.txt)."
