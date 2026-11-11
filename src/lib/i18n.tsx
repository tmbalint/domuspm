import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "hu" | "en";

export type Dict = typeof hu;

export const hu = {
  meta: {
    title: "Domus Property Media – 360° virtuális túrák Budapesten",
    description:
      "360° virtuális túrák otthonokhoz, Airbnb-hez és üzletekhez Budapesten és Mosonmagyaróváron. Google Térképre és weboldalra beágyazva, 48 órán belül kész.",
  },
  nav: {
    tours: "Bemutató túrák",
    services: "Szolgáltatások",
    pricing: "Árak",
    packages: "Havi csomagok",
    testimonials: "Vélemények",
    about: "Rólunk",
  },
  cta: "Foglaljon túrát",
  announce: {
    bar: "Új ügyfeleknek az első túra díjmentes – kattintson a részletekért!",
    banner:
      "Új ügyfeleknek az első túra ingyen (140 m²-ig). Cserébe kérünk egy őszinte véleményt, és hogy a munkát megmutathassuk referenciáink között.",
  },
  hero: {
    eyebrow: "Budapest, Magyarország · 360° virtuális túrák",
    title: "360° virtuális túrák otthonokhoz és üzletekhez",
    subtitle: "Mutassa be a teret, mielőtt bárki belépne. Google Térképre és saját weboldalra is beágyazható.",
    secondary: "Túrák megtekintése",
    badge: "48 órás átfutás",
  },
  tours: {
    eyebrow: "Kiemelt túrák",
    title: "Nézzen körbe",
    note: "A túrák új lapon nyílnak meg.",
    open: "Túra megtekintése",
    items: [
      { name: "Külvárosi lakás", type: "360° · 53 m²" },
      { name: "Kertvárosi családi ház", type: "360° · 120+ m²" },
    ],
  },
  services: {
    eyebrow: "Szolgáltatások",
    title: "Egy minőség minden területen",
    items: [
      { title: "Ingatlan és Airbnb", body: "Gyorsabb foglalás, kevesebb kérdés, nagyobb bizalom. A vendég előre látja a teret, így magabiztosabban foglal." },
      { title: "Kávézók és üzletek", body: "Jelenjen meg a Google Térképen virtuális túrájával. A vendég még a belépés előtt megismerheti a helyiséget, így üzlete már az első benyomásnál kitűnik." },
      { title: "Szállodák és lounge-ok", body: "Mutassa be szobáit és közösségi tereit: a vendég már foglalás előtt körbenézhet, ezért magabiztosabban dönt." },
      { title: "Alaprajz", body: "Kiegészítő szolgáltatás: tájékoztató jellegű alaprajz a túrához." },
    ],
  },
  pricing: {
    eyebrow: "Árak",
    title: "Árazás",
    note: "Az árak tartalmazzák a helyszíni fotózást, a túra összeállítását és a beágyazást.",
    badge: "48 órás átfutás",
    tiers: [
      { price: "19 990 Ft", size: "70 m²-ig", cta: "Foglaljon túrát" },
      { price: "29 990 Ft", size: "140 m²-ig", cta: "Foglaljon túrát" },
      { price: "39 990 Ft", size: "205 m²-ig", cta: "Foglaljon túrát" },
      { price: "39 990 Ft + 14 990 Ft / megkezdett 100 m²", size: "205 m² felett", cta: "Foglaljon túrát" },
    ],
  },
  process: {
    eyebrow: "Hogyan működik",
    title: "A folyamat egyszerű",
    steps: [
      { title: "Érkezés és tervezés", body: "Megérkezünk az ingatlanhoz, és végigjárva eldöntjük, hol és hogyan készüljenek a panorámák." },
      { title: "Fotózás", body: "Elkészítjük a 360°-os képeket. 60 m²-ig nagyjából 1 óra, 120 m²-ig nagyjából 2 óra." },
      { title: "Utómunka", body: "Távozás után, legfeljebb 48 órán belül, készen is van a virtuális séta." },
    ],
    note: "Ha az ingatlan mérete vagy típusa eltér a megszokottól, az ingatlan és az Ön igényeinek megismerése után becsüljük meg az időt.",
    deliverTitle: "Amit kínálunk",
    deliverBody: "Egy 360°-os virtuális túra az ingatlanról, amelyet linkkel és QR-kóddal bárkinek megoszthat.",
    deliverOnline: "A túra legalább 12 hónapig elérhető.",
    addonTag: "Kiegészítő",
    addonTitle: "Alaprajz",
    addonBody: "Kiegészítőként alaprajzot is készítünk. Az alaprajz tájékoztató jellegű, nem hivatalos felmérés.",
    addonPrice: "Ára: 9 990 Ft",
  },
  packages: {
    title: "Havi csomagok",
    subtitle: "Rendszeres megbízásokhoz, kedvezőbb áron. Havi számlázással, kötöttségek nélkül.",
    plans: [
      {
        name: "Partner",
        price: "69 990 Ft / hónap",
        features: [
          "Havonta 4 ingatlan, egyenként 140 m²-ig",
          "140–205 m² között: felár 7 990 Ft / ingatlan",
          "205 m² felett: a 7 990 Ft felár mellett további 12 490 Ft / megkezdett 100 m²",
          "48 órás átfutás",
        ],
        extrasTitle: "Minden további ingatlan (4 felett):",
        extras: ["70 m²-ig: 16 990 Ft", "140 m²-ig: 25 490 Ft", "205 m²-ig: 33 990 Ft", "205 m² felett: 33 990 Ft + 12 490 Ft / megkezdett 100 m²"],
        cta: "Árajánlatot kérek",
      },
      {
        name: "Pro",
        price: "149 990 Ft / hónap",
        features: [
          "Havonta 8 ingatlan, egyenként 205 m²-ig",
          "205 m² felett: felár 12 490 Ft / megkezdett 100 m²",
          "24 órás átfutás",
          "Elsőbbségi időpontfoglalás",
          "Saját logó a túrán és az alaprajzon, külön díj nélkül",
        ],
        extrasTitle: "Minden további ingatlan (8 felett):",
        extras: ["70 m²-ig: 16 990 Ft", "140 m²-ig: 25 490 Ft", "205 m²-ig: 33 990 Ft", "205 m² felett: 33 990 Ft + 12 490 Ft / megkezdett 100 m²"],
        cta: "Árajánlatot kérek",
      },
    ],
    notes: [
      "Az árak a megrendeléskor megadott alapterületen alapulnak. Ha a helyszínen az alapterület legalább 10%-kal eltér, a díjat az új méretkategória szerint módosítjuk.",
      "205 m² felett az átfutási időt egyeztetjük.",
      "A fel nem használt alkalmak nem vihetők át a következő hónapra.",
      "Havi számlázás, bármikor lemondható.",
      "A kiszállási díjat a fő működési területeinken belül (Budapest, Mosonmagyaróvár) az ár tartalmazza.",
    ],
  },
  about: {
    eyebrow: "Rólunk",
    title: "Mi vagyunk a Domus Property Media.",
    paragraphs: [
      "Egy ingatlan hirdetéséhez ma már nem elég néhány fotó és egy leírás. A vevők százával görgetik a hirdetéseket, és másodpercek alatt döntenek. Látni akarják a teret, átérezni az ingatlan elrendezését, és bízni akarnak abban, amit látnak, még mielőtt felhívnák a hirdetőt.",
      "Mi ezt a bizonytalanságot segítünk kiküszöbölni. 360°-os virtuális túráinkkal bárki végigsétálhat az ingatlanon telefonról vagy laptopról: minden szoba, valódi arányok, a tér minden részletével. A tulajdonosok és az ügynökök kiemelkedő, profi hatású hirdetést kapnak, amely már az első kattintásnál bizalmat épít. Így a vevők teljes képet kapnak, azok is, akik külföldön vagy az ország másik felén élnek, és nem tudnának könnyedén eljönni az ingatlanhoz. Ennek köszönhetően kevesebb a felesleges megtekintés, tájékozottabbak az érdeklődők, és gyorsabb a döntéshozatal.",
      "Ugyanez igaz a szálláshelyekre, kávézókra és szállodákra is: a vendég már foglalás vagy látogatás előtt körbenézhet, és magabiztosabban dönt.",
      "Budapesten és Mosonmagyaróváron dolgozunk; ezeken a területeken kívül a kiszállási díjat egyedileg számítjuk fel. Egyeztetés alapján az ország más részein is elérhetők vagyunk. Maga a folyamat egyszerű: kimegyünk, felvételt készítünk, és 48 órán belül elkészül a túra. Az eredmény magáért beszél.",
      "Minden tér, pontosan úgy, ahogy van, a legjobb formájában. Ez a Domus.",
    ],
  },
  testimonials: {
    eyebrow: "Vélemények",
    title: "Ügyfeleink",
    items: [
      {
        quote: "„Elégedettek vagyunk a munkájukkal, profi és igényes munkát végeztek. A szervezés során is rugalmasak és segítőkészek voltak, a virtuális séta pedig hibátlanul működik és mutatja be az ingatlant. Segítségével a hirdetés is kitűnik a többi közül. Ha profi VR-sétát szeretnél az ingatlanodról, bátran ajánlom őket!”",
        author: "Borbély Róbert, Komplex Ingatlaniroda",
      },
    ],
  },
  contact: {
    eyebrow: "Kapcsolat",
    title: "Foglaljon túrát",
    body: "Adja meg telefonszámát, az ingatlan méretét és helyszínét, és egy munkanapon belül visszahívjuk.",
    location: "Budapest, Magyarország",
    name: "Név",
    email: "E-mail (nem kötelező)",
    phone: "Telefonszám",
    type: "Ingatlan / üzlet típusa",
    typeOptions: ["Airbnb / rövid távú bérlés", "Eladó vagy kiadó ingatlan", "Kávézó / étterem", "Üzlet / iroda", "Szálloda / lounge", "Egyéb"],
    size: "Méret",
    sizeOptions: ["70 m²-ig", "140 m²-ig", "205 m²-ig", "205 m² felett"],
    squaremeter: "Négyzetméter (m²)",
    city: "Város",
    floorplan: "Kér alaprajzot?",
    floorplanOptions: ["Nem kérek", "Igen, kérek"],
    floorplanNote: "Az alaprajz nem része a túra árnak: külön 9 990 Ft.",
    planLabel: "Kiválasztott csomag",
    planChange: "Csomag váltása",
    planRemove: "Eltávolítás",
    message: "Üzenet",
    submit: "Küldés",
    privacy: "A megadott adatokat kizárólag az ajánlatkéréshez használjuk.",
    sent: "Köszönjük, hamarosan válaszolunk.",
  },
  footer: {
    tagline: "360° virtuális túrák Budapesten és Mosonmagyaróváron.",
    rights: "Minden jog fenntartva.",
  },
};

