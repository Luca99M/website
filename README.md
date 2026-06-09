# Azienda Medei — Nuovo sito web

Sito statico premium, mobile-first, in HTML5 / CSS / JavaScript vanilla.
Nessuna dipendenza, nessun build step necessario per la pubblicazione:
basta caricare la cartella su qualsiasi hosting.

## Struttura delle cartelle

```
azienda-medei/
├── index.html          Home (storytelling a capitoli)
├── olio.html           Olio EVO 100% Moraiolo
├── formaggi.html       Pecorino, ricotta, caseificio
├── noci.html           Noci umbre
├── miele.html          Miele millefiori del Monte Serano
├── legna.html          Legna da ardere
├── chi-siamo.html      La famiglia, 3 generazioni, sostenibilità
├── galleria.html       Galleria fotografica
├── shop.html           Shop con filtri per categoria
├── prodotto.html       Scheda prodotto (dinamica via ?id=...)
├── carrello.html       Carrello
├── checkout.html       Checkout con riepilogo ordine
├── contatti.html       Contatti, form, mappa
├── sitemap.xml         Sitemap SEO
├── robots.txt          Robots SEO
├── css/main.css        Design system completo
├── js/products.js      ⚙️ CATALOGO: prodotti, prezzi, varianti
├── js/cart.js          Carrello (localStorage) + checkout
├── js/shop.js          Shop, filtri, scheda prodotto, JSON-LD
├── js/main.js          Header, nav mobile, reveal, parallax, counters
├── src/                Corpi delle pagine (sorgenti)
└── build.sh            Rigenera le pagine con header/footer condivisi
```

## Come pubblicare

1. Carica TUTTO il contenuto della cartella sulla root del tuo hosting
   (Netlify, Vercel, GitHub Pages, o l'hosting attuale del dominio).
2. Fine. Non servono database né PHP.

## Cosa personalizzare (in ordine di importanza)

1. **Prezzi e varianti** → `js/products.js`. I prezzi base sono quelli
   reali del sito attuale; le varianti olio intermedie (1L, 2L, 3L) sono
   stimate dentro il range reale 6–80 € — correggile qui.
2. **Soglia spedizione gratuita e costo** → in `js/cart.js`
   (`SHIP_FREE_OVER = 79`, `SHIP_COST = 9.9`).
3. **Immagini** → ora puntano a `aziendamedei.com/wp-content/...`
   (le foto reali del sito). Per produzione: scaricale nella cartella
   `assets/`, convertile in WebP/AVIF e aggiorna i percorsi.
4. **Modifiche alle pagine** → modifica i file in `src/` e lancia
   `bash build.sh`: header e footer restano identici ovunque.

## Pagamenti online

Il checkout attuale funziona SENZA backend: compone l'ordine e lo invia
via email precompilata o WhatsApp a Marco, poi svuota il carrello e
mostra la conferma. Il punto di integrazione per Stripe / PayPal /
backend ordini è la funzione `submitOrder()` in `js/cart.js` —
la struttura dati `items` è già pronta per una POST.

## Prestazioni e accessibilità (già incluse)

- HTML semantico, skip-link, focus visibile, aria-label, contrasti AA
- `prefers-reduced-motion` rispettato (animazioni disattivate)
- Lazy-loading immagini, `fetchpriority` sull'immagine hero,
  preconnect ai font, CSS unico senza framework
- JSON-LD: LocalBusiness (home) + Product (schede prodotto)
- Sitemap + robots; meta description e Open Graph per ogni pagina
- 100% responsive: testato a 1380px e 390px
