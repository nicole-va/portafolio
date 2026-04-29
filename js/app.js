// ============================================================
//  js/app.js
//  Punto de entrada. Inicializa tema e interacciones.
//  El HTML ya está en index.html — aquí solo se activan
//  las funcionalidades que JS agrega encima.
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  Theme.init();  // primero el tema (evita flash de color incorrecto)
  UI.init();     // luego los eventos e interacciones
});
