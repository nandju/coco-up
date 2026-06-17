/* =========================================================
   Coco'Up — Premium multi-page site
   assets/js/script.js  (Vanilla JS — no framework)
   Modules:
   1. Loader d'entrée
   2. Dark mode (auto + toggle persistant)
   3. Header sticky + scroll progress bar
   4. Menu mobile (drawer)
   5. Scroll reveal (IntersectionObserver)
   6. Count-up statistiques
   7. Parallax léger
   8. Back to top
   9. Lazy loading (fallback)
   10. Active nav link
   11. FAQ accordéon + recherche
   12. Filtres produits
   13. Validation formulaire contact
   ========================================================= */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Loader d'entrée ---------- */
  window.addEventListener("load", () => {
    const loader = $("#loader");
    if (loader) setTimeout(() => loader.classList.add("hidden"), 350);
  });

  /* ---------- 2. Dark mode ---------- */
  const root = document.documentElement;
  const THEME_KEY = "cocoup-theme";

  const renderIcons = () => { if (window.lucide && typeof window.lucide.createIcons === "function") window.lucide.createIcons(); };

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    $$(".theme-toggle").forEach((b) => {
      b.innerHTML = `<i data-lucide="${theme === "dark" ? "sun" : "moon"}"></i>`;
      b.setAttribute("aria-label", theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre");
    });
    renderIcons();
  };

  // Initial: stored choice, else system preference (automatique)
  const stored = localStorage.getItem(THEME_KEY);
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(stored || (systemDark ? "dark" : "light"));

  // Follow system changes if the user hasn't chosen manually
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? "dark" : "light");
  });

  document.addEventListener("click", (e) => {
    const toggle = e.target.closest(".theme-toggle");
    if (!toggle) return;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });

  /* ---------- 3. Header sticky + progress bar ---------- */
  const header = $("#header");
  const progress = $("#progress-bar");
  const backToTop = $("#back-to-top");

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 20);
    if (backToTop) backToTop.classList.toggle("show", y > 500);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 4. Menu mobile (drawer) ---------- */
  const hamburger = $("#hamburger");
  const navMenu = $("#navMenu");
  const overlay = $("#drawerOverlay");

  const closeMenu = () => {
    if (!hamburger) return;
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    overlay && overlay.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle("active");
    hamburger.classList.toggle("active", isOpen);
    overlay && overlay.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
    overlay && overlay.addEventListener("click", closeMenu);
    navMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- 5. Scroll reveal ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${(i % 4) * 90}ms`;
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 6. Count-up statistiques ---------- */
  const counters = $$(".stat__num[data-count]");
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1500;
    const start = performance.now();
    if (target === 0) { el.textContent = "0" + suffix; return; }
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && "IntersectionObserver" in window) {
    const so = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => so.observe(c));
  } else {
    counters.forEach((c) => { c.textContent = (c.dataset.count || "0") + (c.dataset.suffix || ""); });
  }

  /* ---------- 7. Parallax léger (hero blobs) ---------- */
  const blobs = $$(".hero__blob");
  if (blobs.length && !prefersReduced) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          blobs.forEach((b, i) => { b.style.transform = `translateY(${y * (i % 2 === 0 ? 0.15 : -0.1)}px)`; });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- 8. Back to top ---------- */
  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- 9. Lazy loading fallback ---------- */
  // Native loading="lazy" is used in markup; this is a fallback for older browsers.
  if (!("loading" in HTMLImageElement.prototype) && "IntersectionObserver" in window) {
    const lazyImgs = $$('img[loading="lazy"][data-src]');
    const lo = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.src = entry.target.dataset.src; obs.unobserve(entry.target); }
      });
    });
    lazyImgs.forEach((img) => lo.observe(img));
  }

  /* ---------- 10. Active nav link ---------- */
  const path = location.pathname.split("/").pop() || "index.html";
  $$(".nav__link").forEach((link) => {
    const href = (link.getAttribute("href") || "").split("/").pop();
    if (href === path || (path === "index.html" && href === "")) link.classList.add("active");
  });

  /* ---------- 11. FAQ accordéon + recherche ---------- */
  const accItems = $$(".accordion__item");
  accItems.forEach((item) => {
    const header = $(".accordion__header", item);
    const body = $(".accordion__body", item);
    if (!header || !body) return;
    header.setAttribute("aria-expanded", "false");
    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // close all (single-open accordion)
      accItems.forEach((it) => {
        it.classList.remove("open");
        const b = $(".accordion__body", it);
        const h = $(".accordion__header", it);
        if (b) b.style.maxHeight = null;
        if (h) h.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
        header.setAttribute("aria-expanded", "true");
      }
    });
  });

  const faqSearch = $("#faqSearch");
  if (faqSearch) {
    const empty = $("#faqEmpty");
    faqSearch.addEventListener("input", () => {
      const q = faqSearch.value.trim().toLowerCase();
      let visible = 0;
      accItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const match = text.includes(q);
        item.style.display = match ? "" : "none";
        if (match) visible++;
      });
      if (empty) empty.style.display = visible === 0 ? "block" : "none";
    });
  }

  /* ---------- 12. Filtres produits ---------- */
  const filterBtns = $$(".filter-btn");
  if (filterBtns.length) {
    const items = $$("[data-category]");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.filter;
        items.forEach((item) => {
          const show = cat === "all" || item.dataset.category === cat;
          item.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* ---------- 13. Validation formulaire contact ---------- */
  const form = $("#contactForm");
  if (form) {
    const setError = (group, on) => group && group.classList.toggle("invalid", on);
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const name = $("#name");
      const email = $("#email");
      const message = $("#message");

      const nameOk = name.value.trim().length >= 2;
      setError(name.closest(".form-group"), !nameOk);
      valid = valid && nameOk;

      const emailOk = emailRe.test(email.value.trim());
      setError(email.closest(".form-group"), !emailOk);
      valid = valid && emailOk;

      const msgOk = message.value.trim().length >= 10;
      setError(message.closest(".form-group"), !msgOk);
      valid = valid && msgOk;

      if (valid) {
        const success = $("#formSuccess");
        if (success) {
          success.classList.add("show");
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        form.reset();
        // Optionnel : ouvrir WhatsApp pré-rempli avec le message
        const wa = form.dataset.whatsapp;
        if (wa) {
          const txt = encodeURIComponent(`Bonjour Coco'Up, je suis ${name.value || ""}. ${message.value || ""}`);
          setTimeout(() => window.open(`https://wa.me/${wa}?text=${txt}`, "_blank"), 600);
        }
      }
    });

    // Clear error on input
    form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("input", () => setError(field.closest(".form-group"), false));
    });
  }
})();
