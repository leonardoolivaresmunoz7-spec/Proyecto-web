document.addEventListener('DOMContentLoaded', function () {
  // --- REFERENCIAS DOM ---
  const btnIniciarTop = document.getElementById('btnIniciarTop');
  const btnRegistrateTop = document.getElementById('btnRegistrateTop');
  const navAuthContainer = document.getElementById('navAuthContainer');
  
  const modalLogin = document.getElementById('modalLogin');
  const cerrarModalLogin = document.getElementById('cerrarModalLogin');
  const formLoginModal = document.getElementById('formLoginModal');

  const modalCita = document.getElementById('modalCita');
  const cerrarModalCita = document.getElementById('cerrarModalCita');
  const formCitaModal = document.getElementById('formCitaModal');
  const nombreProfeModal = document.getElementById('nombreProfeModal');

  const inputBusqueda = document.getElementById('inputBusqueda');
  const selectArea = document.getElementById('selectArea');
  const gridProfesores = document.getElementById('gridProfesores');

  const registroForm = document.getElementById('registroForm');
  const mensajeExito = document.getElementById('mensajeExito');
  const listaCitasContainer = document.getElementById('listaCitasContainer');

  let citasAgendadas = [];

  // --- 1. MODAL INICIO DE SESIÓN ---
  if (btnIniciarTop) {
    btnIniciarTop.addEventListener('click', function (e) {
      e.preventDefault();
      modalLogin.style.display = 'flex';
    });
  }

  cerrarModalLogin.addEventListener('click', function () {
    modalLogin.style.display = 'none';
  });

  formLoginModal.addEventListener('submit', function (e) {
    e.preventDefault();
    const password = document.getElementById('passLogin').value;

    // Validación de mínimo 8 caracteres por JS (adicional a HTML5)
    if (password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Ocultar modal y quitar botones superiores
    modalLogin.style.display = 'none';
    navAuthContainer.innerHTML = '<span class="user-badge">Estudiante Activo</span>';
    formLoginModal.reset();
  });

  // --- 2. FILTRADO DE PROFESORES ---
  function filtrarProfesores() {
    const texto = inputBusqueda.value.toLowerCase();
    const area = selectArea.value;
    const cards = gridProfesores.querySelectorAll('.card-profesor');

    cards.forEach(card => {
      const titulo = card.querySelector('h3').textContent.toLowerCase();
      const bio = card.querySelector('.bio').textContent.toLowerCase();
      const cardArea = card.getAttribute('data-area');

      const coincideTexto = titulo.includes(texto) || bio.includes(texto);
      const coincideArea = area === 'todas' || cardArea === area;

      if (coincideTexto && coincideArea) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  inputBusqueda.addEventListener('input', filtrarProfesores);
  selectArea.addEventListener('change', filtrarProfesores);

  // --- 3. MODAL AGENDAR CITA ---
  window.abrirModalCita = function (nombreProfesor, especialidad) {
    nombreProfeModal.textContent = `${nombreProfesor} (${especialidad})`;
    modalCita.style.display = 'flex';
  };

  cerrarModalCita.addEventListener('click', function () {
    modalCita.style.display = 'none';
  });

  formCitaModal.addEventListener('submit', function (e) {
    e.preventDefault();

    const nuevaCita = {
      profesor: nombreProfeModal.textContent,
      estudiante: document.getElementById('nombreEstudiante').value,
      fecha: document.getElementById('fechaCita').value,
      hora: document.getElementById('horaCita').value,
      motivo: document.getElementById('motivoCita').value
    };

    citasAgendadas.push(nuevaCita);
    renderizarCitas();

    modalCita.style.display = 'none';
    formCitaModal.reset();

    // Desplazar a la sección mis citas
    document.getElementById('mis-citas').scrollIntoView({ behavior: 'smooth' });
  });

  function renderizarCitas() {
    if (citasAgendadas.length === 0) {
      listaCitasContainer.innerHTML = '<p class="empty-state">Aún no has agendado ninguna cita de investigación.</p>';
      return;
    }

    listaCitasContainer.innerHTML = citasAgendadas.map(cita => `
      <div class="cita-card">
        <div class="cita-info">
          <h4>${cita.profesor}</h4>
          <p><strong>Estudiante:</strong> ${cita.estudiante}</p>
          <p><strong>Tema:</strong> ${cita.motivo}</p>
        </div>
        <div class="cita-detalles">
          <p>📅 ${cita.fecha}</p>
          <p>⏰ ${cita.hora}</p>
        </div>
      </div>
    `).join('');
  }

  // --- 4. FORMULARIO REGISTRO INFERIOR ---
  if (registroForm) {
    registroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      mensajeExito.style.display = 'block';
      this.reset();

      setTimeout(function () {
        mensajeExito.style.display = 'none';
      }, 5000);
    });
  }

  // --- 5. CERRAR MODALES AL HACER CLIC FUERA ---
  window.addEventListener('click', function (e) {
    if (e.target === modalLogin) modalLogin.style.display = 'none';
    if (e.target === modalCita) modalCita.style.display = 'none';
  });
});