import { SiteHeader } from "@/components/site-header";

export default function SubmitPage() {
  return (
    <>
      <SiteHeader />
      <main className="shell">
        <section className="grid">
          <div className="card">
            <h1 className="section-title">发布心愿</h1>
            <p className="muted">
              第一版默认匿名昵称 + 内容审核。提交后会进入 `pending` 状态，管理员审核通过后展示到广场。
            </p>
            <form action="/api/wishes" method="post">
              <label>
                昵称
                <input name="nickname" maxLength={24} placeholder="例如：晚风 / 匿名来信" required />
              </label>
              <label>
                标题
                <input name="title" maxLength={80} placeholder="一句话概括你的心愿" required />
              </label>
              <label>
                内容
                <textarea
                  name="content"
                  maxLength={1000}
                  placeholder="把你真正想说的话写下来。"
                  required
                />
              </label>
              <button type="submit" className="button button--primary">
                提交心愿
              </button>
            </form>
          </div>

          <aside className="card stack">
            <div>
              <h2 className="section-title">提交后会发生什么</h2>
              <p className="muted">内容进入数据库，状态默认为 `pending`，由后台决定公开或驳回。</p>
            </div>
            <div>
              <h2 className="section-title">后续可加</h2>
              <p className="muted">图片附件、标签分类、心愿墙排序、私信回复、AI 初筛敏感内容。</p>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
