import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Coffee, Clock, Hotel, Quote, Mail, Phone, MapPin, Ruler } from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import apartmentImg from "@/assets/tour-apartment.jpg";

import { LangProvider, useLang } from "@/lib/i18n";
import { PlanCards } from "@/components/site/PlanCards";
import { PLAN_IDS, hidesTourDetails, planLabel, type PlanId } from "@/lib/plans";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TourCard, type Tour } from "@/components/site/TourCard";
import { ArchDivider, ArchIcon, Eyebrow } from "@/components/site/Arch";

const SITE_URL = "https://domuspropertymedia.lovable.app";

type IndexSearch = { plan?: PlanId };

export const Route = createFileRoute("/")({
  component: Page,
  staticData: { sitemap: true },
  validateSearch: (search: Record<string, unknown>): IndexSearch => {
    const plan = search["plan"];
    return plan === "partner" || plan === "pro" ? { plan } : {};
  },

  head: () => ({
    meta: [
      { title: "Domus Property Media — 360° Virtual Tours in Budapest" },
      {
        name: "description",
        content:
          "360° virtual tours for homes, Airbnb rentals and small businesses in Budapest. Embedded on Google Maps and your website, ready in 48 hours.",
      },
      { property: "og:title", content: "Domus Property Media — 360° Virtual Tours in Budapest" },
      {
        property: "og:description",
        content:
          "360° virtual tours for homes, Airbnb rentals and small businesses in Budapest. Ready in 48 hours.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Domus Property Media",
          description:
            "360° virtual tours for homes, Airbnb rentals and small businesses, embedded on Google Maps and your website.",
          url: `${SITE_URL}/`,
          telephone: "+36705424017",
          email: "timarbalint60@gmail.com",
          image: `${SITE_URL}/favicon.png`,
          priceRange: "19,990 HUF - 39,990 HUF",
          areaServed: "Hungary",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Budapest",
            addressCountry: "HU",
          },
        }),
      },
    ],
  }),
});

// ─── Tour cards ─────────────────────────────────────────────────────────────
// Each card links out to its Keypano tour in a new tab (Keypano blocks
// embedding, so nothing is iframed here).
// Covers below are placeholders: drop the real photos into src/assets/ and
// swap these two lines. Keep the order matched with `tours.items` in
// src/lib/i18n.tsx — first entry = first card.
const tourLinks = [
  "https://www.keypano.com/v/b6b96733c9jbn5-1790784270.html",
  "https://www.keypano.com/v/8e6pad67xae2x2-1792699797.html",
];
const tourCovers = [apartmentImg, heroImg];

function Page() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}

