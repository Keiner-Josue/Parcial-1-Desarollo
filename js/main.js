document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-list");
  const template = document.getElementById("product-template");

  function renderProducts(products) {
    products.forEach(product => {
      const clone = template.content.cloneNode(true);

      clone.querySelector("img").src = product.imagen || "";
      clone.querySelector("h3").textContent = product.nombre || "Sin nombre";
      clone.querySelector(".description").textContent = product.descripcion || "Sin descripción";
      clone.querySelector(".price").textContent = product.precio
        ? `$${product.precio.toLocaleString("es-CO")} COP`
        : "Precio no disponible";

      container.appendChild(clone);
    });
  }

  fetch("data/products.json") 
    .then(res => res.json())
    .then(data => renderProducts(data))
    .catch(err => {
      container.innerHTML = "<p style='color:red;'>No se pudieron cargar los productos.</p>";
      console.error(err);
    });
});