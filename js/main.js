document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-list");
  const template = document.getElementById("product-template");

  if (!container || !template) return; // seguridad: si no existe, no rompe

  function renderProducts(products) {
    container.innerHTML = ""; // limpio antes de renderizar
    products.forEach(product => {
      const clone = template.content.cloneNode(true);

      clone.querySelector("img").src = product.imagen || "img/default.jpg";
      clone.querySelector("img").alt = product.nombre || "Destino";
      clone.querySelector("h3").textContent = product.nombre || "Sin nombre";
      clone.querySelector(".description").textContent = product.descripcion || "Sin descripción";
      clone.querySelector(".price").textContent = product.precio
        ? `$${product.precio.toLocaleString("es-CO")} COP`
        : "Precio no disponible";

      container.appendChild(clone);
    });
  }

  fetch("data/products.json")
    .then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return res.json();
    })
    .then(data => renderProducts(data))
    .catch(err => {
      container.innerHTML = "<p style='color:red;'>No se pudieron cargar los productos.</p>";
      console.error("Error cargando productos:", err);
    });
});
