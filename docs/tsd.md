## 卡片宇宙·技术说明文档（TSD v1.0 Final）

## 1. 总体技术架构

### 1.1 架构风格

前后端分离。BFF 层最薄化。CDN 前置。对象存储承载图片。数据库承载业务数据。

核心栈为 Next.js 14 App Router、Tailwind CSS、Supabase（Auth、Postgres、存储仅用于轻量文件，不承载大图）、Cloudflare R2 或 Cloudflare Images、Vercel 托管与 Edge 中间层。

### 1.2 组件清单

前端 Web 客户端 Next.js 14

样式系统 Tailwind CSS

图像生成与排版前端引擎 Canvas API 或 Fabric.js（仅前期贴字模板）

认证 Auth.js（Supabase Provider、Email、Google、微信 OAuth 预留）

数据库 PostgreSQL（Supabase 托管）

缓存与边缘加速 Vercel Edge + Cloudflare CDN

对象存储 Cloudflare R2（原图与高清）、Cloudflare Images 或 Imgix（可选图像处理）

搜索 Supabase pg_trgm + 索引，多语言分词预留 MeiliSearch 接入位

日志与监控 Sentry、Vercel Analytics、Supabase Audit Log

支付 中国阶段 Ping++ 或等价聚合平台 Webhook；全球阶段 Stripe Checkout + Webhooks；PayPal 备用

队列与异步作业 Upstash Redis 或 Supabase Functions（用作 License 生成、缩略图任务）

文档与风格规范 Storybook（可选）

国际化 next-intl 或 next-i18next

安全与风控 Turnstile 人机校验、IP 限速、中间件签名校验

### 1.3 部署拓扑

生产 Vercel（前端与 BFF）、Supabase（DB、Auth）、Cloudflare（R2、Images、CDN）

预发 Vercel Preview，每个 PR 自动预览域名

开发 本地 dev + Supabase 本地或对接测试项目

### 1.4 环境变量

必需键名

NEXT_PUBLIC_SITE_URL

DATABASE_URL

SUPABASE_URL

SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE

CF_R2_ACCOUNT_ID

CF_R2_ACCESS_KEY_ID

CF_R2_SECRET_ACCESS_KEY

CF_R2_BUCKET_ORIGINAL

CF_R2_BUCKET_PREVIEW

PINGXX_API_KEY 或 CN_PAY_API_KEY

STRIPE_SECRET_KEY（全球阶段）

STRIPE_WEBHOOK_SECRET

SENTRY_DSN

JWT_SECRET

TURNSTILE_SITE_KEY

TURNSTILE_SECRET_KEY

## 2. 目录结构与工程规范

### 2.1 Next.js 目录

app

app layout.tsx、globals.css、i18n provider

app page.tsx 首页瀑布流

app card [id] page.tsx 卡片详情

app auth sign-in、callback

app account 收藏、购买、会员、授权记录

app pricing 定价与授权说明

app admin 审核与后台

app api 支付回调、签名 URL、License 生成、图像处理任务路由

lib

lib db、auth、r2、cdn、payment、license、logger、search

components

UI 基础组件、CardTile、MasonryGrid、SearchBar、Sidebar、LicenseBadge

styles

Tailwind 配置与主题 token

public

robots.txt、sitemap.xml、favicon、OG 预设

### 2.2 代码规范

TypeScript 严格模式。ESLint + Prettier。

Commit 采用 Conventional Commits。

CI 进行 type-check、lint、build、e2e 轻度冒烟测试。

图片操作一律在服务端或边缘函数执行，不在客户端暴露秘钥。

## 3. 数据模型与约束

### 3.1 核心表

users

id uuid

email unique

nickname

role enum admin curator user creator

member_tier enum none member business

member_expire_at timestamptz

created_at updated_at

cards

id uuid

title text

slug text unique

caption text

tags text[]

series enum quote love city lab

style enum minimal illustration photo abstract

color_palette text[]

ai_model text 可空

width int height int

preview_url text（低清）

thumb_url text（更低清）

original_url text（R2 私有）

author_id uuid references users

license_type enum personal commercial enterprise

status enum draft pending approved rejected

created_at updated_at

transactions

id uuid

user_id uuid

amount_cents int

currency text

channel enum pingxx stripe paypal manual

status enum pending succeeded failed refunded

order_type enum member_single member_subscription card_single license_enterprise

meta jsonb

created_at

downloads

id uuid

user_id uuid

card_id uuid

resolution enum thumb preview hd

license_id uuid 可空

ip inet ua text

created_at

licenses

id uuid

user_id uuid

card_id uuid

license_no text unique（规则见 7.4）

license_type enum personal commercial enterprise

valid_from timestamptz

valid_to timestamptz 可空

signature_sha256 text

pdf_url text

