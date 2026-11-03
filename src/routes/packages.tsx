import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { LangProvider, useLang } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArchIcon } from "@/components/site/Arch";
import { PLAN_IDS } from "@/lib/plans";

const SITE_URL = "https://domuspropertymedia.lovable.app";

export const Route = createFileRoute("/packages")({
  component: Page,
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Havi csomagok — Domus Property Media" },
      {
        name: "description",
        content:
          "Havi csomagok rendszeres munkákhoz: 4 vagy 8 ingatlan havonta, kedvezőbb áron. Havi számlázás, bármikor lemondható.",
      },
      { property: "og:title", content: "Havi csomagok — Domus Property Media" },
      {
        property: "og:description",
        content:
          "Havi csomagok rendszeres megbízásokhoz, kedvezőbb áron. Havi számlázás, kötöttség nélkül.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/packages` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/packages` }],
  }),
});

function Page() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}

function Site() {
  const { t } = useLang();

  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Page header */}
        <section className="relative overflow-hidden bg-primary pt-32 pb-16 text-primary-foreground sm:pt-40 sm:pb-20">
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary/95" />
          <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="fade-up max-w-2xl">
              <ArchIcon className="h-9 w-9 text-accent" />
              <h1 className="mt-6 text-4xl leading-[1.08] sm:text-5xl">{t.packages.title}</h1>
              <p className="mt-5 max-w-xl text-base text-primary-foreground/75 sm:text-lg">
                {t.packages.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="section bg-secondary">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {t.packages.plans.map((plan, i) => {
                const id = PLAN_IDS[i] ?? PLAN_IDS[0]!;
                const featured = id === "pro";
                return (
                  <article
                    key={plan.name}
                    className={
                      featured
                        ? "flex flex-col rounded-sm border border-accent bg-primary p-8 text-primary-foreground shadow-2xl shadow-accent/25"
                        : "flex flex-col rounded-sm border border-accent/40 bg-primary p-8 text-primary-foreground"
                    }
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={
                          featured
                            ? "eyebrow rounded-sm bg-accent px-3 py-1 text-accent-foreground"
                            : "eyebrow text-accent"
                        }
                      >
                        {plan.name}
                      </span>
                      <ArchIcon className="h-6 w-6 shrink-0 text-accent" />
                    </div>

                    <p className="mt-6 font-display text-3xl font-bold">{plan.price}</p>

                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm leading-relaxed text-primary-foreground/85"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 rounded-sm border border-primary-foreground/15 bg-primary-foreground/5 p-5">
                      <p className="eyebrow text-accent">{plan.extrasTitle}</p>
                      <ul className="mt-3 space-y-2">
                        {plan.extras.map((extra) => (
                          <li
                            key={extra}
                            className="flex items-start gap-3 text-sm text-primary-foreground/75"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span>{extra}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto flex justify-center pt-8">
                      <Link
                        to="/"
                        search={{ plan: id }}
                        hash="contact"
                        className={featured ? "btn-gold w-full" : "btn-outline-gold w-full"}
                      >
                        {plan.cta}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Terms */}
            <ul className="mt-10 space-y-3 border-t border-border pt-8">
              {t.packages.notes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
