import { expect, test } from "bun:test";

import { en, hu } from "./src/lib/i18n";
import { PLAN_IDS, hidesTourDetails } from "./src/lib/plans";

// Monthly packages: Partner 69 990 Ft/month (4 properties up to 140 m²),
// Pro 149 990 Ft/month (8 properties up to 205 m²); extra properties 16 990 / 25 490 / 33 990 Ft,
// plus a surcharge per started 100 m² above 205 m².
const n = (x: string) => x.replace(/\u00a0/g, " ");
test("two monthly plans with the agreed prices and property counts", () => {
  expect(hu.packages.plans.map((p) => p.name)).toEqual(["Partner", "Pro"]);
  expect(hu.packages.plans.map((p) => n(p.price))).toEqual(["69 990 Ft / hónap", "149 990 Ft / hónap"]);
  expect(hu.packages.plans[0]!.features[0]!.replace(/\u00a0/g, " ")).toBe("Havonta 4 ingatlan, egyenként 140 m²-ig");
  expect(hu.packages.plans[1]!.features[0]!.replace(/\u00a0/g, " ")).toBe("Havonta 8 ingatlan, egyenként 205 m²-ig");
  expect(hu.packages.plans[1]!.features).toContain("24 órás átfutás");
  expect(hu.packages.plans[0]!.features).toContain("48 órás átfutás");
});

test("extra-property rates are identical in both plans", () => {
  const extras = [
    "70 m²-ig: 16 990 Ft",
    "140 m²-ig: 25 490 Ft",
    "205 m²-ig: 33 990 Ft",
    "205 m² felett: 33 990 Ft + 12 490 Ft / megkezdett 100 m²",
  ];
  expect(hu.packages.plans[0]!.extras.map(n)).toEqual(extras);
  expect(hu.packages.plans[1]!.extras.map(n)).toEqual(extras);
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
  expect(en.packages.plans.map((p) => n(p.price))).toEqual(["69 990 Ft / month", "149 990 Ft / month"]);
});

test("a chosen monthly plan hides the size and floor plan questions", () => {
  expect(hidesTourDetails(undefined)).toBe(false);
  expect(hidesTourDetails("partner")).toBe(true);
  expect(hidesTourDetails("pro")).toBe(true);
});

test("both languages carry the five terms under the cards", () => {
  expect(hu.packages.notes.length).toBe(5);
  expect(en.packages.notes.length).toBe(hu.packages.notes.length);
  expect(hu.packages.notes.some((n) => n.includes("bárkor lemondható") || n.includes("bármikor lemondható"))).toBe(true);
});
