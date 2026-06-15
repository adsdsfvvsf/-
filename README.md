# 心愿回答平台 MVP

这是一个基于 `Next.js + Supabase` 的第一版项目骨架，适合你先把平台跑起来，再逐步补登录、审核权限、搜索、标签和运营功能。

## 当前已经搭好的内容

- 首页：说明产品定位、部署方案、示例公开内容
- 心愿广场：展示 `approved` 状态的内容
- 发布页：匿名昵称 + 标题 + 正文提交
- 审核后台：查看全部内容、修改状态、填写回答
- API：
  - `POST /api/wishes`
  - `POST /api/admin/wishes`
- 数据库脚本：[supabase/schema.sql](./supabase/schema.sql)

## 预期技术栈

- Next.js App Router
- Supabase Database / Auth
- Vercel 部署

## 本地启动

1. 安装 Node.js 20+
2. 安装依赖

```bash
npm install
```

3. 复制环境变量

```bash
cp .env.example .env.local
```

4. 在 Supabase 新建项目，把以下变量填入 `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=admin@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. 把 [supabase/schema.sql](./supabase/schema.sql) 粘到 Supabase SQL Editor 执行

6. 启动开发环境

```bash
npm run dev
```

## 下一步我建议你做的三件事

1. 先把 Node 和依赖装好，让项目能本地跑起来
2. 去 Supabase 创建项目并执行 `schema.sql`
3. 回来让我继续帮你接：
   - 内容搜索 / 标签 / 分类
   - 图片上传
   - 更完整的 UI 和运营功能

## 当前已知限制

- 后台现在已经接入管理员邮箱登录，但还没做更细的角色分级
- 当 Supabase 环境变量未配置时，首页与列表页会回退到示例数据
