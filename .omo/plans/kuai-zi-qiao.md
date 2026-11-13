# kuai-zi-qiao - Work Plan

## TL;DR (For humans)

**What you'll get:** 一款叫《筷子桥》的微信+抖音双端小游戏：用限量筷子编织搭桥让小动物过河——搭稳是智慧，塌了是节目。包含 30 个渐进关卡、每日挑战、看广告补筷子的激励广告位，以及双平台上线的合规材料（软著/备案）。

**Why this approach:** 核心判定用"编织关系验证"而不是真实物理模拟——塌得讲道理、调参可控、包体小；而且动工前先做一个单关 Demo 让大哥亲手试玩，可玩性过关才继续全量开发，把最大风险（手感不讲道理）前置拦截。

**What it will NOT do:** 不做 3D；不做内购（纯看广告）；不做全局排行榜；不做"高亮告诉你答案"式的提示设计。

**Effort:** Large
**Risk:** Medium - 主要风险是"判定规则是否与玩家直觉一致"，已用 Demo 试玩闸门前置拦截，最多两轮调参，不过关回备胎池重议

**Decisions to sanity-check:** 项目建在 D 盘英文目录 `chopstick-bridge`；引擎本体已迁至 `D:\CocosEditors\Creator\3.8.8`（大哥完成迁移，C 盘 ProgramData 已空，C 盘零引擎占用）；广告只做激励视频两种位；测试框架用 vitest（核心判定走 TDD）+ Playwright chromium（UI 验证，随脚手架安装）；人工触点白名单六处已显式声明（Demo 试玩/真机×3/平台提交/终局点头），其余全部 agent 自验。

Your next move: 大哥确认两处范围裁剪（30+关/彩蛋降级为 v2 候选、每日挑战不设广告位）后，执行由大哥在 worker 会话启动（$start-work kuai-zi-qiao）。首个里程碑就是给你试玩的 Demo。

---

> TL;DR (machine): Large / Medium risk / 19 todos + 4 final verifiers / deliverable = 双端可上线《筷子桥》小游戏 + Demo gate + 合规材料

## Scope

### Must have
- Cocos Creator 3.8.2+ 项目（实际 3.8.8），TypeScript，零物理引擎模块
- 编织拓扑判定器（纯逻辑、TDD、可调参）
- 拖放编织交互 + 稳/塌表现（塌落回放高亮肇事筷）
- 关卡数据驱动系统 + 30 关（教学/悬臂/限量/材质/支点）
- 结算星级 + 本地存档（StorageAdapter 接口化）
- 教学引导（教操作不教解法）
- 微信 + 抖音双端构建，首包 ≤4MB
- 每日挑战（固定 seed）+ 分享卡片
- IAA 激励视频×2 位（塌桥补筷/双倍星币，每局复活广告限 1 次）
- 软著材料 + 双端备案材料包
- 轻量留存（材质图鉴 + 7 日任务 + 挑战日历）
- 双端提审发布 + 上线监控
- Demo 试玩闸门（大哥亲手验收可玩性后才继续 M1+）

### Must NOT have (guardrails, anti-slop, scope boundaries)
- ❌ 3D 渲染、Box2D/任何物理引擎依赖
- ❌ 内购 IAP、插屏/横幅广告（只做激励视频）
- ❌ 全局积分排行榜、云存档、账号体系
- ❌ 违反三铁律的设计：答案摆脸上（提示高亮）、信息藏死里（无反馈死局）
- ❌ 深度养成/赛季/抽卡系统（专而精原则）
- ❌ 30+ 承重升级关、达芬奇桥大跨彩蛋关（本版封顶 30 关不做，留 v2 迭代候选；候选池记录于草稿难度轴）
- ❌ 星币消耗经济：星币 = 只增不减的展示型计数器（唯一来源：广告双倍与 7 日任务）；图鉴按材质使用点亮、不消耗星币；无任何产出/消耗平衡设计
- ❌ 项目路径含中文；首包超 4MB 提交
- ❌ 未经大哥逐次确认的任何 git 操作（含 init/commit/push）
- ❌ 修改 .omo 规划目录之外与本项目无关的文件

## Verification strategy
> Verification is agent-executed EXCEPT the declared human-touchpoint whitelist below. Every human touchpoint is a named gate with its evidence protocol — the worker never silently requires a human.
- Test decision: 判定核心 = TDD（vitest）；玩法/UI/平台接入 = tests-after（Playwright 脚本断言）
- **人工触点白名单（全部显式声明，除此之外零人工；含条件触发项）**：
  1. todo 7 = M0 Demo 可玩性闸门（大哥亲手试玩裁决，含"无人指导能否悟出互压"的产品判断——脚本只能回放已知解，无法证明可发现性）
  2. todo 12/13 = 开发者工具安装+扫码登录+导入项目+真机预览（大哥执行；agent 产出分步清单、构建产物路径核对表与验证清单，编译/真机截图由大哥回传存 evidence）
  3. todo 15 = 真机广告拉起（同上模式：agent 出清单与代码层断言，真机动作归大哥）
  4. todo 19 = 热更真机验证 + 数据看板导出（大哥执行，回传截图存 evidence）
  5. todo 16/18 = 平台账号注册/登录/AppID 获取/名称查重/正式广告位创建/点击提交（大哥亲手执行，agent 备齐材料核对表与分步指引）
  6. 美术交付 = 朋友按 todo 3 清单交付真实美术（M1 起陆续需要；M0-M1 前半程色块占位不阻塞；agent 不等待美术，资产替换在对应里程碑集成）
  7. todo 2 = CLI 探针失败时的 GUI 创建/构建降级（**条件触发**：大哥操作，agent 出分步指引）
  8. Final verification wave = 终局由大哥明确点头后才算交付完成
- 测试运行器：项目内 `npx vitest run`（Node = `D:\node`）；端上验证 = Cocos 编辑器预览 URL + Playwright chromium 截图（Playwright/tsx/chromium 在 todo 2 安装并冒烟验证）；构建验证 = Cocos 构建日志 + 双端开发者工具编译输出
- Evidence: `.omo/evidence/task-<N>-kuai-zi-qiao-<desc>.<ext>`（截图/日志/核对表；evidence 目录首次写入时自动创建）

