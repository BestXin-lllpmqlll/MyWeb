import { createServer } from 'http';
import { exec } from 'child_process';
import { parse } from 'url';

const PORT = 3001;

const setCORSHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

const server = createServer((req, res) => {
  setCORSHeaders(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path === '/api/git-check') {
    exec('git fetch && git status -sb', (error, stdout, stderr) => {
      res.setHeader('Content-Type', 'application/json');
      if (error) {
        res.end(JSON.stringify({ success: false, error: error.message, stderr }));
      } else {
        const isBehind = (stdout || '').includes('behind');
        res.end(JSON.stringify({ success: true, isBehind, output: stdout }));
      }
    });
  } else if (path === '/api/git-pull') {
    exec('git pull --rebase --autostash', (error, stdout, stderr) => {
      res.setHeader('Content-Type', 'application/json');
      if (error) {
        res.end(JSON.stringify({ success: false, error: error.message, stderr }));
      } else {
        res.end(JSON.stringify({ success: true, output: stdout }));
      }
    });
  } else if (path === '/api/git-push') {
    exec('git add . && git commit -m "Auto commit from web UI" && git push', (error, stdout, stderr) => {
      res.setHeader('Content-Type', 'application/json');
      if (error && !(stdout || '').includes('nothing to commit') && !(stderr || '').includes('nothing to commit')) {
        res.end(JSON.stringify({ success: false, error: error.message, stderr }));
      } else {
        res.end(JSON.stringify({ success: true, output: stdout }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`[Local API] Git sync API running on http://localhost:${PORT}`);
});
