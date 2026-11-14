import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { useLang } from "@/lib/i18n";
import { ArchIcon } from "@/components/site/Arch";
import { PLAN_IDS } from "@/lib/plans";
import { CountUp, Reveal } from "@/components/site/Motion";

/** Monthly plan cards + terms. Copy lives only in t.packages (src/lib/i18n.tsx). */
export function PlanCards() {
  const { t } = useLang();
  return (
    <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {t.packages.plans.map((plan, i) => {
                const id = PLAN_IDS[i] ?? PLAN_IDS[0]!;
                const featured = id === "pro";
                return (
                  <Reveal key={plan.name} delay={i * 120} className="h-full">
                  <article
                    className={
                      featured
                        ? "card-lift flex h-full flex-col rounded-sm border border-accent bg-primary p-8 text-primary-foreground shadow-2xl shadow-accent/25"
                        : "card-lift flex h-full flex-col rounded-sm border border-accent/40 bg-primary p-8 text-primary-foreground"
                    }
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="eyebrow rounded-sm bg-accent px-3 py-1 text-accent-foreground">
                        {plan.name}
                      </span>
                      <ArchIcon className="h-6 w-6 shrink-0 text-accent" />
                    </div>

                    <p className="mt-6 font-display text-3xl font-bold"><CountUp text={plan.price} /></p>

                    {/* flex-1 keeps the extras block and the button at the same
                        height in both cards, whatever the feature count. */}
                    <ul className="mt-6 flex-1 space-y-3">
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
                        className="btn-gold w-full"
                      >
                        {plan.cta}
                      </Link>
                    </div>
                  </article>
                  </Reveal>
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
    </>
  );
}
