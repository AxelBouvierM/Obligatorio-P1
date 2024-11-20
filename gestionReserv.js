refreshReservations()
window.Sistema.isAdminLogged()
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
    let usersDatabase = window.Sistema.getItemToLocalStorage('usersDatabase')
    let button = event.target;
    let reserv = window.Sistema.getItemToLocalStorage('reservations');
    let dest = window.Sistema.getItemToLocalStorage('destinos');
    let index = 0;
    console.log(reserv);

    while (index < reserv.length) {
        let element = reserv[index];
        // Match boton con reserva a validar...
        if (element.reservID == button.getAttribute("id")) {
            let destIndex = element.destID.split('_')[2];
            let destination = dest[destIndex];

            // Validar si el número de personas excede la cantidad de cupos disponibles
            if (element.cant > destination.quotas) {
                element.state = 'Rechazada';
                break;
            }

            // Lógica de pago con efectivo
            if (element.mPayment == 'efectivo') {
                let totalPrice = element.cant * destination.price;
                if (totalPrice > window.Sistema.user.userBudget) {
                    element.state = 'Rechazada';
                    break;
                }
            }

            // Lógica de pago con millas
            else if (element.mPayment == 'millas') {
                let totalPrice = element.cant * destination.price;
                
                if (totalPrice > window.Sistema.user.milesAmount) {
                    // Si no tiene suficientes millas, intentar usar crédito para cubrir la diferencia
                    let priceToCover = totalPrice - window.Sistema.user.milesAmount;
                    if (window.Sistema.user.userBudget >= priceToCover) {
                        // Descontar millas
                        window.Sistema.user.milesAmount = 0;
                        // Descontar la diferencia en crédito
                        window.Sistema.user.userBudget -= priceToCover;
                        element.state = 'Aprobada';
                    } else {
                        // Si no tiene suficiente crédito, rechazar la reserva
                        element.state = 'Rechazada';
                    }
                } else {
                    // Si tiene suficientes millas, descontarlas completamente
                    window.Sistema.user.milesAmount -= totalPrice;
                    element.state = 'Aprobada';
                }
            }

            // Si el pago es por otro método o no se especifica, se aprueba por defecto
            else {
                element.state = 'Aprobada';
            }

            // Si la reserva es aprobada, actualizar las cuotas del destino
            if (element.state == 'Aprobada') {
                destination.quotas -= element.cant;
                // Si no hay más cupos disponibles, desactivar el destino
                if (destination.quotas == 0) {
                    destination.state = false;
                }
            }

            break;
        }
        index++;
    }

    // Guardar las reservas actualizadas en el localStorage
    window.Sistema.pushItemToLocalStorage('reservations', reserv);
    window.Sistema.reservations = reserv;
    refreshReservations();
}

// Evento para escuchar los cambios en el storage
window.addEventListener('storage', (event) => {
    // Actualizar los destinos ante cambios
    if (event.key === 'reservations') {
        console.log('captura evento cambio')
        refreshReservations()
    }
});