// ============================================================
//  js/theme.js
//  Responsabilidad única: manejar el tema claro/oscuro.
// ============================================================

var Theme = (function () {

  var STORAGE_KEY = "nv-theme";

  function getInitialTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function getCurrent() {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  }

  function toggle() {
    var next = getCurrent() === "dark" ? "light" : "dark";
    apply(next);
    return next;
  }

  function init() {
    apply(getInitialTheme());
  }

  return { init: init, toggle: toggle, getCurrent: getCurrent };

})();
