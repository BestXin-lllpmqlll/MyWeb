import http from "node:http";
import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const cwd = process.cwd();
const outDir = path.join(cwd, "out");

function parsePort(argv) {
  const envPort = Number.parseInt(process.env.PORT ?? "", 10);
  if (Number.isFinite(envPort) && envPort >= 0) return envPort;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "-p" || arg === "--port") {
      const v = Number.parseInt(argv[i + 1] ?? "", 10);
      if (Number.isFinite(v) && v >= 0) return v;
    }
  }
  return 3000;
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".js") return "text/javascript; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".ico") return "image/x-icon";
  if (ext === ".txt") return "text/plain; charset=utf-8";
  if (ext === ".woff2") return "font/woff2";
  if (ext === ".pdf") return "application/pdf";
  return "application/octet-stream";
}

function safeJoin(root, requestPath) {
  const decoded = decodeURIComponent(requestPath);
  const clean = decoded.replaceAll("\\", "/").replace(/^\/+/, "");
  const joined = path.join(root, clean);
  const normalized = path.normalize(joined);
  if (!normalized.startsWith(root)) return null;
  return normalized;
}

const port = parsePort(process.argv.slice(2));
await access(path.join(outDir, "index.html"));

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const pathname = url.pathname;

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Method Not Allowed");
    return;
  }

  let filePath = safeJoin(outDir, pathname);
  if (!filePath) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Bad Request");
    return;
  }

  try {
    const s = await stat(filePath);
    if (s.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
  } catch {
    if (!pathname.includes(".")) {
      filePath = safeJoin(outDir, path.join(pathname, "index.html"));
    }
  }

  if (!filePath) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Bad Request");
    return;
  }

  let body;
  try {
    body = await readFile(filePath);
  } catch {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Not Found");
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", contentTypeFor(filePath));
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "HEAD") {
    res.end();
    return;
  }
  res.end(body);
});

server.listen(port, () => {
  const thisFile = fileURLToPath(import.meta.url);
  const rel = path.relative(cwd, thisFile);
  const addr = server.address();
  const actualPort =
    addr && typeof addr === "object" && "port" in addr ? addr.port : port;
  console.log(`Serving ${path.relative(cwd, outDir)} via ${rel}`);
  console.log(`Local: http://localhost:${actualPort}`);
});
