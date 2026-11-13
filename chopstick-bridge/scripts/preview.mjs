// Static preview server for the built web-mobile output.
// Usage: node scripts/preview.mjs   (serves build/web-mobile on PORT, default 7456)
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, '..', 'build', 'web-mobile');
export const DEFAULT_PORT = Number(process.env.PORT || 7456);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.wasm': 'application/wasm',
  '.bin': 'application/octet-stream',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mem': 'application/octet-stream',
};

export function createStaticServer(root = ROOT) {
  const base = path.resolve(root);
  return http.createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      let filePath = path.join(base, urlPath === '/' ? 'index.html' : urlPath);
      if (!filePath.startsWith(base)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      let info;
      try {
        info = await stat(filePath);
      } catch {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      if (info.isDirectory()) filePath = path.join(filePath, 'index.html');
      const data = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
      res.end(data);
    } catch {
      res.writeHead(500);
      res.end('Server Error');
    }
  });
}

export function startServer(port = DEFAULT_PORT, root = ROOT) {
  const server = createStaticServer(root);
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  const server = await startServer();
  console.log(`[preview] serving: ${ROOT}`);
  console.log(`[preview] url: http://127.0.0.1:${DEFAULT_PORT}`);
  console.log(`[preview] pid: ${process.pid}`);
}
