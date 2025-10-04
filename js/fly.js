document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("fly-list");

  function renderFleet(fleet) {
    fleet.forEach(vehicle => {
      const article = document.createElement("article");
      article.className = "fleet-card";

      // Imagen
      const img = document.createElement("img");
      img.src = vehicle.imagen || "";
      img.alt = vehicle.nombre;

      // Contenedor de contenido
      const content = document.createElement("div");
      content.className = "fleet-content";

      // Nombre
      const h4 = document.createElement("h4");
      h4.textContent = vehicle.nombre;

      // Stats (capacidad y en servicio)
      const stats = document.createElement("div");
      stats.className = "fleet-stats";
      stats.innerHTML = `
        <div class="stat">
          <span class="stat-icon">👥</span>
          <div class="stat-info">
            <span class="stat-label">Capacidad</span>
            <span class="stat-value">${vehicle.capacidad} pasajeros</span>
          </div>
        </div>
        <div class="stat">
          <span class="stat-icon">✈️</span>
          <div class="stat-info">
            <span class="stat-label">En servicio</span>
            <span class="stat-value">${vehicle["En servicio"]} unidades</span>
          </div>
        </div>
      `;

      // Descripción
      const description = document.createElement("p");
      description.className = "fleet-description";
      description.textContent = vehicle.descripcion;

      // Servicios
      const servicesDiv = document.createElement("div");
      servicesDiv.className = "fleet-services";
      servicesDiv.innerHTML = '<h5>Servicios incluidos</h5><ul>' +
        vehicle.servicios.map(s => `<li><span class="check">✓</span> ${s}</li>`).join('') +
        '</ul>';

      // Ensamblar todo
      content.appendChild(h4);
      content.appendChild(stats);
      content.appendChild(description);
      content.appendChild(servicesDiv);

      article.appendChild(img);
      article.appendChild(content);

      container.appendChild(article);
    });
  }

  fetch("data/fly.json")
    .then(res => res.json())
    .then(data => renderFleet(data))
    .catch(err => {
      container.innerHTML = "<p class='error-message'>No se pudo cargar la flota.</p>";
      console.error(err);
    });
});