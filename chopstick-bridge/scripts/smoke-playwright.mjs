// Headless smoke check: serve the build, load it in Chromium, screenshot it.
// Usage: node scripts/smoke-playwright.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startServer } from './preview.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.SMOKE_PORT || 7457);
const OUT = path.resolve(here, 'smoke-screenshot.png');

const server = await startServer(PORT);
const browser = await chromium.launch({
  args: ['--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 720, height: 1280 } });

const consoleErrors = [];
const pageErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => pageErrors.push(String(err)));

let ok = true;
try {
  const resp = await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'load', timeout: 60000 });
  console.log(`[smoke] http status: ${resp ? resp.status() : 'no-response'}`);

  await page.waitForSelector('canvas#GameCanvas', { timeout: 30000 });
  console.log('[smoke] canvas#GameCanvas present');
  await page.waitForTimeout(4000);

  await page.screenshot({ path: OUT });
  console.log(`[smoke] screenshot: ${OUT}`);
} catch (err) {
  ok = false;
  console.error(`[smoke] FAILED: ${err && err.message ? err.message : err}`);
}

console.log(`[smoke] consoleErrors: ${consoleErrors.length}`);
for (const e of consoleErrors.slice(0, 10)) console.log(`[smoke]   err: ${e}`);
console.log(`[smoke] pageErrors: ${pageErrors.length}`);
for (const e of pageErrors.slice(0, 10)) console.log(`[smoke]   err: ${e}`);

await browser.close();
await new Promise((resolve) => server.close(resolve));
console.log(ok ? '[smoke] done (ok)' : '[smoke] done (failed)');
process.exit(ok ? 0 : 1);