created_at

favorites

user_id card_id 复合主键

audit_logs

id uuid

actor_id uuid

action text

target_type text

target_id uuid

payload jsonb

created_at

### 3.2 业务约束

卡片必须同时具备 thumb、preview、original 三档资源。

original 私有桶，必须经鉴权与签名 URL 访问。

所有下载事件落表，触发审计日志。

License 只对 succeeded 的交易生成。

搜索对 title、caption、tags、series、style 建索引。

## 4. 核心业务流程

### 4.1 浏览与检索

匿名访问首页。CDN 命中。

左侧分类 SSR 输出。主区瀑布流 CSR 逐页拉取。

搜索走 /api/search，Postgres ilike + trigram。

结果统一返回卡片预览数据集。

### 4.2 详情与低清预览

详情页 SSR 生成，卡片元信息、相似推荐。

预览图使用加噪与轻水印。禁止右键保存。

高清按钮需登录与权限校验。

### 4.3 购买与授权

点击购买或开通会员。

中国阶段跳转 Ping++ 收银台。支付成功 Webhook 通知 /api/webhooks/pingxx。

统一订单状态流转为 succeeded。触发 License 生成任务队列。

License 生成 PDF，写入 licenses，通知用户。

账户页展示授权列表与下载链接。

### 4.4 收藏与下载

收藏写入 favorites。

下载高清时签发一次性签名 URL，有效期 60 秒，单 IP 使用。

下载记录落表。过频触发限速。

### 4.5 审核与上架

创作者上传为 pending。

AI 初审检测分辨率、噪点、违规标签。

策展人复审设置标签与系列。

通过变更为 approved，入流量池。

拒绝写入原因，返回创作者。

## 5. 权限与安全

### 5.1 角色权限

admin 全站管理、删除、财务查看

curator 审核、编辑标签、置顶

creator 上传、查看收益（后期开）

user 浏览、收藏、购买

### 5.2 访问控制

原图与高清仅通过签名 URL 访问。

签名策略包含路径、有效期、哈希。

所有写入 API 必须 CSRF 保护、Turnstile 校验、Auth 会话校验。

针对 /api/download、/api/license 设定 IP 限速。

对登录、支付回调、管理后台单独记录审计日志。

### 5.3 内容安全

上传通道执行图像 NSFW 与涉政涉暴模型检测。

OCR 解析文字与“违禁词表”。

高风险图片自动标红并阻断。

## 6. 支付与结算

### 6.1 中国阶段

采用 Ping++ 或等价聚合。

客户端跳转收银台。

Webhook 路由 /api/webhooks/pingxx 验签处理。

交易成功后落表 transactions 并进入 License 生成。

注意对账定时任务每日对齐。

### 6.2 全球阶段

Stripe Checkout 与 Billing。

价格对象包含 单次高清、个人会员、商业会员、企业授权订阅。

Webhook 路由 /api/webhooks/stripe 验签处理。

PayPal 作为备用通道，Webhook /api/webhooks/paypal。

对账任务每日比对 Stripe Balance 与内部交易。

### 6.3 授权分级执行

个人会员 仅个人非商用下载额度。

商业会员 批量下载并自动附商用 License。

企业授权 API 访问与批量 License。

服务器端严格以订单类型与会员等级决定 License 文案与有效期。

## 7. 图像处理与版权保护

### 7.1 存储分层

thumb 320px 短边，公开 CDN

preview 1080p 上限，公开 CDN，带轻水印

original 源图，R2 私有桶，仅签名 URL

### 7.2 处理流水线

上传成功后入队

生成 thumb、preview

叠加轻水印（PNG 透明 Logo 和 License 标记）

写入 R2 与 DB

### 7.3 防盗策略

禁右键与拖拽并非安全手段，仅做 UX 防护

预览层统一叠加不可见数字水印（如 robust watermark 库），对截图可追溯

所有高清下载经一次性签名 URL，绑定 user、card、ip、expires

### 7.4 License 生成

License 编号规则

CV-YYYYMMDD-USER6-CARD6-SEQ4

签名生成

SHA256(user_id + card_id + created_at + secret)

License PDF 包含

持有人、卡片信息、授权类型、生效时间、限制条款、编号与签名

模板引擎 pdfkit 或 Puppeteer 渲染

## 8. 性能与可观测性

### 8.1 性能预算

首页首屏可交互小于 2s（4G 网络）

详情页 TTFB 小于 200ms（CDN 命中）

图片懒加载，优先 thumb，再载 preview

JS 包小于 200KB gzip 首屏

### 8.2 缓存策略

静态资源强缓存一年，文件名指纹

API GET 层 CDN 缓存 30s 并协商缓存

SSR 页面采用 ISR 或 Edge SSR + HTML 缓存

### 8.3 监控与报警

