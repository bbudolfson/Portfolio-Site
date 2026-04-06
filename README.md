# Portfolio

## Local development (auto-refresh / hot reload)

Use **one** dev server and the URL it prints. Saving files should update the browser within a second or two.

### Day-to-day (recommended)

```bash
cd portfolio
npm run dev
```

Open **http://127.0.0.1:3000** (or the port shown in the terminal).

### If auto-refresh feels stuck or “another dev server is running”

Run this **once** — it frees port `3000`, removes Next’s dev lock, and starts fresh:

```bash
cd portfolio
npm run dev:reset
```

Use a different port if needed:

```bash
PORT=3005 npm run dev:reset
```

### What each script does

| Command | Use when |
|--------|-----------|
| **`npm run dev`** | Normal work — **live reload** (HMR). |
| **`npm run dev:reset`** | Port in use, stale server, or Next lock issues — **same as dev**, but cleans up first. |
| **`npm run preview`** | Test the **static `out/`** build (like Netlify). **Not** live reload while editing — run after changes to verify export. |
| **`npm run build`** | Production/static export to `out/` (Netlify publish folder). |

### Don’t confuse preview with dev

- **`preview`** = `next build` + static file server → you must **rebuild** to see edits.
- **`dev`** = `next dev` → changes on save.

### Still flaky?

- Hard refresh once: **Cmd+Shift+R**
- macOS file-watcher limits: if you see `EMFILE: too many open files`, close extra terminals/apps or raise your `ulimit -n` (separate from this repo).
