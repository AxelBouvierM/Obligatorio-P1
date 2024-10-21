const modal = document.querySelector("#modal");
const form = document.querySelector("#form");

let destinos = {
    1: {
        destino: "CARIBE",
        precio: 1050,
        oferta: true,
        estado: true,
        url: "../img/caribe.webp",
        duracion: "7 días",
        alojamiento: "6 noches en hotel 5 estrellas",
        modalidad: "All inclusive",
        vuelos: true,
        traslado: true,
        cupos: 34,
        id: 1
    },
    2: {
        destino: "EUROPA",
        precio: 4500,
        oferta: false,
        estado: true,
        url: "../img/europa.webp",
        duracion: "15 días",
        alojamiento: "14 noches en hotel 4 estrellas",
        modalidad: "Desayuno incluido",
        vuelos: true,
        traslado: true,
        cupos: 84,
        id: 2
    },
    3: {
        destino: "ASIA Y ÁFRICA",
        precio: 7850,
        oferta: true,
        estado: true,
        url: "../img/africa.webp",
        duracion: "30 días",
        alojamiento: "29 noches en hotel 5 estrellas",
        modalidad: "No incluye comidas",
        vuelos: true,
        traslado: true,
        cupos: 23,
        id: 3
    },
    4: {
        destino: "AMSTERDAM",
        precio: 7850,
        oferta: false,
        estado: true,
        url: "../img/amsterdam.webp",
        duracion: "30 días",
        alojamiento: "29 noches en hotel 5 estrellas",
        modalidad: "No incluye comidas",
        vuelos: true,
        traslado: true,
        cupos: 123,
        id: 4
    },
    5: {
        destino: "MARRUECOS",
        precio: 7850,
        oferta: true,
        estado: true,
        url: "../img/marruecos.webp",
        duracion: "30 días",
        alojamiento: "29 noches en hotel 5 estrellas",
        modalidad: "No incluye comidas",
        vuelos: true,
        traslado: true,
        cupos: 99,
        id: 5
    },
    6: {
        destino: "MENDOZA",
        precio: 7850,
        oferta: false,
        estado: true,
        url: "../img/mendoza.webp",
        duracion: "30 días",
        alojamiento: "29 noches en hotel 5 estrellas",
        modalidad: "No incluye comidas",
        vuelos: true,
        traslado: true,
        cupos: 27,
        id: 6
    },
    7: {
        destino: "RÍO DE JANEIRO",
        precio: 7850,
        oferta: true,
        estado: false,
        url: "../img/rio.webp",
        duracion: "30 días",
        alojamiento: "29 noches en hotel 5 estrellas",
        modalidad: "No incluye comidas",
        vuelos: true,
        traslado: true,
        cupos: 290,
        id: 7
    },
    8: {
        destino: "ROMA",
        precio: 7850,
        oferta: true,
        estado: false,
        url: "../img/roma.webp",
        duracion: "30 días",
        alojamiento: "29 noches en hotel 5 estrellas",
        modalidad: "No incluye comidas",
        vuelos: true,
        traslado: true,
        cupos: 54,
        id: 8
    },
    9: {
        destino: "RANDOM",
        precio: 7850,
        oferta: false,
        estado: false,
        url: "../img/viajeAmigos.webp",
        duracion: "30 días",
        alojamiento: "29 noches en hotel 5 estrellas",
        modalidad: "No incluye comidas",
        vuelos: true,
        traslado: true,
        cupos: 341,
        id: 9
    }
}
window.addEventListener('DOMContentLoaded', addDest);

function addDest() {
    localStorage.setItem('destinos', JSON.stringify(destinos))
    let tabla = document.querySelector('#tablaDestinos tbody');
    tabla.innerHTML = ''
    // Iterar sobre las claves del objeto destinos
    Object.keys(destinos).forEach(key => {
        let nuevaFila = document.createElement("tr");
        nuevaFila.classList.add("open-modal");

        let oferta = destinos[key]['oferta'] ? 'SI' : 'NO';
        let estado = destinos[key]['estado'] ? 'Activo' : 'Inactivo';

        nuevaFila.innerHTML = `
            <td>${destinos[key]['id']}</td>
            <td>${destinos[key]['destino']}</td>
            <td>${destinos[key]['precio']}</td>
            <td>${oferta}</td>
            <td id="estado">${estado}</td>
        `;

        tabla.appendChild(nuevaFila);
    });

    const rows = document.querySelectorAll('tr.open-modal');

    rows.forEach(row => {
        row.addEventListener('click', function () {

            let id = this.cells[0].textContent
            document.getElementById("inputDestino").value = destinos[+id]['destino'];
            document.getElementById("inputPrecio").value = destinos[+id]['precio'];
            document.getElementById("inputOferta").value = destinos[+id]['oferta'] ? 'Si' : 'No';
            document.getElementById("inputEstado").value = destinos[+id]['estado'] ? 'Activo' : 'Inactivo';
            document.getElementById("inputFoto").value = destinos[+id]['url'];
            document.getElementById("inputDuracion").value = destinos[+id]['duracion'];
            document.getElementById("inputAlojamiento").value = destinos[+id]['alojamiento'];
            document.getElementById("inputModalidad").value = destinos[+id]['modalidad'];
            document.getElementById("inputVuelos").value = destinos[+id]['vuelos'] ? 'Si' : 'No';
            document.getElementById("inputTraslado").value = destinos[+id]['traslado'] ? 'Si' : 'No';
            document.getElementById("inputCupos").value = destinos[+id]['cupos']
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

const buttonAdd = document.querySelectorAll('.open-modal-add');

buttonAdd.forEach(buttonAdd => {
    buttonAdd.addEventListener('click', () => {
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
        document.getElementById("inputID").value = ""
        modal.showModal();
    });
});

let buttonSendMod = document.querySelector('#send')
buttonSendMod.addEventListener('click', function (event) {

    let id = document.getElementById("inputID").value
    destinos[+id]['destino'] = document.getElementById("inputDestino").value
    destinos[+id]['precio'] = document.getElementById("inputPrecio").value
    destinos[+id]['oferta'] = document.getElementById("inputOferta").value == 'Si' ? true : false
    destinos[+id]['estado'] = document.getElementById("inputEstado").value == 'Activo' ? true : false
    destinos[+id]['url'] = document.getElementById("inputFoto").value
    destinos[+id]['duracion'] = document.getElementById("inputDuracion").value
    destinos[+id]['alojamiento'] = document.getElementById("inputAlojamiento").value
    destinos[+id]['modalidad'] = document.getElementById("inputModalidad").value
    destinos[+id]['vuelos'] = document.getElementById("inputVuelos").value == 'Si' ? true : false
    destinos[+id]['traslado'] = document.getElementById("inputTraslado").value == 'Si' ? true : false
    destinos[+id]['cupos'] = document.getElementById("inputCupos").value

    addDest()
    modal.close()
})

