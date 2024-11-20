if (!localStorage.getItem('reservID')) localStorage.setItem('reservID', 0)
class Sistema {
    constructor() {
        /* if (Sistema.instance) {
            return Sistema.instance; // Si ya existe una instancia, la devolvemos
        } */
        this.users = [];
        this.preLoadDest = {
            1: new Dest("CARIBE", 1050, true, true, "../img/caribe.webp", "7 días", "6 noches en hotel 5 estrellas", "All inclusive", true, true, 34, 'DEST_ID_1'),
            2: new Dest("EUROPA", 4500, false, true, "../img/europa.webp", "15 días", "14 noches en hotel 4 estrellas", "Desayuno incluido", true, true, 84, 'DEST_ID_2'),
            3: new Dest("ASIA Y ÁFRICA", 7850, true, true, "../img/africa.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 23, 'DEST_ID_3'),
            4: new Dest("AMSTERDAM", 7850, false, true, "../img/amsterdam.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 123, 'DEST_ID_4'),
            5: new Dest("MARRUECOS", 7850, true, true, "../img/marruecos.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 99, 'DEST_ID_5'),
            6: new Dest("MENDOZA", 7850, false, true, "../img/mendoza.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 27, 'DEST_ID_6'),
            7: new Dest("RÍO DE JANEIRO", 7850, true, false, "../img/rio.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 290, 'DEST_ID_7'),
            8: new Dest("ROMA", 7850, true, false, "../img/roma.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 54, 'DEST_ID_8'),
            9: new Dest("RANDOM", 7850, false, false, "../img/viajeAmigos.webp", "30 días", "29 noches en hotel 5 estrellas", "No incluye comidas", true, true, 341, 'DEST_ID_9'),
        };

        if (localStorage.getItem("reservations")) {
            this.reservations = JSON.parse(localStorage.getItem("reservations"))
        } else {
            this.reservations = [/* {"cant":"123123123","mPayment":"efectivo","destID":"DEST_ID_1","userId":3,"state":"Pendiente","reservID":0} */];
            /*  Sistema.instance = this; */
        }

    }

    pushItemToLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    getItemToLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    }

    createReservation(cant, mPayment, destID, userID, state) {
        let ID = localStorage.getItem('reservID') + 1
        let reservation = { cant: cant, mPayment: mPayment, destID: destID, userId: userID, state: state, reservID: `RESERV_ID_${ID}` }
        localStorage.setItem('reservID', ID)
        this.reservations.push(reservation)
        localStorage.setItem("reservations", JSON.stringify(this.reservations))
    }

    modifyReserv(obj) {
/*         localStorage.removeItem("reservations")
 */        this.reservations = []
        obj.forEach(element => {
/*              rleteservation = { cant: cant, mPayment: mPayment, destID: destID, userId: userID, state: state, reservID: `RESERV_ID_${window.reservID++}` }
 */         this.reservations.push(element)
        });
        /* localStorage.setItem("reservations", JSON.stringify(this.reservations)) */
    }
    isLogged() {
        const userLogged = JSON.parse(localStorage.getItem("userLoggedIn"));
        document.addEventListener("DOMContentLoaded", function checkAdminAccess() {
            if (!userLogged.isAdmin) {
                alert("Usted no tiene permisos de administrador. Será redirigido a la página principal.");
                window.location.href = "index.html"
            }
        });
    }
}

window.Sistema = new Sistema()