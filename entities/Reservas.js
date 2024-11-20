const reservations = []

class Reservation {
    constructor(IDreservation, IDdestino, cantidadPersonas, totalAmount, status) {
        this.IDreservation = IDreservation;
        this.IDdestino = IDdestino;
        this.cantidadPersonas = cantidadPersonas;
        this.totalAmount = totalAmount;
        this.status = status;
    }
}

/*         this.reservations = [/* 
{"cant":"123123123",
"mPayment":"efectivo",
"destID":"DEST_ID_1",
"userId":3,
"state":"Pendiente",
"reservID":0} */;