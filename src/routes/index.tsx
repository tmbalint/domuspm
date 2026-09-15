import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Coffee, Clock, Quote, Mail, Phone, MapPin } from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import cafeImg from "@/assets/tour-cafe.jpg";
import apartmentImg from "@/assets/tour-apartment.jpg";
import shopImg from "@/assets/tour-shop.jpg";

import { LangProvider, useLang } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TourCard, type Tour } from "@/components/site/TourCard";
import { ArchDivider, ArchIcon, Eyebrow } from "@/components/site/Arch";

export const Route = createFileRoute("/")({
  component: Page,
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
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

// Swap `image` for `embedUrl` once real 360° tour links are available.
const tourImages = [apartmentImg, cafeImg, shopImg];

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
    image: tourImages[i] ?? tourImages[0]!,
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
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tours.slice(0, 3).map((tour) => (
                <TourCard
                  key={tour.name}
                  tour={tour}
                  label={t.tours.placeholder}
                  open={t.tours.open}
                />
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
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {t.services.items.map((item, i) => (
                <article key={item.title} className="rounded-sm border border-border bg-card p-8">
                  <span className="text-accent">
                    {i === 0 ? <Building2 className="h-6 w-6" /> : <Coffee className="h-6 w-6" />}
                  </span>
                  <h3 className="mt-5 text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </article>
              ))}
            </div>
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

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {t.pricing.tiers.map((tier) => {
                const featured = "featured" in tier && tier.featured;
                return (
                  <article
                    key={tier.size}
                    className={`flex flex-col rounded-sm border p-8 ${
                      featured
                        ? "border-accent bg-primary text-primary-foreground"
                        : "border-border bg-card"
                    }`}
                  >
                    <ArchIcon className="h-7 w-7 text-accent" />
                    <p className="mt-6 font-display text-3xl font-bold">{tier.price}</p>
                    <p
                      className={`mt-2 text-sm ${
                        featured ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {tier.size}
                    </p>
                    <a href="#contact" className="btn-outline-gold mt-8 w-full">
                      {tier.cta}
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="section bg-secondary">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Eyebrow>{t.portfolio.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">{t.portfolio.title}</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">{t.portfolio.note}</p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <TourCard
                  key={`p-${tour.name}`}
                  tour={tour}
                  label={t.tours.placeholder}
                  open={t.tours.open}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="section bg-primary text-primary-foreground">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <ArchIcon className="mx-auto h-9 w-9 text-accent" />
            <p className="eyebrow mt-6 text-accent">{t.about.eyebrow}</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">{t.about.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/75">
              {t.about.body}
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section">
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
                  <p className="mt-5 text-base leading-relaxed">{item.quote}</p>
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
  const [sent, setSent] = useState(false);

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

        <form
          className="rounded-sm border border-border bg-card p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="eyebrow text-muted-foreground">{t.contact.name}</span>
              <input
                required
                className="rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </label>
            <label className="grid gap-2">
              <span className="eyebrow text-muted-foreground">{t.contact.email}</span>
              <input
                type="email"
                required
                className="rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </label>
            <label className="grid gap-2">
              <span className="eyebrow text-muted-foreground">{t.contact.type}</span>
              <select className="rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent">
                {t.contact.typeOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="eyebrow text-muted-foreground">{t.contact.message}</span>
              <textarea
                rows={4}
                className="rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </label>
            <button type="submit" className="btn-gold w-full">
              {t.contact.submit}
            </button>
            {sent && <p className="text-sm text-accent">{t.contact.sent}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
