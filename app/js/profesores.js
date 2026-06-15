// ======================================
// Menú responsive
// ======================================

const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  links.classList.toggle('open');
});

// ======================================
// Array de profesores
// ======================================

const profesores = [
  {
    id: 1,
    avatar: "AR",
    clase: "avatar-1",
    nombre: "Ana Rodríguez",
    especialidad: "Desarrollo Web",
    descripcion: "Ingeniera en software con 10 años de experiencia en empresas como Google y Amazon.",
    correo: "ana@nexus.ac.cr",
    cursosQueImparte: "HTML, CSS, JavaScript, React"
  },

  {
    id: 2,
    avatar: "CM",
    clase: "avatar-2",
    nombre: "Carlos Mora",
    especialidad: "Ciencia de Datos",
    descripcion: "Doctor en Matemáticas Aplicadas con amplia experiencia en análisis de datos.",
    correo: "carlos@nexus.ac.cr",
    cursosQueImparte: "Python, Data Science, Machine Learning"
  },

  {
    id: 3,
    avatar: "LP",
    clase: "avatar-3",
    nombre: "Laura Pérez",
    especialidad: "Diseño UX/UI",
    descripcion: "Diseñadora senior especializada en experiencia de usuario y productos digitales.",
    correo: "laura@nexus.ac.cr",
    cursosQueImparte: "UX Design, UI Design, Figma"
  },

  {
    id: 4,
    avatar: "JF",
    clase: "avatar-4",
    nombre: "Jorge Fallas",
    especialidad: "Cloud & DevOps",
    descripcion: "Especialista certificado en AWS, Azure y Google Cloud.",
    correo: "jorge@nexus.ac.cr",
    cursosQueImparte: "AWS, Docker, Kubernetes, DevOps"
  }
];

// ======================================
// Renderizado dinámico
// ======================================

const teamGrid = document.getElementById('teamGrid');

profesores.forEach((profesor) => {

  const card = document.createElement('div');
  card.classList.add('teacher-card');

  card.setAttribute('data-id', profesor.id);

  card.innerHTML = `
    <div class="teacher-avatar ${profesor.clase}">
      ${profesor.avatar}
    </div>

    <h3>${profesor.nombre}</h3>

    <p class="teacher-specialty">
      ${profesor.especialidad}
    </p>

    <p>${profesor.descripcion}</p>
  `;

  card.addEventListener('click', () => {
    abrirModal(profesor);
  });

  teamGrid.appendChild(card);

});

// ======================================
// Modal
// ======================================

const modal = document.getElementById('teacherModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

function abrirModal(profesor) {

  modalBody.innerHTML = `
    <h2>${profesor.nombre}</h2>

    <span class="modal-specialty">
      ${profesor.especialidad}
    </span>

    <div class="modal-info">

      <div class="modal-item">
        <strong>Correo electrónico</strong>
        ${profesor.correo}
      </div>

      <div class="modal-item">
        <strong>Cursos que imparte</strong>
        ${profesor.cursosQueImparte}
      </div>

      <div class="modal-item">
        <strong>Experiencia profesional</strong>
        ${profesor.descripcion}
      </div>

    </div>
  `;

  modal.style.display = 'flex';
}

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {

  if (e.target === modal) {
    modal.style.display = 'none';
  }

});

