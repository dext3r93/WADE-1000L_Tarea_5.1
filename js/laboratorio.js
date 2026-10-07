"use strict";

// Elemento donde aparecerán los resultados.
const resultado = document.querySelector("#resultado");

// Función reutilizable para mostrar información.
function mostrarResultado(titulo, contenido) {
  resultado.innerHTML = `
    <h3 class="h5">${titulo}</h3>
    ${contenido}
  `;
}

// Variables con diferentes tipos de datos.
const nombreEstudiante = "Emmanuel";
const puntuacion = 95;
const laboratorioCompletado = true;
const fechaEntrega = null;
let comentario;

// Botón para demostrar variables y tipos de datos.
const botonVariables = document.querySelector("#btn-variables");

botonVariables.addEventListener("click", () => {
  const contenido = `
    <ul class="mb-0">
      <li>Nombre: ${nombreEstudiante}</li>
      <li>Tipo del nombre: ${typeof nombreEstudiante}</li>
      <li>Puntuación: ${puntuacion}</li>
      <li>Tipo de la puntuación: ${typeof puntuacion}</li>
      <li>Laboratorio completado: ${laboratorioCompletado}</li>
      <li>Tipo del estado: ${typeof laboratorioCompletado}</li>
      <li>Fecha de entrega: ${fechaEntrega}</li>
      <li>Comentario: ${comentario}</li>
    </ul>
  `;

  mostrarResultado("Variables y tipos de datos", contenido);

  console.log("Nombre:", nombreEstudiante);
  console.log("Puntuación:", puntuacion);
  console.log("Laboratorio completado:", laboratorioCompletado);
  console.log("Fecha de entrega:", fechaEntrega);
  console.log("Comentario:", comentario);
});

// Arreglo que almacena varios proyectos.
const proyectos = [
  "Restaurante Sabor Isleño",
  "Café del Patio",
  "Luz Caribeña"
];

// Objeto que agrupa información relacionada.
const estudiante = {
  nombre: "Emmanuel Figueroa Serrano",
  curso: "WADE 1000L",
  laboratorio: "6.1",
  activo: true
};

// Botón para demostrar arreglos y objetos.
const botonColecciones = document.querySelector("#btn-colecciones");

botonColecciones.addEventListener("click", () => {
  const contenido = `
    <p><strong>Primer proyecto:</strong> ${proyectos[0]}</p>

    <p>
      <strong>Cantidad de proyectos:</strong>
      ${proyectos.length}
    </p>

    <p><strong>Estudiante:</strong> ${estudiante.nombre}</p>
    <p><strong>Curso:</strong> ${estudiante.curso}</p>
    <p><strong>Laboratorio:</strong> ${estudiante.laboratorio}</p>
    <p class="mb-0">
      <strong>Activo:</strong> ${estudiante.activo}
    </p>
  `;

  mostrarResultado("Arreglo y objeto", contenido);

  console.log("Arreglo de proyectos:", proyectos);
  console.log("Objeto del estudiante:", estudiante);
});

// Función que utiliza if, else if y else.
function clasificarPuntuacion(valor) {
  if (valor >= 90) {
    return "Resultado excelente";
  } else if (valor >= 70) {
    return "Resultado satisfactorio";
  } else {
    return "El resultado necesita mejorar";
  }
}

const campoPuntuacion = document.querySelector("#puntuacion");
const botonEvaluar = document.querySelector("#btn-evaluar");

botonEvaluar.addEventListener("click", () => {
  const valor = Number(campoPuntuacion.value);

  // Comprueba si el campo está vacío o fuera del intervalo permitido.
  if (
    campoPuntuacion.value === "" ||
    valor < 0 ||
    valor > 100
  ) {
    mostrarResultado(
      "Error",
      "<p class='mb-0'>Escribe un número entre 0 y 100.</p>"
    );

    console.log("La puntuación no es válida.");
    return;
  }

  const clasificacion = clasificarPuntuacion(valor);

  mostrarResultado(
    "Evaluación de la puntuación",
    `
      <p><strong>Puntuación:</strong> ${valor}</p>
      <p class="mb-0">
        <strong>Clasificación:</strong> ${clasificacion}
      </p>
    `
  );

  console.log("Puntuación evaluada:", valor);
  console.log("Clasificación:", clasificacion);
});

