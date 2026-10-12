"use strict";

// Cada objeto describe un producto de la tienda ficticia.
const productos = [
  {
    id: "aud-01",
    nombre: "Audífonos inalámbricos",
    categoria: "audifonos",
    precio: 39.99,
    oferta: true,
    precioAnterior: 49.99,
    imagen: "imagenes/audifonos.png",
    resumen: "Sonido para música y reuniones.",
    descripcion:
      "Audífonos ficticios con Bluetooth, micrófono y batería recargable."
  },
  {
    id: "tec-01",
    nombre: "Teclado compacto",
    categoria: "teclados",
    precio: 29.99,
    oferta: true,
    precioAnterior: 39.99,
    imagen: "imagenes/teclado.png",
    resumen: "Diseño práctico para tu escritorio.",
    descripcion:
      "Teclado ficticio con conexión USB y distribución compacta."
  },
  {
    id: "rat-01",
    nombre: "Ratón inalámbrico",
    categoria: "ratones",
    precio: 19.99,
    imagen: "imagenes/raton.png",
    resumen: "Control para tus actividades diarias.",
    descripcion:
      "Ratón ficticio con receptor USB y rueda de desplazamiento."
  },
  {
    id: "mon-01",
    nombre: "Monitor de 24 pulgadas",
    categoria: "monitores",
    precio: 149.99,
    imagen: "imagenes/monitor.png",
    resumen: "Pantalla para estudiar y trabajar.",
    descripcion:
      "Monitor ficticio con resolución Full HD y conexión HDMI."
  },
  {
    id: "acc-01",
    nombre: "Soporte para computadora portátil",
    categoria: "accesorios",
    precio: 24.99,
    imagen: "imagenes/soporte.png",
    resumen: "Organiza tu computadora sobre el escritorio.",
    descripcion:
      "Soporte ficticio plegable para computadoras portátiles."
  }
];

// Guarda los identificadores y cantidades de los productos elegidos.
const claveCarrito = "tecno-isla-carrito";

function leerCarrito() {
  try {
    const datos = JSON.parse(
      localStorage.getItem(claveCarrito) || "[]"
    );

    if (!Array.isArray(datos)) {
      return [];
    }

    // Comprueba los datos recuperados del almacenamiento.
    return datos.filter((item) => {
      return item &&
        productos.some((producto) => producto.id === item.id) &&
        Number.isInteger(item.cantidad) &&
        item.cantidad >= 1 &&
        item.cantidad <= 20;
    });
  } catch (error) {
    console.error("No se pudo recuperar el carrito:", error);
    return [];
  }
}

let carrito = leerCarrito();

function guardarCarrito() {
  try {
    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
  } catch (error) {
    console.error("No se pudo guardar el carrito:", error);
  }
}

