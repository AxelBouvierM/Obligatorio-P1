const modal = document.querySelector("#modal");
const form = document.querySelector("#form");
window.Sistema.isAdminLogged()
window.Sistema.isLogged()

let preLoadDest = window.Sistema

// Cambiar a sis.
/* let preLoadDest = {
    1: new Dest("CARIBE", 1050, true, true, "../img/caribe.webp", "7 días", "6 noches en hotel 5 estrellas", "All inclusive", true, true, 34, 'DEST_ID_1'),
    2: new Dest("EUROPA", 4500, false, true, "../img/europa.webp", "15 días", "14 noches en hotel 4 estrellas", "Desayuno incluido", true, true, 84, 'DEST_ID_2'),
    3: new Dest("ASIA Y ÁFRICA", 7850, true, true, "../img/africa.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 23, 'DEST_ID_3'),
    4: new Dest("AMSTERDAM", 7850, false, true, "../img/amsterdam.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 123, 'DEST_ID_4'),
    5: new Dest("MARRUECOS", 7850, true, true, "../img/marruecos.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 99, 'DEST_ID_5'),
    6: new Dest("MENDOZA", 7850, false, true, "../img/mendoza.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 27, 'DEST_ID_6'),
    7: new Dest("RÍO DE JANEIRO", 7850, true, false, "../img/rio.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 290, 'DEST_ID_7'),
    8: new Dest("ROMA", 7850, true, false, "../img/roma.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 54, 'DEST_ID_8'),
    9: new Dest("RANDOM", 7850, false, false, "../img/viajeAmigos.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 341, 'DEST_ID_9'),
} */

window.addEventListener('DOMContentLoaded', addDest);

function addDest() {
    // mover a sis.
    /* localStorage.setItem('destinos', JSON.stringify(preLoadDest)) */
    preLoadDest.pushItemToLocalStorage('destinos', preLoadDest.preLoadDest)
    let destinos = preLoadDest.getItemToLocalStorage('destinos')

    createDestTable('#tablaDestinos tbody', destinos)

    addValuesForm('tr.open-modal', destinos)
}

/**
 * Funcion para crear la tabla de con los destinos cargados
 * @param {string} id elemento donde se creara la tabla
 * @param {object} destinos objeto con los destinos
 */
function createDestTable(id, destinos) {
    let tabla = document.querySelector(id);
    tabla.innerHTML = ''
    // Iterar sobre las key del objeto destinos
    Object.keys(destinos).forEach(key => {
        let nuevaFila = document.createElement("tr");
        nuevaFila.classList.add("open-modal");

        let oferta = destinos[key]['offer'] ? 'SI' : 'NO';
        let estado = destinos[key]['state'] ? 'Activo' : 'Inactivo';

        nuevaFila.innerHTML = `
            <td>${destinos[key]['id']}</td>
            <td>${destinos[key]['dest']}</td>
            <td>${destinos[key]['price']}</td>
            <td>${oferta}</td>
            <td id="estado">${estado}</td>
        `;

        tabla.appendChild(nuevaFila);
    });
}

let nuevoDestino = false
addValuesForm('.open-modal-add')

/**
 * Funcion para agregar valores a formulario de modificar destinos
 * @param {string} id al cual se le asignara el evento click
 * @param {object} destinos objeto con la lista de destinos
 */
function addValuesForm(id, destinos) {
    const rows = document.querySelectorAll(id);

    rows.forEach(row => {
        row.addEventListener('click', function () {
            let id = ''
            if (destinos) {
                id = this.cells[0].textContent
                id = id.split('_')[2]
                console.log(destinos[+id]['id'])
            } else {
                nuevoDestino = true
            }

            document.getElementById("inputDestino").value = destinos ? destinos[+id]['dest'] : "";
            document.getElementById("inputPrecio").value = destinos ? destinos[+id]['price'] : "";
            document.getElementById("inputOferta").value = destinos ? (destinos[+id]['offer'] ? 'Si' : 'No') : "";
            document.getElementById("inputEstado").value = destinos ? (destinos[+id]['state'] ? 'Activo' : 'Inactivo') : "";
            document.getElementById("inputFoto").value = destinos ? destinos[+id]['url'] : "";
            document.getElementById("inputDuracion").value = destinos ? destinos[+id]['duration'] : "";
            document.getElementById("inputAlojamiento").value = destinos ? destinos[+id]['hotel'] : "";
            document.getElementById("inputModalidad").value = destinos ? destinos[+id]['modality'] : "";
            document.getElementById("inputVuelos").value = destinos ? (destinos[+id]['flights'] ? 'Si' : 'No') : "";
            document.getElementById("inputTraslado").value = destinos ? (destinos[+id]['transfer'] ? 'Si' : 'No') : "";
            document.getElementById("inputCupos").value = destinos ? destinos[+id]['quotas'] : "";
            document.getElementById("inputID").value = destinos ? destinos[+id]['id'] : `DEST_ID_${Object.keys(preLoadDest.preLoadDest).length + 1}`;

            modal.showModal();
        });
    });
}

// Cerrar el modal al enviar el formulario
form.addEventListener('submit', function () {
    modal.close();
});

// Cerrar el modal al hacer clic fuera de él
modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.close();
    }
});


let buttonSendMod = document.querySelector('#send')
buttonSendMod.addEventListener('click', function (event) {
    let id = document.getElementById("inputID").value
    id = id.split('_')[2]

    if (!nuevoDestino) {
        preLoadDest.preLoadDest[+id]['dest'] = document.getElementById("inputDestino").value
        preLoadDest.preLoadDest[+id]['price'] = document.getElementById("inputPrecio").value
        preLoadDest.preLoadDest[+id]['offer'] = document.getElementById("inputOferta").value == 'Si' ? true : false
        preLoadDest.preLoadDest[+id]['state'] = document.getElementById("inputEstado").value == 'Activo' ? true : false
        preLoadDest.preLoadDest[+id]['url'] = document.getElementById("inputFoto").value
        preLoadDest.preLoadDest[+id]['duration'] = document.getElementById("inputDuracion").value
        preLoadDest.preLoadDest[+id]['hotel'] = document.getElementById("inputAlojamiento").value
        preLoadDest.preLoadDest[+id]['modality'] = document.getElementById("inputModalidad").value
        preLoadDest.preLoadDest[+id]['flights'] = document.getElementById("inputVuelos").value == 'Si' ? true : false
        preLoadDest.preLoadDest[+id]['transfer'] = document.getElementById("inputTraslado").value == 'Si' ? true : false
        preLoadDest.preLoadDest[+id]['quotas'] = document.getElementById("inputCupos").value
    } else {
        preLoadDest.preLoadDest[id] = new Dest(
            document.getElementById("inputDestino").value,
            document.getElementById("inputPrecio").value,
            document.getElementById("inputOferta").value == 'Si' ? true : false,
            document.getElementById("inputEstado").value == 'Activo' ? true : false,
            document.getElementById("inputFoto").value,
            document.getElementById("inputDuracion").value,
            document.getElementById("inputAlojamiento").value,
            document.getElementById("inputModalidad").value,
            document.getElementById("inputVuelos").value == 'Si' ? true : false,
            document.getElementById("inputTraslado").value == 'Si' ? true : false,
            document.getElementById("inputCupos").value,
            `DEST_ID_${id}`)

        nuevoDestino = false
    }
    addDest()
    modal.close()
})