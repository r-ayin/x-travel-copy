# X Travel Copy（私人仓库）

把 8 周 × 21 条中文旅游文案改写成的 **X（Twitter）短动态**，外加把详细路程规划用 HTML/CSS 渲染成的**路线卡片图**。

## 目录

```
X发送素材库/<周>/<周几>/<时段-类型-标题>/X-短帖.md   逐条短帖（168 条）
_x短帖/第N周.md                                    按周合并版（方便通读）
route-cards/png/*.png                             路线卡片 45 张，2160×2700
route-cards/cards-all.json                        卡片源数据（改文案后重渲染用）
route-cards/render.mjs                            Playwright 渲染脚本
X短帖-总览.md                                      索引
```

## 每条文件的结构

```markdown
## EN (<=280)      <- 直接复制发，已按 X 计数校验
## 中文对照（不发）  <- 仅供核对，不要发出去
## 配图            <- 有配图的帖子给 PNG 路径，没有则写「无」
## 字数            <- n / 280
```

## 用法

1. 打开任意 `X-短帖.md`，复制 `## EN` 段落；
2. 若写了配图，把 `route-cards/png/` 下同名 PNG 一起上传（1080×1350 竖版，2 倍图）；
3. 路线卡片已经把逐日行程、公里数、花费压在图上，正文不用再写细节。

## 约定

- 英文是按原素材的**事实骨架**重写的，不是逐字翻译：价格、天数、地名保留，句子全部重写。
- 卡片文案是英文（面向 X 读者），中文解释只在 md 里。
- `cards-all.json` 是唯一数据源；改完跑 `node render.mjs` 重出 PNG。

## 重新渲染

```bash
cd route-cards
npm i playwright-core        # 若未安装
node render.mjs
```