// Función que demuestra los bucles for, while y do...while.
function ejecutarBucles() {
  let listaProyectos = "";

  // Bucle for para recorrer el arreglo de proyectos.
  for (let indice = 0; indice < proyectos.length; indice++) {
    listaProyectos += `
      <li>
        Proyecto ${indice + 1}: ${proyectos[indice]}
      </li>
    `;

    console.log(
      `FOR, proyecto ${indice + 1}: ${proyectos[indice]}`
    );
  }

    let contadorWhile = 1;
  let resultadoWhile = "";

  // Bucle while. Se ejecuta mientras la condición sea verdadera.
  while (contadorWhile <= 3) {
    resultadoWhile += `
      <li>Repetición while número ${contadorWhile}</li>
    `;

    console.log(
      `WHILE, repetición número ${contadorWhile}`
    );

    contadorWhile++;
  }

    let contadorDoWhile = 1;
  let resultadoDoWhile = "";

  // Bucle do...while. Ejecuta el bloque antes de comprobar la condición.
  do {
    resultadoDoWhile += `
      <li>Repetición do...while número ${contadorDoWhile}</li>
    `;

    console.log(
      `DO...WHILE, repetición número ${contadorDoWhile}`
    );

    contadorDoWhile++;
  } while (contadorDoWhile <= 3);

    return `
    <h4 class="h6">Resultado del bucle for</h4>
    <ul>${listaProyectos}</ul>

    <h4 class="h6">Resultado del bucle while</h4>
    <ul>${resultadoWhile}</ul>

    <h4 class="h6">Resultado del bucle do...while</h4>
    <ul class="mb-0">${resultadoDoWhile}</ul>
  `;
}

const botonBucles = document.querySelector("#btn-bucles");

botonBucles.addEventListener("click", () => {
  const contenido = ejecutarBucles();

  mostrarResultado(
    "Demostración de bucles",
    contenido
  );
});

// Variable global. Está disponible en todo el archivo.
const mensajeGlobal = "Soy una variable de alcance global.";

function demostrarAlcance() {
  // Variable local. Solo existe dentro de esta función.
  const mensajeLocal = "Soy una variable de alcance local.";

  let mensajeDelBloque = "";

  if (true) {
    // Esta variable solo existe dentro del bloque if.
    const mensajeBloque = "Soy una variable de alcance de bloque.";

    mensajeDelBloque = mensajeBloque;

    console.log("Dentro del bloque:", mensajeBloque);
  }

  console.log("Variable global:", mensajeGlobal);
  console.log("Variable local:", mensajeLocal);

  return `
    <ul class="mb-0">
      <li>${mensajeGlobal}</li>
      <li>${mensajeLocal}</li>
      <li>${mensajeDelBloque}</li>
    </ul>

    <p class="mt-3 mb-0">
      La variable de bloque fue utilizada dentro del bloque
      <code>if</code>. Fuera de ese bloque ya no está disponible.
    </p>
  `;
}

const botonAlcance = document.querySelector("#btn-alcance");

botonAlcance.addEventListener("click", () => {
  const contenido = demostrarAlcance();

  mostrarResultado(
    "Alcance de las variables",
    contenido
  );
});

// Esta función crea y devuelve otra función.
function crearContador() {
  let cantidad = 0;

  // La función interna conserva acceso a cantidad.
  return function incrementar() {
    cantidad++;
    return cantidad;
  };
}

// incrementarContador conserva la variable cantidad.
const incrementarContador = crearContador();

const botonContador = document.querySelector("#btn-contador");

botonContador.addEventListener("click", () => {
  const cantidadActual = incrementarContador();

  mostrarResultado(
    "Clausura en JavaScript",
    `
      <p>
        Has oprimido el botón
        <strong>${cantidadActual}</strong>
        veces.
      </p>

      <p class="mb-0">
        La función interna recuerda el valor anterior de
        <code>cantidad</code>.
      </p>
    `
  );

  console.log(
    "Valor conservado por la clausura:",
    cantidadActual
  );
});