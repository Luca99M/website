/* ============================================================
   AZIENDA MEDEI — Carrello (localStorage)
   API: Cart.add / remove / setQty / items / total / count
   Checkout: genera l'ordine e lo invia via email o WhatsApp.
   PUNTO DI INTEGRAZIONE PAGAMENTI: vedi submitOrder() in fondo —
   sostituire con chiamata a Stripe Checkout / PayPal / backend.
   ============================================================ */

const Cart = (() => {
  const KEY = "medei_cart_v1";
  const read  = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const write = items => { localStorage.setItem(KEY, JSON.stringify(items)); refreshBadge(); };

  function add(productId, variantLabel, qty = 1){
    const items = read();
    const found = items.find(i => i.productId === productId && i.variant === variantLabel);
    if (found) found.qty += qty;
    else items.push({ productId, variant: variantLabel, qty });
    write(items);
    const p = getProduct(productId);
    toast(`${p ? p.name : "Prodotto"} aggiunto al carrello`);
  }
  function remove(productId, variantLabel){
    write(read().filter(i => !(i.productId === productId && i.variant === variantLabel)));
  }
  function setQty(productId, variantLabel, qty){
    const items = read();
    const it = items.find(i => i.productId === productId && i.variant === variantLabel);
    if (!it) return;
    it.qty = Math.max(1, Math.min(99, qty|0));
    write(items);
  }
  function detailed(){
    return read().map(i => {
      const p = getProduct(i.productId);
      if (!p) return null;
      const v = p.variants.find(v => v.label === i.variant) || p.variants[0];
      return { ...i, product: p, unit: v.price, line: v.price * i.qty };
    }).filter(Boolean);
  }
  const total = () => detailed().reduce((s,i) => s + i.line, 0);
  const count = () => read().reduce((s,i) => s + i.qty, 0);
  const clear = () => write([]);

  function refreshBadge(){
    document.querySelectorAll("[data-cart-count]").forEach(el => {
      const n = count();
      el.textContent = n;
      el.classList.toggle("has-items", n > 0);
    });
  }

  /* Toast */
  let toastEl, toastTimer;
  function toast(msg){
    if (!toastEl){
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role","status");
      toastEl.innerHTML = `<span class="tick">✓</span><span class="msg"></span>`;
      document.body.appendChild(toastEl);
    }
    toastEl.querySelector(".msg").textContent = msg;
    requestAnimationFrame(() => toastEl.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2600);
  }

  document.addEventListener("DOMContentLoaded", refreshBadge);
  return { add, remove, setQty, detailed, total, count, clear, refreshBadge, toast };
})();