## Execution strategy

### Parallel execution waves
> 本项目 19 个 todo、强串行依赖（判定器→交互→表现→闸门），波次按依赖结构划分为 2-4 个 todo/波，5-8 的通用目标在本计划不适用（总量决定）；Wave 1 实质为串行链，命名保留以便闸门定位。

- **Wave 0（地基，3 项可并行）**：todo 1-3 —— 清理旧资产、项目脚手架+验证工具链、美术需求清单
- **Wave 1（M0 Demo gate · 串行链）**：todo 4→5→6→7 —— 判定器 TDD → 拖放交互 → 稳/塌表现单关 → Demo 试玩包
- **⛔ 用户闸门**：大哥试玩 Demo → 通过解锁 Wave 2；不通过回 todo 4/6 调判定与手感（最多两轮）；两轮仍不过 → 停止执行、升级大哥重议备胎池（翻花绳/七巧板）。**闸门期间禁止启动任何 Wave 2+ 任务。**
- **Wave 2（M1 全量核心）**：todo 8-11 —— 关卡系统 → 材质扩展 → 结算存档 → 教学打磨
- **Wave 3（M2 双端接入）**：todo 12-14 —— 微信构建/4MB → 抖音构建 → 每日挑战分享
- **Wave 4（M3 变现合规）**：todo 15-17 —— 广告接入 → 软著备案 → 留存轻量包
- **Wave 5（M4 上线）**：todo 18-19 —— 提审发布 → 监控热修

### Dependency matrix
> 语义约定：两列均为**直接依赖**（不含传递闭包）。
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1 | 无 | 无 | 2,3（清理与脚手架无顺序依赖） |
| 2 | 无 | 4,5 | 1,3 |
| 3 | 无 | 无（美术为 M2+ 的取用参考，非硬阻塞） | 1,2 |
| 4 | 2 | 5 | — |
| 5 | 4 | 6 | — |
| 6 | 5 | 7 | — |
| 7 | 6 | ⛔GATE→8 | — |
| 8 | GATE | 9,10 | — |
| 9 | 8 | 11 | 10 |
| 10 | 8 | 11 | 9 |
| 11 | 9,10 | 12,13 | — |
| 12 | 11 | 14 | 13 |
| 13 | 11 | 14 | 12 |
| 14 | 12,13 | 15,16,17 | — |
| 15 | 14 | 18 | 16,17 |
| 16 | 14 | 18 | 15,17 |
| 17 | 14 | 18 | 15,16 |
| 18 | 15,16,17 | 19 | — |
| 19 | 18 | 无 | — |

## Todos
> Implementation + Test = ONE todo. Never separate.

- [x] 1. 清理旧规划占位资产
  What to do / Must NOT do: 删除 `.omo/drafts/mini-game-research.md`（占位归档标记）、`.omo/drafts/tiao-gunzi.md`（占位归档标记）两个文件——删除前先逐个读取确认内容为纯占位标记（非实际设计内容），若发现含实质内容则中止并升级报告。`.omo/run-continuation/` 下的会话运行时文件**不删**（活跃会话状态，误删可能破坏续传，留给运行时自行清理）。决策史已完整迁入 `.omo/drafts/kuai-zi-qiao.md` 附录，占位文件可安全删除。Must NOT do：不删 `.omo/drafts/kuai-zi-qiao.md`、`.omo/plans/kuai-zi-qiao.md`、`.omo/references/小游戏平台官网链接.md`；不删 run-continuation；不动工作区其他任何文件。
  Parallelization: Wave 0 | Blocked by: 无 | Blocks: 无
  References: `.omo/drafts/kuai-zi-qiao.md`（清理指令来源=用户原话"将之前讨论的没用的计划都进行清理下，咱们专注的来做这个"）；保留清单见同文件技术栈节
  Acceptance criteria (agent-executable): 删除后列目录断言：`.omo/drafts/` 仅含 `kuai-zi-qiao.md`；`.omo/references/小游戏平台官网链接.md` 仍存在；`.omo/run-continuation/` 未被触碰
  QA scenarios (name the exact tool + invocation): happy = 删除前后各执行一次目录列举（read tool on directories），diff 记录到 `.omo/evidence/task-1-kuai-zi-qiao.md`；failure = 若删除清单误匹配到保留文件 → 立即中止并在 evidence 记录偏差，恢复误删文件后升级报告
  Commit: N（.omo 为规划目录，不在产品仓库内）

