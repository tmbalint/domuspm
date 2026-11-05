import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "hu" | "en";

export type Dict = typeof hu;

export const hu = {
  nav: {
    tours: "Bemutató túrák",
    services: "Szolgáltatások",
    pricing: "Árak",
    packages: "Havi csomagok",
    about: "Rólunk",

    testimonials: "Vélemények",
    contact: "Kapcsolat",
  },
  cta: "Foglalj túrát",
  hero: {
    eyebrow: "Budapest, Hungary · 360° virtuális túrák",
    title: "360° virtuális túrák otthonokhoz és üzletekhez",
    subtitle:
      "Mutasd meg a teret, mielőtt bárki belépne. Google Maps-re és saját weboldalra is beágyazható.",
    secondary: "Túrák megtekintése",
    badge: "48 órás átfutás",
  },
  tours: {
    eyebrow: "Kiemelt túrák",
    title: "Nézz körbe",
    note: "A túrák új lapon nyílnak meg.",
    open: "Túra megtekintése",
    items: [
      { name: "Külvárosi lakás", type: "53 m²" },
      { name: "Kertvárosi családi ház", type: "120+ m²" },
    ],
  },
  services: {
    eyebrow: "Szolgáltatások",
    title: "Egy minőség minden területen",
    items: [
      {
        title: "Ingatlan és Airbnb",
        body: "Gyorsabb foglalás, kevesebb kérdés, nagyobb bizalom. A vendég előre látja a teret, így magabiztosabban foglal.",
      },
      {
        title: "Kávézók és üzletek",
        body: "Jelenj meg a Google Maps-en belső túrával. A vendég belép, mielőtt betérne — ez láthatóságot és forgalmat hoz.",
      },
      {
        title: "Szállodák és lounge-ok",
        body: "Mutasd meg a szobákat és a közösségi tereket, hogy a vendég már foglalás előtt körbenézhessen.",
      },
      {
        title: "Alaprajz",
        body: "Kiegészítő szolgáltatás: tájékoztató jellegű alaprajz a túrához.",
      },
    ],
  },
  pricing: {
    eyebrow: "Árak",
    title: "Árazás",
    note: "Az árak tartalmazzák a helyszíni fotózást, a túra összeállítását és a beágyazást. 205 m² felett egyedi árat adunk.",
    badge: "48 órás átfutás",
    tiers: [
      { price: "19 990 Ft", size: "70 m²-ig", cta: "Foglalj túrát" },
      { price: "29 990 Ft", size: "140 m²-ig", cta: "Foglalj túrát" },
      { price: "39 990 Ft", size: "205 m²-ig", cta: "Foglalj túrát" },
      { price: "Egyedi ár", size: "205 m² felett", cta: "Kérj egyedi ajánlatot" },
    ],
  },
  process: {
    eyebrow: "Hogyan működik",
    title: "Egyszerű folyamat",
    steps: [
      { title: "Érkezés és tervezés", body: "Megérkezünk az ingatlanhoz, és végigjárva eldöntjük, hol készüljenek a panorámák." },
      { title: "Fotózás", body: "Elkészítjük a 360°-os panorámákat. 60 m²-ig nagyjából 1 óra, 120 m²-ig nagyjából 2 óra." },
      { title: "Utómunka", body: "Távozás után, maximum 48 órán belül készen is van a virtuális séta." },
    ],
    note: "Egyedi méretű vagy típusú ingatlan esetén az ingatlan és az igényeid megismerése után becsüljük meg az időt.",
    deliverTitle: "Amit kapsz",
    deliverBody: "Egy 360°-os virtuális túra az ingatlanodról, amelyet linkkel és QR-kóddal bárkinek megoszthatsz.",
    addonTag: "Kiegészítő",
    addonTitle: "Alaprajz",
    addonBody: "Kiegészítőként alaprajzot is készítünk. Az alaprajz tájékoztató jellegű, nem hivatalos felmérés.",
    addonPrice: "9 990 Ft",

  },
  packages: {
    title: "Havi csomagok",
    subtitle: "Rendszeres megbízásokhoz, kedvezőbb áron. Havi számlázással, kötöttségek nélkül.",
    plans: [
      {
        name: "Partner",
        price: "69 990 Ft / hónap",
        features: [
          "4 ingatlan havonta",
          "140 m²-ig az árban benne van",
          "140-205 m² között +7 990 Ft / ingatlan",
          "48 órás átfutás",
        ],
        extrasTitle: "Minden további ingatlan (4 felett):",
        extras: ["70 m²-ig: 16 990 Ft", "140 m²-ig: 25 490 Ft", "205 m²-ig: 33 990 Ft"],
        cta: "Árajánlatot kérek",
      },
      {
        name: "Pro",
        price: "129 990 Ft / hónap",
        features: [
          "8 ingatlan havonta",
          "140 m²-ig az árban benne van",
          "140-205 m² között +7 990 Ft / ingatlan",
          "24 órás átfutás",
          "Elsőbbségi időpontfoglalás",
          "Saját logó a túrán és az alaprajzon, külön díj nélkül",
        ],
        extrasTitle: "Minden további ingatlan (8 felett):",
        extras: ["70 m²-ig: 16 990 Ft", "140 m²-ig: 25 490 Ft", "205 m²-ig: 33 990 Ft"],
        cta: "Árajánlatot kérek",
      },
    ],
    notes: [
      "205 m² felett egyedi árajánlat, előfizetőknek kedvezménnyel.",
      "A fel nem használt alkalmak nem vihetők át a következő hónapra.",
      "Havi számlázás, bármikor lemondható.",
      "A kiszállás a fő működési területen belül (Budapest és környéke, Mosonmagyaróvár-Győr térség) az árban benne van.",
    ],
  },
  about: {
    eyebrow: "Rólunk",

    title: "Mi vagyunk a Domus Property Media.",
    paragraphs: [
      "Egy ingatlan hirdetéséhez ma már nem elég néhány fotó és egy leírás. A vevők százával görgetik a hirdetéseket, és másodpercek alatt döntenek. Látni akarják a teret, átérezni az elrendezést, és bízni akarnak abban, amit látnak, még mielőtt felhívnák a hirdetőt.",
      "Mi ezt a bizonytalanságot segítünk kiküszöbölni. 360°-os virtuális túráinkkal bárki végigsétálhat az ingatlanon telefonról vagy laptopról: minden szoba, valódi arányok, pontosan úgy, ahogy van. A tulajdonosok és az ügynökök kiemelkedő, profi hatású hirdetést kapnak, amely már az első kattintásnál bizalmat épít. A vevők teljes képet kapnak, az is, aki külföldön vagy az ország másik felén él, és nem tud könnyen eljönni. Így kevesebb a felesleges megtekintés, tájékozottabbak az érdeklődők, és gyorsabb a döntés.",
      "Országszerte dolgozunk. A folyamat egyszerű: kimegyünk, felvételt készítünk, és 48 órán belül elkészül a túra. Az eredmény magáért beszél.",
      "Minden tér, pontosan úgy, ahogy van, a legjobb formájában. Ez a Domus.",
    ],
  },
  testimonials: {
    eyebrow: "Vélemények",
    title: "Ügyfeleink",
    items: [
      {
        quote: `„Elégedettek vagyunk a munkájukkal, profi és igényes munkát végeztek. A szervezés során is rugalmasak és segítőkészek voltak, a virtuális séta pedig hibátlanul működik és mutatja be az ingatlant. Segítségével a hirdetés is kitűnik a többi közül.
Ha profi VR-sétát szeretnél az ingatlanodról, bátran ajánlom őket!”`,
        author: "Borbély Róbert, Komplex Ingatlaniroda",
      },
    ],
  },
  contact: {
    eyebrow: "Kapcsolat",
    title: "Foglalj túrát",
    body: "Add meg a telefonszámod, a méretet és a helyszínt, és egy munkanapon belül hívunk.",
    name: "Név",
    email: "E-mail (nem kötelező)",
    phone: "Telefonszám",
    type: "Ingatlan / üzlet típusa",
    typeOptions: ["Airbnb / rövid távú bérlés", "Eladó vagy kiadó ingatlan", "Kávézó / étterem", "Üzlet / iroda", "Szálloda / lounge", "Egyéb"],
    size: "Méret",
    sizeOptions: ["70 m²-ig", "140 m²-ig", "205 m²-ig", "205 m² felett"],
    squaremeter: "Négyzetméter (m²)",
    city: "Város",
    floorplan: "Kérnek alaprajzot?",
    floorplanOptions: ["Nem kérek", "Igen, kérek"],
    floorplanNote: "Az alaprajz nem része a túra árnak: külön 9 990 Ft.",
    planLabel: "Kiválasztott csomag",
    planChange: "Csomag váltása",
    planRemove: "Eltávolítás",



    message: "Üzenet",
    submit: "Küldés",
    sent: "Köszönjük, hamarosan válaszolunk.",
  },
  footer: {
    tagline: "360° virtuális túrák országszerte.",
    rights: "Minden jog fenntartva.",
  },
};

