// Activa los mensajes visuales de validación de Bootstrap.
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector(".needs-validation");

  if (!formulario) {
    console.error("No se encontró el formulario.");
    return;
  }

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    evento.stopPropagation();

    formulario.classList.add("was-validated");

    if (formulario.checkValidity()) {
      alert("El formulario contiene información válida.");
    }
  });
});