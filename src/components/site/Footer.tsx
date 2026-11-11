import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { LangToggle } from "./Header";
import { FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/social";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex min-w-0 items-start gap-4">
          <img src="/favicon.png" alt="Domus Property Media" className="h-14 w-14 shrink-0" />
          <div className="min-w-0">
            <p className="font-display text-base font-bold tracking-[0.22em] uppercase">Domus</p>
            <p className="eyebrow text-accent">Property Media</p>
            <p className="mt-3 text-sm text-primary-foreground/70">{t.footer.tagline}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm md:items-end">
          <a href="mailto:timar.balint@domustours.com" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-accent">
            <Mail className="h-4 w-4" /> timar.balint@domustours.com
          </a>
          <a href="tel:+36705424017" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-accent">
            <Phone className="h-4 w-4" /> +36 70 542 4017
          </a>
          <div className="flex gap-4">
            {INSTAGRAM_URL && (
              <a href={INSTAGRAM_URL} aria-label="Instagram" className="text-primary-foreground/70 hover:text-accent">
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {FACEBOOK_URL && (
              <a href={FACEBOOK_URL} aria-label="Facebook" className="text-primary-foreground/70 hover:text-accent">
                <Facebook className="h-5 w-5" />
              </a>
            )}
          </div>
          <LangToggle />
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 px-5 py-5 text-center text-xs text-primary-foreground/50 sm:px-8">
        © {new Date().getFullYear()} Domus Property Media · domustours.com · {t.footer.rights}
      </div>
    </footer>
  );
}
