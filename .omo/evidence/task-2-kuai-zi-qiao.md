# Task 2 Evidence — Cocos Creator 3.8.8 Scaffold + Verification Toolchain

- **Plan**: `D:\yanjiu\xiaoyouxi\.omo\plans\kuai-zi-qiao.md` (todo 2)
- **Project**: `D:\yanjiu\xiaoyouxi\chopstick-bridge`
- **Date**: 2026-11-13
- **Result**: PASS (build + 5/5 unit tests + headless browser smoke + static-server HTTP check all green)

## 1. Environment

| Item | Value |
|---|---|
| Engine exe | `D:\CocosEditors\Creator\3.8.8\CocosCreator.exe` |
| Node | `D:\node\node.exe` v24.16.0 |
| npm | 11.13.0 |
| Playwright browser | Chromium (Chrome for Testing 158.0.8127.18), `C:\Users\Administrator\AppData\Local\ms-playwright\chromium-1254` |
| Project uuid | `1bfef5ce-1bad-437e-be58-02cb425a2fb2` |
| Scene uuid | `6b6ec7ac-df8f-4892-8db6-bc09cbb95e63` |

## 2. Deliverables (created files)

Scaffold / config:
- `package.json` — name/version, `creator.version:"3.8.8"`, uuid, scripts (`test`, `test:watch`, `smoke:playwright`, `preview`)
- `tsconfig.json` — extends `./temp/tsconfig.cocos.json`
- `.gitignore` — ignores `/library/`, `/temp/`, `/local/`, `/build/`, `/profiles/`, `node_modules/`
- `.creator/default-meta.json`
- `settings/v2/packages/project.json` — design resolution 720×1280 portrait (`fitWidth:true`, `fitHeight:false`)
- `settings/v2/packages/engine.json` — 2D modules only, all physics disabled
- `profiles/v2/packages/scene.json`
- `assets/scene/main.scene` — valid 2D start scene (derived from engine default `scene-2d.scene`)
- `assets/scene/main.scene.meta` — `ver 1.1.50`, uuid `6b6ec7ac-df8f-4892-8db6-bc09cbb95e63`

Verification toolchain:
- `tests/smoke.test.ts` — vitest smoke assertions
- `scripts/preview.mjs` — static preview server (default port 7456)
- `scripts/smoke-playwright.mjs` — headless Chromium smoke + screenshot
- `scripts/smoke-screenshot.png` — 5391 bytes

> Note: `docs/art-requirements.md` was produced by the parallel Wave-0 todo-3 worker (not this task).

## 3. Build Probe

**Command**: `CocosCreator.exe --project D:\yanjiu\xiaoyouxi\chopstick-bridge --build "platform=web-mobile"`

- **Baseline (no scene)**: FAILED — `当前初始场景不存在或不在 Bundle 中，无法设置为初始场景` (no initial scene configured). This confirmed the CLI build pipeline runs and validates scene presence.
- **After adding `assets/scene/main.scene` + meta**: SUCCEEDED — `build/web-mobile/` produced:
  - `index.html`, `application.js`, `index.js`, `style.css`
  - `cocos-js/cc.js`
  - `assets/main/config.json`, `assets/main/index.js`, `assets/main/import/6b/6b6ec7ac-df8f-4892-8db6-bc09cbb95e63.json`
  - `src/settings.json`

**Build-artifact proof**:
- `build/web-mobile/assets/main/config.json` → `"scenes": { "db://assets/scene/main.scene": 0 }`
- `build/web-mobile/src/settings.json` → `launchScene = "db://assets/scene/main.scene"`, `screen.designResolution = {width:720, height:1280, policy:4}`, `CocosEngine = "3.8.8"`, `platform = "web-mobile"`

> `policy:4` = FIXED_WIDTH, which matches `fitWidth:true` — the design resolution propagated correctly into the build.

> **Gotcha**: `CocosCreator.exe` exit code came back EMPTY via `Start-Process` (Electron quirk). Success must be judged by **artifact presence**, not exit code. CLI project *creation* is not supported (requires Dashboard GUI) — the project was constructed manually by mirroring `resources/templates/empty-2d`.

## 4. Verification Results

### 4.1 Unit smoke test (vitest)
```
$ npx vitest run
 Test Files  1 passed (1)
      Tests  5 passed (5)
   Duration  361ms
```
Assertions: index.html exists; `cocos-js/cc.js` exists; start scene bundled in `config.json`; `launchScene` + 720×1280 resolution in `settings.json`; engine guardrails (physics-2d, physics-2d-box2d, physics all `false`; no `physics*` in `includeModules`).

