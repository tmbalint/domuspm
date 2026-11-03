import type { Dict } from "@/lib/i18n";

/**
 * Subscription plans shown on the "Havi csomagok" page.
 * The order here must match `t.packages.plans` in src/lib/i18n.tsx,
 * because the plan id travels through the booking form's `plan`
 * query parameter by index.
 */
export const PLAN_IDS = ["partner", "pro"] as const;

export type PlanId = (typeof PLAN_IDS)[number];

/** Human-readable plan name + price, used in the booking form and its e-mail payload. */
export function planLabel(t: Dict, id: PlanId): string {
  const plan = t.packages.plans[PLAN_IDS.indexOf(id)];
  return plan ? `${plan.name} · ${plan.price}` : id;
}
