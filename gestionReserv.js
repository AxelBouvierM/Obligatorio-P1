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
    console.log(reserv)

    while (index < reserv.length) {
        let element = reserv[index];
        // Match boton con reserva a validar...
        if (element.reservID == button.getAttribute("id")) {
            if (element.cant > dest[element.destID.split('_')[2]].quotas) {
                element.state = 'Rechazada'
                break
            }
            // Validar si el usuario tiene suficiente credito, sino rechazar la reserva
            if (element.payment == 'Efectivo' && element.cant * dest[element.destID.split('_')[2]].price > window.Sistema.user.credit) {
                element.state = 'Rechazada'
                break 
            }
            // Validar si el usuario tiene suficientes millas sino descontar las que tenga disponibles
            if (element.payment == "Millas" && element.cant * dest[element.destID.split('_')[2]].price > window.Sistema.user.miles) {
                let totalPrice = element.cant * dest[element.destID.split('_')[2]].price
                totalPrice -= window.Sistema.user.miles
                if (window.Sistema.user.miles == 0) {
                    window.Sistema.user.credit -= totalPrice
                    element.state = 'Aprobada'
                    break 
                } 
            // Si tiene suficientes millas, se descuenta el total del viaje de sus millas
            } else {
                window.Sistema.user.miles -= element.cant * dest[element.destID.split('_')[2]].price
                element.state = 'Aprobada'
                break 
            }
            //Si se cumplen las condiciones, se aprueba la reserva
            element.state = 'Aprobada'
            //Si se aprueba la reserva, se descuenta la cantidad de cupos disponibles
            dest.quotas -= element.cant
            //Si la cantidad de cupos disponibles es 0, se pausa el destino
            if (dest.quotas == 0) {
                dest.state = 'Pausado'
            }
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