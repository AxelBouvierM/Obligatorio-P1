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
    let usersDatabase = window.Sistema.getItemToLocalStorage('usersDatabase');
    let userLoggedIn = window.Sistema.getItemToLocalStorage('userLoggedIn');
    let button = event.target;
    let reserv = window.Sistema.getItemToLocalStorage('reservations') || [];
    let dest = window.Sistema.getItemToLocalStorage('destinos') || [];
    let index = 0;
    while (index < reserv.length) {
        let element = reserv[index];
        if (element.reservID == button.getAttribute("id")) {
            let destIndex = parseInt(element.destID.split('_')[2], 10);
            let destination = dest[destIndex];

            // Validar si el número de personas excede la cantidad de cupos disponibles
            if (element.cant > destination.quotas) {
                console.log('Rechazada por exceso de cupos');
                element.state = 'Rechazada';
                break;
            }

            let user = usersDatabase.find(user => user.id === element.userId);

            if (!user) {
                console.log("Usuario no encontrado.");
                element.state = 'Rechazada';
                break;
            }

            // Lógica de pago con efectivo
            let totalPrice = element.cant * destination.price;
            if (element.mPayment === 'efectivo') {
                if (totalPrice > user.userBudget) {
                    console.log('Rechazada por falta de crédito');
                    element.state = 'Rechazada';
                    break;
                }
                user.userBudget -= totalPrice;
                userLoggedIn.budget = user.userBudget;
                element.state = 'Aprobada';
                user.milesAmount += Math.floor(totalPrice / 100);
                console.log(user.milesAmount);
                console.log('Aprobada con efectivo');
            }
            // Lógica de pago con millas
            else if (element.mPayment === 'millas') {
                if (totalPrice > user.milesAmount) {
                    let priceToCover = totalPrice - user.milesAmount;
                    if (user.userBudget >= priceToCover) {
                        user.milesAmount = 0;
                        element.mPayment === 'efectivo';
                        user.userBudget -= priceToCover;
                        userLoggedIn.budget = user.userBudget;
                        user.milesAmount += Math.floor(totalPrice / 100);
                        userLoggedIn.miles = user.milesAmount;
                        console.log(user.milesAmount);
                        console.log('Aprobada con efectivo');
                        element.state = 'Aprobada';
                    } else {
                        console.log('Rechazada por falta de efectivo');
                        element.state = 'Rechazada';
                    }
                } else {
                    user.milesAmount -= totalPrice;
                    userLoggedIn.miles = user.milesAmount;
                    console.log('Aprobada con millas');
                    element.state = 'Aprobada';
                }
            }
            // Método de pago inválido
            else {
                console.log('Rechazada por método de pago inválido');
                element.state = 'Rechazada';
            }

            // Si la reserva es aprobada, actualizar las cuotas del destino
            if (element.state === 'Aprobada') {
                destination.quotas -= element.cant;
                if (destination.quotas === 0) {
                    destination.state = false;
                }
            }
            break;
        }
        index++;
    }

    // Guardar las reservas y datos actualizados en el localStorage
    window.Sistema.pushItemToLocalStorage('reservations', reserv);
    window.Sistema.pushItemToLocalStorage('usersDatabase', usersDatabase);
    window.Sistema.pushItemToLocalStorage('destinos', dest);
    window.Sistema.pushItemToLocalStorage('userLoggedIn', userLoggedIn);

    refreshReservations();

}


// Evento para escuchar los cambios en el storage
window.addEventListener('storage', (event) => {
    // Actualizar los destinos ante cambios
    if (event.key === 'reservations') {
        refreshReservations()
    }
});