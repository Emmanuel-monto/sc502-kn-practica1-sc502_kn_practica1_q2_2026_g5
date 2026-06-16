
const cursoDestacados = [
    {
        nombre: "Desarrollo Web Full Stack",
        descripcion: "Domina HTML, CSS, JavaScript, Node.js y bases de datos en un programa completo e intensivo.",
        imagen: "💻",
        categoria: "Tecnología",
        bgClass: "bg1"
    },
    {
        nombre: "Diseño UX/UI Profesional",
        descripcion: "Crea interfaces atractivas y centradas en el usuario con Figma, Adobe XD y metodologías ágiles.",
        imagen: "🎨",
        categoria: "Diseño",
        bgClass: "bg2"
    },
    {
        nombre: "Inteligencia Artificial Aplicada",
        descripcion: "Aprende Machine Learning, Python y frameworks modernos para construir soluciones de IA.",
        imagen: "🤖",
        categoria: "Tecnología",
        bgClass: "bg3"
    }
];


// Construir una tarjeta de curso con createElementos

function crearTarjetaCurso(curso) {

    // Contenedor principal de la tarjeta
    let tarjeta = document.createElement("div");
    tarjeta.className = "course-card";

    // Imagen / ícono del curso
    let imagenDiv = document.createElement("div");
    imagenDiv.className = "course-card-img " + curso.bgClass;
    imagenDiv.textContent = curso.imagen;

    // Cuerpo de la tarjeta
    let cuerpo = document.createElement("div");
    cuerpo.className = "course-card-body";

    // Título del curso
    let titulo = document.createElement("h3");
    titulo.textContent = curso.nombre;

    // Descripción del curso
    let descripcion = document.createElement("p");
    descripcion.textContent = curso.descripcion;

    let boton = document.createElement("a");
    boton.href = "cursos.html";
    boton.className = "btn-primary";
    boton.textContent = "Ver más";

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(descripcion);
    cuerpo.appendChild(boton);

    
    tarjeta.appendChild(imagenDiv);
    tarjeta.appendChild(cuerpo);

    return tarjeta;
}


// Renderizar todas las tarjetas en el DOM 

function renderizarCursos() {

    
    let contenedor = document.getElementById("cursosContainer");

    // Recorrer el array
    for (let i = 0; i < cursoDestacados.length; i++) {
        let tarjeta = crearTarjetaCurso(cursoDestacados[i]);
        contenedor.appendChild(tarjeta);
    }
}


// Actualizar contadores de estadísticas
//    
function renderizarEstadisticas() {

    // Objeto con los datos de las estadísticas
    let estadisticas = {
        estudiantes: "4,800+",
        profesores: "35",
        cursos: "120+"
    };

    // Actualizar cada elemento por su ID
    document.getElementById("statEstudiantes").textContent = estadisticas.estudiantes;
    document.getElementById("statProfesores").textContent = estadisticas.profesores;
    document.getElementById("statCursos").textContent = estadisticas.cursos;
}


// Menú hamburguesa responsive 
//    
function inicializarNavbar() {

    let toggle = document.getElementById("navToggle");
    let links  = document.getElementById("navLinks");

    
    toggle.addEventListener("click", function () {
        links.classList.toggle("open");
    });
}


// DOMContentLoaded 

document.addEventListener("DOMContentLoaded", function () {

    renderizarCursos();

    renderizarEstadisticas();

    inicializarNavbar();

    console.log("index.js cargado correctamente — Academia Grupo 5");
});
