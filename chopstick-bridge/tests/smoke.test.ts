import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const buildDir = resolve(root, 'build', 'web-mobile');
const readJson = (p: string) => JSON.parse(readFileSync(p, 'utf8'));

describe('web-mobile build artifacts', () => {
  it('produces index.html', () => {
    expect(existsSync(resolve(buildDir, 'index.html'))).toBe(true);
  });

  it('produces the cocos engine bundle', () => {
    expect(existsSync(resolve(buildDir, 'cocos-js', 'cc.js'))).toBe(true);
  });

  it('bundles the start scene in the main bundle', () => {
    const cfg = readJson(resolve(buildDir, 'assets', 'main', 'config.json'));
    expect(cfg.scenes).toHaveProperty('db://assets/scene/main.scene');
  });

  it('sets launch scene + portrait design resolution in settings.json', () => {
    const s = readJson(resolve(buildDir, 'src', 'settings.json'));
    expect(s.launch.launchScene).toBe('db://assets/scene/main.scene');
    expect(s.screen.designResolution).toMatchObject({ width: 720, height: 1280 });
  });
});

describe('engine module guardrails', () => {
  it('disables all physics modules and excludes them from includeModules', () => {
    const e = readJson(resolve(root, 'settings', 'v2', 'packages', 'engine.json'));
    const cache = e.modules.configs.defaultConfig.cache;
    expect(cache['physics-2d']._value).toBe(false);
    expect(cache['physics-2d-box2d']._value).toBe(false);
    expect(cache.physics._value).toBe(false);
    const inc: string[] = e.modules.configs.defaultConfig.includeModules;
    expect(inc.some((m) => m.startsWith('physics'))).toBe(false);
  });
});
