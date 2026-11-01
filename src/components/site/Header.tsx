import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 text-xs tracking-[0.18em] uppercase">
      <button
        onClick={() => setLang("hu")}
        className={lang === "hu" ? "text-accent" : "text-current/60 hover:text-accent"}
      >
        HU
      </button>
      <span className="text-current/30">/</span>
      <button
        onClick={() => setLang("en")}
        className={lang === "en" ? "text-accent" : "text-current/60 hover:text-accent"}
      >
        EN
      </button>
    </div>
  );
}

export { LangToggle };

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#tours", label: t.nav.tours },
    { href: "#services", label: t.nav.services },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#about", label: t.nav.about },
    { href: "#testimonials", label: t.nav.testimonials },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/10 bg-primary/90 text-primary-foreground backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <img src="/favicon.png" alt="Domus Property Media" className="h-10 w-10 shrink-0" />
          <span className="min-w-0 truncate font-display text-sm font-bold tracking-[0.22em] uppercase">
            Domus
          </span>
        </a>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 text-sm lg:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-primary-foreground/75 transition-colors hover:text-accent">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden sm:block">
            <LangToggle />
          </div>
          <a href="#contact" className="btn-gold hidden sm:inline-flex">
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
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-primary-foreground/80">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-gold w-fit">
              {t.cta}
            </a>
            <LangToggle />
          </nav>
        </div>
      )}
    </header>
  );
}
