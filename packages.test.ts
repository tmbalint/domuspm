import { expect, test } from "bun:test";

import { en, hu } from "./src/lib/i18n";
import { PLAN_IDS, hidesTourDetails } from "./src/lib/plans";

// Monthly packages stated by the owner: Partner 69,990 Ft/month (4 properties),
// Pro 129,990 Ft/month (8 properties); extra properties 15,990 / 23,990 / 31,990 Ft.
test("two monthly plans with the agreed prices and property counts", () => {
  expect(hu.packages.plans.map((p) => p.name)).toEqual(["Partner", "Pro"]);
  expect(hu.packages.plans.map((p) => p.price)).toEqual(["69 990 Ft / hónap", "129 990 Ft / hónap"]);
  expect(hu.packages.plans[0]!.features[0]).toBe("4 ingatlan havonta");
  expect(hu.packages.plans[1]!.features[0]).toBe("8 ingatlan havonta");
  expect(hu.packages.plans[1]!.features).toContain("24 órás átfutás");
  expect(hu.packages.plans[0]!.features).toContain("48 órás átfutás");
});

test("extra-property rates are identical in both plans", () => {
  const extras = ["70 m²-ig: 15 990 Ft", "140 m²-ig: 23 990 Ft", "205 m²-ig: 31 990 Ft"];
  expect(hu.packages.plans[0]!.extras).toEqual(extras);
  expect(hu.packages.plans[1]!.extras).toEqual(extras);
  expect(hu.packages.plans[0]!.extrasTitle).toContain("4 felett");
  expect(hu.packages.plans[1]!.extrasTitle).toContain("8 felett");
});

test("plan ids travel through the form in the same order as the plan cards", () => {
  expect(PLAN_IDS).toEqual(["partner", "pro"]);
  expect(PLAN_IDS.length).toBe(hu.packages.plans.length);
});

test("English packages mirror the Hungarian ones one to one", () => {
  expect(en.packages.plans.length).toBe(hu.packages.plans.length);
  en.packages.plans.forEach((plan, i) => {
    expect(plan.name).toBe(hu.packages.plans[i]!.name);
    expect(plan.features.length).toBe(hu.packages.plans[i]!.features.length);
    expect(plan.extras.length).toBe(hu.packages.plans[i]!.extras.length);
  });
  expect(en.packages.plans.map((p) => p.price)).toEqual(["69,990 HUF / month", "129,990 HUF / month"]);
});

test("a chosen monthly plan hides the size and floor plan questions", () => {
  expect(hidesTourDetails(undefined)).toBe(false);
  expect(hidesTourDetails("partner")).toBe(true);
  expect(hidesTourDetails("pro")).toBe(true);
});

test("both languages carry the four terms under the cards", () => {
  expect(hu.packages.notes.length).toBe(4);
  expect(en.packages.notes.length).toBe(hu.packages.notes.length);
  expect(hu.packages.notes.some((n) => n.includes("bárkor lemondható") || n.includes("bármikor lemondható"))).toBe(true);
});
