import { chromium } from "/root/.dsh/browser/node_modules/playwright-core/index.mjs";
import fs from "node:fs";
import path from "node:path";
const dir = "/root/dsh coding/旅游自媒体/route-cards";
const data = JSON.parse(fs.readFileSync(path.join(dir, "cards-all.json"), "utf8"));
const css = [
  "*{margin:0;padding:0;box-sizing:border-box}",
  "body{width:1080px;height:1350px;overflow:hidden;font-family:Inter,Helvetica Neue,Arial,Noto Sans,sans-serif;background:#0b0e13;color:#e9edf3}",
  ".card{position:relative;width:1080px;height:1350px;padding:74px 76px 62px;background:radial-gradient(900px 620px at 88% -8%,var(--soft) 0%,transparent 62%),radial-gradient(700px 520px at -10% 108%,#17202c 0%,transparent 60%),linear-gradient(160deg,#10141b 0%,#0b0e13 58%,#0a0c11 100%);display:flex;flex-direction:column}",
  ".grain{position:absolute;inset:0;opacity:.06;pointer-events:none;background-image:radial-gradient(#fff .6px,transparent .6px);background-size:3px 3px}",
  ".kicker{font-size:22px;letter-spacing:.22em;font-weight:700;color:var(--accent);text-transform:uppercase}",
  "h1{font-size:60px;line-height:1.08;font-weight:800;letter-spacing:-.02em;margin-top:22px;max-width:920px}",
  ".sub{margin-top:20px;font-size:25px;line-height:1.45;color:#9aa6b6;max-width:840px}",
  ".rule{height:1px;background:linear-gradient(90deg,var(--accent),transparent);margin:32px 0 28px;opacity:.55}",
  ".days{display:flex;flex-direction:column;gap:15px;flex:1;justify-content:space-evenly}",
  ".day{display:grid;grid-template-columns:96px 1fr;gap:24px;align-items:start}",
  ".chip{font-size:20px;font-weight:800;letter-spacing:.04em;color:#0b0e13;background:var(--accent);border-radius:999px;padding:8px 0;text-align:center}",
  ".place{font-size:28px;font-weight:700;color:#f2f5f9;letter-spacing:-.01em}",
  ".note{font-size:20px;line-height:1.4;color:#93a0b1;margin-top:6px;max-width:780px}",
  ".foot{display:flex;justify-content:space-between;align-items:flex-end;margin-top:24px;border-top:1px solid #1e2735;padding-top:20px}",
  ".cost{font-size:19px;color:var(--accent);font-weight:600}",
  ".tag{font-size:18px;color:#6f7c8e}"
].join("");
const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const dayHtml = (d) => '<div class="day"><div class="chip">' + esc(d.d) + '</div><div><div class="place">' + esc(d.place) + '</div><div class="note">' + esc(d.note) + '</div></div></div>';
const html = (c) => '<!doctype html><html><head><meta charset="utf-8"><style>' + css + ':root{--accent:' + c.accent + ';--soft:' + c.accent + '22}</style></head><body><div class="card"><div class="grain"></div>' +
  '<div class="kicker">' + esc(c.kicker) + '</div><h1>' + esc(c.title) + '</h1><div class="sub">' + esc(c.sub) + '</div><div class="rule"></div><div class="days">' + c.days.map(dayHtml).join("") + '</div>' +
  '<div class="foot"><div class="cost">' + esc(c.cost) + '</div><div class="tag">' + esc(c.foot) + '</div></div></div></body></html>';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args:["--no-sandbox"] });
const page = await browser.newPage({ viewport:{ width:1080, height:1350 }, deviceScaleFactor:2 });
for (const c of data.cards) {
  const f = path.join(dir, "html", c.slug + ".html");
  fs.writeFileSync(f, html(c));
  await page.goto("file://" + encodeURI(f));
  await page.waitForTimeout(120);
  const out = path.join(dir, "png", c.slug + ".png");
  await page.screenshot({ path: out });
  console.log(c.slug, Math.round(fs.statSync(out).size/1024) + "KB");
}
await browser.close();