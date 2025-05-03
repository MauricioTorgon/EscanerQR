$(document).ready(function() {
    // Toggle del menú lateral
    $("#menu-toggle").on("click", function() {
        $("#sidebar").toggleClass("open");
    });

    // Cerrar menú al hacer clic en un enlace
    $("#sidebar a").on("click", function() {
        $("#sidebar").removeClass("open");
    });

    // Botón flotante (acción rápida)
    $("#action-button").on("click", function() {
        alert("Reenviando al formulario");
    });

    // Ajuste de fondo responsivo
    function adjustBackgroundSize() {
        let screenWidth = $(window).width();
        let cubeSize = screenWidth / Math.floor(screenWidth / 150);
        $("body").css("background-size", `${cubeSize}px ${cubeSize}px`);
    }

    $(window).on("resize", adjustBackgroundSize);
    adjustBackgroundSize();

    // Manejar el envío del formulario
    $("#inscripcion-form").on("submit", function(event) {
        event.preventDefault(); // Evitar el envío tradicional del formulario

        // Obtener los valores del formulario
        const nombre = $("#nombre").val();
        const correo = $("#correo").val();
        const categoria = $("#categoria").val();

        // Mostrar un mensaje de confirmación
        alert(`${nombre}, Te has inscrito en la categoría ${categoria}. Te enviaremos un correo a ${correo} con más detalles.`);

        // Limpiar el formulario (opcional)
        $("#inscripcion-form")[0].reset();
    });
});