function Site() {
  const { t } = useLang();

  const tours: Tour[] = t.tours.items.map((item, i) => ({
    ...item,
    image: tourCovers[i] ?? tourCovers[0]!,
    url: tourLinks[i],
  }));

  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-primary pt-24 text-primary-foreground">
          <img
            src={heroImg}
            alt="Interior of a Budapest apartment captured for a 360° tour"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary" />
          <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <div className="fade-up max-w-2xl">
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              <h1 className="mt-6 text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
                {t.hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-base text-primary-foreground/75 sm:text-lg">
                {t.hero.subtitle}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#contact" className="btn-gold">
                  {t.cta}
                </a>
                <a href="#tours" className="btn-outline-gold">
                  {t.hero.secondary}
                </a>
              </div>
              <p className="mt-10 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-accent uppercase">
                <Clock className="h-4 w-4" /> {t.hero.badge}
              </p>
            </div>
          </div>
        </section>

        {/* Featured tours */}
        <section id="tours" className="section">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Eyebrow>{t.tours.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">{t.tours.title}</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">{t.tours.note}</p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {tours.map((tour) => (
                <TourCard key={tour.name} tour={tour} open={t.tours.open} />
              ))}
            </div>
          </div>
        </section>

        <ArchDivider />

        {/* Services */}
        <section id="services" className="section bg-secondary">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Eyebrow>{t.services.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">{t.services.title}</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {t.services.items.map((item, i) => (
                <article key={item.title} className="rounded-sm border border-border bg-card p-8">
                  <span className="text-accent">
                    {i === 0 ? <Building2 className="h-6 w-6" /> : i === 1 ? <Coffee className="h-6 w-6" /> : i === 2 ? <Hotel className="h-6 w-6" /> : <Ruler className="h-6 w-6" />}
                  </span>
                  <h3 className="mt-5 text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="process" className="section">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Eyebrow>{t.process.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">{t.process.title}</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {t.process.steps.map((step, i) => (
                <article key={step.title} className="rounded-sm border border-border bg-card p-8">
                  <span className="eyebrow text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-sm text-muted-foreground">{t.process.note}</p>
            <article className="mt-10 rounded-sm border border-border bg-card p-8">
              <div className="flex items-start gap-4">
                <ArchIcon className="mt-1 h-7 w-7 shrink-0 text-accent" />
                <div className="space-y-2">
                  <h3 className="text-xl">{t.process.deliverTitle}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.process.deliverBody}</p>
                </div>
              </div>
            </article>
            <article className="mt-6 rounded-sm border border-accent bg-card p-8">
              <div className="flex items-start gap-4">
                <Ruler className="mt-1 h-7 w-7 shrink-0 text-accent" />
                <div className="space-y-2">
                  <p className="eyebrow text-accent">{t.process.addonTag}</p>
                  <h3 className="text-xl">{t.process.addonTitle}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.process.addonBody}</p>
                  <p className="pt-1 text-sm font-medium text-accent">{t.process.addonPrice}</p>

                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="section">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div className="min-w-0">
                <Eyebrow>{t.pricing.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-3xl sm:text-4xl">{t.pricing.title}</h2>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground">{t.pricing.note}</p>
              </div>
              <p className="inline-flex w-fit items-center gap-2 rounded-sm border border-accent px-4 py-2 text-xs tracking-[0.2em] text-accent uppercase">
                <Clock className="h-4 w-4 shrink-0" /> {t.pricing.badge}
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {t.pricing.tiers.map((tier) => {
                return (
                  <article
                    key={tier.size}
                    className="flex flex-col rounded-sm border border-accent bg-primary p-8 text-primary-foreground"
                  >
                    <ArchIcon className="h-7 w-7 text-accent" />
                    <div className="mt-6">
                      <p className="font-display text-3xl font-bold">{tier.price}</p>
                      <p className="mt-2 text-sm text-primary-foreground/70">{tier.size}</p>
                    </div>
                    <div className="mt-auto flex justify-center pt-6">
                      <a href="#contact" className="btn-outline-gold w-full">
                        {tier.cta}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>


        {/* About */}
        <section id="packages" className="section bg-secondary">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl">{t.packages.title}</h2>
              <p className="mt-4 text-muted-foreground">{t.packages.subtitle}</p>
            </div>
            <div className="mt-12">
              <PlanCards />
            </div>
          </div>
        </section>

        <section id="about" className="section bg-primary text-primary-foreground">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <ArchIcon className="mx-auto h-9 w-9 text-accent" />
            <p className="eyebrow mt-6 text-accent">{t.about.eyebrow}</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">{t.about.title}</h2>
            <div className="mt-5 space-y-5">
              {t.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-primary-foreground/75"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="section">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Eyebrow>{t.testimonials.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">{t.testimonials.title}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {t.testimonials.items.map((item) => (
                <blockquote
                  key={item.author}
                  className="rounded-sm border border-border bg-card p-8"
                >
                  <Quote className="h-6 w-6 text-accent" />
                  <p className="mt-5 whitespace-pre-line text-base leading-relaxed">{item.quote}</p>
                  <footer className="eyebrow mt-6 text-muted-foreground">{item.author}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function ContactSection() {
  const { t } = useLang();
  const { plan } = Route.useSearch();
  const hasPlan = hidesTourDetails(plan);
  const [sent, setSent] = useState(false);

  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "0", size: "0", squaremeter: "", city: "", floorplan: "0", message: "" });

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const updateSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    setForm((prev) => ({ ...prev, size, squaremeter: size === "3" ? prev.squaremeter : "" }));
  };

  const updateSquaremeter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setForm((prev) => ({ ...prev, squaremeter: value }));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    setSubmitting(true);
    try {
      const selectedType = t.contact.typeOptions[Number(form.type)] ?? t.contact.typeOptions[0];
      const selectedSize = t.contact.sizeOptions[Number(form.size)] ?? t.contact.sizeOptions[0];
      const selectedFloorplan = t.contact.floorplanOptions[Number(form.floorplan)] ?? t.contact.floorplanOptions[0];

      if (!hasPlan && form.size === "3" && (!/^\d+$/.test(form.squaremeter) || Number(form.squaremeter) < 206)) {
        setError(true);
        return;
      }
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "6c4c39e7-b049-4a1c-b614-4b57e8aa4432",
          name: form.name,
          phone: form.phone,
          ...(form.email ? { email: form.email } : {}),
          type: selectedType,
          ...(hasPlan ? {} : { size: selectedSize }),
          ...(hasPlan || form.size !== "3" ? {} : { squaremeter: form.squaremeter }),
          city: form.city,
          ...(hasPlan ? {} : { floorplan: selectedFloorplan }),
          ...(plan ? { plan: planLabel(t, plan) } : {}),


          message: form.message,
          subject: "New inquiry from domustours.com",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div className="min-w-0">
          <Eyebrow>{t.contact.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl">{t.contact.title}</h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">{t.contact.body}</p>
          <div className="mt-8 space-y-3 text-sm">
            <a href="mailto:timarbalint60@gmail.com" className="flex items-center gap-3 hover:text-accent">
              <Mail className="h-4 w-4 shrink-0 text-accent" /> timarbalint60@gmail.com
            </a>
            <a href="tel:+36705424017" className="flex items-center gap-3 hover:text-accent">
              <Phone className="h-4 w-4 shrink-0 text-accent" /> +36 70 542 4017
            </a>
            <p className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-accent" /> Budapest, Hungary
            </p>
          </div>
        </div>

        <form className="rounded-sm border border-border bg-card p-6 sm:p-8" onSubmit={handleSubmit}>
          <div className="grid gap-5">
            {plan && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-accent/40 bg-accent/5 px-4 py-3">
                <p className="text-sm">
                  <span className="eyebrow block text-muted-foreground">{t.contact.planLabel}</span>
                  <span className="font-medium text-accent">{planLabel(t, plan)}</span>
                </p>
                <span className="flex shrink-0 gap-4 text-xs text-muted-foreground">
                  <a href="#packages" className="hover:text-accent">
                    {t.contact.planChange}
                  </a>
                  <Link to="/" className="hover:text-accent">
                    {t.contact.planRemove}
                  </Link>
                </span>
              </div>
            )}

            <label className="grid gap-2">
              <span className="eyebrow text-muted-foreground">{t.contact.name}</span>
              <input
                required
                value={form.name}
                onChange={update("name")}
                className="rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid min-w-0 gap-2">
                <span className="eyebrow text-muted-foreground">{t.contact.phone}</span>
                <input
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="[+0-9()\-\s/.]{6,}"
                  value={form.phone}
                  onChange={update("phone")}
                  className="min-w-0 rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                />
              </label>
              <label className="grid min-w-0 gap-2">
                <span className="eyebrow text-muted-foreground">{t.contact.email}</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                  className="min-w-0 rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                />
              </label>
            </div>
            <label className="grid gap-2">
              <span className="eyebrow text-muted-foreground">{t.contact.type}</span>
              <select
                value={form.type}
                onChange={update("type")}
                required
                className="rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              >
                {t.contact.typeOptions.map((o, i) => (
                  <option key={o} value={String(i)}>{o}</option>
                ))}
              </select>
            </label>
            <div className={hasPlan ? "grid gap-5" : "grid gap-5 sm:grid-cols-2"}>
              {!hasPlan && (
                <label className="grid min-w-0 gap-2">
                  <span className="eyebrow text-muted-foreground">{t.contact.size}</span>
                  <select
                    required
                    value={form.size}
                    onChange={updateSize}
                    className="rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                  >
                    {t.contact.sizeOptions.map((o, i) => (
                      <option key={o} value={String(i)}>{o}</option>
                    ))}
                  </select>
                </label>
              )}
              <label className="grid min-w-0 gap-2">
                <span className="eyebrow text-muted-foreground">{t.contact.city}</span>
                <input
                  value={form.city}
                  onChange={update("city")}
                  className="min-w-0 rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                />
              </label>
            </div>
            {!hasPlan && form.size === "3" && (
              <label className="grid gap-2">
                <span className="eyebrow text-muted-foreground">{t.contact.squaremeter}</span>
                <input
                  type="number"
                  min={206}
                  step={1}
                  inputMode="numeric"
                  required
                  value={form.squaremeter}
                  onChange={updateSquaremeter}
                  onKeyDown={(e) => {
                    if ([".", ",", "e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                  }}
                  onPaste={(e) => {
                    if (!/^\d+$/.test(e.clipboardData.getData("text"))) e.preventDefault();
                  }}
                  className="rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                />
              </label>
            )}
            {!hasPlan && (
              <>
                <label className="grid gap-2">
                  <span className="eyebrow text-muted-foreground">{t.contact.floorplan}</span>
                  <select
                    required
                    value={form.floorplan}
                    onChange={update("floorplan")}
                    className="rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                  >
                    {t.contact.floorplanOptions.map((o, i) => (
                      <option key={o} value={String(i)}>{o}</option>
                    ))}
                  </select>
                </label>
                {form.floorplan === "1" && (
                  <p className="rounded-sm border border-accent/40 bg-accent/5 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                    {t.contact.floorplanNote}
                  </p>
                )}
              </>
            )}
            <label className="grid gap-2">
              <span className="eyebrow text-muted-foreground">{t.contact.message}</span>

              <textarea
                rows={4}
                value={form.message}
                onChange={update("message")}
                className="rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </label>
            <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? "..." : t.contact.submit}
            </button>
            {sent && <p className="text-sm text-accent">{t.contact.sent}</p>}
            {error && <p className="text-sm text-destructive">Something went wrong, please email us directly.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
