document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

  const validUsers = [
    { username: "admin", password: "1234" },
    { username: "makina", password: "rey2025" } // puedes agregar más
  ];

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    const isValid = validUsers.some(
      user => user.username === username && user.password === password
    );

    if (isValid) {
      errorMessage.textContent = "";
      window.location.href = "index.html"; // ruta corregida si index está en /structure
    } else {
      errorMessage.textContent = "⚠️ Usuario o contraseña incorrectos.";
      errorMessage.classList.add("error");
      usernameInput.classList.add("input-error");
      passwordInput.classList.add("input-error");
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