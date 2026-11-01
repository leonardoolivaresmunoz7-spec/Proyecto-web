document.addEventListener('DOMContentLoaded', function() {
  const modalLogin = document.getElementById('modalLogin');
  const btnIniciarTop = document.getElementById('btnIniciarTop'); 
  const cerrarModal = document.getElementById('cerrarModal');
  const formLoginModal = document.getElementById('formLoginModal');
  const btnRegistrateTop = document.getElementById('btnRegistrateTop'); 
  const registroForm = document.getElementById('registroForm');

  // Asegurar explícitamente que el modal inicie oculto al cargar la página
  if (modalLogin) {
    modalLogin.style.display = 'none';
  }

  // Abrir ventana modal al hacer clic en "Iniciar sesión"
  if (btnIniciarTop && modalLogin) {
    btnIniciarTop.addEventListener('click', function(e) {
      e.preventDefault();
      modalLogin.style.display = 'flex';
    });
  }

  // Cerrar modal usando la "X"
  if (cerrarModal && modalLogin) {
    cerrarModal.addEventListener('click', function(e) {
      e.preventDefault();
      modalLogin.style.display = 'none';
    });
  }

  // Cerrar modal al hacer clic fuera de la caja de contenido
  if (modalLogin) {
    window.addEventListener('click', function(e) {
      if (e.target === modalLogin) {
        modalLogin.style.display = 'none';
      }
    });
  }

  // Enviar formulario de inicio de sesión con validación de 8 caracteres
  if (formLoginModal) {
    formLoginModal.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const passwordInput = document.getElementById('passLogin').value;

      if (passwordInput.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
      }

      alert('¡Sesión iniciada correctamente!');

      modalLogin.style.display = 'none';

      // Ocultar botones superiores de autenticación tras iniciar sesión con éxito
      if (btnIniciarTop) btnIniciarTop.style.display = 'none';
      if (btnRegistrateTop) {
        const linkRegistrate = btnRegistrateTop.closest('.nav-auth') || btnRegistrateTop.closest('a');
        if (linkRegistrate) {
          linkRegistrate.style.display = 'none';
        } else {
          btnRegistrateTop.style.display = 'none';
        }
      }
      
      formLoginModal.reset();
    });
  }

  // Formulario de registro inferior
  if (registroForm) {
    registroForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const mensaje = document.getElementById('mensajeExito');
      if (mensaje) {
        mensaje.style.display = 'block';
        this.reset();
        setTimeout(function() {
          mensaje.style.display = 'none';
        }, 5000);
      }
    });
  }
});