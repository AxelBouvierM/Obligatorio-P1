const modal = document.querySelector("#modal");
const form = document.querySelector("#form");

let preLoadDest = {
    1: new Dest("CARIBE", 1050, true, true, "../img/caribe.webp", "7 días", "6 noches en hotel 5 estrellas", "All inclusive", true, true, 34, 1),
    2: new Dest("EUROPA", 4500, false, true, "../img/europa.webp", "15 días", "14 noches en hotel 4 estrellas", "Desayuno incluido", true, true, 84, 2),
    3: new Dest("ASIA Y ÁFRICA", 7850, true, true, "../img/africa.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 23, 3),
    4: new Dest("AMSTERDAM", 7850, false, true, "../img/amsterdam.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 123, 4),
    5: new Dest("MARRUECOS", 7850, true, true, "../img/marruecos.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 99, 5),
    6: new Dest("MENDOZA", 7850, false, true, "../img/mendoza.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 27, 6),
    7: new Dest("RÍO DE JANEIRO", 7850, true, false, "../img/rio.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 290, 7),
    8: new Dest("ROMA", 7850, true, false, "../img/roma.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 54, 8),
    9: new Dest("RANDOM", 7850, false, false, "../img/viajeAmigos.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 341, 9),
}

window.addEventListener('DOMContentLoaded', addDest);

function addDest() {
    localStorage.setItem('destinos', JSON.stringify(preLoadDest))
    let destinos = JSON.parse(localStorage.getItem('destinos'))
    console.log(destinos)
    let tabla = document.querySelector('#tablaDestinos tbody');
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

    const rows = document.querySelectorAll('tr.open-modal');

    rows.forEach(row => {
        row.addEventListener('click', function () {

            let id = this.cells[0].textContent
            document.getElementById("inputDestino").value = destinos[+id]['dest'];
            document.getElementById("inputPrecio").value = destinos[+id]['price'];
            document.getElementById("inputOferta").value = destinos[+id]['offer'] ? 'Si' : 'No';
            document.getElementById("inputEstado").value = destinos[+id]['state'] ? 'Activo' : 'Inactivo';
            document.getElementById("inputFoto").value = destinos[+id]['url'];
            document.getElementById("inputDuracion").value = destinos[+id]['duration'];
            document.getElementById("inputAlojamiento").value = destinos[+id]['hotel'];
            document.getElementById("inputModalidad").value = destinos[+id]['modality'];
            document.getElementById("inputVuelos").value = destinos[+id]['flights'] ? 'Si' : 'No';
            document.getElementById("inputTraslado").value = destinos[+id]['transfer'] ? 'Si' : 'No';
            document.getElementById("inputCupos").value = destinos[+id]['quotas']
            document.getElementById("inputID").value = destinos[+id]['id']

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

let nuevoDestino = false
const buttonAdd = document.querySelectorAll('.open-modal-add');

buttonAdd.forEach(buttonAdd => {
    buttonAdd.addEventListener('click', () => {
        nuevoDestino = true
        document.getElementById("inputDestino").value = ""
        document.getElementById("inputPrecio").value = ""
        document.getElementById("inputOferta").value = ""
        document.getElementById("inputEstado").value = ""
        document.getElementById("inputFoto").value = ""
        document.getElementById("inputDuracion").value = ""
        document.getElementById("inputAlojamiento").value = ""
        document.getElementById("inputModalidad").value = ""
        document.getElementById("inputVuelos").value = ""
        document.getElementById("inputTraslado").value = ""
        document.getElementById("inputCupos").value = ""
        let id = Object.keys(preLoadDest).length + 1
        document.getElementById("inputID").value = id
        modal.showModal();
    });
});

let buttonSendMod = document.querySelector('#send')
buttonSendMod.addEventListener('click', function (event) {
    /* let destinos = JSON.parse(localStorage.getItem('destinos')) */

    if (!nuevoDestino) {
        let id = document.getElementById("inputID").value
        preLoadDest[+id]['dest'] = document.getElementById("inputDestino").value
        preLoadDest[+id]['price'] = document.getElementById("inputPrecio").value
        preLoadDest[+id]['offer'] = document.getElementById("inputOferta").value == 'Si' ? true : false
        preLoadDest[+id]['state'] = document.getElementById("inputEstado").value == 'Activo' ? true : false
        preLoadDest[+id]['url'] = document.getElementById("inputFoto").value
        preLoadDest[+id]['duration'] = document.getElementById("inputDuracion").value
        preLoadDest[+id]['hotel'] = document.getElementById("inputAlojamiento").value
        preLoadDest[+id]['modality'] = document.getElementById("inputModalidad").value
        preLoadDest[+id]['flights'] = document.getElementById("inputVuelos").value == 'Si' ? true : false
        preLoadDest[+id]['transfer'] = document.getElementById("inputTraslado").value == 'Si' ? true : false
        preLoadDest[+id]['quotas'] = document.getElementById("inputCupos").value
    } else {
        let id = document.getElementById("inputID").value

        preLoadDest[id] = new Dest(
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
            `${id}`)

        nuevoDestino = false
    }
    addDest()
    modal.close()
})


