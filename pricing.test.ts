import { expect, test } from "bun:test";

import { en, hu } from "./src/lib/i18n";

// Strings use non-breaking spaces; compare with normal ones.
const n = (x: string) => x.replace(/\u00a0/g, " ");

// Single-tour pricing: 19 990 up to 70 m², 29 990 up to 140 m², 39 990 up to 205 m²,
// above 205 m²: 39 990 + 14 990 per started 100 m².
const PRICES = ["19 990 Ft", "29 990 Ft", "39 990 Ft", "39 990 Ft + 14 990 Ft / megkezdett 100 m²"];
const SIZES = ["70 m²-ig", "140 m²-ig", "205 m²-ig", "205 m² felett"];

test("four pricing tiers with the agreed prices and size limits", () => {
  expect(hu.pricing.tiers.map((t) => n(t.price))).toEqual(PRICES);
  expect(hu.pricing.tiers.map((t) => n(t.size))).toEqual(SIZES);
  expect(hu.pricing.tiers.every((t) => t.cta === "Foglaljon túrát")).toBe(true);
});

test("English tiers mirror the Hungarian ones one to one", () => {
  expect(en.pricing.tiers.length).toBe(hu.pricing.tiers.length);
  expect(en.pricing.tiers.every((t) => t.cta === "Book a tour")).toBe(true);
  expect(en.pricing.tiers.map((t) => n(t.price))).toEqual([
    "19 990 Ft",
    "29 990 Ft",
    "39 990 Ft",
    "39 990 Ft + 14 990 Ft per started 100 m²",
  ]);
});

test("booking form size options match the pricing bands, with the last one requiring an exact m²", () => {
  expect(hu.contact.sizeOptions.map(n)).toEqual(SIZES);
  expect(en.contact.sizeOptions.length).toBe(SIZES.length);
  expect(n(hu.contact.sizeOptions.at(-1)!)).toBe("205 m² felett");
  expect(hu.contact.sizeOptions.slice(0, 3).every((o) => o.endsWith("m²-ig"))).toBe(true);
});

test("floor plan add-on costs 9 990 Ft and is offered in the booking form", () => {
  expect(n(hu.process.addonPrice)).toBe("Ára: 9 990 Ft");
  expect(n(en.process.addonPrice)).toBe("Price: 9 990 Ft");
  expect(hu.contact.floorplanOptions).toEqual(["Nem kérek", "Igen, kérek"]);
  expect(en.contact.floorplanOptions).toEqual(["No, thank you", "Yes, please"]);
  expect(n(hu.contact.floorplanNote)).toContain("9 990 Ft");
  expect(n(en.contact.floorplanNote)).toContain("9 990 Ft");
});
