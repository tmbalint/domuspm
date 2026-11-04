import { createFileRoute } from "@tanstack/react-router";

import { LangProvider, useLang } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArchIcon } from "@/components/site/Arch";
import { PlanCards } from "@/components/site/PlanCards";

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
            <PlanCards />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
