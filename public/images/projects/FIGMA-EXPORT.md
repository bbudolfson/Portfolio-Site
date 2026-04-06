# Clockwork hero image — transparent PNG

The file in this folder should be a **real PNG** with **alpha** (transparent background).

## In Figma

1. Select the **frame** or group you want (e.g. only the Clockwork panel, not the whole monitor photo).
2. Remove any **background fill** on the frame, or hide/delete layers behind the UI (no solid rectangle behind the art).
3. **Export** the selection:
   - Format: **PNG**
   - Use **1x** (or 2x if you need sharper assets).
4. Save as **`clockwork-add-in.png`** and replace the file here.

## Check your export

- In Finder, **Get Info** on the file: it should say **PNG image**, not JPEG.
- Or run: `file clockwork-add-in.png` — should report `PNG image data`, not `JPEG`.

**JPEG cannot be transparent.** If Figma exports JPEG, turn off “compress” or pick PNG explicitly.

After replacing the file, bump the `?v=` query on the `<img>` in `src/app/projects/page.tsx` so the browser loads the new asset.
