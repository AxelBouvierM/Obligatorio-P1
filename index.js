let buttons = document.querySelectorAll(".open-modal"); // Seleccionar todos los botones
let modal = document.querySelector("#modal");
let form = document.querySelector("#form");

// Abrir el modal al hacer clic en cualquiera de los botones
buttons.forEach(button => {
    button.addEventListener('click', function() {
        modal.showModal();
    });
});

// Cerrar el modal al enviar el formulario
form.addEventListener('submit', function() {
    modal.close();
});

// Cerrar el modal al hacer clic fuera de él
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.close();
    }
});


