import Link from "next/link";
import type { Route } from "next";

const links: Array<{ href: Route; label: string }> = [
  { href: "/", label: "首页" },
  { href: "/wishes", label: "心愿广场" },
  { href: "/submit", label: "发布心愿" },
  { href: "/admin", label: "审核后台" }
];

export function SiteHeader() {
  return (
    <header className="shell topbar">
      <Link href="/" className="brand">
        心愿回答平台
      </Link>
      <nav className="nav" aria-label="主导航">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
