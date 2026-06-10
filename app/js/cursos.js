/**
 Rol 2: Catálogo de Cursos
 Academia Nexus — Ambiente Web Cliente Servidor
 Responsable: Emmanuel Montoya
 *
 Funcionalidades tarea
 1. Array de cursos con sus datos
 2. Renderizado dinámico de tarjetas al cargar la página
 3. Búsqueda en tiempo real por nombre o descripción (evento input)
 4. Filtrado por categoría mediante botones
 5. Ambos filtros combinados simultáneamente
 6. Uso de filter() y forEach() para la lógica de filtrado
*/

//Array de cursos con sus datos (nombre, descripción, categoría, duración, precio, imagen y 
// clase de thumbnail)
const cursos = [
  {
    nombre: "Desarrollo Web Full Stack",
    descripcion: "Aprende HTML, CSS, JavaScript, Node.js, Express y PostgreSQL para construir aplicaciones web completas de principio a fin.",
    categoria: "tecnologia",
    duracion: "6 meses",
    precio: "₡89,000",
    imagen: "img/curso-fullstack.jpg",
    thumbClass: "t1"
  },
  {
    nombre: "Python para Ciencia de Datos",
    descripcion: "Análisis de datos, visualización con Matplotlib y Pandas, introducción a Machine Learning con Scikit-Learn.",
    categoria: "tecnologia",
    duracion: "4 meses",
    precio: "₡75,000",
    imagen: "img/curso-python.jpg",
    thumbClass: "t2"
  },
  {
    nombre: "Cloud Computing con AWS",
    descripcion: "Despliega aplicaciones en la nube, gestiona servicios EC2, S3, RDS y prepárate para la certificación AWS.",
    categoria: "tecnologia",
    duracion: "3 meses",
    precio: "₡95,000",
    imagen: "img/curso-aws.jpg",
    thumbClass: "t3"
  },
  {
    nombre: "Diseño UX/UI con Figma",
    descripcion: "Diseña interfaces centradas en el usuario, crea prototipos interactivos y aprende a realizar pruebas de usabilidad.",
    categoria: "diseno",
    duracion: "3 meses",
    precio: "₡68,000",
    imagen: "img/curso-uxui.jpg",
    thumbClass: "t4"
  },
  {
    nombre: "Diseño Gráfico Digital",
    descripcion: "Domina Adobe Photoshop, Illustrator e InDesign para crear piezas gráficas profesionales para medios digitales e impresos.",
    categoria: "diseno",
    duracion: "4 meses",
    precio: "₡72,000",
    imagen: "img/curso-grafico.jpg",
    thumbClass: "t5"
  },
  {
    nombre: "Animación y Motion Graphics",
    descripcion: "Crea animaciones impactantes con After Effects, aprende principios de animación y produce contenido para redes sociales.",
    categoria: "diseno",
    duracion: "3 meses",
    precio: "₡80,000",
    imagen: "img/curso-motion.jpg",
    thumbClass: "t6"
  }
];

// Array de categorías con su id, título, etiqueta y clase de ícono de Bootstrap Icons
const categorias = [
  {
    id: "tecnologia",
    titulo: "Tecnología y Programación",
    etiqueta: "Tecnología",
    iconoClass: "bi bi-laptop"
  },
  {
    id: "diseno",
    titulo: "Diseño y Creatividad",
    etiqueta: "Diseño",
    iconoClass: "bi bi-palette"
  }
];

// Objeto para almacenar los filtros actuales (texto de búsqueda y categoría seleccionada)
const filtros = {
  texto: "",
  categoria: "todas"
};

//función para crear una tarjeta de curso a partir de un objeto curso
function crearTarjeta(curso) {
  const card = document.createElement("div");
  card.classList.add("catalog-card");
  card.setAttribute("data-categoria", curso.categoria);
  card.setAttribute("data-nombre", curso.nombre.toLowerCase());
  card.setAttribute("data-descripcion", curso.descripcion.toLowerCase());

  // Thumbnail superior de la tarjeta
  const thumb = document.createElement("div");
  thumb.classList.add("catalog-card-thumb", curso.thumbClass);

  const tag = document.createElement("span");
  tag.classList.add("card-category-tag");
  tag.textContent = categorias.find(c => c.id === curso.categoria)?.etiqueta || curso.categoria;

  thumb.appendChild(tag);

  // Cuerpo de la tarjeta
  const body = document.createElement("div");
  body.classList.add("catalog-card-body");

  const titulo = document.createElement("h3");
  titulo.textContent = curso.nombre;

  const desc = document.createElement("p");
  desc.textContent = curso.descripcion;

  const meta = document.createElement("div");
  meta.classList.add("card-meta");

  const duracion = document.createElement("span");
  duracion.classList.add("duration");

  // Bootstrap Icon para la duración
  duracion.innerHTML = '<i class="bi bi-clock"></i> ' + curso.duracion;

  const precio = document.createElement("span");
  precio.classList.add("price");
  precio.textContent = curso.precio;

  meta.appendChild(duracion);
  meta.appendChild(precio);

  body.appendChild(titulo);
  body.appendChild(desc);
  body.appendChild(meta);

  card.appendChild(thumb);
  card.appendChild(body);

  return card;
}

