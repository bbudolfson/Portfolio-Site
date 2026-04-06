import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, "..", "out");
const port = Number(process.env.PORT || 3000);
/** Bind address; omit for Node default (works with both localhost and 127.0.0.1). */
const listenHost = process.env.HOST;

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
      return "application/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".ico":
      return "image/x-icon";
    case ".txt":
      return "text/plain; charset=utf-8";
    case ".woff":
      return "font/woff";
    case ".woff2":
      return "font/woff2";
    case ".map":
      return "application/json; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

function tryResolveFile(urlPathname) {
  // Next static export usually emits `foo.html` (and sometimes `foo/index.html`).
  const normalized = urlPathname === "/" ? "/index.html" : urlPathname;

  const candidates = [];
  if (normalized === "/index.html") {
    candidates.push("index.html");
  } else {
    const withoutTrailingSlash = normalized.replace(/\/+$/, "");
    candidates.push(withoutTrailingSlash + ".html"); // /interaction-rules -> /interaction-rules.html
    candidates.push(withoutTrailingSlash + "/index.html"); // /blog -> /blog/index.html
    candidates.push(withoutTrailingSlash); // /_next/... assets
  }

  for (const rel of candidates) {
    const full = path.join(rootDir, rel);
    if (fs.existsSync(full) && fs.statSync(full).isFile()) return { full, rel };
  }

  // SPA-like fallback.
  const indexFull = path.join(rootDir, "index.html");
  return fs.existsSync(indexFull)
    ? { full: indexFull, rel: "index.html" }
    : { full: null, rel: "index.html" };
}

const server = http.createServer((req, res) => {
  try {
    if (!req.url) {
      res.writeHead(400);
      res.end("Missing URL");
      return;
    }

    const url = new URL(req.url, "http://localhost");
    const file = tryResolveFile(url.pathname);

    if (!file.full) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }

    const type = contentType(file.full);
    const stream = fs.createReadStream(file.full);

    res.writeHead(200, {
      "Content-Type": type,
      // Safe simple caching for static assets.
      "Cache-Control": file.rel.startsWith("_next/") ? "public, max-age=31536000, immutable" : "no-cache",
    });
    stream.pipe(res);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(String(err));
  }
});

function onListen() {
  // eslint-disable-next-line no-console
  console.log(`Serving static export from ${rootDir}`);
  console.log(`Local: http://localhost:${port}`);
}

if (listenHost) {
  server.listen(port, listenHost, onListen);
} else {
  server.listen(port, onListen);
}

