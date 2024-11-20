refreshReservations()
window.Sistema.isLogged()

function refreshReservations() {
    let div = document.querySelector('.container-background-1')
    let reservations = window.Sistema.getItemToLocalStorage('reservations')
    let dest = window.Sistema.getItemToLocalStorage('destinos')
    let error = document.querySelector('#emptyReserv')

    if (reservations && reservations.lenght != 0) {
        error.innerHTML = ''

        reservations.forEach(element => {
            let CancelButton = '<input type="button" value="Cancelar reserva" class="cancelarReserva" hidden>'
            if (element.state == 'Pendiente') CancelButton = '<input type="button" value="Cancelar reserva" class="cancelarReserva">'
            
            div.innerHTML += `<div class="reservas">
                    <h2>${dest[element.destID.split('_')[2]].dest}</h2>
                    <div class="informacion-adicional container-informacion-adicional">
                        <p class="cantidadPersonas informacion-adicional">Cantidad de personas: ${element.cant}</p>
                        <p class="montoTotal informacion-adicional">Monto total reserva: ${dest[element.destID.split('_')[2]].price * +element.cant}</p>
                        <p class="metodoPago informacion-adicional">Medio de pago seleccionado: ${element.mPayment}</p>
                    </div>
                    <input type="button" value=${element.state} class="estadoReserva-${element.state.toLowerCase()}" disabled>
                    ${CancelButton}
                </div>`
        });
    } else {
        error.innerHTML = '¡Aun no hay reservas realizadas!'
    }

}


// Evento para escuchar los cambios en el storage
window.addEventListener('storage', (event) => {
    // Actualizar los destinos ante cambios
    if (event.key === 'reservations') {
        refreshReservations()
    }
});