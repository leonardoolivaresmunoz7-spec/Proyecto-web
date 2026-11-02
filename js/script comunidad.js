document.addEventListener("DOMContentLoaded", function () {
    // ==========================================
    // INTERACCIÓN PARA "SOLICITAR INSERCIÓN" EN SEMILLEROS
    // ==========================================
    const botonesSemillero = document.querySelectorAll(".card-recurso .btn-outline-warning");

    botonesSemillero.forEach(function (boton) {
        boton.addEventListener("click", function (e) {
            e.preventDefault();

            // Verificamos si el usuario ha iniciado sesión usando localStorage
            const usuarioLogueado = localStorage.getItem("innovaEduUsuario");

            // Obtenemos el nombre del semillero de la tarjeta correspondiente
            const tarjeta = boton.closest(".card-recurso");
            const nombreSemillero = tarjeta ? tarjeta.querySelector("h4").textContent : "este semillero";

            if (!usuarioLogueado) {
                // Mensaje oportuno si no ha iniciado sesión
                alert("⚠️ Debes iniciar sesión en el portal para solicitar tu inscripción en " + nombreSemillero + ".");
                
                // Opcional: Desplazarse arriba o abrir el modal de login si lo deseas
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            // Mensaje oportuno de éxito si ya está logueado
            alert("¡Solicitud enviada con éxito, " + usuarioLogueado + "! 🎉\n\nTe has postulado correctamente a " + nombreSemillero + ". El coordinador se pondrá en contacto contigo a través de tu correo institucional.");
            
            // Cambiar visualmente el estado del botón para que el usuario sepa que ya solicitó
            boton.textContent = "¡Solicitud Enviada!";
            boton.classList.remove("btn-outline-warning");
            boton.classList.add("btn-warning", "text-dark", "fw-bold");
            boton.style.backgroundColor = "#f1b800";
            boton.style.borderColor = "#f1b800";
            boton.disabled = true;
        });
    });
});
// Cambiar visualmente el estado del botón y asegurar texto negro visible
boton.textContent = "¡Solicitud Enviada!";
boton.style.backgroundColor = "#f1b800";
boton.style.borderColor = "#f1b800";
boton.style.color = "#000000"; // Fuerza el color negro para que se vea
boton.style.fontWeight = "bold";
boton.style.pointerEvents = "none"; // Desactiva clics adicionales en el enlace (<a>)