document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("destinos-list");

  function renderDestinos(destinos) {
    destinos.forEach(destino => {
      const article = document.createElement("article");
      article.className = "destino-card";

      const img = document.createElement("img");
      img.src = destino.imagen || "";
      img.alt = destino.ciudad;

      const badge = document.createElement("div");
      badge.className = "destino-badge";
      badge.textContent = destino.pais;

      const content = document.createElement("div");
      content.className = "destino-content";

      const h4 = document.createElement("h4");
      h4.textContent = destino.ciudad;

      const info = document.createElement("div");
      info.className = "destino-info";
      info.innerHTML = `
        <div class="info-item">
          <span class="info-icon">⏱️</span>
          <span class="info-text">${destino.duracion}</span>
        </div>
        <div class="info-item">
          <span class="info-icon">📏</span>
          <span class="info-text">${destino.distancia} km</span>
        </div>
      `;

      const description = document.createElement("p");
      description.className = "destino-description";
      description.textContent = destino.descripcion;

      const flightDetails = document.createElement("div");
      flightDetails.className = "flight-details";

      const escalasText = destino.escalas === 0
        ? "Vuelo directo"
        : destino.escalas === 1
          ? `1 escala: ${destino.escalasCiudades.join(", ")}`
          : `${destino.escalas} escalas: ${destino.escalasCiudades.join(", ")}`;

      flightDetails.innerHTML = `
        <div class="detail-row">
          <span class="detail-label">✈️ Aeronave:</span>
          <span class="detail-value">${destino.avion}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">🛬 Escalas:</span>
          <span class="detail-value">${escalasText}</span>
        </div>
      `;

      const price = document.createElement("div");
      price.className = "destino-price";
      price.innerHTML = `
        <span class="price-label">Desde</span>
        <span class="price-value">$${destino.precio.toLocaleString("es-CO")}</span>
        <span class="price-currency">COP</span>
      `;

      content.appendChild(h4);
      content.appendChild(info);
      content.appendChild(description);
      content.appendChild(flightDetails);
      content.appendChild(price);

      article.appendChild(img);
      article.appendChild(badge);
      article.appendChild(content);

      container.appendChild(article);
    });
  }

  fetch("data/destinos.json")
    .then(res => res.json())
    .then(data => renderDestinos(data))
    .catch(err => {
      container.innerHTML = "<p class='error-message'>No se pudieron cargar los destinos.</p>";
      console.error(err);
    });
});