export const en: Dict = {
  meta: {
    title: "Domus Property Media – 360° Virtual Tours in Budapest",
    description:
      "360° virtual tours for homes, Airbnb rentals and small businesses in Budapest and Mosonmagyaróvár. Embedded on Google Maps and your website, ready in 48 hours.",
  },
  nav: {
    tours: "Sample tours",
    services: "Services",
    pricing: "Pricing",
    packages: "Monthly plans",
    testimonials: "Testimonials",
    about: "About",
  },
  cta: "Book a tour",
  announce: {
    bar: "First tour is on us for new clients – click for details!",
    banner:
      "First tour free for new clients (up to 140 m²). In return, we ask for an honest review and permission to show the work in our portfolio.",
  },
  hero: {
    eyebrow: "Budapest, Hungary · 360° virtual tours",
    title: "360° virtual tours for homes and businesses",
    subtitle: "Show the space before anyone steps inside. Can be embedded on Google Maps and on your own website.",
    secondary: "View tours",
    badge: "48-hour turnaround",
  },
  tours: {
    eyebrow: "Featured tours",
    title: "Take a look around",
    note: "Tours open in a new tab.",
    open: "View tour",
    items: [
      { name: "Apartment in the outer districts", type: "360° · 53 m²" },
      { name: "Family house in a garden suburb", type: "360° · 120+ m²" },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "The same quality in every field",
    items: [
      { title: "Real estate and Airbnb", body: "Faster bookings, fewer questions, more trust. Guests see the space in advance, so they book with more confidence." },
      { title: "Cafés and shops", body: "Appear on Google Maps with a virtual tour. Visitors can get to know the space before they step in, so your business stands out from the first impression." },
      { title: "Hotels and lounges", body: "Show your rooms and common areas: guests can look around before booking, so they decide with more confidence." },
      { title: "Floor plan", body: "Optional extra: an indicative floor plan to go with the tour." },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Pricing",
    note: "Prices include the on-site shoot, building the tour and embedding.",
    badge: "48-hour turnaround",
    tiers: [
      { price: "19 990 Ft", size: "Up to 70 m²", cta: "Book a tour" },
      { price: "29 990 Ft", size: "Up to 140 m²", cta: "Book a tour" },
      { price: "39 990 Ft", size: "Up to 205 m²", cta: "Book a tour" },
      { price: "39 990 Ft + 14 990 Ft per started 100 m²", size: "Over 205 m²", cta: "Book a tour" },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "A simple process",
    steps: [
      { title: "Arrival and planning", body: "We arrive at the property and walk through it to decide where and how the panoramas will be shot." },
      { title: "Shooting", body: "We capture the 360° images. Roughly 1 hour up to 60 m², roughly 2 hours up to 120 m²." },
      { title: "Post-production", body: "After we leave, your virtual walkthrough is ready within 48 hours at the latest." },
    ],
    note: "If the property's size or type is unusual, we estimate the time after getting to know the property and your needs.",
    deliverTitle: "What we offer",
    deliverBody: "A 360° virtual tour of your property that you can share with anyone via a link and a QR code.",
    deliverOnline: "The tour stays online for at least 12 months.",
    addonTag: "Add-on",
    addonTitle: "Floor plan",
    addonBody: "We also offer a floor plan as an add-on. The floor plan is indicative only and is not an official survey.",
    addonPrice: "Price: 9 990 Ft",
  },
  packages: {
    title: "Monthly plans",
    subtitle: "For regular work, at a better price. Billed monthly, with no commitment.",
    plans: [
      {
        name: "Partner",
        price: "69 990 Ft / month",
        features: [
          "4 properties per month, up to 140 m² each",
          "Between 140 and 205 m²: surcharge of 7 990 Ft per property",
          "Over 205 m²: in addition to the 7 990 Ft surcharge, a further 12 490 Ft per started 100 m²",
          "48-hour turnaround",
        ],
        extrasTitle: "Each additional property (beyond 4):",
        extras: ["up to 70 m²: 16 990 Ft", "up to 140 m²: 25 490 Ft", "up to 205 m²: 33 990 Ft", "over 205 m²: 33 990 Ft + 12 490 Ft per started 100 m²"],
        cta: "Request a quote",
      },
      {
        name: "Pro",
        price: "149 990 Ft / month",
        features: [
          "8 properties per month, up to 205 m² each",
          "Over 205 m²: surcharge of 12 490 Ft per started 100 m²",
          "24-hour turnaround",
          "Priority booking",
          "Your own logo on the tour and the floor plan, at no extra charge",
        ],
        extrasTitle: "Each additional property (beyond 8):",
        extras: ["up to 70 m²: 16 990 Ft", "up to 140 m²: 25 490 Ft", "up to 205 m²: 33 990 Ft", "over 205 m²: 33 990 Ft + 12 490 Ft per started 100 m²"],
        cta: "Request a quote",
      },
    ],
    notes: [
      "Prices are based on the floor area stated when ordering. If the floor area on site differs by at least 10%, we adjust the fee to the new size category.",
      "Over 205 m², we agree the turnaround time individually.",
      "Unused slots cannot be carried over to the next month.",
      "Billed monthly, cancellable at any time.",
      "Travel is included in the price within our main service areas (Budapest, Mosonmagyaróvár).",
    ],
  },
  about: {
    eyebrow: "About",
    title: "We are Domus Property Media.",
    paragraphs: [
      "A few photos and a description are no longer enough to advertise a property. Buyers scroll through hundreds of listings and decide within seconds. They want to see the space, feel the layout of the property, and trust what they see before they call the advertiser.",
      "We help remove that uncertainty. With our 360° virtual tours, anyone can walk through the property from a phone or laptop: every room, true proportions, every detail of the space. Owners and agents get a standout, professional-looking listing that builds trust from the very first click. Buyers get the full picture, even those who live abroad or on the other side of the country and could not easily come to the property. As a result, there are fewer unnecessary viewings, better-informed prospects and faster decisions.",
      "The same is true for accommodation, cafés and hotels: guests can look around before booking or visiting, and decide with more confidence.",
      "We work in Budapest and Mosonmagyaróvár; outside these areas, travel is charged individually. By arrangement, we are also available in other parts of the country. The process itself is simple: we come out, shoot, and the tour is ready within 48 hours. The result speaks for itself.",
      "Every space, exactly as it is, at its best. This is Domus.",
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Our clients",
    items: [
      {
        quote: "\"We are satisfied with their work; they did professional, high-quality work. They were flexible and helpful during the organisation as well, and the virtual walkthrough works flawlessly and presents the property well. With its help, the listing also stands out from the others. If you want a professional VR walkthrough of your property, I warmly recommend them!\"",
        author: "Róbert Borbély, Komplex Ingatlaniroda",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Book a tour",
    body: "Give us your phone number, the size and the location of the property, and we will call you back within one working day.",
    location: "Budapest, Hungary",
    name: "Name",
    email: "Email (optional)",
    phone: "Phone number",
    type: "Property / business type",
    typeOptions: ["Airbnb / short-term rental", "Property for sale or rent", "Café / restaurant", "Shop / office", "Hotel / lounge", "Other"],
    size: "Size",
    sizeOptions: ["Up to 70 m²", "Up to 140 m²", "Up to 205 m²", "Over 205 m²"],
    squaremeter: "Square meters (m²)",
    city: "City",
    floorplan: "Would you like a floor plan?",
    floorplanOptions: ["No, thank you", "Yes, please"],
    floorplanNote: "The floor plan isn't included in the tour price: it's an extra 9 990 Ft.",
    planLabel: "Selected plan",
    planChange: "Change plan",
    planRemove: "Remove",
    message: "Message",
    submit: "Send",
    privacy: "We use your details only to respond to your inquiry.",
    sent: "Thank you — we'll be in touch shortly.",
  },
  footer: {
    tagline: "360° virtual tours in Budapest and Mosonmagyaróvár.",
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
    const meta = dicts[lang].meta;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
