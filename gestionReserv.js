refreshReservations()

function refreshReservations() {
    let div = document.querySelector('#tbodyReservas')
    console.log(div)
    let reservations = window.Sistema.getItemToLocalStorage('reservations')
    let dest = window.Sistema.getItemToLocalStorage('destinos')
    let error = document.querySelector('#emptyReserv')
    div.innerHTML = ''

    if (reservations && reservations.lenght != 0) {
        error.innerHTML = ''

        reservations.forEach(element => {
            let processButton = '<td><input type="button" value="Procesar" class="btnProcesar" hidden></td>'
            if (element.state == 'Pendiente') processButton = '<td><input type="button" value="Procesar" class="btnProcesar"></td>'
            
            div.innerHTML += `<tr class="open-modal">
            <td>${dest[element.destID.split('_')[2]].dest}</td>
            <td>USD ${dest[element.destID.split('_')[2]].price * +element.cant}</td>
            <td><input type="button" value=${element.state} class="estadoReserva-${element.state.toLowerCase()}" disabled></td>
            ${processButton}
          </tr>`
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