- [ ] 2. 创建 Cocos 项目脚手架与验证工具链（D 盘英文路径）
  What to do / Must NOT do: 用已安装的 Creator 3.8.8（`D:\CocosEditors\Creator\3.8.8\CocosCreator.exe`，或 Dashboard GUI）在 `D:\yanjiu\xiaoyouxi\chopstick-bridge\` 新建 2D empty 模板项目；**先跑 CLI 可行性探针**：记录 `CocosCreator.exe --help` 输出、一次最小 web-mobile 构建命令测试结果到 evidence（构建通了，后续所有 UI 验收就不依赖编辑器 GUI）；探针前先 `Test-Path` 断言 exe 存在；若 CLI 无法无头创建/构建项目 → 在 evidence 记录"CLI 不可用"，GUI 创建/构建步骤升级为人工闸门步骤（白名单 #7：大哥操作，agent 出分步指引），后续 todo 7/12/13 构建同样按此模式执行；**同时记录双端小游戏 AppID 获取方式与所需人工步骤到 evidence**（把 M2 账号前置条件暴露在 Wave 0）。项目内 `npm init -y && npm i -D vitest playwright tsx pngjs` + `npx playwright install chromium`（需联网 ~150MB；Node 用 `D:\node`，PowerShell 显式 PATH：`$env:PATH = "D:\node;" + $env:PATH`）；写最小空 vitest 用例跑通；写最小 Playwright 冒烟跑通；**创建 `scripts/preview.mjs`（构建 web-mobile → `npx http-server build/web-mobile -p 7456`）并注册 npm run preview**；**锁定设计分辨率与方向：竖屏 720×1280（9:16）**，写进项目 settings 与后续所有 UI/分享卡片规格的基准。`.gitignore` 排除 `library/ temp/ local/ build/ node_modules/`；git init 与 commit 前必须先向大哥请示获得同意（用户硬规则：任何 git 操作先请示），未获批前项目处于无 git 状态继续开发，不阻塞任何 todo。Must NOT do：项目路径禁止中文；不安装任何物理引擎包；不修改 Creator 全局设置；未经同意不执行任何 git 命令。
  Parallelization: Wave 0 | Blocked by: 无 | Blocks: 4,5
  References: `.omo/drafts/kuai-zi-qiao.md` 技术栈节与环境实况节（引擎/Node 实测路径）；项目路径英文要求（社区共识：中文路径导致构建工具链异常）；用户 git 规则（AGENTS.md：先列 status/diff 待确认）
  Acceptance criteria (agent-executable): `D:\yanjiu\xiaoyouxi\chopstick-bridge\` 含合法 `package.json`、`assets/`、`settings/`；`npx vitest run` 空用例 exit 0；Playwright 冒烟截图存在；`npm run preview` 后 `http://localhost:7456` 返回 200；CLI 探针结果（可用/不可用）与 AppID 获取路径记录已存 evidence——若 CLI 不可用，人工闸门步骤清单已产出
  QA scenarios (name the exact tool + invocation): happy = 目录结构断言 + vitest/Playwright 冒烟日志存 `.omo/evidence/task-2-kuai-zi-qiao.md`；failure = Creator CLI 探针失败 → 记录降级路径与人工指引到 evidence，不阻塞后续 todo
  Commit: Y | chore(scaffold): init cocos project（执行 git init/commit 前逐次请示大哥；未获批则本条标记 pending-git-approval 不阻塞）

- [ ] 3. 产出美术需求清单（给画图朋友）
  What to do / Must NOT do: 写 `chopstick-bridge/docs/art-requirements.md`：①卡通扁平风格规范（明快色板+粗描边、示例描述）②资产清单表按里程碑排期：M0 无需真实美术（色块占位）/ M1 需筷子三材质（竹/塑料/雪糕棒）+小狐狸+河/两岸底图+结算 UI + 星星图标 / M2 需分享卡片模板+每日挑战入口图 / M3 需广告激励弹窗配图+图鉴图标 / M4 需商店商店图（微信/抖音素材规格）③每件资产标注尺寸(px)、命名规范(kebab-case.png)、交付格式(PNG 透明底)④一段可直接发给朋友的说明文案。Must NOT do：不在本 todo 内产出任何真实图片；不阻塞 Wave 1（M0 用色块）。
  Parallelization: Wave 0 | Blocked by: 无 | Blocks: 无（M2+ 取用参考，非硬阻塞）
  References: `.omo/drafts/kuai-zi-qiao.md` 美术决策（卡通扁平、朋友画图、贴图/UI 向零建模）与关卡难度轴节（材质种类=美术清单依据）
  Acceptance criteria (agent-executable): 文档存在且含四张表（规范/清单/排期/命名）+朋友文案；清单条目数 ≥20 且每条含尺寸与里程碑字段
  QA scenarios (name the exact tool + invocation): happy = 文档结构核对表存 `.omo/evidence/task-3-kuai-zi-qiao.md`；failure = 发现里程碑与清单条目对不上（如 M1 用到未列资产）→ 修订清单后复检
  Commit: Y | docs(art): asset requirements & schedule

- [ ] 4. 编织拓扑判定器（纯逻辑核心，TDD）
  What to do / Must NOT do: 写 `assets/scripts/core/` 纯 TS 模块（零 Cocos API 依赖，便于 vitest 直测）：①`Chopstick` 数据（id、两端点坐标、材质、压着[]、被压[]）②`WeaveGraph` 构建：放置时按几何相交+放置时序推断压叠方向（后放且横跨者压住先放的），两岸为虚拟锚点节点、河心石头为中部锚点节点③**判定规则（写死，不许执行者自行发明）**：(a) 相交判定=线段相交且交点距两筷端点均 >2px（排除仅端点相触）；(b) "压着"方向=下方提供支撑——只有"压着链"（A 落在 B 上）向锚点传导支撑，"被压"不传导；(c) 支撑接触点必须落在筷端 15% 区间内（端点受力，中点搭接无效）；(d) `isStable` = 每根筷子经"压着链"存在至少一条路径到达左岸/右岸/河心锚点（图可达性）；(e) `firstUnstableId` = 按放置时序**最早**失稳的筷子；连锁塌落顺序=从 firstUnstableId 起按放置时序**逆序**（后放的先掉）④`tests/` 下 vitest 用例 ≥8：两根互压简桥（A 左端搭左岸、B 右端搭右岸、A/B 端区交叉且 B 后放压 A）=稳；悬臂未锚=塌+肇事筷正确；三根编织达芬奇基本单元=稳；孤筷=塌；抽走中段=下游连锁失稳；**区分性用例×2：仅单端有支撑的筷子=塌；三根在中空处串联互压但链条未回到任何锚点=塌**。阈值常量（2px、15%）集中单一模块（便于调参）。Must NOT do：不引入物理引擎；不做浮点物理模拟；判定阈值硬编码散落多处。
  Parallelization: Wave 1 | Blocked by: 2 | Blocks: 5,6
  References: `.omo/drafts/kuai-zi-qiao.md` 判定机制节（拓扑判定方案；失败讲道理=铁律②）；达芬奇桥编织原理 https://science.anu.edu.au/engagement/science-lab-experiments-home-school/leonardo-da-vinci-bridge （互压自锁：每根被邻棍压住、力传回两岸）
  Acceptance criteria (agent-executable): `npx vitest run` 全绿且用例 ≥8；"悬臂未锚"返回 stable=false 且 firstUnstableId 指向悬空端筷子；两条区分性用例（单端支撑/中空互压链）均为塌
  QA scenarios (name the exact tool + invocation): happy = vitest 输出全绿存 `.omo/evidence/task-4-vitest-happy.log`；failure = 临时改错锚点规则→vitest 出红→还原修复→复跑全绿，两份日志均存 evidence（task-4-vitest-fail.log）
  Commit: Y | feat(core): weave topology stability judge