/* ---------------- Pagina carrello ---------------- */
function renderCartPage(){
  const root = document.getElementById("cart-root");
  if (!root) return;
  const items = Cart.detailed();

  if (!items.length){
    root.innerHTML = `
      <div class="empty-state reveal in">
        <p class="display">Il tuo carrello è ancora vuoto.</p>
        <p class="lead" style="margin:0 auto 2rem">Le colline di Trevi hanno molto da offrirti: olio, pecorino, miele, noci.</p>
        <a class="btn btn-gold" href="shop.html">Scopri lo shop <span class="arrow">→</span></a>
      </div>`;
    return;
  }

  const SHIP_FREE_OVER = 79;       /* soglia spedizione gratuita: modificabile */
  const SHIP_COST = 9.9;           /* costo spedizione standard: modificabile  */
  const sub = Cart.total();
  const ship = sub >= SHIP_FREE_OVER ? 0 : SHIP_COST;

  root.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${items.map(i => `
          <article class="cart-item" data-id="${i.productId}" data-variant="${i.variant}">
            <a class="thumb" href="prodotto.html?id=${i.productId}"><img src="${i.product.image}" alt="${i.product.name}" loading="lazy"></a>
            <div>
              <h3><a href="prodotto.html?id=${i.productId}">${i.product.name}</a></h3>
              <p class="variant">${i.variant} · ${formatPrice(i.unit)} cad.</p>
              <button class="remove" data-action="remove">Rimuovi</button>
            </div>
            <div class="col-right">
              <div class="qty" aria-label="Quantità">
                <button data-action="dec" aria-label="Diminuisci">−</button>
                <input type="number" value="${i.qty}" min="1" max="99" data-action="qty" aria-label="Quantità ${i.product.name}">
                <button data-action="inc" aria-label="Aumenta">+</button>
              </div>
              <p class="row-price">${formatPrice(i.line)}</p>
            </div>
          </article>`).join("")}
      </div>
      <aside class="summary" aria-label="Riepilogo ordine">
        <h2>Riepilogo</h2>
        <div class="row"><span>Subtotale</span><strong>${formatPrice(sub)}</strong></div>
        <div class="row"><span>Spedizione</span><strong>${ship === 0 ? "Gratuita" : formatPrice(ship)}</strong></div>
        ${ship > 0 ? `<p class="form-note">Spedizione gratuita oltre ${formatPrice(SHIP_FREE_OVER)}.</p>` : ""}
        <div class="row total"><span>Totale</span><span>${formatPrice(sub + ship)}</span></div>
        <a class="btn btn-gold" href="checkout.html">Vai al checkout <span class="arrow">→</span></a>
        <a class="btn btn-ghost" href="shop.html" style="margin-top:.7rem">Continua gli acquisti</a>
      </aside>
    </div>`;

  root.addEventListener("click", e => {
    const item = e.target.closest(".cart-item"); if (!item) return;
    const { id, variant } = item.dataset;
    const action = e.target.dataset.action;
    const input = item.querySelector('[data-action="qty"]');
    if (action === "remove"){ Cart.remove(id, variant); renderCartPage(); }
    if (action === "inc"){ Cart.setQty(id, variant, (+input.value)+1); renderCartPage(); }
    if (action === "dec"){ Cart.setQty(id, variant, (+input.value)-1); renderCartPage(); }
  });
  root.addEventListener("change", e => {
    if (e.target.dataset.action !== "qty") return;
    const item = e.target.closest(".cart-item");
    Cart.setQty(item.dataset.id, item.dataset.variant, +e.target.value);
    renderCartPage();
  });
}

/* ---------------- Checkout ---------------- */
function renderCheckout(){
  const sumRoot = document.getElementById("checkout-summary");
  const form = document.getElementById("checkout-form");
  if (!sumRoot || !form) return;

  const items = Cart.detailed();
  if (!items.length){ location.href = "carrello.html"; return; }

  const SHIP_FREE_OVER = 79, SHIP_COST = 9.9;
  const sub = Cart.total();
  const ship = sub >= SHIP_FREE_OVER ? 0 : SHIP_COST;

  sumRoot.innerHTML = `
    <h2>Il tuo ordine</h2>
    ${items.map(i => `<div class="row"><span>${i.qty} × ${i.product.name} <small>(${i.variant})</small></span><strong>${formatPrice(i.line)}</strong></div>`).join("")}
    <div class="row"><span>Spedizione</span><strong>${ship === 0 ? "Gratuita" : formatPrice(ship)}</strong></div>
    <div class="row total"><span>Totale</span><span>${formatPrice(sub + ship)}</span></div>`;

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = Object.fromEntries(new FormData(form).entries());
    submitOrder(d, items, sub + ship);
  });
}

/* === PUNTO DI INTEGRAZIONE PAGAMENTI ============================
   Versione attuale (senza backend): l'ordine viene composto come
   testo e inviato via email precompilata o WhatsApp a Marco.
   Per pagamenti online: sostituire il corpo di questa funzione con
   una redirect a Stripe Checkout / PayPal, oppure una POST al
   vostro endpoint ordini. La struttura `items` è già pronta.
   ================================================================ */
function submitOrder(d, items, totale){
  const righe = items.map(i => `• ${i.qty} × ${i.product.name} (${i.variant}) — ${formatPrice(i.line)}`).join("\n");
  const testo =
`NUOVO ORDINE — aziendamedei.com

${righe}

TOTALE: ${formatPrice(totale)}

Cliente: ${d.nome} ${d.cognome}
Email: ${d.email}
Telefono: ${d.telefono}
Indirizzo: ${d.indirizzo}, ${d.cap} ${d.citta} (${d.provincia})
Note: ${d.note || "—"}
Pagamento richiesto: ${d.pagamento}`;

  if (d.pagamento === "whatsapp"){
    window.open(`https://wa.me/393284055498?text=${encodeURIComponent(testo)}`, "_blank");
  } else {
    location.href = `mailto:azienda.medei@gmail.com?subject=${encodeURIComponent("Nuovo ordine dal sito")}&body=${encodeURIComponent(testo)}`;
  }
  Cart.clear();
  const done = document.getElementById("checkout-done");
  document.getElementById("checkout-grid").hidden = true;
  done.hidden = false;
  done.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => { renderCartPage(); renderCheckout(); });
