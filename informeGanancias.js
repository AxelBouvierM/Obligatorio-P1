refreshReservations()
window.Sistema.isAdminLogged()
window.Sistema.isLogged()

function refreshReservations() {
    let div = document.querySelector('#tbody-infoGan')
    let reservations = window.Sistema.getItemToLocalStorage('reservations')
    let dest = window.Sistema.getItemToLocalStorage('destinos')
    let error = document.querySelector('#emptyReserv')
    div.innerHTML = ''

    if (reservations && reservations.lenght != 0) {
        let tmp = infoGanancias(reservations, dest)
        
        if (Object.keys(tmp) != 0) {
            error.innerHTML = ''

            Object.keys(tmp).forEach(key => {

                div.innerHTML += `<tr>
                    <td>${dest[key.split('_')[2]].dest}</td>
                    <td>${tmp[key].cant}</td>
                    <td>USD ${tmp[key].total}</td>
                    </tr>`
            });

        } else {
            console.log('error')
            error.innerHTML = '¡Aun no hay reservas aprobadas y/o abonadas con efectivo!'
        }
    } else {
        error.innerHTML = '¡Aun no hay reservas aprobadas y/o abonadas con efectivo!'
    }

}

function infoGanancias(reservations, dest) {
    let tmp = {}
    reservations.forEach(element => {
        if (element.state == 'Aprobada' && element.mPayment == 'efectivo') {

            if (!tmp[element.destID]) {
                tmp[element.destID] = {
                    cant: +element.cant,
                    total: dest[element.destID.split('_')[2]].price * +element.cant
                }
            } else {
                tmp[element.destID].cant += +element.cant
                tmp[element.destID].total += +dest[element.destID.split('_')[2]].price * +element.cant
            }
        }
    });
    return tmp
}
// Evento para escuchar los cambios en el storage
window.addEventListener('storage', (event) => {
    // Actualizar los destinos ante cambios
    if (event.key === 'reservations') {
        refreshReservations()
    }
});