- [ ] 5. 拖放编织交互（Cocos 场景层）
  What to do / Must NOT do: 写 `assets/scripts/ui/`：筷子节点拖拽（Cocos input 触屏/鼠标统一事件）、拖起时原位虚影、河面放置区域吸附落位（网格吸附，吸附半径=材质参数）、压叠渲染层级（zOrder=编织时序）、落位微动画（下落+轻震）、拖出河面松手回弹原位。**"试走"触发定义（写死）**：桌面右下角常驻"过桥"按钮，玩家≥1 根筷子落位后即可点击触发 isStable 判定与表现层（预算用尽也允许继续调整后再点）；判定只在点击"过桥"时调用，落位过程中不实时判——保住"做了才知道"的试探循环（铁律③）。本期全部色块占位（不同材质不同颜色），河/两岸静态底图节点。**UI 验收底座（统一）**：`npm run preview` = `node scripts/preview.mjs`（构建 web-mobile 后 `npx http-server build/web-mobile -p 7456`），本 todo 起所有 Playwright 验收统一打开 `http://localhost:7456`（不依赖编辑器 GUI 常开）。Must NOT do：不做任何"可放位置高亮提示"（违反铁律①）；不接真实美术；落位过程不做实时稳定性判定提示。
  Parallelization: Wave 1（串行链）| Blocked by: 4 | Blocks: 6
  References: `.omo/drafts/kuai-zi-qiao.md` 核心循环节（"搭完试走"）与三铁律节；Cocos 3.8 输入事件 https://docs.cocos.com/creator/3.8/manual/zh/engine/event/input.html
  Acceptance criteria (agent-executable): 通过 `http://localhost:7456` 完成"拿起→移动→落位→再拿下一根→点过桥"全流程；每次落位后 WeaveGraph 更新正确（debug 日志经 Playwright console 捕获断言压叠关系与预期一致）
  QA scenarios (name the exact tool + invocation): happy = Playwright 打开 localhost:7456，mouse down/move/up 模拟拖拽落位后截图 `.omo/evidence/task-5-kuai-zi-qiao-drag-happy.png`；failure = 拖出河面松手→回弹原位截图 `task-5-kuai-zi-qiao-drag-fail.png`
  Commit: Y | feat(ui): drag-place weave interaction

- [ ] 6. 稳/塌表现与单关 Demo 调通
  What to do / Must NOT do: 接通判定器与表现层：玩家点"过桥"→ 调 isStable → true 时桥整体下沉 2px 回弹 + 小狐狸（色块代理）匀速过河 + 过关横幅 + 重玩按钮；false 时从 firstUnstableId 起按放置时序逆序连锁塌落（tween 依次下坠+落水渐隐）+ 失败回放中肇事筷描红 2 秒（颜色 `#FF3B30`、容差每通道 ±12、采样点=肇事筷包围盒中心像素、采样时机=高亮起始后 300ms——**高亮延长至 2s 以消除竞态**）+ 筷子回收重开。单关配置：跨度 6 格、预算 8 根、无限免费重试。像素断言用 pngjs 对 Playwright 截图离线采样（todo 2 已装依赖链）。Must NOT do：不做广告位（M3）；不做星级（M1）；塌落不使用物理刚体（纯 tween 序列）。
  Parallelization: Wave 1（串行链）| Blocked by: 5 | Blocks: 7
  References: `.omo/drafts/kuai-zi-qiao.md` 判定机制节（"下沉 2px 稳住"表现与连锁塌落+肇事筷高亮）；核心循环节（失败即内容、重开零成本）；Cocos tween https://docs.cocos.com/creator/3.8/manual/zh/module/tween.html
  Acceptance criteria (agent-executable): 通过 localhost:7456 完整走通"搭稳过关"与"搭塌回放"两条路径；塌落回放帧中肇事筷像素采样（pngjs）落在 `#FF3B30`±12 RGB 阈值内（截图存证）
  QA scenarios (name the exact tool + invocation): happy = Playwright 编织稳定桥→狐狸到达对岸截图 `.omo/evidence/task-6-kuai-zi-qiao-stable.png`；failure = 故意漏编一根→塌落+肇事筷像素采样通过断言，截图与采样日志存 `task-6-kuai-zi-qiao-collapse.log`
  Commit: Y | feat(gameplay): stable/collapse presentation loop

- [ ] 7. Demo 试玩包与试玩指引（⛔ 闸门前置）
  What to do / Must NOT do: 产出浏览器试玩入口：`npm run preview`（todo 2 产出的 scripts/preview.mjs，构建 web-mobile + 本地静态服务 localhost:7456）；写 `chopstick-bridge/DEMO-PLAYTEST.md`：①打开方式分步说明（浏览器访问 http://localhost:7456）②试玩清单（搭稳一次、故意塌一次、感受"做了才知道"的试探循环）③反馈问题（判定冤不冤？塌得讲不讲理？塌了想不想立刻再来一把？无人指导能否悟出"互压才稳"？）④反馈回传方式。完成后把入口与文档路径报给大哥，**然后执行暂停——这是用户明确要求的 Demo 试玩闸门**。**闸门证据固化：大哥的裁决结论（通过/不通过+理由原文）记录到 `.omo/evidence/gate-m0.md`，这是 todo 11 调参与后续所有里程碑的体验基准**。Must NOT do：不自行宣称 Demo 通过；闸门期间不启动 Wave 2 任何任务。
  Parallelization: Wave 1（串行链）| Blocked by: 6 | Blocks: 8,9,10,11,12,13,14,15,16,17,18,19（经 GATE）
  References: `.omo/drafts/kuai-zi-qiao.md` Demo 前置 gate 节（用户原话"先要给我写个demo，我进行试玩下，看看可玩性"）；闸门规则（通过解锁/两轮调参/不过回备胎池：翻花绳、七巧板）
  Acceptance criteria (agent-executable): `DEMO-PLAYTEST.md` 存在且含打开步骤/试玩清单/反馈问题三节；入口经 Playwright 打开验证可访问（截图）；向用户输出试玩指引文本后停止
  QA scenarios (name the exact tool + invocation): happy = Playwright 打开入口截图 `.omo/evidence/task-7-kuai-zi-qiao-demo-entry.png` + 文档存在断言；failure = web-mobile 构建失败 → 降级为编辑器预览指引并记录 `task-7-kuai-zi-qiao-fallback.md`
  Commit: Y | docs(demo): playtest guide & entry

