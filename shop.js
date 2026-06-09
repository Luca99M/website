/* ============================================================
   AZIENDA MEDEI — Shop & pagina prodotto
   ============================================================ */

function productCard(p, delay = 0){
  return `
  <article class="product-card reveal" style="transition-delay:${delay * .08}s">
    <a class="media" href="prodotto.html?id=${p.id}" aria-label="${p.name}">
      <img src="${p.image}" alt="${p.name}" loading="lazy" width="600" height="600">
    </a>
    <div class="body">
      <p class="cat">${p.categoryLabel}</p>
      <h3><a href="prodotto.html?id=${p.id}">${p.name}</a></h3>
      <p class="price">${p.variants.length > 1 ? '<span class="from">da </span>' : ""}${p.variants.length > 1 ? formatPrice(Math.min(...p.variants.map(v=>v.price))) : formatPrice(p.variants[0].price)}</p>
      <div class="actions">
        <a class="btn btn-ghost" href="prodotto.html?id=${p.id}">Scopri</a>
        <button class="btn btn-gold" data-quick-add="${p.id}">${p.variants.length > 1 ? "Scegli formato" : "Aggiungi"}</button>
      </div>
    </div>
  </article>`;
}

/* ----- Shop con filtri ----- */
function renderShop(){
  const grid = document.getElementById("shop-grid");
  if (!grid) return;
  const bar = document.getElementById("filter-bar");

  bar.innerHTML = CATEGORIES.map((c,i) =>
    `<button class="chip ${i===0?"is-active":""}" data-cat="${c.id}" aria-pressed="${i===0}">${c.label}</button>`).join("");

  function show(cat){
    const list = cat === "tutti" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
    grid.innerHTML = list.map((p,i) => productCard(p,i)).join("");
    if (window.observeReveals) observeReveals(grid);
  }
  show("tutti");

  bar.addEventListener("click", e => {
    const btn = e.target.closest(".chip"); if (!btn) return;
    bar.querySelectorAll(".chip").forEach(c => { c.classList.remove("is-active"); c.setAttribute("aria-pressed","false"); });
    btn.classList.add("is-active"); btn.setAttribute("aria-pressed","true");
    show(btn.dataset.cat);
  });
}

/* ----- Prodotti in evidenza (home e pagine categoria) ----- */
function renderFeatured(){
  document.querySelectorAll("[data-featured]").forEach(el => {
    const filter = el.dataset.featured; // "all" oppure una categoria
    let list = filter === "all" ? PRODUCTS.filter(p => p.featured) : PRODUCTS.filter(p => p.category === filter);
    el.innerHTML = list.map((p,i) => productCard(p,i)).join("");
  });
}

/* ----- Quick add ----- */
document.addEventListener("click", e => {
  const btn = e.target.closest("[data-quick-add]"); if (!btn) return;
  const p = getProduct(btn.dataset.quickAdd); if (!p) return;
  if (p.variants.length > 1){ location.href = `prodotto.html?id=${p.id}`; return; }
  Cart.add(p.id, p.variants[0].label, 1);
});

/* ----- Pagina prodotto ----- */
function renderProductPage(){
  const root = document.getElementById("pdp-root");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = getProduct(id) || PRODUCTS[0];

  document.title = `${p.name} | Azienda Medei`;
  /* SEO: dati strutturati Product */
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": p.name,
    "image": p.gallery,
    "description": p.short,
    "brand": { "@type": "Brand", "name": "Azienda Medei" },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": Math.min(...p.variants.map(v => v.price)),
      "highPrice": Math.max(...p.variants.map(v => v.price)),
      "availability": "https://schema.org/InStock"
    }
  });
  document.head.appendChild(ld);
  let selected = p.variants[0];

  root.innerHTML = `
    <div class="pdp">
      <div class="pdp-media reveal in"><img src="${p.gallery[0]}" alt="${p.name}" id="pdp-img"></div>
      <div class="pdp-body reveal in">
        <p class="cat">${p.categoryLabel}</p>
        <h1>${p.name}</h1>
        <p class="pdp-price" id="pdp-price">${formatPrice(selected.price)}</p>
        <p class="pdp-desc">${p.description}</p>

        ${p.variants.length > 1 ? `
        <div class="variant-group">
          <span class="vg-label" id="vg-label">Formato</span>
          <div class="variant-options" role="radiogroup" aria-labelledby="vg-label" id="variant-options">
            ${p.variants.map((v,i) => `
              <button class="variant-btn ${i===0?"is-selected":""}" role="radio" aria-checked="${i===0}" data-variant="${v.label}">
                ${v.label} · ${formatPrice(v.price)}
              </button>`).join("")}
          </div>
        </div>` : ""}

        <div class="qty-row">
          <div class="qty" aria-label="Quantità">
            <button id="q-dec" aria-label="Diminuisci quantità">−</button>
            <input id="q-input" type="number" value="1" min="1" max="99" aria-label="Quantità">
            <button id="q-inc" aria-label="Aumenta quantità">+</button>
          </div>
          <button class="btn btn-gold pdp-add" id="pdp-add">Aggiungi al carrello <span class="arrow">→</span></button>
        </div>

        <div class="pdp-meta">
          ${Object.entries(p.meta).map(([k,v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("")}
          <p><strong>Spedizione:</strong> in tutta Italia, gratuita oltre 79 €.</p>
        </div>
      </div>
    </div>

    <section class="section-tight">
      <div class="section-head"><p class="eyebrow">Potrebbe piacerti</p><h2>Dalla stessa terra</h2></div>
      <div class="product-grid">
        ${PRODUCTS.filter(x => x.id !== p.id).slice(0,3).map((x,i) => productCard(x,i)).join("")}
      </div>
    </section>`;

  const priceEl = root.querySelector("#pdp-price");
  const qtyInput = root.querySelector("#q-input");

  root.querySelector("#variant-options")?.addEventListener("click", e => {
    const btn = e.target.closest(".variant-btn"); if (!btn) return;
    root.querySelectorAll(".variant-btn").forEach(b => { b.classList.remove("is-selected"); b.setAttribute("aria-checked","false"); });
    btn.classList.add("is-selected"); btn.setAttribute("aria-checked","true");
    selected = p.variants.find(v => v.label === btn.dataset.variant);
    priceEl.textContent = formatPrice(selected.price);
  });
  root.querySelector("#q-dec").addEventListener("click", () => qtyInput.value = Math.max(1, +qtyInput.value - 1));
  root.querySelector("#q-inc").addEventListener("click", () => qtyInput.value = Math.min(99, +qtyInput.value + 1));
  root.querySelector("#pdp-add").addEventListener("click", () => Cart.add(p.id, selected.label, +qtyInput.value));

  if (window.observeReveals) observeReveals(root);
}

document.addEventListener("DOMContentLoaded", () => {
  renderShop();
  renderFeatured();
  renderProductPage();
  if (window.observeReveals) observeReveals(document);
});