Sentry 错误上报

Vercel Analytics 页面指标

自定义健康检查端点 /api/health

重要链路设置阈值报警（支付失败率、Webhook 失败率、下载 5xx）

## 9. 国际化与多语言

### 9.1 i18n 范围

UI 文案、SEO Meta、Open Graph、路由别名

内容层 tags、caption 支持中英并存字段

### 9.2 SEO

sitemap.xml、robots.txt

每张卡片详情页输出 og:title、og:image、twitter:card

结构化数据标注 CreativeWork 或 ImageObject

## 10. 可访问性与合规

### 10.1 A11y

语义化标签、alt 文本、对比度合规

键盘导航测试

聚焦状态可见

### 10.2 隐私

最小化收集。支付数据不落服务端，仅存交易摘要。

提供账号删除与数据导出端点。

Cookie 仅必要项，标注用途。

## 11. 后台与策展工具

### 11.1 后台功能

卡片审核列表、批量标签、拒绝原因模板

用户与交易检索、退款申请入口（记录到 meta）

精选位运营位排序与 A/B 标记

### 11.2 审核工作流

pending 队列

AI 初审打分

curator 复审

approved 上架并入索引

rejected 返回原因并可一键再次提交

## 12. 非功能需求

### 12.1 可靠性

服务可用性 99.9

单区域不可用时，CDN 兜底预览层，购买入口降级

### 12.2 安全

所有 API 走 HTTPS。

Webhook 必须签名校验与重放保护。

输入校验与 XSS、SQL 注入防护。

管理后台 IP 白名单可选开启。

### 12.3 备份与恢复

数据库每日全量备份，保留 7 天

R2 版本化存储

演练恢复流程每季度一次

## 13. CI CD 与分支策略

### 13.1 分支

main 生产

develop 预发

feature 按模块命名

合入 develop 触发 Preview

合入 main 触发生产部署

### 13.2 测试

单元测试 关键工具函数

集成测试 API 路由与权限

E2E 关键用户路径（浏览、搜索、购买、下载、生成 License）

## 14. 支付迁移路线

### 14.1 阶段一 中国

上线即接入 Ping++ 或等价，微信与支付宝支付

保留 Stripe 接口抽象，代码中以 Provider 模式实现

### 14.2 阶段二 过渡

启用 PayPal 接收海外小额

完善多币种展示与税费文案

### 14.3 阶段三 全球

切主 Stripe Checkout

CN 通道作为中国用户保留，路由按 IP 与用户偏好切换

## 15. 风险与对策

### 15.1 图片盗用

不可逆阻断不现实。策略是可追溯与法务可用证据。

强化数字水印与日志。License 严格绑定。

### 15.2 审核瓶颈

AI 初审分流 80，人工关注 20 的难样本。

制定风格规范与拒绝理由枚举，提效复审。

### 15.3 支付风控

Webhook 幂等、重试退避、签名严格

对账任务每日对齐，异常报警

### 15.4 性能退化

设置性能预算守门

定期 Bundle 分析与路由按需加载

## 16. 接口与伪代码

### 16.1 典型 API 路由

GET /api/cards list、分页、筛选

GET /api/cards/[id] 详情

POST /api/favorites toggle

POST /api/checkout 创建订单，返回收银台 URL 或 Checkout Session

POST /api/webhooks/pingxx 支付回调

POST /api/webhooks/stripe 支付回调

POST /api/license/generate 内部调用

GET /api/download/[cardId] 签发一次性 URL

GET /api/search 关键词检索

### 16.2 伪代码示例

签名 URL

```
const key = HMACSHA256(`${userId}:${cardId}:${expires}`, SECRET)
return `${CDN}/r2/original/${cardId}.jpg?exp=${expires}&sig=${key}`

```

License 签名

```
const payload = `${userId}|${cardId}|${issuedAt}`
const signature = SHA256(payload + LICENSE_SECRET)

```

Webhook 幂等

```
if (existsByEventId(event.id)) return 200
begin
  upsert transaction
  enqueue license
commit

```

## 17. 验收标准

首页 2s 内可交互，瀑布流平滑，预览清晰

详情页含版权文案、相关推荐、按钮逻辑正确

购买闭环可跑通，中国阶段可真实完成支付并生成 License

账户页可展示收藏、下载、授权、会员时长

后台可审核、打标、置顶

全链路日志完备，可追溯

## 18. 初始种子数据与上线计划

### 18.1 种子集

首发 300 张高质量卡片

三大系列各 100 张

统一色板与版式，保持品牌一致

### 18.2 上线节奏

T0 基础功能完工，预发压测

T0 1 开放只读访问与低清下载

T0 2 开放购买与 License 闭环

T0 3 公布定价与会员

T0 4 开启每日精选与社媒分发