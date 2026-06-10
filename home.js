/* ============================================================
   AZIENDA MEDEI — Regia della home (GSAP + ScrollTrigger)
   Caricato solo su index.html. Se le librerie non si caricano
   o l'utente preferisce meno movimento, la pagina resta
   perfettamente leggibile: le animazioni sono solo un di più.
   ============================================================ */

(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !window.gsap || !window.ScrollTrigger){
    document.documentElement.classList.add("no-gsap");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* Sincronizza ScrollTrigger con Lenis (smooth scroll) */
  if (window.__lenis){
    window.__lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
  }

  const EASE = "power4.out";

  /* ---------- 1. Hero: titolo a righe + ingresso orchestrato ---------- */
  const heroTl = gsap.timeline({ delay: 1.35 }); /* parte quando il loader esce */
  heroTl
    .from(".hero .line-in", { yPercent: 115, duration: 1.15, ease: EASE, stagger: .14 })
    .from(".hero .eyebrow",   { opacity: 0, y: 14, duration: .7, ease: EASE }, "-=.9")
    .from(".hero .lead",      { opacity: 0, y: 22, duration: .9, ease: EASE }, "-=.7")
    .from(".hero .hero-cta",  { opacity: 0, y: 22, duration: .9, ease: EASE }, "-=.75")
    .from(".hero-scroll",     { opacity: 0, duration: .8 }, "-=.5");

  /* Uscita cinematografica del hero */
  gsap.to(".hero .hero-inner", {
    yPercent: -22, opacity: 0, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "86% top", scrub: true }
  });
  gsap.to(".hero .hero-media", {
    scale: 1.14, filter: "brightness(.55)", ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  /* ---------- 2. Video che si espande a tutto schermo ---------- */
  const frame = document.querySelector(".vexp-frame");
  if (frame){
    gsap.fromTo(frame,
      { clipPath: "inset(26% 30% 26% 30% round 22px)" },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
        scrollTrigger: {
          trigger: ".vexp-stage", start: "top top", end: "+=130%",
          scrub: .6, pin: true, anticipatePin: 1
        }
      });
    gsap.fromTo(".vexp-frame video, .vexp-frame > img", { scale: 1.25 }, {
      scale: 1, ease: "none",
      scrollTrigger: { trigger: ".vexp-stage", start: "top top", end: "+=130%", scrub: .6 }
    });
  }

  /* ---------- 3. Reveal immagini con clip-path + zoom ---------- */
  document.querySelectorAll(".img-reveal").forEach(el => {
    const img = el.querySelector("img");
    gsap.fromTo(el,
      { clipPath: "inset(12% 9% 12% 9% round 18px)" },
      { clipPath: "inset(0% 0% 0% 0% round 14px)", duration: 1.3, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 78%" } });
    if (img) gsap.fromTo(img, { scale: 1.28 }, {
      scale: 1, duration: 1.6, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 78%" }
    });
  });

  /* Parallax leggero dentro le immagini rivelate */
  document.querySelectorAll(".img-reveal img").forEach(img => {
    gsap.fromTo(img, { yPercent: -6 }, {
      yPercent: 6, ease: "none",
      scrollTrigger: { trigger: img.closest(".img-reveal"), start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  /* ---------- 4. Testi: entrata morbida coreografata ---------- */
  document.querySelectorAll("[data-stagger]").forEach(group => {
    gsap.from(group.children, {
      opacity: 0, y: 34, duration: 1, ease: EASE, stagger: .12,
      scrollTrigger: { trigger: group, start: "top 80%" }
    });
  });

  /* ---------- 5. Numeri con conteggio scrub ---------- */
  document.querySelectorAll("[data-count]").forEach(el => {
    const target = parseFloat(el.dataset.count);
    gsap.fromTo(el, { innerText: 0 }, {
      innerText: target, duration: 1.6, ease: "power2.out",
      snap: { innerText: 1 },
      scrollTrigger: { trigger: el, start: "top 85%" },
      onUpdate(){ el.textContent = Math.round(parseFloat(el.textContent)).toLocaleString("it-IT"); }
    });
  });

  /* ---------- 6. Scritta gigante che scorre con lo scroll ---------- */
  document.querySelectorAll(".bigline-track").forEach(track => {
    const dir = track.closest(".bigline").dataset.dir === "right" ? 1 : -1;
    gsap.fromTo(track, { xPercent: dir * 6 }, {
      xPercent: dir * -22, ease: "none",
      scrollTrigger: { trigger: track.closest(".bigline"), start: "top bottom", end: "bottom top", scrub: .5 }
    });
  });

  /* ---------- 7. Ricalcolo dopo il caricamento delle immagini ---------- */
  addEventListener("load", () => ScrollTrigger.refresh());
})();