<!-- ⛔ M0 DEMO GATE：大哥亲手试玩。通过 → 解锁下方 Wave 2；不通过 → 回 todo 4/6 调判定阈值与手感（最多两轮）；两轮仍不过 → 停止执行，升级大哥重议备胎池（翻花绳/七巧板）。闸门结论必须由大哥明确给出，agent 不得代为判定。 -->

- [ ] 8. 关卡数据驱动系统与第 1-15 关（含可解性保证）
  What to do / Must NOT do: `assets/resources/levels/level-XX.json` schema：`{span, pillars[], supports[], budget, materials[], name, solution:[{stickId,from,to,order}]}`（supports=河心支点锚点位，solution=该关一组已验证解法）；写 `LevelLoader`（JSON→场景生成，含 schema 校验报错）；**`scripts/validate-levels.ts` 升级为可解性验证**：tsx 无头回放每关 solution 经过 todo 4 的纯判定器（零 Cocos 零 UI），断言 stable=true 且 solution 用筷数 ≤budget——30 关全部过关才算绿，杜绝"偏严无解/偏松失去编织意义"；配置 1-15 关：1-3 教学关（短跨、预算充裕、引导可完成）、4-9 跨度渐宽（逼悬臂）、10-15 预算收紧（精打细算，solution 存在性为硬要求）；Playwright 解法回放脚本所需的关卡坐标序列从各关 solution JSON 读取（统一存放，禁止散落硬编码）。Must NOT do：关卡数据不硬编码进 TS；不给任何关卡加提示；不允许存在 solution 回放失败的关卡（全绿才通过）。
  Parallelization: Wave 2 | Blocked by: GATE | Blocks: 9,10
  References: `.omo/drafts/kuai-zi-qiao.md` 关卡难度轴节（1-5 教直觉 → 6-15 悬臂+限量）
  Acceptance criteria (agent-executable): 15 个 JSON 过 schema 校验全绿；`npx tsx scripts/validate-levels.ts` 无头回放 15 关 solution 全部 stable=true 且用筷 ≤budget（日志存 evidence）；第 1/8/15 关由 Playwright 按 solution 脚本走通并断言出现过关横幅（截图）——"可玩性"的产品判断归 todo 7 闸门
  QA scenarios (name the exact tool + invocation): happy = `npx tsx scripts/validate-levels.ts` 全绿 + `task-8-kuai-zi-qiao-levels.png`；failure = 注入坏 JSON → 加载器报错清晰定位文件与字段且不崩溃（`task-8-kuai-zi-qiao-badjson.log`）；故意改坏某关 solution → 可解性回放报红并指明关卡号（`task-8-kuai-zi-qiao-badsolution.log`）
  Commit: Y | feat(levels): data-driven solvable levels 1-15

- [ ] 9. 材质系统与第 16-30 关
  What to do / Must NOT do: 材质参数表 `{bamboo:长, plastic:低摩擦→吸附半径小, popsicle:短宽}`（参数只影响放置手感与几何吸附，不改判定器结构；**"易滑微偏移"确定性化：偏移量由确定性 PRNG 以 (关卡 seed, 落位序号) 派生，禁止 Math.random——保证 todo 14 同日布局一致与 solution 可回放**）；河心石头支点（supports 锚点节点，schema 已含）；16-30 关配置（混材质局、支点局，每关必须配 solution 且过可解性回放）。Must NOT do：材质不引入新判定规则分支；不加付费/广告解锁材质（图鉴归 M3 留存）；材质参数不得使用随机数。
  Parallelization: Wave 2 | Blocked by: 8 | Blocks: 11（可与 10 并行）
  References: `.omo/drafts/kuai-zi-qiao.md` 难度轴 16-30 节（材质：竹筷长/塑料滑/雪糕棒短宽；河心石头支点）
  Acceptance criteria (agent-executable): 30 个 JSON 过校验全绿；材质参数生效单测绿（吸附半径差异断言）；第 20/28 关抽查截图
  QA scenarios (name the exact tool + invocation): happy = vitest 材质用例绿 + `task-9-materials.png`；failure = 关卡引用未知材质名 → 校验器报错列出全部合法值（`task-9-unknownmat.log`）
  Commit: Y | feat(materials): material params + levels 16-30

- [ ] 10. 结算、星级与本地存档
  What to do / Must NOT do: 过关结算页与**星级公式（写死，不许执行者发明）**：本局"用筷数"= 该次成功过桥所用筷子数（不含历史塌掉的）；"塌桥次数"= 本关累计塌桥次数（仅展示，不计星）。1 星=通关；2 星=通关且本局用筷 ≤ 预算 90%；3 星（满星）=通关且本局用筷 ≤ 预算 70% 且**通关那一局塌桥 0 次**。**与广告补筷的交叉规则（写死）**：看广告补的 3 根筷子计入"本局用筷数"（含广告筷的本局用筷数仍按上述公式算星——广告筷让本局更容易超预算，是"补救不讨星"的公平设计）；复活不重置塌桥累计。关卡选择地图（章节按序解锁）；`StorageAdapter` 接口化存档（web 实现用 localStorage，接口预留 wx/douyin 实现位）。星级公式全文展示在结算页说明区（"不搞隐藏算法"承诺兑现）。Must NOT do：不做全局排行榜；不做云存档；星级规则不搞隐藏算法（公式写进结算页可读处）。
  Parallelization: Wave 2 | Blocked by: 8 | Blocks: 11（可与 9 并行）
  References: `.omo/drafts/kuai-zi-qiao.md` 分数意义决策（只服务星级+每日挑战，不做全局榜）
  Acceptance criteria (agent-executable): Playwright 全流程：过关→星级入库→地图解锁下一关→刷新页面存档仍在（截图）；三档星级的边界用例 vitest 绿（70%/90% 边界、含广告筷超预算降星）；存档写入断言归本 todo（StorageAdapter 本 todo 产出）
  QA scenarios (name the exact tool + invocation): happy = `task-10-kuai-zi-qiao-settle.png` 全流程；failure = 手工损坏存档 JSON → 按新档处理不崩溃（`task-10-kuai-zi-qiao-corrupt.log`）
  Commit: Y | feat(progress): settlement, stars & saves

