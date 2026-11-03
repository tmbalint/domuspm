import { expect, test } from "bun:test";

import { en, hu } from "./i18n";

// Pricing rules stated by the owner: 19,990 up to 70 m², 29,990 up to 140 m²,
// 39,990 up to 205 m², custom quote above 205 m².
const PRICES = ["19 990 Ft", "29 990 Ft", "39 990 Ft", "Egyedi ár"];
const SIZES = ["70 m²-ig", "140 m²-ig", "205 m²-ig", "205 m² felett"];

test("four pricing tiers with the agreed prices and size limits", () => {
  expect(hu.pricing.tiers.map((t) => t.price)).toEqual(PRICES);
  expect(hu.pricing.tiers.map((t) => t.size)).toEqual(SIZES);
});

test("English tiers mirror the Hungarian ones one to one", () => {
  expect(en.pricing.tiers.length).toBe(hu.pricing.tiers.length);
  en.pricing.tiers.forEach((tier, i) => {
    expect(tier.cta).toBe(hu.pricing.tiers[i]!.cta === "Kérj egyedi ajánlatot" ? "Contact us" : "Book Your Tour");
    expect(tier.size).toContain(SIZES[i]!.replace(" m²-ig", "").replace(" m² felett", ""));
  });
  expect(en.pricing.tiers.map((t) => t.price)).toEqual(["19,990 HUF", "29,990 HUF", "39,990 HUF", "Custom quote"]);
});

test("booking form size options match the pricing bands, with the last one requiring an exact m²", () => {
  expect(hu.contact.sizeOptions).toEqual(SIZES);
  expect(en.contact.sizeOptions.length).toBe(SIZES.length);
  // The "above" band is the last option: only it reveals the m² field.
  expect(hu.contact.sizeOptions.at(-1)).toBe("205 m² felett");
  expect(hu.contact.sizeOptions.slice(0, 3).every((o) => o.endsWith("m²-ig"))).toBe(true);
});
