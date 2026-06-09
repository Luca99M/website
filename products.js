/* ============================================================
   AZIENDA MEDEI — Catalogo prodotti
   Fonte: shop attuale di aziendamedei.com
   NOTA: i prezzi delle varianti olio intermedie sono stimati
   all'interno del range reale 6–80 €. Aggiornarli qui è
   l'unico punto da toccare: tutto il sito li legge da questo file.
   ============================================================ */

const MEDEI_IMG = "https://aziendamedei.com/wp-content/uploads";

const PRODUCTS = [
  {
    id: "olio-evo-moraiolo",
    name: "Olio EVO — 100% Moraiolo",
    category: "olio",
    categoryLabel: "Olio di Trevi",
    image: `${MEDEI_IMG}/2025/01/2-bottiglie-da.png`,
    gallery: [
      `${MEDEI_IMG}/2025/01/2-bottiglie-da.png`,
      `${MEDEI_IMG}/2026/03/Bottiglia-750-768x1152.png`,
      `${MEDEI_IMG}/2026/03/Set-completo-olio.png`
    ],
    short: "L'oro delle Coste di Trevi. Monovarietale Moraiolo, estratto a freddo entro otto ore dalla raccolta nel nostro frantoio.",
    description: "Il nostro olio extravergine di oliva nasce da olive Moraiolo raccolte sui 40 ettari di oliveto dell'azienda, nella fascia olivata Assisi–Spoleto. Frangiamo entro otto ore dalla raccolta, a freddo, tra 22 e 23 gradi, e conserviamo l'olio sotto azoto: ogni bottiglia mantiene intatti profumo, polifenoli e quel perfetto equilibrio tra amaro e piccante che è la firma del Moraiolo di Trevi.",
    meta: {
      "Varietà": "Moraiolo 100%",
      "Estrazione": "A freddo, 22–23 °C",
      "Raccolta → frangitura": "Entro 8 ore",
      "Conservazione": "Sotto azoto",
      "Origine": "Coste di Trevi (PG), Umbria"
    },
    variants: [
      { label: "0,25 L", price: 6 },
      { label: "0,5 L",  price: 10 },
      { label: "0,75 L", price: 14 },
      { label: "1 L",    price: 18 },
      { label: "2 L",    price: 34 },
      { label: "3 L",    price: 48 },
      { label: "5 L",    price: 80 }
    ],
    featured: true
  },
  {
    id: "formaggio-fresco",
    name: "Pecorino fresco di pecora",
    category: "formaggi",
    categoryLabel: "Caseificio",
    image: `${MEDEI_IMG}/2025/01/Formaggio-fresco.png`,
    gallery: [
      `${MEDEI_IMG}/2025/01/Formaggio-fresco.png`,
      `${MEDEI_IMG}/2024/01/caseificio-222-1-1024x836.jpg`
    ],
    short: "Latte crudo delle nostre 600 Lacaune, lavorato il giorno stesso. Dolce, delicato, profumo di latte appena munto.",
    description: "Pecorino fresco umbro prodotto con il latte crudo non pastorizzato delle nostre pecore Lacaune. Ogni fase — dalla mungitura nella nostra stalla alla lavorazione nel caseificio aziendale, fino alla vendita — è seguita interamente dalla famiglia. Il primo mese di stagionatura regala dolcezza e una consistenza cremosa che racconta i pascoli delle Coste di Trevi.",
    meta: {
      "Latte": "Crudo di pecora Lacaune, non pastorizzato",
      "Ingredienti": "Latte, caglio, sale",
      "Lavorazione": "Riscaldamento a 38 °C",
      "Peso indicativo": "≈ 1,2 kg a forma",
      "Origine": "Caseificio aziendale, Coste di Trevi (PG)"
    },
    variants: [{ label: "Forma intera", price: 25 }],
    featured: true
  },
  {
    id: "formaggio-stagionato",
    name: "Pecorino stagionato di pecora",
    category: "formaggi",
    categoryLabel: "Caseificio",
    image: `${MEDEI_IMG}/2025/01/Formaggio-stagionale.png`,
    gallery: [
      `${MEDEI_IMG}/2025/01/Formaggio-stagionale.png`,
      `${MEDEI_IMG}/2024/01/caseificio-222-1-1024x836.jpg`
    ],
    short: "Maturato lentamente a temperatura e umidità controllate: sapore ricco, deciso, con sentori di pascolo.",
    description: "Il nostro pecorino stagionato matura a temperature e umidità ottimali fino a sviluppare un sapore ricco e deciso, con la complessità aromatica che solo il latte crudo sa dare. Perfetto da meditazione con il nostro miele millefiori, o da scaglia su piatti che meritano carattere.",
    meta: {
      "Latte": "Crudo di pecora Lacaune, non pastorizzato",
      "Ingredienti": "Latte, caglio, sale",
      "Stagionatura": "Oltre 60 giorni",
      "Peso indicativo": "≈ 1,2 kg a forma",
      "Origine": "Caseificio aziendale, Coste di Trevi (PG)"
    },
    variants: [{ label: "Forma intera", price: 27 }],
    featured: true
  },
  {
    id: "miele-05",
    name: "Miele millefiori — 0,5 kg",
    category: "miele",
    categoryLabel: "Apiario",
    image: `${MEDEI_IMG}/2025/01/Miele-piccolo.png`,
    gallery: [`${MEDEI_IMG}/2025/01/Miele-piccolo.png`],
    short: "Raccolto sulle pendici del Monte Serano: tutta la biodiversità umbra in un vasetto.",
    description: "Il nostro miele millefiori, raccolto sulle pendici del Monte Serano, racchiude la ricchezza della flora spontanea umbra in un prodotto naturale dal sapore intenso e autentico. Non pastorizzato, non miscelato: solo il lavoro delle api e il paesaggio che ci circonda.",
    meta: {
      "Tipologia": "Millefiori",
      "Zona di raccolta": "Monte Serano, Trevi",
      "Formato": "Vasetto da 0,5 kg",
      "Lavorazione": "Grezza, non pastorizzata"
    },
    variants: [{ label: "0,5 kg", price: 10 }],
    featured: false
  },
  {
    id: "miele-1",
    name: "Miele millefiori — 1 kg",
    category: "miele",
    categoryLabel: "Apiario",
    image: `${MEDEI_IMG}/2025/01/Miele-grande.png`,
    gallery: [`${MEDEI_IMG}/2025/01/Miele-grande.png`],
    short: "Il formato famiglia del nostro millefiori del Monte Serano.",
    description: "Lo stesso miele millefiori del Monte Serano, nel formato da un chilo: per chi a colazione non rinuncia mai e per chi lo sposa con il nostro pecorino stagionato.",
    meta: {
      "Tipologia": "Millefiori",
      "Zona di raccolta": "Monte Serano, Trevi",
      "Formato": "Vasetto da 1 kg",
      "Lavorazione": "Grezza, non pastorizzata"
    },
    variants: [{ label: "1 kg", price: 16 }],
    featured: false
  },
  {
    id: "noci-umbre",
    name: "Noci umbre in guscio",
    category: "noci",
    categoryLabel: "Noceto",
    image: `${MEDEI_IMG}/2025/01/Noci.png`,
    gallery: [
      `${MEDEI_IMG}/2025/01/Noci.png`,
      `${MEDEI_IMG}/2023/12/tree-nut-967128_1280.jpg`
    ],
    short: "Cinque ettari di noceto coltivati senza chimica, concimati dal pascolo delle pecore.",
    description: "Le nostre noci crescono in 5 ettari di noceto coltivati senza alcun trattamento chimico: la concimazione arriva dal pascolo delle pecore e dal letame, che mantiene il terreno sano nel tempo. Il risultato è una noce fresca, ricca di omega-3 e antiossidanti, lasciata totalmente al naturale.",
    meta: {
      "Coltivazione": "Senza trattamenti chimici",
      "Concimazione": "Naturale, da pascolo ovino",
      "Formato": "Sacchetto da 1 kg, in guscio",
      "Origine": "Noceti aziendali, Trevi (PG)"
    },
    variants: [{ label: "1 kg", price: 7 }],
    featured: true
  },
  {
    id: "lenticchie",
    name: "Lenticchie umbre",
    category: "dispensa",
    categoryLabel: "Dispensa",
    image: `${MEDEI_IMG}/2025/01/Lenticchia.png`,
    gallery: [`${MEDEI_IMG}/2025/01/Lenticchia.png`],
    short: "Piccole, sode, profumate: le lenticchie dei nostri campi, coltivate come una volta.",
    description: "Dai campi che ruotano con gli oliveti e i pascoli, le nostre lenticchie umbre: piccole, dalla buccia sottile, non hanno bisogno di ammollo e tengono perfettamente la cottura. La rotazione delle colture mantiene fertile la terra senza forzature.",
    meta: {
      "Formato": "Sacchetto da 0,5 kg",
      "Ammollo": "Non necessario",
      "Origine": "Campi aziendali, Trevi (PG)"
    },
    variants: [{ label: "0,5 kg", price: 7 }],
    featured: false
  }
];

const CATEGORIES = [
  { id: "tutti",    label: "Tutti i prodotti" },
  { id: "olio",     label: "Olio" },
  { id: "formaggi", label: "Formaggi" },
  { id: "miele",    label: "Miele" },
  { id: "noci",     label: "Noci" },
  { id: "dispensa", label: "Dispensa" }
];

function getProduct(id){ return PRODUCTS.find(p => p.id === id); }
function formatPrice(n){ return n.toLocaleString("it-IT",{minimumFractionDigits:2,maximumFractionDigits:2}) + " €"; }
function priceLabel(p){
  const prices = p.variants.map(v => v.price);
  const min = Math.min(...prices), max = Math.max(...prices);
  return min === max ? formatPrice(min) : `${formatPrice(min)} – ${formatPrice(max)}`;
}