- [ ] 11. 教学引导与判定手感打磨
  What to do / Must NOT do: 1-3 关无文字交互引导（首根筷子一次性落点虚影示意"怎么操作"后撤除——引导只教操作不教解法，不违反铁律①）；判定阈值回归锚定：**worker 手写 3 组锚定夹具**（必须稳/必须塌/边界局，非真人校验、非自调自判——夹具与期望结果写死进测试文件，调参者改动阈值后重跑即知）作为常驻回归用例，调参至"看起来稳的就别塌"；**闸门证据固化**：读取 `.omo/evidence/gate-m0.md` 中大哥的裁决结论，任何阈值改动若导致该记录描述的体验结论失效（如"塌得冤枉"问题复现），暂停并请大哥复验 10 分钟；临时音效三枚（落筷/稳/塌）。Must NOT do：不改判定器算法结构（只调阈值常量）；引导不出现任何文字教学弹窗。
  Parallelization: Wave 2 | Blocked by: 9,10 | Blocks: 12,13
  References: `.omo/drafts/kuai-zi-qiao.md` 风险清单 R1（教学成本）/R2（判定直觉一致性）；三铁律节
  Acceptance criteria (agent-executable): Playwright 脚本按预设解法走通第 1 关且全程断言无任何文字提示弹窗（截图）；"新玩家无指导能否自己悟出互压机制"归 todo 7 大哥试玩闸门裁决；3 组锚定回归局 vitest 全绿
  QA scenarios (name the exact tool + invocation): happy = `task-11-onboarding.png`（无痕走通）+ `task-11-threshold.log`（回归绿）；failure = 任一锚定局稳/塌不符 → 调参复跑直至全绿，调参前后日志均存 evidence
  Commit: Y | feat(tutorial): onboarding & judge threshold tuning

- [ ] 12. 微信小游戏构建与首包 4MB 关口
  What to do / Must NOT do: 构建面板配置 wechatgame 目标；**构建模块裁剪：不勾选任何物理与 3D 模块**（本项目零物理，省 1MB+）；大体积素材（音效/高质量图）进分包；微信开发者工具（M2 阶段装）打开构建产物编译+真机预览；主包 ≤4MB 硬检查。Must NOT do：主包超 4MB 不准进入后续提审流程；不开启物理模块"以防万一"。
  Parallelization: Wave 3 | Blocked by: 11 | Blocks: 14（可与 13 并行）
  References: 首包优化 https://developers.weixin.qq.com/minigame/dev/guide/performance/perf-action-start2.html ；Cocos 发布微信 https://docs.cocos.com/creator/3.8/manual/zh/editor/publish/publish-wechatgame.html ；`.omo/references/小游戏平台官网链接.md`（微信开发者工具入口）
  Acceptance criteria (agent-executable): **对 `build/wechatgame` 产物主包目录求和 ≤4MB**（PowerShell 递归求和命令输出存证，不依赖构建日志自带体积行）；开发者工具编译 0 error（大哥登录后回传截图，白名单 #2）；真机预览验证清单（操作步骤+预期现象逐条列出）产出，真机执行归大哥（人工触点白名单 #2），回传截图存 `.omo/evidence/task-12-kuai-zi-qiao-device-*.png`
  QA scenarios (name the exact tool + invocation): happy = `task-12-wxbuild.png`（体积+编译）；failure = 超 4MB → 执行裁剪清单（分包/压缩）后复测，前后体积记录 `task-12-oversize.log`
  Commit: Y | chore(build): wechat minigame build under 4MB

- [ ] 13. 抖音小游戏构建接入
  What to do / Must NOT do: 构建 douyin-mini-game 目标；抖音开发者工具编译+真机预览；产出 `chopstick-bridge/docs/douyin-notes.md` 平台差异清单（存储/登录/分享 API 差异逐条记录）；`StorageAdapter` 抖音实现切换验证。Must NOT do：抖音包不启用微信专属 API；不改微信包行为。
  Parallelization: Wave 3 | Blocked by: 11 | Blocks: 14（可与 12 并行）
  References: 抖音开发文档总览 https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/guide/overview ；`.omo/references/小游戏平台官网链接.md`（抖音开发者工具/备案入口）
  Acceptance criteria (agent-executable): 抖音工具编译 0 error（大哥登录后回传截图，白名单 #2）；真机预览验证清单产出，真机执行归大哥（人工触点白名单 #2），回传截图存 evidence；差异清单文档 ≥5 条真实差异
  QA scenarios (name the exact tool + invocation): happy = `task-13-kuai-zi-qiao-dybuild.png`；failure = 平台 API 差异报错 → 适配层修复并逐条记录 `task-13-kuai-zi-qiao-api-fix.md`
  Commit: Y | chore(build): douyin minigame build & notes

- [ ] 14. 每日挑战与分享卡片
  What to do / Must NOT do: 每日挑战：日期字符串作 seed → 确定性伪随机生成当日关卡（同一日期全员同布局，两次进入布局一致）；成绩本地记录（历史最少用筷）；分享卡片：过关/塌桥截图+文案"《筷子桥》你能用更少筷子吗？"（双端分享 API 差异走适配层）；主界面挑战入口+日历红点。Must NOT do：不接任何排行榜后端（纯离线传播）；每日挑战不设广告位（激励位只有 M3 两个）。
  Parallelization: Wave 3 | Blocked by: 12,13 | Blocks: 15,16,17
  References: `.omo/drafts/kuai-zi-qiao.md` 广告位/传播点节（每日挑战同 seed 比最少用筷；塌桥翻车传播）
  Acceptance criteria (agent-executable): 同日两次进入生成布局逐节点一致（两次截图像素 diff 断言）；跨一天 seed 变化（模拟改日期断言）；分享卡片图产出
  QA scenarios (name the exact tool + invocation): happy = `task-14-daily-same.png`（一致性 diff）；failure = 系统日期异常（如 1970）→ 生成器兜底默认局不崩溃（`task-14-date-roll.log`）
  Commit: Y | feat(retention): daily challenge & share card

