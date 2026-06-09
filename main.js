/* ============================================================
   AZIENDA MEDEI — Interazioni globali
   Header, nav mobile, reveal, parallax leggero, counters,
   "filo d'olio" (progresso di scroll), rispetto di
   prefers-reduced-motion.
   ============================================================ */

(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header ---------- */
  const header = document.querySelector(".site-header");
  if (header){
    const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Nav mobile ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  if (toggle && nav){
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.addEventListener("click", e => {
      if (e.target.tagName === "A"){
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded","false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---------- Link attivo ---------- */
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(a => {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current","page");
  });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: .14, rootMargin: "0px 0px -6% 0px" });

  window.observeReveals = (scope = document) =>
    scope.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
  observeReveals();

  /* ---------- Counters ---------- */
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      counterIO.unobserve(en.target);
      const el = en.target;
      const target = parseFloat(el.dataset.count);
      if (reduceMotion){ el.textContent = el.dataset.count; return; }
      const dur = 1800, t0 = performance.now();
      const tick = now => {
        const k = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(target * eased).toLocaleString("it-IT");
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: .5 });
  document.querySelectorAll("[data-count]").forEach(el => counterIO.observe(el));

  /* ---------- Parallax leggero ---------- */
  const pEls = [...document.querySelectorAll("[data-parallax]")];
  if (pEls.length && !reduceMotion){
    let raf = null;
    const update = () => {
      raf = null;
      const vh = innerHeight;
      pEls.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const speed = parseFloat(el.dataset.parallax) || .12;
        const offset = (r.top + r.height/2 - vh/2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(update); }, { passive:true });
    update();
  }

  /* ---------- Il filo d'olio ---------- */
  const thread = document.querySelector(".oil-thread");
  if (thread && !reduceMotion){
    const fill = thread.querySelector(".fill");
    const drop = thread.querySelector(".drop");
    let raf2 = null;
    const update = () => {
      raf2 = null;
      const max = document.documentElement.scrollHeight - innerHeight;
      const k = max > 0 ? Math.min(1, scrollY / max) : 0;
      fill.style.transform = `scaleY(${k})`;
      drop.style.top = `${(k * 100).toFixed(2)}%`;
    };
    addEventListener("scroll", () => { if (!raf2) raf2 = requestAnimationFrame(update); }, { passive:true });
    update();
  }
})();
