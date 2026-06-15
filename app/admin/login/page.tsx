import { SiteHeader } from "@/components/site-header";

type LoginPageProps = {
  searchParams?: Promise<{
    reason?: string;
    sent?: string;
    error?: string;
  }>;
};

function getMessage(reason?: string, error?: string) {
  if (error === "config") {
    return "还没有配置 Supabase 环境变量，暂时无法登录。";
  }

  if (reason === "forbidden") {
    return "你已经登录，但当前邮箱不在管理员白名单里。";
  }

  if (reason === "signin") {
    return "请先用管理员邮箱登录后再进入后台。";
  }

  return "使用管理员邮箱接收魔法链接，登录后会自动返回后台。";
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const message = getMessage(params?.reason, params?.error);

  return (
    <>
      <SiteHeader />
      <main className="shell">
        <section className="grid">
          <div className="card">
            <h1 className="section-title">管理员登录</h1>
            <p className="muted">{message}</p>
            {params?.sent === "1" ? (
              <div className="pill pill--draft">登录邮件已发送，请去邮箱里点开魔法链接。</div>
            ) : null}
            <form action="/api/auth/sign-in" method="post">
              <label>
                管理员邮箱
                <input
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                />
              </label>
              <button type="submit" className="button button--primary">
                发送登录链接
              </button>
            </form>
          </div>

          <aside className="card stack">
            <div>
              <h2 className="section-title">登录机制</h2>
              <p className="muted">第一版使用 Supabase 魔法链接，不用单独做密码系统。</p>
            </div>
            <div>
              <h2 className="section-title">管理员控制</h2>
              <p className="muted">只有 `ADMIN_EMAILS` 白名单内的邮箱，才能进入审核后台和调用审核接口。</p>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