### 4.2 Headless browser smoke (Playwright)
```
$ node scripts/smoke-playwright.mjs
[smoke] http status: 200
[smoke] canvas#GameCanvas present
[smoke] screenshot: ...\scripts\smoke-screenshot.png
[smoke] consoleErrors: 0
[smoke] pageErrors: 0
[smoke] done (ok)
```

### 4.3 Static preview server
```
$ node scripts/preview.mjs
[preview] serving: ...\build\web-mobile
[preview] url: http://127.0.0.1:7456
[preview] pid: 20756

GET /              => 200 (len=2158)
GET /cocos-js/cc.js => 200 (len=7353)
```

## 5. Guardrail Confirmations

- **Zero physics**: `settings/v2/packages/engine.json` — `physics._value=false`, `physics-2d._value=false`, `physics-2d-box2d._value=false`, and `includeModules` contains no `physics*` entries.
- **2D only**: `3d=false`, `2d=true`.
- **Portrait 720×1280**: present in project settings and carried into `build/web-mobile/src/settings.json`.

## 6. AppID Acquisition Steps

### 6.1 WeChat Mini-Game (微信小游戏)
1. Open `https://mp.weixin.qq.com/` → 立即注册 → 选择「小程序」.
2. 主体类型：小游戏类目需 **企业主体**（营业执照 + 对公打款验证 / 微信认证）。个人主体无法开通游戏类目。
3. 邮箱激活 → 填写小程序名称 / 头像 / 简介 → 服务类目选择「游戏」.
4. 登录后台 → 开发 → 开发管理 → 开发设置 → 获取 **AppID(小程序ID)**；点击生成并妥善保存 **AppSecret**.
5. 国内正式发布需补充《网络文化经营许可证》与游戏版号；测试阶段可使用测试号 / 体验版。
6. Cocos 构建 WeChat 平台时填入该 AppID（`build/wechatgame`）。

### 6.2 Douyin Mini-Game (抖音小游戏)
1. Open `https://developer.open-douyin.com/` (抖音开放平台) → 注册开发者账号.
2. 完成 **企业认证**（个人主体能力受限）；创建应用时选择「小游戏」.
3. 填写小游戏名称 / 图标 / 简介 / 类目 → 提交创建.
4. 应用详情 → 基本信息 → 获取 **AppID** 与 **AppSecret**.
5. 需与抖音账号绑定；正式发布需提供软著 / 版号；可先使用测试版 / 沙箱联调.
6. Cocos 构建字节跳动（抖音）平台时填入该 AppID（`build/bytedance-mini-game`）。

## 7. Lessons / Gotchas

- Console encoding is GBK → keep PowerShell command strings ASCII-only; write UTF-8 text files with the Write tool.
- `Start-Process` refuses to redirect stdout and stderr to the **same** file — use separate log files.
- Keep the project path ASCII-only.
- `--help` on `CocosCreator.exe` just launches the Electron GUI (no CLI help).
- `library/` is generated by the editor's asset-db during build and is gitignored.

## 8. DoneClaim

```json
{
  "task": "task-2-kuai-zi-qiao",
  "status": "done",
  "plan": ".omo/plans/kuai-zi-qiao.md",
  "project": "chopstick-bridge",
  "engine": "Cocos Creator 3.8.8",
  "artifacts": {
    "build": "chopstick-bridge/build/web-mobile",
    "tests": "chopstick-bridge/tests/smoke.test.ts",
    "scripts": [
      "chopstick-bridge/scripts/preview.mjs",
      "chopstick-bridge/scripts/smoke-playwright.mjs"
    ],
    "screenshot": "chopstick-bridge/scripts/smoke-screenshot.png"
  },
  "verification": {
    "cli_build": "pass",
    "vitest": "5/5 pass",
    "playwright_smoke": "pass (http 200, canvas present, 0 console errors, 0 page errors)",
    "preview_http": "200 (index.html 2158B, cocos-js/cc.js 7353B)"
  },
  "guardrails": {
    "physics_disabled": true,
    "modules_2d_only": true,
    "design_resolution": "720x1280 portrait"
  },
  "evidence_file": ".omo/evidence/task-2-kuai-zi-qiao.md"
}
```