export const en: Dict = {
  nav: {
    tours: "Featured tours",
    services: "Services",
    pricing: "Pricing",
    packages: "Monthly packages",
    about: "About",

    testimonials: "Testimonials",
    contact: "Contact",
  },
  cta: "Book Your Tour",
  hero: {
    eyebrow: "Budapest, Hungary · 360° virtual tours",
    title: "360° Virtual Tours for Homes & Businesses",
    subtitle:
      "See it before you book it. Embedded on Google Maps and on your own website.",
    secondary: "View tours",
    badge: "48-hour turnaround",
  },
  tours: {
    eyebrow: "Featured tours",
    title: "Step inside",
    note: "Tours open in a new tab.",
    open: "View tour",
    items: [
      { name: "Suburban apartment", type: "53 m²" },
      { name: "Garden-suburb family house", type: "120+ m²" },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "One standard across every track",
    items: [
      {
        title: "Real estate & Airbnb",
        body: "Faster bookings, fewer questions, higher trust. Guests see the space in full before they commit.",
      },
      {
        title: "Cafés & small businesses",
        body: "Appear on Google Maps with an interior tour. People walk in before they walk in — and you get found.",
      },
      {
        title: "Hotels & lounges",
        body: "Showcase rooms and shared spaces so guests can look around before they book.",
      },
      {
        title: "Floor plan",
        body: "Add-on service: an indicative floor plan to go with your tour.",
      },
    ],
  },
  pricing: {
    eyebrow: "Rates",
    title: "Pricing",
    note: "Includes the on-site shoot, tour production and embedding. Above 205 m² we price on request.",
    badge: "48-hour turnaround",
    tiers: [
      { price: "19,990 HUF", size: "up to 70 m²", cta: "Book Your Tour" },
      { price: "29,990 HUF", size: "up to 140 m²", cta: "Book Your Tour" },
      { price: "39,990 HUF", size: "up to 205 m²", cta: "Book Your Tour" },
      { price: "Custom quote", size: "above 205 m²", cta: "Contact us" },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "A simple process",
    steps: [
      { title: "Arrive and plan", body: "We arrive at the property, walk through it and decide where each panorama will be shot." },
      { title: "Shoot", body: "We capture the 360° panoramas. Up to 60 m² takes about 1 hour, up to 120 m² about 2 hours." },
      { title: "We leave, you wait", body: "We pack up and take care of the rest. Your finished tour is ready within 48 hours." },
    ],
    note: "For properties with an unusual size or type, we estimate the time once we know the property and your requirements.",
    deliverTitle: "What you get",
    deliverBody: "A 360° virtual tour of your property that you can share with anyone via a link and a QR code.",
    addonTag: "Add-on",
    addonTitle: "Floor plan",
    addonBody: "Optional add-on: we can also produce a floor plan. The plan is indicative, not an official survey.",
    addonPrice: "9,990 HUF",

  },
  packages: {
    title: "Monthly packages",
    subtitle: "For regular work, at a better rate. Billed monthly, cancel anytime.",
    plans: [
      {
        name: "Partner",
        price: "69,990 HUF / month",
        features: [
          "4 properties a month",
          "Included up to 140 m²",
          "140-205 m²: +7,990 HUF per property",
          "48-hour turnaround",
        ],
        extrasTitle: "Every extra property (beyond 4):",
        extras: ["up to 70 m²: 16,990 HUF", "up to 140 m²: 25,490 HUF", "up to 205 m²: 33,990 HUF"],
        cta: "Request a quote",
      },
      {
        name: "Pro",
        price: "129,990 HUF / month",
        features: [
          "8 properties a month",
          "Included up to 140 m²",
          "140-205 m²: +7,990 HUF per property",
          "24-hour turnaround",
          "Priority booking",
          "Your own logo on the tour and the floor plan, at no extra charge",
        ],
        extrasTitle: "Every extra property (beyond 8):",
        extras: ["up to 70 m²: 16,990 HUF", "up to 140 m²: 25,490 HUF", "up to 205 m²: 33,990 HUF"],
        cta: "Request a quote",
      },
    ],
    notes: [
      "Above 205 m² we quote individually, with a discount for subscribers.",
      "Unused properties do not carry over to the next month.",
      "Billed monthly, cancel anytime.",
      "Travel inside our main area (Budapest and surroundings, Mosonmagyaróvár-Győr region) is included.",
    ],
  },
  about: {
    eyebrow: "About",

    title: "We're Domus Property Media.",
    paragraphs: [
      "Advertising a property today takes more than a few photos and a description. Buyers scroll past hundreds of listings and decide in seconds. They want to see the space, feel the layout and trust what they're looking at before they pick up the phone.",
      "That's what we deliver. Our 360° virtual tours let anyone walk through a property from their phone or laptop: every room, real proportions, exactly as it is. Owners and agents get a listing that stands out, looks professional and earns trust from the first click. Buyers get the full picture, including those who live abroad or across the country and can't easily visit. Fewer wasted viewings, better-informed inquiries, and a faster path to a decision.",
      "We work nationwide. The process is simple: we come, we shoot, and within 48 hours your tour is live. The result is premium.",
      "Your property, exactly as it is, at its best. That's Domus.",
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Client words",
    items: [
      {
        quote: `“We are satisfied with their work; they did a professional and high-quality job. They were also flexible and helpful during the organization, and the virtual tour works flawlessly and presents the property well. With its help, the listing also stands out from the others.
If you want a professional VR tour of your property, I warmly recommend them!”`,
        author: "Borbély Róbert, Komplex Ingatlaniroda",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Book Your Tour",
    body: "Give us your phone number, size and location. We'll call you back within one business day.",
    name: "Name",
    email: "Email (optional)",
    phone: "Phone number",
    type: "Property / business type",
    typeOptions: ["Airbnb / short-term rental", "Property for sale or rent", "Café / restaurant", "Shop / office", "Hotel / lounge", "Other"],
    size: "Size",
    sizeOptions: ["up to 70 m²", "up to 140 m²", "up to 205 m²", "above 205 m²"],
    squaremeter: "Square meters (m²)",
    city: "City",
    floorplan: "Need a floor plan?",
    floorplanOptions: ["No, thanks", "Yes, please"],
    floorplanNote: "The floor plan isn't included in the tour price: it's an extra 9,990 HUF.",
    planLabel: "Selected plan",
    planChange: "Change plan",
    planRemove: "Remove",



    message: "Message",
    submit: "Send",
    sent: "Thank you — we'll be in touch shortly.",
  },
  footer: {
    tagline: "360° virtual tours nationwide.",
    rights: "All rights reserved.",
  },
};

const dicts = { hu, en };

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "hu",
  setLang: () => {},
  t: hu,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("hu");

  useEffect(() => {
    const stored = localStorage.getItem("domus-lang");
    if (stored === "en" || stored === "hu") setLang(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("domus-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
