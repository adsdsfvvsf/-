import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { hasSupabaseConfig } from "@/lib/env";
import { listPublicWishes } from "@/lib/wishes";

export default async function HomePage() {
  const wishes = await listPublicWishes();
  const ready = hasSupabaseConfig();

  return (
    <>
      <SiteHeader />
      <main className="shell">
        <section className="hero">
          <div className="card">
            <div className="eyebrow">低成本 MVP / Next.js + Supabase</div>
            <h1>把心愿写下来，等一句认真回答。</h1>
            <p>
              这是一个适合快速上线的第一版平台骨架：支持匿名昵称发布、公开展示、后台审核与回答。
              如果你后面要加登录、付费、标签、搜索，我们也能在这套结构上继续扩。
            </p>
            <div className="nav">
              <Link href="/submit" className="button button--primary">
                开始发布
              </Link>
              <Link href="/admin" className="button">
                打开审核台
              </Link>
            </div>
            <div className="stats">
              <div className="stat">
                <strong>Next.js</strong>
                <span className="muted">App Router 页面与 API 一体化</span>
              </div>
              <div className="stat">
                <strong>Supabase</strong>
                <span className="muted">数据库、认证、后续可接存储</span>
              </div>
              <div className="stat">
                <strong>Vercel</strong>
                <span className="muted">前端零成本起步，部署路径清晰</span>
              </div>
            </div>
          </div>

          <div className="card stack">
            <div>
              <h2 className="section-title">当前状态</h2>
              <p className="muted">
                {ready
                  ? "已检测到 Supabase 环境变量结构，可继续连真库。"
                  : "当前还没填 Supabase 环境变量，所以首页会展示内置示例数据。"}
              </p>
            </div>
            <div>
              <h2 className="section-title">第一版功能</h2>
              <p className="muted">匿名发布、公开展示、审核通过、填写回答、简单后台。</p>
            </div>
            <div>
              <h2 className="section-title">下一步可扩展</h2>
              <p className="muted">邮箱登录、RLS、分类标签、搜索、敏感词过滤、运营面板。</p>
            </div>
          </div>
        </section>

        <section className="grid">
          <div className="card">
            <h2 className="section-title">已公开心愿</h2>
            <p className="muted">这里展示审核通过的内容。</p>
            <div className="wish-list">
              {wishes.length === 0 ? (
                <div className="empty">还没有公开内容，你可以先发布第一条心愿。</div>
              ) : (
                wishes.slice(0, 3).map((wish) => (
                  <article className="wish" key={wish.id}>
                    <header>
                      <div>
                        <h3>{wish.title}</h3>
                        <div className="muted">{wish.nickname}</div>
                      </div>
                      <span className="pill">已公开</span>
                    </header>
                    <p>{wish.content}</p>
                    {wish.answer ? <p className="muted">回答：{wish.answer}</p> : null}
                  </article>
                ))
              )}
            </div>
          </div>

          <div className="card">
            <h2 className="section-title">建议的免费部署组合</h2>
            <div className="wish-list">
              <div className="wish">
                <h3>前端</h3>
                <p className="muted">Vercel 免费层，直接部署 Next.js。</p>
              </div>
              <div className="wish">
                <h3>数据库</h3>
                <p className="muted">Supabase 免费层，管理 `wishes` 表和后续认证。</p>
              </div>
              <div className="wish">
                <h3>管理入口</h3>
                <p className="muted">先用受限后台页面，后面再接管理员邮箱白名单和更细的权限。</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="shell footer">
        这份骨架已经可以作为你的第一阶段起点。把环境变量填好后，就能切到真实数据。
      </footer>
    </>
  );
}
