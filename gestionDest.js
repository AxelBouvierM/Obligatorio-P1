// Selecciona todas las filas de la tabla con la clase 'open-modal'
const rows = document.querySelectorAll('tr.open-modal');
const modal = document.querySelector("#modal");
const form = document.querySelector("#form");

// Agrega un evento de clic a cada fila
rows.forEach(row => {
    row.addEventListener('click', () => {
        modal.showModal(); // Muestra el modal al hacer clic en la fila
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

const button = document.querySelectorAll('.open-modal');

// Agrega un evento de clic a cada fila
button.forEach(button => {
    button.addEventListener('click', () => {
        modal.showModal(); // Muestra el modal al hacer clic en la fila
    });
});

