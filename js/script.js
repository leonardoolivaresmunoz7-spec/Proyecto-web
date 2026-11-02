document.addEventListener("DOMContentLoaded", function () {
    // ==========================================
    // 1. ELEMENTOS DEL DOM
    // ==========================================
    const navAuth = document.querySelector(".nav-auth");
    const modalLogin = document.getElementById("modalLogin");
    const btnIniciarTop = document.getElementById("btnIniciarTop");
    const cerrarModal = document.getElementById("cerrarModal");
    const formLoginModal = document.getElementById("formLoginModal");
    const registroForm = document.getElementById("registroForm");
    const mensajeExito = document.getElementById("mensajeExito");

    // ==========================================
    // 2. GESTIÓN DE SESIÓN PERSISTENTE (LOCALSTORAGE)
    // ==========================================
    function verificarEstadoSesion() {
    const usuarioLogueado = localStorage.getItem("innovaEduUsuario");

    if (usuarioLogueado && navAuth) {
        // Extraemos solo lo que está antes del "@"
        const nombreUsuario = usuarioLogueado.split('@')[0];

        // Reemplaza los botones de Login/Registro por el saludo recortado
        navAuth.innerHTML = `
            <span class="text-warning small fw-bold me-2">Hola, ${nombreUsuario}</span>
            <button type="button" id="btnCerrarSesion" class="btn btn-sm btn-outline-warning">Cerrar sesión</button>
        `;

        // Evento para cerrar sesión
        const btnCerrarSesion = document.getElementById("btnCerrarSesion");
        if (btnCerrarSesion) {
            btnCerrarSesion.addEventListener("click", function () {
                localStorage.removeItem("innovaEduUsuario");
                window.location.reload();
            });
        }
    }
}

    // Ejecuta la verificación al cargar la página
    verificarEstadoSesion();

    // ==========================================
    // 3. MODAL DE INICIO DE SESIÓN
    // ==========================================
    // Abrir modal desde el botón del navbar
    if (btnIniciarTop && modalLogin) {
        btnIniciarTop.addEventListener("click", function (e) {
            e.preventDefault();
            modalLogin.style.display = "flex";
        });
    }

    // Cerrar modal al presionar la 'X' o fuera de la ventana
    if (cerrarModal && modalLogin) {
        cerrarModal.addEventListener("click", function () {
            modalLogin.style.display = "none";
        });

        window.addEventListener("click", function (e) {
            if (e.target === modalLogin) {
                modalLogin.style.display = "none";
            }
        });
    }

    // Envío del formulario de Login
    if (formLoginModal) {
        formLoginModal.addEventListener("submit", function (e) {
            e.preventDefault();
            const emailInput = document.getElementById("emailLogin").value.trim();

            if (emailInput) {
                // Guarda la sesión en el navegador
                localStorage.setItem("innovaEduUsuario", emailInput);
                
                if (modalLogin) {
                    modalLogin.style.display = "none";
                }

                // Actualiza el navbar inmediatamente sin perder el estado al navegar
                verificarEstadoSesion();
            }
        });
    }

    // ==========================================
    // 4. FORMULARIO DE REGISTRO (SI EXISTE EN LA PÁGINA)
    // ==========================================
    if (registroForm) {
        registroForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const correoInput = document.getElementById("correoInput").value.trim();

            if (correoInput) {
                // Muestra mensaje de confirmación y guarda sesión opcionalmente
                if (mensajeExito) {
                    mensajeExito.style.display = "block";
                }
                
                // Auto-iniciar sesión tras el registro
                localStorage.setItem("innovaEduUsuario", correoInput);
                verificarEstadoSesion();
                
                registroForm.reset();
            }
        });
    }
});