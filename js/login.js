// login.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

  const validUsers = [
    { username: "admin", password: "1234" },
    { username: "makina", password: "rey2025" }
  ];

  form.addEventListener("submit", e => {
    e.preventDefault();

    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    const isValid = validUsers.some(
      user => user.username === username && user.password === password
    );

    if (isValid) {
      // Guardar sesión
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("usuario", username);

      // Redirigir al inicio (index.html en la misma carpeta del login)
      window.location.href = "index.html";
    } else {
      errorMessage.textContent = "⚠️ Usuario o contraseña incorrectos.";
      errorMessage.classList.add("error");

      [usernameInput, passwordInput].forEach(i =>
        i.classList.add("input-error")
      );
    }
  });

  [usernameInput, passwordInput].forEach(input => {
    input.addEventListener("input", () => {
      errorMessage.textContent = "";
      errorMessage.classList.remove("error");
      input.classList.remove("input-error");
    });
  });
});
