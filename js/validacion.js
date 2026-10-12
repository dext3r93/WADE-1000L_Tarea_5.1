"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#formulario-contacto");
  const notificacion = document.querySelector("#notificacion-contacto");

  if (!formulario || !notificacion) {
    return;
  }

  const campos = [
    document.querySelector("#nombre"),
    document.querySelector("#correo"),
    document.querySelector("#mensaje")
  ];

  function validarCampo(campo) {
    const valor = campo.value.trim();
    let mensajeError = "";

    campo.setCustomValidity("");

    if (valor === "") {
      mensajeError = "Este campo es obligatorio.";
    } else if (campo.id === "nombre" && valor.length < 2) {
      mensajeError = "Escribe al menos dos caracteres.";
    } else if (
      campo.id === "correo" &&
      campo.validity.typeMismatch
    ) {
      mensajeError = "Escribe un correo como nombre@correo.com.";
    } else if (campo.id === "mensaje" && valor.length < 10) {
      mensajeError = "Escribe un mensaje de al menos diez caracteres.";
    } else if (!campo.checkValidity()) {
      mensajeError = "Revisa el contenido de este campo.";
    }

    campo.setCustomValidity(mensajeError);

    const esValido = mensajeError === "";

    campo.classList.toggle("is-valid", esValido);
    campo.classList.toggle("is-invalid", !esValido);
    campo.setAttribute("aria-invalid", String(!esValido));

    document.querySelector(`#error-${campo.id}`).textContent =
      mensajeError;

    return esValido;
  }

  campos.forEach((campo) => {
    campo.addEventListener("input", () => {
      notificacion.hidden = true;
      validarCampo(campo);
    });

    campo.addEventListener("blur", () => {
      validarCampo(campo);
    });
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // Valida todos los campos, incluso si el primero tiene errores.
    const resultados = campos.map(validarCampo);
    const formularioValido = resultados.every(Boolean);

    notificacion.hidden = !formularioValido;

    if (!formularioValido) {
      const primerCampoIncorrecto = campos.find((campo) => {
        return campo.classList.contains("is-invalid");
      });

      primerCampoIncorrecto.focus();
    }

    console.log("Formulario válido:", formularioValido);
  });
});