- [ ] 15. IAA 激励广告接入（双端）
  What to do / Must NOT do: 广告位①塌桥后"看广告补 3 根筷子继续搭"②过关结算"看广告双倍星币"（星币=**只增不减的展示型计数器，唯一来源是广告双倍与 7 日任务；图鉴按材质使用点亮、不消耗星币**，见 Must NOT）；**新建 `IAdAdapter` 接口层**（show/onClose/onError 三方法 + wx/douyin/web-mock 三实现；vitest 只测 mock 实现与护栏，端上真机走白名单 #3）；**位 ID 配置放 `assets/resources/config/ads.json`**（必须进 assets/resources 才会被 Cocos 打包进运行时；先占位测试 ID，正式 ID 替换/空配置分支在 todo 18 执行并有断言）；护栏：复活位每局最多触发 1 次（单测覆盖）。Must NOT do：不接插屏/横幅；不做内购；星币不做任何消耗出口与经济平衡；广告拉起失败不得崩溃或卡死（必须有降级提示）。
  Parallelization: Wave 4 | Blocked by: 14 | Blocks: 18（可与 16,17 并行）
  References: `.omo/drafts/kuai-zi-qiao.md` 广告位节与复活经济学决策（每局 1 次复活位；补筷子=复活位变形）；`.omo/references/小游戏平台官网链接.md`（双端开发者文档入口，接入指南内搜"激励视频"）
  Acceptance criteria (agent-executable): 代码层广告回调链路 vitest 断言绿（奖励发放/护栏拦截）；真机拉起验证清单产出，真机执行归大哥（人工触点白名单 #3），回传截图存 `.omo/evidence/task-15-device-ad.png`；广告拉起失败路径有降级提示（模拟断言截图）
  QA scenarios (name the exact tool + invocation): happy = `task-15-ad-reward.png`；failure = 断网拉广告 → 降级提示不崩溃（`task-15-ad-fail.log`）+ 护栏单测绿（`task-15-guard.log`）
  Commit: Y | feat(ads): rewarded video IAA both platforms

- [ ] 16. 软著材料与双端备案（含流量主门槛核对，部分前移）
  What to do / Must NOT do: 软著申请材料包（个人可办、免费、30-60 工作日——**该周期在关键路径上，因此本 todo 在 GATE 通过后、Wave 2 期间即启动材料准备**，源码样本取自 todo 11 完成态）：程序源码前 30 页+后 30 页 PDF、说明书（功能截图+操作说明）、申请表字段清单；**隐私协议文档** `chopstick-bridge/compliance/privacy-policy.md`（按最小化采集原则撰写：纯客户端本地存储声明、无第三方统计 SDK 声明、广告 SDK 数据披露项）；微信：mp 后台 IAA 类目资质页核对+备案通道材料预填；抖音：备案申报页材料预填（平台代办）；**游戏名占用查重（前移：本 todo 在 GATE 后立即执行查重部分，不等全量开发）**；**双端流量主开通条件核对（新增）**：记录双端流量主/激励视频位的开通门槛与大哥当前账号状态（达标/未达标+缺口指标）写入 compliance 核对表——这是 todo 18 广告分支的前提情报。涉及平台账号登录/提交的环节列出清单交大哥亲手执行。Must NOT do：不虚构提交状态；材料不齐不标"已提交"；不代大哥操作平台账号；隐私协议不写"采集设备信息用于优化"这类与最小化原则冲突的空话。
  Parallelization: Wave 4（材料预填部分；查重+软著递交部分在 GATE 后即启动）| Blocked by: 14 | Blocks: 18（可与 15,17 并行）
  References: `.omo/references/小游戏平台官网链接.md`（IAA 资质审核页=软著触发条件；微信备案页；抖音备案申报页；"名称会占用、主体不能改"备忘）
  Acceptance criteria (agent-executable): `chopstick-bridge/compliance/` 产出材料清单核对表（软著 PDF 页数达标、说明书含 ≥6 张截图、**隐私协议文档存在且含最小化声明三要素**、双端备案材料清单逐项勾选、**流量主门槛与账号状态记录**）；名称查重结果记录
  QA scenarios (name the exact tool + invocation): happy = 核对表 `task-16-kuai-zi-qiao-materials.md` 全勾；failure = 名称被占用 → 备选名候选单（纯中文、含品类词）升级大哥决策，阻塞并记录 `task-16-kuai-zi-qiao-name-taken.md`
  Commit: Y | docs(compliance): copyright & filing materials

- [ ] 17. 轻量留存包（图鉴+7日任务+日历）
  What to do / Must NOT do: 筷子材质图鉴（用过的材质点亮，真差异参数展示）；新手 7 日任务（轻量：第 N 天通关送星币，纯客户端）；每日挑战日历格子（打卡可视化）。Must NOT do：不做深度养成/赛季/抽卡；不加服务器依赖（全部本地）。
  Parallelization: Wave 4 | Blocked by: 14 | Blocks: 18（可与 15,16 并行）
  References: `.omo/drafts/kuai-zi-qiao.md` L15"原则：专而精"与广告位/留存相关节（克制、本地化、零服务器）
  Acceptance criteria (agent-executable): 三功能 Playwright 走通截图（图鉴点亮/签到领取/日历打卡，经 localhost:7456）；存档字段向后兼容（旧档无新字段→默认值）
  QA scenarios (name the exact tool + invocation): happy = `task-17-kuai-zi-qiao-retention.png`；failure = 旧版存档（无图鉴字段）加载 → 默认值兼容不崩溃（`task-17-kuai-zi-qiao-save-migrate.log`）
  Commit: Y | feat(retention): collection, 7day tasks & calendar

