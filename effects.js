/* ============================================================
   AZIENDA MEDEI — Effetti scenografici
   1. Versata d'olio guidata dallo scroll  [data-pour]
   2. Ruota di pecorino che rotola         [data-wheel]
   3. Scintille del fuoco                  [data-fire]
   Tutto disattivato con prefers-reduced-motion.
   ============================================================ */

(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Progresso di una sezione "sticky": 0 quando entra, 1 quando esce */
  const progressOf = el => {
    const r = el.getBoundingClientRect();
    const total = r.height - innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
  };
  const seg = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));

  /* ---------- 1. Versata d'olio ---------- */
  const pour = document.querySelector("[data-pour]");
  /* ---------- 2. Ruota di pecorino ---------- */
  const wheel = document.querySelector("[data-wheel]");
  const wheelDays = document.querySelector("[data-wheel-days]");

  if ((pour || wheel) && !reduce){
    let raf = null;
    const update = () => {
      raf = null;
      if (pour){
        const p = progressOf(pour);
        const stage = pour.querySelector(".pour-stage");
        stage.style.setProperty("--tilt",    seg(p, 0,   .32).toFixed(3));
        stage.style.setProperty("--stream",  seg(p, .28, .55).toFixed(3));
        stage.style.setProperty("--pool",    seg(p, .42, .78).toFixed(3));
        stage.style.setProperty("--caption", seg(p, .62, .9).toFixed(3));
        stage.classList.toggle("is-pouring", p > .42 && p < .98);
      }
      if (wheel){
        const p = progressOf(wheel);
        wheel.querySelector(".wheel-disc").style.setProperty("--roll", p.toFixed(4));
        if (wheelDays){
          /* la forma "matura" girando: 0 → 60+ giorni di stagionatura */
          const giorni = Math.round(p * 60);
          wheelDays.textContent = giorni >= 60 ? "60+" : giorni;
        }
      }
    };
    addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    update();
  }

  /* ---------- 3. Scintille del fuoco ---------- */
  const fire = document.querySelector("[data-fire]");
  if (fire && !reduce){
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 16; i++){
      const s = document.createElement("span");
      s.className = "spark";
      s.style.left = (18 + Math.random() * 64) + "%";
      s.style.setProperty("--dur",  (2.2 + Math.random() * 2.4).toFixed(2) + "s");
      s.style.setProperty("--delay",(Math.random() * 4).toFixed(2) + "s");
      s.style.setProperty("--sway", ((Math.random() - .5) * 90).toFixed(0) + "px");
      frag.appendChild(s);
    }
    fire.appendChild(frag);
  }
})();

/* ============================================================
   HOME CINEMATICA
   4. Uscita del hero guidata dallo scroll
   5. Panorama orizzontale [data-pano]
   6. Video drone con fallback automatico all'immagine
   7. Titoli parola-per-parola [.reveal-words]
   ============================================================ */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 7. Spezza i titoli in parole animabili */
  document.querySelectorAll(".reveal-words").forEach(el => {
    const split = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3){
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            const s = document.createElement("span");
            s.className = "w";
            s.textContent = part;
            frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== "BR") split(n);
      });
    };
    split(el);
    el.querySelectorAll(".w").forEach((w,i) => w.style.setProperty("--wi", i));
  });
  /* il titolo del hero parte subito */
  requestAnimationFrame(() =>
    document.querySelectorAll(".hero .reveal-words").forEach(el => el.classList.add("in")));

  if (reduce) return;

  /* 4 + 5. Driver di scroll */
  const hero = document.querySelector(".hero");
  const pano = document.querySelector("[data-pano]");
  let raf = null;
  const update = () => {
    raf = null;
    if (hero){
      const exit = Math.min(1, Math.max(0, scrollY / (innerHeight * .9)));
      hero.style.setProperty("--exit", exit.toFixed(3));
    }
    if (pano){
      const r = pano.getBoundingClientRect();
      const total = r.height - innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      pano.style.setProperty("--pan", p.toFixed(4));
    }
  };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(update); }, { passive:true });
  update();

  /* 6. Video: appare solo se il file esiste, altrimenti resta la foto */
  document.querySelectorAll("video[data-video]").forEach(v => {
    const src = document.createElement("source");
    src.src = v.dataset.video;
    src.type = "video/mp4";
    v.appendChild(src);
    v.addEventListener("canplay", () => {
      v.classList.add("is-ready");
      v.play().catch(() => {});
    }, { once:true });
    v.addEventListener("error", () => v.remove(), { once:true });
    src.addEventListener("error", () => v.remove(), { once:true });
    v.load();
  });
})();
