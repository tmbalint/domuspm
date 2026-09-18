import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "hu" | "en";

type Dict = typeof hu;

export const hu = {
  nav: {
    tours: "Bemutató túrák",
    services: "Szolgáltatások",
    pricing: "Árak",
    portfolio: "Munkáink",
    about: "Rólunk",
    contact: "Kapcsolat",
  },
  cta: "Kérj ajánlatot",
  hero: {
    eyebrow: "Budapest · 360° virtuális túrák",
    title: "360° virtuális túrák otthonokhoz és üzletekhez",
    subtitle:
      "Mutasd meg a teret, mielőtt bárki belépne. Google Maps-re és saját weboldalra is beágyazható.",
    secondary: "Túrák megtekintése",
    badge: "48 órás átfutás",
  },
  tours: {
    eyebrow: "Kiemelt túrák",
    title: "Nézz körbe",
    note: "A beágyazott túrák helye — hamarosan élő linkekkel.",
    placeholder: "360° túra beágyazás helye",
    open: "Túra megnyitása",
    items: [
      { name: "Belvárosi apartman", type: "Airbnb · 54 m²" },
      { name: "Kávézó, VII. kerület", type: "Vendéglátás" },
      { name: "Butik üzlet", type: "Kiskereskedelem" },
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
        body: "Mutasd meg a szobákat és közösségi tereket. Virtuális túra szobánként 19 990 Ft-tól; nagyobb szállodaterület egyedi áron.",
      },
    ],
  },
  pricing: {
    eyebrow: "Árak",
    title: "Átlátható díjszabás",
    note: "Az árak tartalmazzák a helyszíni fotózást, a túra összeállítását és a beágyazást. Nagyobb szállodaterület esetén egyedi árat adunk.",
    badge: "48 órás átfutás",
    tiers: [
      { price: "19 990 Ft", size: "60 m²-ig", cta: "Kérj ajánlatot" },
      { price: "29 990 Ft", size: "120 m²-ig", cta: "Kérj ajánlatot", featured: true },
      { price: "19 990 Ft / szoba", size: "Szállodai szoba vagy lounge", cta: "Kérj ajánlatot" },
      { price: "Egyedi ár", size: "120 m² felett vagy nagyobb szálloda", cta: "Kérj egyedi ajánlatot" },
    ],
  },
  portfolio: {
    eyebrow: "Munkáink",
    title: "Elkészült túrák",
    note: "A galéria folyamatosan bővül.",
  },
  about: {
    eyebrow: "Rólunk",
    title: "Budapesti csapat, gyors átfutás",
    body: "Budapesten dolgozunk, helyben. A felvételt 48 órán belül kész, beágyazható túraként adjuk át. Egyszerű folyamat, prémium eredmény.",
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
    title: "Kérj ajánlatot",
    body: "Írd meg a méretet és a helyszínt, és egy munkanapon belül válaszolunk.",
    name: "Név",
    email: "E-mail",
    type: "Ingatlan / üzlet típusa",
    typeOptions: ["Airbnb / rövid távú bérlés", "Eladó vagy kiadó ingatlan", "Kávézó / étterem", "Üzlet / iroda", "Szálloda / lounge", "Egyéb"],
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
    portfolio: "Portfolio",
    about: "About",
    contact: "Contact",
  },
  cta: "Get a Quote",
  hero: {
    eyebrow: "Budapest · 360° virtual tours",
    title: "360° Virtual Tours for Homes & Businesses",
    subtitle:
      "See it before you book it. Embedded on Google Maps and on your own website.",
    secondary: "View tours",
    badge: "48-hour turnaround",
  },
  tours: {
    eyebrow: "Featured tours",
    title: "Step inside",
    note: "Tour embeds go here — live links coming soon.",
    placeholder: "360° tour embed placeholder",
    open: "Open tour",
    items: [
      { name: "Downtown apartment", type: "Airbnb · 54 m²" },
      { name: "Café, District VII", type: "Hospitality" },
      { name: "Boutique shop", type: "Retail" },
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
        body: "Showcase rooms and shared spaces. Virtual tour from 19,990 HUF per room; larger hotel areas priced on request.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Clear, simple pricing",
    note: "Includes the on-site shoot, tour production and embedding. Larger hotel areas are priced on request.",
    badge: "48-hour turnaround",
    tiers: [
      { price: "19,990 HUF", size: "up to 60 m²", cta: "Get a Quote" },
      { price: "29,990 HUF", size: "up to 120 m²", cta: "Get a Quote", featured: true },
      { price: "19,990 HUF / room", size: "Hotel room or lounge", cta: "Get a Quote" },
      { price: "Custom quote", size: "above 120 m² or larger hotel", cta: "Contact us" },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "Completed tours",
    note: "The gallery grows with every project.",
  },
  about: {
    eyebrow: "About",
    title: "A Budapest team with a fast turnaround",
    body: "We work locally in Budapest. Your tour is shot, produced and ready to embed within 48 hours. Simple process, premium result.",
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
    title: "Get a Quote",
    body: "Tell us the size and location. We reply within one business day.",
    name: "Name",
    email: "Email",
    type: "Property / business type",
    typeOptions: ["Airbnb / short-term rental", "Property for sale or rent", "Café / restaurant", "Shop / office", "Hotel / lounge", "Other"],
    squaremeter: "Square meters (m²)",
    city: "City",
    message: "Message",
    submit: "Send",
    sent: "Thank you — we'll be in touch shortly.",
  },
  footer: {
    tagline: "360° virtual tours in Budapest.",
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
