import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "hu" | "en";

type Dict = typeof hu;

export const hu = {
  nav: {
    tours: "Bemutató túrák",
    services: "Szolgáltatások",
    pricing: "Árak",
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
    note: "Az árak tartalmazzák a helyszíni fotózást, a túra összeállítását és a beágyazást. Nagyobb szállodaterület esetén egyedi árat adunk.",
    badge: "48 órás átfutás",
    tiers: [
      { price: "19 990 Ft", size: "60 m²-ig", cta: "Foglalj túrát" },
      { price: "29 990 Ft", size: "120 m²-ig", cta: "Foglalj túrát" },
      { price: "Egyedi ár", size: "120 m² felett vagy nagyobb szálloda", cta: "Kérj egyedi ajánlatot" },
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
        quote: "A túra óta többen találnak ránk a térképen, és pontosan tudják, mi vár rájuk.",
        author: "Kávézó tulajdonos, Budapest",
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
    sizeOptions: ["60 m²-ig", "120 m²-ig", "120 m² felett"],
    squaremeter: "Négyzetméter (m²)",
    city: "Város",
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
    note: "Includes the on-site shoot, tour production and embedding. Larger hotel areas are priced on request.",
    badge: "48-hour turnaround",
    tiers: [
      { price: "19,990 HUF", size: "up to 60 m²", cta: "Book Your Tour" },
      { price: "29,990 HUF", size: "up to 120 m²", cta: "Book Your Tour" },
      { price: "Custom quote", size: "above 120 m² or larger hotel", cta: "Contact us" },
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
        quote: "Since the tour went live, more people find us on the map and know what to expect.",
        author: "Café owner, Budapest",
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
    sizeOptions: ["up to 60 m²", "up to 120 m²", "above 120 m²"],
    squaremeter: "Square meters (m²)",
    city: "City",
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