function agregarAlCarrito(idProducto) {
  const itemExistente = carrito.find((item) => {
    return item.id === idProducto;
  });

  if (itemExistente) {
    itemExistente.cantidad = Math.min(
      itemExistente.cantidad + 1,
      20
    );
  } else {
    carrito.push({
      id: idProducto,
      cantidad: 1
    });
  }

  guardarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript de Tecno Isla cargado.");

  const elementoCarrusel = document.querySelector("#carruselTienda");
  const estadoCarrusel = document.querySelector("#estado-carrusel");

  // Las otras páginas no tendrán necesariamente un carrusel.
  if (elementoCarrusel && estadoCarrusel) {
    const totalImagenes =
      elementoCarrusel.querySelectorAll(".carousel-item").length;

    // Crea el carrusel. El usuario cambia las imágenes con los controles.
    const carrusel = new bootstrap.Carousel(elementoCarrusel, {
      interval: false,
      keyboard: true,
      touch: true,
      wrap: true
    });

    // Actualiza el indicador cuando termina una transición.
    elementoCarrusel.addEventListener("slid.bs.carousel", (evento) => {
      const numeroImagen = evento.to + 1;

      estadoCarrusel.textContent =
        `Imagen ${numeroImagen} de ${totalImagenes}`;

      console.log("Imagen activa del carrusel:", numeroImagen);
    });

    console.log("Carrusel inicializado:", carrusel);
  }

  // Construye el catálogo cuando la página contiene su contenedor.
  const listaProductos = document.querySelector("#lista-productos");
  const plantillaProducto = document.querySelector("#plantilla-producto");
  const cantidadProductos = document.querySelector("#cantidad-productos");

  if (listaProductos && plantillaProducto && cantidadProductos) {
    const categoriaActual = document.body.dataset.categoria;

    // filter crea una lista con los productos de la categoría solicitada.
   const productosVisibles = productos.filter((producto) => {
  if (categoriaActual === "ofertas") {
    return producto.oferta === true;
    }

    return categoriaActual === "todos" ||
        producto.categoria === categoriaActual;
    });

    const formatoMoneda = new Intl.NumberFormat("es-PR", {
      style: "currency",
      currency: "USD"
    });

    productosVisibles.forEach((producto) => {
      // Copia la estructura de la tarjeta.
      const tarjetaNueva = plantillaProducto.content.cloneNode(true);

      const imagen = tarjetaNueva.querySelector("img");
      const titulo = tarjetaNueva.querySelector(".card-title");
      const resumen = tarjetaNueva.querySelector(".card-text");
      const precio = tarjetaNueva.querySelector(".precio-producto");
      const boton = tarjetaNueva.querySelector(".btn-detalles");

      imagen.src = producto.imagen;
      imagen.alt = producto.nombre;

      titulo.textContent = producto.nombre;
      resumen.textContent = producto.resumen;
      precio.textContent = formatoMoneda.format(producto.precio);
      if (producto.oferta) {
      const avisoOferta = document.createElement("p");

    avisoOferta.className = "small text-success fw-bold";
    avisoOferta.textContent =
        `Antes: ${formatoMoneda.format(producto.precioAnterior)}. ` +
        `Ahorras: ${formatoMoneda.format(
        producto.precioAnterior - producto.precio
        )}.`;

  precio.after(avisoOferta);
}

      // Estos datos los utiliza la ventana de detalles ya programada.
      boton.dataset.nombre = producto.nombre;
      boton.dataset.precio = producto.precio;
      boton.dataset.descripcion = producto.descripcion;

      listaProductos.appendChild(tarjetaNueva);
    });

    cantidadProductos.textContent =
      `Productos disponibles: ${productosVisibles.length}`;

    console.log("Categoría:", categoriaActual);
    console.log("Productos mostrados:", productosVisibles);
  }

    // Resalta los productos al utilizar el cursor o el teclado.
  const tarjetas = document.querySelectorAll(".tarjeta-producto");

  tarjetas.forEach((tarjeta) => {
    function actualizarResaltado() {
      const estaActiva = tarjeta.matches(":hover, :focus-within");

      tarjeta.classList.toggle("producto-resaltado", estaActiva);
    }

    tarjeta.addEventListener("mouseenter", actualizarResaltado);
    tarjeta.addEventListener("mouseleave", actualizarResaltado);
    tarjeta.addEventListener("focusin", actualizarResaltado);

    tarjeta.addEventListener("focusout", () => {
      requestAnimationFrame(actualizarResaltado);
    });
  });

  // Añade un botón de compra a las tarjetas del inicio y del catálogo.
  document.querySelectorAll(".btn-detalles").forEach((botonDetalles) => {
    const producto = productos.find((item) => {
      return item.nombre === botonDetalles.dataset.nombre;
    });

    if (!producto) {
      return;
    }

    const botonAgregar = document.createElement("button");

    botonAgregar.type = "button";
    botonAgregar.className = "btn btn-outline-primary mt-2";
    botonAgregar.textContent = "Añadir al carrito";

    const mensaje = document.createElement("p");
    mensaje.className = "small text-success mt-2 mb-0";
    mensaje.setAttribute("role", "status");

    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto.id);

      mensaje.textContent =
        `${producto.nombre} añadido. Máximo: 20 unidades por producto.`;
    });

    botonDetalles.after(botonAgregar);
    botonAgregar.after(mensaje);
  });

  // Prepara la ventana de detalles si existe en esta página.
  const elementoModal = document.querySelector("#modalProducto");

  if (elementoModal) {
    const modalProducto = new bootstrap.Modal(elementoModal);
    const tituloModal = document.querySelector("#tituloModalProducto");
    const descripcionModal =
      document.querySelector("#descripcionModalProducto");
    const precioModal = document.querySelector("#precioModalProducto");

    let ultimoBoton = null;

    const formatoPrecio = new Intl.NumberFormat("es-PR", {
      style: "currency",
      currency: "USD"
    });

    document.querySelectorAll(".btn-detalles").forEach((boton) => {
      boton.addEventListener("click", () => {
        ultimoBoton = boton;

        tituloModal.textContent = boton.dataset.nombre;
        descripcionModal.textContent = boton.dataset.descripcion;

        precioModal.textContent = formatoPrecio.format(
          Number(boton.dataset.precio)
        );

        modalProducto.show();

        console.log("Producto seleccionado:", boton.dataset.nombre);
      });
    });

    // Devuelve el foco al botón utilizado al cerrar los detalles.
    elementoModal.addEventListener("hidden.bs.modal", () => {
      if (ultimoBoton) {
        ultimoBoton.focus();
      }
    });
  }

    const listaCarrito = document.querySelector("#lista-carrito");
  const plantillaCarrito = document.querySelector("#plantilla-carrito");
  const totalCarrito = document.querySelector("#total-carrito");
  const mensajeVacio = document.querySelector("#carrito-vacio");
  const botonVaciar = document.querySelector("#vaciar-carrito");

  if (
    listaCarrito &&
    plantillaCarrito &&
    totalCarrito &&
    mensajeVacio &&
    botonVaciar
  ) {
    const moneda = new Intl.NumberFormat("es-PR", {
      style: "currency",
      currency: "USD"
    });

    function mostrarCarrito() {
      listaCarrito.replaceChildren();

      let totalCentavos = 0;

      carrito.forEach((item) => {
        const producto = productos.find((producto) => {
          return producto.id === item.id;
        });

        const copia = plantillaCarrito.content.cloneNode(true);

        const nombre = copia.querySelector(".nombre-carrito");
        const precio = copia.querySelector(".precio-carrito");
        const cantidad = copia.querySelector(".cantidad-carrito");
        const etiqueta = copia.querySelector("label");
        const subtotal = copia.querySelector(".subtotal-carrito");
        const eliminar = copia.querySelector(".eliminar-carrito");

        const subtotalCentavos =
          Math.round(producto.precio * 100) * item.cantidad;

        totalCentavos += subtotalCentavos;

        nombre.textContent = producto.nombre;
        precio.textContent =
          `Precio unitario: ${moneda.format(producto.precio)}`;

        cantidad.id = `cantidad-${producto.id}`;
        etiqueta.htmlFor = cantidad.id;
        cantidad.value = item.cantidad;

        subtotal.textContent =
          `Subtotal: ${moneda.format(subtotalCentavos / 100)}`;

        cantidad.addEventListener("change", () => {
          const nuevaCantidad = Number(cantidad.value);

          if (
            !Number.isInteger(nuevaCantidad) ||
            nuevaCantidad < 1 ||
            nuevaCantidad > 20
          ) {
            cantidad.value = item.cantidad;
            cantidad.setCustomValidity(
              "Escribe un número entero entre 1 y 20."
            );
            cantidad.reportValidity();
            return;
          }

          cantidad.setCustomValidity("");
          item.cantidad = nuevaCantidad;

          guardarCarrito();
          mostrarCarrito();

          document.querySelector(`#cantidad-${producto.id}`).focus();
        });

        cantidad.addEventListener("input", () => {
          cantidad.setCustomValidity("");
        });

        eliminar.addEventListener("click", () => {
          carrito = carrito.filter((itemCarrito) => {
            return itemCarrito.id !== producto.id;
          });

          guardarCarrito();
          mostrarCarrito();
          botonVaciar.focus();
        });

        listaCarrito.appendChild(copia);
      });

      totalCarrito.textContent = moneda.format(totalCentavos / 100);
      mensajeVacio.hidden = carrito.length > 0;
      botonVaciar.disabled = carrito.length === 0;
    }

    botonVaciar.addEventListener("click", () => {
      carrito = [];
      guardarCarrito();
      mostrarCarrito();
    });

    mostrarCarrito();
  }
});