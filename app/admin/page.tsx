import { SiteHeader } from "@/components/site-header";
import { requireAdmin } from "@/lib/auth";
import { listAllWishes } from "@/lib/wishes";

export default async function AdminPage() {
  const user = await requireAdmin();
  const wishes = await listAllWishes();

  return (
    <>
      <SiteHeader />
      <main className="shell">
        <section className="card">
          <h1 className="section-title">审核后台</h1>
          <p className="muted">
            当前登录管理员：{user.email}。这个页面和对应的审核接口都已要求管理员身份。
          </p>
          <div className="wish-list">
            <form action="/api/auth/sign-out" method="post">
              <button className="button" type="submit">
                退出登录
              </button>
            </form>
            {wishes.map((wish) => (
              <article className="wish" key={wish.id}>
                <header>
                  <div>
                    <h3>{wish.title}</h3>
                    <div className="muted">{wish.nickname}</div>
                  </div>
                  <span className={wish.status === "approved" ? "pill" : "pill pill--draft"}>
                    {wish.status}
                  </span>
                </header>
                <p>{wish.content}</p>
                <form action="/api/admin/wishes" method="post">
                  <input type="hidden" name="id" value={wish.id} />
                  <label>
                    回答内容
                    <textarea
                      name="answer"
                      defaultValue={wish.answer ?? ""}
                      placeholder="通过时可以顺手填写回答"
                    />
                  </label>
                  <label>
                    审核状态
                    <select name="status" defaultValue={wish.status}>
                      <option value="pending">pending</option>
                      <option value="approved">approved</option>
                      <option value="rejected">rejected</option>
                    </select>
                  </label>
                  <button className="button button--primary" type="submit">
                    保存审核结果
                  </button>
                </form>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