//función para renderizar el catálogo completo de cursos agrupados por categoría
function renderizarCatalogo() {
  const catalogSection = document.querySelector(".catalog-section");
  catalogSection.innerHTML = "";

  categorias.forEach(cat => {
    // Filtrar los cursos que pertenecen a esta categoría
    const cursosDeCat = cursos.filter(c => c.categoria === cat.id);

    const block = document.createElement("div");
    block.classList.add("category-block");
    block.setAttribute("data-category", cat.id);

    const h2 = document.createElement("h2");
    h2.classList.add("category-title");

    // Ícono de categoría con Bootstrap Icons
    const catIconEl = document.createElement("div");
    catIconEl.classList.add("cat-icon");
    catIconEl.innerHTML = '<i class="' + cat.iconoClass + '"></i>';

    h2.appendChild(catIconEl);
    h2.appendChild(document.createTextNode(cat.titulo));

    const grid = document.createElement("div");
    grid.classList.add("catalog-grid");

    // Insertar una tarjeta por cada curso usando forEach
    cursosDeCat.forEach(curso => {
      const tarjeta = crearTarjeta(curso);
      grid.appendChild(tarjeta);
    });

    block.appendChild(h2);
    block.appendChild(grid);
    catalogSection.appendChild(block);
  });
}

//función para aplicar los filtros de búsqueda y categoría a las tarjetas del catálogo
function aplicarFiltros() {
  const tarjetas = document.querySelectorAll(".catalog-card");
  const bloques  = document.querySelectorAll(".category-block");

  tarjetas.forEach(tarjeta => {
    const nombre      = tarjeta.getAttribute("data-nombre") || "";
    const descripcion = tarjeta.getAttribute("data-descripcion") || "";
    const categoria   = tarjeta.getAttribute("data-categoria") || "";

    // Condición de búsqueda por texto
    const coincideTexto =
      filtros.texto === "" ||
      nombre.includes(filtros.texto) ||
      descripcion.includes(filtros.texto);

    // Condición de filtro por categoría
    const coincideCategoria =
      filtros.categoria === "todas" ||
      categoria === filtros.categoria;

    // Mostrar u ocultar tarjeta según ambas condiciones combinadas
    tarjeta.style.display = (coincideTexto && coincideCategoria) ? "flex" : "none";
  });

  // Ocultar bloque completo si ninguna de sus tarjetas es visible
  bloques.forEach(bloque => {
    const tarjetasVisibles = bloque.querySelectorAll('.catalog-card[style*="flex"]');
    bloque.style.display = tarjetasVisibles.length > 0 ? "block" : "none";
  });
}

//función para crear los botones de filtro por categoría y manejar su evento de click
function crearBotonesFiltro() {
  const searchSection = document.querySelector(".search-section");

  const filtroContainer = document.createElement("div");
  filtroContainer.classList.add("filtro-categorias");

  // Botón "Todas"
  const btnTodas = document.createElement("button");
  btnTodas.innerHTML = '<i class="bi bi-grid"></i> Todas';
  btnTodas.classList.add("btn-filtro", "activo");
  btnTodas.setAttribute("data-filtro", "todas");
  filtroContainer.appendChild(btnTodas);

  // Un botón por cada categoría con su Bootstrap Icon
  categorias.forEach(cat => {
    const btn = document.createElement("button");
    btn.innerHTML = '<i class="' + cat.iconoClass + '"></i> ' + cat.titulo;
    btn.classList.add("btn-filtro");
    btn.setAttribute("data-filtro", cat.id);
    filtroContainer.appendChild(btn);
  });

  searchSection.insertAdjacentElement("afterend", filtroContainer);

  // Evento de clic sobre el contenedor (delegación de eventos)
  filtroContainer.addEventListener("click", function (e) {
    const boton = e.target.closest(".btn-filtro");
    if (!boton) return;

    filtroContainer.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");

    filtros.categoria = boton.getAttribute("data-filtro");
    aplicarFiltros();
  });
}

//función para manejar el evento de input en el campo de búsqueda y actualizar el filtro de texto
function iniciarBusqueda() {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", function () {
    filtros.texto = this.value.toLowerCase().trim();
    aplicarFiltros();
  });
}

//función para manejar el toggle del menú de navegación en dispositivos móviles
function iniciarNavbar() {
  const toggle = document.getElementById("navToggle");
  const links  = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }
}

// Al cargar el DOM, renderizar el catálogo, crear los botones de filtro, iniciar la búsqueda y la navbar
document.addEventListener("DOMContentLoaded", function () {
  renderizarCatalogo();
  crearBotonesFiltro();
  iniciarBusqueda();
  iniciarNavbar();
});