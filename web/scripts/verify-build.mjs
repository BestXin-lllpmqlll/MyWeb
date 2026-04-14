import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import path from "node:path";

async function assertExists(relPath) {
  const absPath = path.join(process.cwd(), relPath);
  try {
    await access(absPath);
  } catch {
    throw new Error(`Missing required build artifact: ${relPath}`);
  }
}

const requiredArtifacts = [
  ".next/server/middleware-manifest.json",
  ".next/server/app-paths-manifest.json",
  ".next/server/pages-manifest.json",
  "out/index.html",
  "out/404.html",
];

for (const p of requiredArtifacts) {
  await assertExists(p);
}

function waitForExit(child) {
  return new Promise((resolve) => {
    child.on("exit", (code) => resolve(code ?? 0));
  });
}

function startPreviewServer() {
  const scriptPath = path.join(process.cwd(), "scripts", "serve-out.mjs");
  const child = spawn(process.execPath, [scriptPath, "-p", "0"], {
    stdio: ["ignore", "pipe", "pipe"],
  });

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      reject(new Error("Preview server did not start in time"));
    }, 5000);

    let stdout = "";
    child.stdout?.on("data", (buf) => {
      stdout += buf.toString("utf8");
      const m = stdout.match(/Local: http:\/\/localhost:(\d+)/);
      if (m) {
        clearTimeout(timer);
        resolve({ child, port: Number.parseInt(m[1], 10) });
      }
    });

    child.on("error", (e) => {
      clearTimeout(timer);
      reject(e);
    });

    child.stderr?.on("data", () => {});
  });
}

async function assertOk(url) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 5000);
  try {
    const res = await fetch(url, { signal: ac.signal, redirect: "follow" });
    if (res.status !== 200) {
      throw new Error(`Expected 200 for ${url}, got ${res.status}`);
    }
  } finally {
    clearTimeout(timer);
  }
}

const { child, port } = await startPreviewServer();
try {
  await assertOk(`http://localhost:${port}/`);
} finally {
  child.kill("SIGTERM");
  await waitForExit(child);
}