- [ ] 18. 双端提审与发布
  What to do / Must NOT do: **先完成正式广告位 ID 替换（含分支）**：若 todo 16 核对结果显示双端流量主达标且可创建正式激励视频位 → 大哥提供正式位 ID，agent 替换 `config/ads.json` 并断言文件内无占位值残留（grep 断言：无 `test-`/`placeholder`/空串，正式 ID 双端各 ≥1 条；若仓库存在则附加 git diff 检查，不存在则跳过）；**若未达标 → 走"空配置上线"分支：ads.json 广告配置置空 + 代码层开关默认关闭（空配置 ≠ 占位 ID，合规），上线后经 todo 19 已验证的热更通道替换配置**——该分支写入 release-log 备注并在 Success criteria 中按"链路验证通过"口径判定。微信提交审核（IAA 类目、备案号、软著号/承诺书、隐私协议、实名信息核对）；抖音提审（同项）；过审后双端发布；版本号与提审记录归档。审核提交动作涉及大哥的平台账号 → 材料备齐后交大哥亲手点击提交。Must NOT do：**广告 ID 断言（或空配置分支确认）未完成前不进入提审材料准备**；审核被拒不擅自改判重提；不提交任何占位广告位 ID。
  Parallelization: Wave 5 | Blocked by: 15,16,17 | Blocks: 19
  References: `.omo/references/小游戏平台官网链接.md`（微信 mp 后台、抖音开放平台控制台）
  Acceptance criteria (agent-executable): **广告位状态二选一已落纸**（正式 ID 替换断言通过，或空配置分支确认+release-log 备注）；提审材料核对表全勾（类目/备案号/软著/隐私/实名）+ 提交记录与版本号归档 `chopstick-bridge/compliance/release-log.md`
  QA scenarios (name the exact tool + invocation): happy = 核对表 `task-18-kuai-zi-qiao-release.md` 全勾 + ads.json 断言日志 `task-18-kuai-zi-qiao-adsid.log`；failure = 审核驳回 → 驳回原因归档并升级大哥决策（`task-18-kuai-zi-qiao-rejected.md`）；正式位不可得 → 空配置分支断言（配置为空+开关关闭）记录 `task-18-kuai-zi-qiao-emptyad.log`
  Commit: Y | chore(release): submit & publish both platforms

- [ ] 19. 上线监控与热修通道
  What to do / Must NOT do: 双端后台数据看板确认可用（崩溃率/次日留存/广告展示量）；首周数据记录模板 `docs/week1-metrics.md`；微信热更新通道验证一次小更新（真机版本号变化）。Must NOT do：不接第三方统计 SDK（个人主体隐私克制）；不搞强制热更。
  Parallelization: Wave 5 | Blocked by: 18 | Blocks: 无
  References: `.omo/references/小游戏平台官网链接.md`（双端管理后台入口）
  Acceptance criteria (agent-executable): 看板数据可见（大哥导出截图存 evidence，白名单 #4）；热更验证清单产出（更新前后真机版本号对比由大哥回传截图，白名单 #4）；week1 模板产出
  QA scenarios (name the exact tool + invocation): happy = `task-19-kuai-zi-qiao-monitor.png`；failure = 热更失败 → 回退全量更新方案并记录 `task-19-kuai-zi-qiao-hotfix-fail.md`
  Commit: Y | chore(ops): monitoring & hotupdate verification

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [ ] F1. Plan compliance audit（执行者=agent：逐条核对 19 todos 的 Acceptance criteria 证据文件存在于 `.omo/evidence/`、Must-NOT 清单零违反记录、人工触点白名单 8 条每条有对应 evidence 或 gate 记录；输出核对表 `.omo/evidence/f1-kuai-zi-qiao-compliance.md`）
- [ ] F2. Code quality review（执行者=agent：对 `assets/scripts/` 全量跑 TS 编译 0 error + vitest 全绿 + 复查判定器常量集中性/适配层接口/存档接口抽象三处关键设计未破坏；输出 `.omo/evidence/f2-kuai-zi-qiao-quality.log`）
- [ ] F3. Real manual QA（执行者=agent 跑脚本 + 大哥真机复核：agent 以 Playwright 全流程过第 1/8/15/20/28 关+塌桥路径+每日挑战一致性，截图序列存 `.omo/evidence/f3-kuai-zi-qiao-*.png`；大哥按白名单 #2/#4 做真机抽查，回传记录并入同一 evidence）
- [ ] F4. Scope fidelity（执行者=agent：对照本计划 Must have 逐条打勾、Must NOT 逐条反证（grep 无物理引擎引用/无排行榜代码/无内购代码/无高亮提示代码）、对照草稿决策汇总 6 条逐条核验；输出 `.omo/evidence/f4-kuai-zi-qiao-scope.md`）

## Commit strategy
- **用户硬规则优先**：任何 git 操作（init/add/commit/push）前，worker 必须先 `git status` + `git diff` 列出待提交内容，等大哥确认后才执行；未经确认不产生任何 git 命令
- 提交粒度 = 每个 todo 一次 conventional commit：`feat(core)` / `feat(ui)` / `feat(levels)` / `chore(build)` / `docs(art|compliance|demo)`
- `.omo/` 规划目录不在产品仓库内，永不提交；`library/ temp/ local/ build/` 由 .gitignore 排除
- 不 push 远端（本项目当前无远端；若大哥日后要求发布仓库，另起请示）

## Success criteria
1. ⛔ M0 Demo 通过大哥亲手试玩验收（可玩性判定成立："做了才知道"的试探循环好玩、塌得讲道理）
2. 编织判定器 vitest 全绿（≥6 用例 + 3 组锚定回归局）
3. 30 关全部可进可玩、星级/存档/每日挑战正常
4. 微信+抖音构建编译 0 error，主包 ≤4MB，双端真机可玩
5. IAA 激励链路双端验证通过（测试位真机拉起 + 护栏生效"复活每局限 1 次"）；正式广告位就绪后的替换路径已验证或空配置分支已确认
6. 软著材料包+双端备案材料齐备，名称查重完成
7. 双端提审记录与发布版本号归档
8. Final verification wave F1-F4 全部 APPROVE，且大哥对交付结果明确点头
