import { SiteHeader } from "@/components/site-header";
import { listPublicWishes } from "@/lib/wishes";

export default async function WishesPage() {
  const wishes = await listPublicWishes();

  return (
    <>
      <SiteHeader />
      <main className="shell">
        <section className="card">
          <h1 className="section-title">心愿广场</h1>
          <p className="muted">审核通过的心愿会出现在这里。</p>
          <div className="wish-list">
            {wishes.length === 0 ? (
              <div className="empty">还没有公开心愿。</div>
            ) : (
              wishes.map((wish) => (
                <article className="wish" key={wish.id}>
                  <header>
                    <div>
                      <h3>{wish.title}</h3>
                      <div className="muted">{wish.nickname}</div>
                    </div>
                    <span className="pill">公开中</span>
                  </header>
                  <p>{wish.content}</p>
                  {wish.answer ? <p className="muted">回答：{wish.answer}</p> : null}
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}
