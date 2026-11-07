import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 text-xs tracking-[0.18em] uppercase">
      <button
        onClick={() => setLang("hu")}
        aria-pressed={lang === "hu"}
        className={`px-1.5 py-1.5 transition-colors hover:text-accent ${
          lang === "hu" ? "text-accent" : "text-current/60"
        }`}
      >
        HU
      </button>
      <span className="text-current/30">/</span>
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-1.5 py-1.5 transition-colors hover:text-accent ${
          lang === "en" ? "text-accent" : "text-current/60"
        }`}
      >
        EN
      </button>
    </div>
  );
}

export { LangToggle };

type NavItem = { href: string; label: string; to?: "/packages"; active?: boolean };

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Section links live on the home page, so from any other page they need the
  // home page in front of the anchor.
  const base = pathname === "/" ? "" : "/";
  const onPackages = pathname === "/packages";

  const links: NavItem[] = [
    { href: `${base}#tours`, label: t.nav.tours },
    { href: `${base}#services`, label: t.nav.services },
    { href: `${base}#pricing`, label: t.nav.pricing },
    { href: `${base}#packages`, label: t.nav.packages },
    { href: `${base}#testimonials`, label: t.nav.testimonials },
    { href: `${base}#about`, label: t.nav.about },
  ];

  const navClass = (item: NavItem) =>
    item.active
      ? "text-accent transition-colors"
      : "text-primary-foreground/75 transition-colors hover:text-accent";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/10 bg-primary/90 text-primary-foreground backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:px-8">
        <a href={`${base}#top`} className="flex min-w-0 items-center gap-3">
          <img src="/favicon.png" alt="Domus Property Media" className="h-10 w-10 shrink-0" />
          <span className="min-w-0 truncate font-display text-sm font-bold tracking-[0.22em] uppercase">
            Domus
          </span>
        </a>

        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden items-center gap-6 text-sm lg:flex">
            {links.map((l) =>
              l.to ? (
                <Link key={l.href} to={l.to} className={navClass(l)}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} className={navClass(l)}>
                  {l.label}
                </a>
              ),
            )}
          </nav>
          <div className="shrink-0">
            <LangToggle />
          </div>
          <a href={`${base}#contact`} className="btn-gold hidden sm:inline-flex">
            {t.cta}
          </a>
          <button
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-primary-foreground/10 px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-4 text-sm">
            {links.map((l) =>
              l.to ? (
                <Link
                  key={l.href}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={l.active ? "text-accent" : "text-primary-foreground/80"}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-primary-foreground/80"
                >
                  {l.label}
                </a>
              ),
            )}
            <a href={`${base}#contact`} onClick={() => setOpen(false)} className="btn-gold w-fit">
              {t.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
