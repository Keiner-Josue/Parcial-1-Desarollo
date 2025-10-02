document.addEventListener("DOMContentLoaded", () => {
  const loadFragment = (id, url) => {
    fetch(url)
      .then(res => res.text())
      .then(html => {
        document.getElementById(id).innerHTML = html;
      })
      .catch(err => {
        console.error(`Error al cargar ${url}:`, err);
      });
  };

  loadFragment("header", "structure/header.html");
  loadFragment("sidebar", "structure/sidebar.html");
  loadFragment("footer", "structure/footer.html");
});