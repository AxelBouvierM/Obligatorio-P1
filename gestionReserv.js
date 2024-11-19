refreshReservations()
window.Sistema.isLogged()

function refreshReservations() {
    let div = document.querySelector('#tbodyReservas')
    let reservations = window.Sistema.getItemToLocalStorage('reservations')
    let dest = window.Sistema.getItemToLocalStorage('destinos')
    let error = document.querySelector('#emptyReserv')
    div.innerHTML = ''

    if (reservations && reservations.lenght != 0) {
        error.innerHTML = ''

        reservations.forEach(element => {
            let processButton = '<td><input type="button" value="Procesar" class="btnProcesar" hidden></td>'
            if (element.state == 'Pendiente') processButton = `<td><input type="button" value="Procesar" id=${element.reservID} class="btnProcesar"></td>`

            div.innerHTML += `<tr class="open-modal">
            <td>${dest[element.destID.split('_')[2]].dest}</td>
            <td>USD ${dest[element.destID.split('_')[2]].price * +element.cant}</td>
            <td><input type="button" value=${element.state} class="estadoReserva-${element.state.toLowerCase()}" disabled></td>
            ${processButton}
          </tr>`
        });

        document.querySelectorAll('.btnProcesar').forEach(button => {
            button.addEventListener('click', verifyReserv);
        });

    } else {
        error.innerHTML = '¡Aun no hay reservas realizadas!'
    }

}

function verifyReserv(event) {
    let button = event.target;
    let reserv = window.Sistema.getItemToLocalStorage('reservations')
    let dest = window.Sistema.getItemToLocalStorage('destinos')
    let index = 0;

    while (index < reserv.length) {
        let element = reserv[index];
        // Match boton con reserva a validar...
        if (element.reservID == button.getAttribute("id")) {
            if (element.cant > dest[element.destID.split('_')[2]].quotas) {
                element.state = 'Rechazada'
                break
            }
            /* if(millas o efectivo alcanzan?) estado rachazad break*/
            /* else {
                element.state = 'Aprobada'
            } */// cambiar status a rechazada sin cupos disponibles.
            element.state = 'Aprobada'
            break;
        }
        index++;
    }
    window.Sistema.pushItemToLocalStorage('reservations', reserv)
    window.Sistema.reservations = reserv
    refreshReservations()
}


// Evento para escuchar los cambios en el storage
window.addEventListener('storage', (event) => {
    // Actualizar los destinos ante cambios
    if (event.key === 'reservations') {
        console.log('captura evento cambio')
        refreshReservations()
    }
});