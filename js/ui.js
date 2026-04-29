// ============================================================
//  js/ui.js
//  Responsabilidad única: manejar interacciones del DOM.
//  El HTML ya existe — JS solo agrega comportamiento encima.
// ============================================================

var UI = (function () {

  // ── Navbar: sombra al hacer scroll ─────────────────────────

  function initNavbarScroll() {
    var navbar = document.getElementById("navbar");
    if (!navbar) return;

    window.addEventListener("scroll", function () {
      navbar.classList.toggle("navbar--scrolled", window.scrollY > 10);
    });
  }

  // ── Menú móvil ─────────────────────────────────────────────

  function initMobileMenu() {
    var btn  = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!btn || !menu) return;

    function close() {
      menu.classList.remove("is-open");
      btn.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      btn.classList.toggle("is-open", isOpen);
      btn.setAttribute("aria-expanded", String(isOpen));
    });

    // Cerrar al pulsar un enlace
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });

    // Cerrar al pulsar fuera
    document.addEventListener("click", function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) close();
    });
  }

  // ── Toggle de tema ─────────────────────────────────────────

  function initThemeToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    function updateIcon(theme) {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", theme === "dark" ? "Activar modo claro" : "Activar modo oscuro");
    }

    updateIcon(Theme.getCurrent());

    btn.addEventListener("click", function () {
      updateIcon(Theme.toggle());
    });
  }

  // ── Año dinámico en el footer ──────────────────────────────

  function initYear() {
    var el = document.getElementById("current-year");
    if (el) el.textContent = new Date().getFullYear();
  }

  // ── Animaciones de entrada ─────────────────────────────────

  function initScrollAnimations() {
    var targets = document.querySelectorAll(".exp-card, .proj-card, .hero__left, .hero__right, .contact__inner");

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach(function (el) {
      el.classList.add("fade-in");
      observer.observe(el);
    });
  }

  // ── Init público ────────────────────────────────────────────

  function init() {
    initNavbarScroll();
    initMobileMenu();
    initThemeToggle();
    initYear();
    initScrollAnimations();
  }

  return { init: init };

})();
