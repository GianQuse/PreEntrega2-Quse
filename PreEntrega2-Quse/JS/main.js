//INICIO PROYECTO-------------------------------------

const eventosContratados = [];

let inicio;
let tipoDeEvento;
let presupuestoCliente;
let presupuestoSuperado;
let costo = 0;
let disponible;
let seleccionarServicio;

//FUNCION PARA BUSCAR DATOS---------------------------
function buscarDato(buscador) {
    return eventosContratados.findIndex(index => index.dni === buscador);
}
//----------------------------------------------------
do {

    inicio = parseInt(prompt(`1_Iniciar como cliente\n\n2_Iniciar como Administrador\n\n0_Para Salir`))

    if (inicio === 1) {

        //CLASS CREAR CLIENTE---------------------------------------------------------------------
        class DatosCliente {
            nombre = "";
            apellido = "";
            dni = "";
            servicio = [];

            constructor(nombre, apellido, dni) {
                this.nombre = nombre;
                this.apellido = apellido;
                this.dni = dni;
                this.servicio = [];
                this.costoTotal = [];
            }

            agregarCliente() {
                eventosContratados.push(this)
            }
        }

        //CLASS CREAR SERVICIOS CONTRATADOS Y SE GUARDAN EN SERVICIO DE "DATOS CLIENTE"---------------
        class EventoContratado {
            nombreEvento = "";
            servicio = "";
            precio = 0;

            constructor(nombreEvento, servicio, precio) {
                this.nombreEvento = nombreEvento;
                this.servicio = servicio;
                this.precio = precio;
            }

            agregarEvento() {
                eventosContratados[indexCliente].servicio.push(this);
            }

            agregarCosto() {
                eventosContratados[indexCliente].costoTotal.push(this.precio);
            }

            eliminarUltimoCosto() {
                eventosContratados[indexCliente].costoTotal.pop()
            }
        }

        //CREAR NUEVO CLIENTE----------------------------------------------------------------------
        let nombreCliente;
        let apellidoCliente;
        let dniCliente;
        let compararDni;
        let nuevoCliente;
        let indexCliente;

        do {
            nombreCliente = prompt("Ingrese su nombre").toUpperCase();
            apellidoCliente = prompt("Ingrese su apellido").toUpperCase();
            //TODO LIMITAR dniCliente A SOLO NUMEROS!!
            dniCliente = prompt("Ingrese su numero de DNI");

            //VERIFICAR SI EL DNI ESTA REGISTRADO-------------------------------------
            compararDni = eventosContratados.find(acumulador => acumulador.dni === dniCliente);

            if (compararDni !== undefined) {
                alert(`ESTE DNI YA FUE REGISTRADO\n\nINGRESA CON OTRO USUARIO.`);
            } else {
                nuevoCliente = new DatosCliente(nombreCliente, apellidoCliente, dniCliente);
                nuevoCliente.agregarCliente();

                indexCliente = buscarDato(dniCliente);
            }
        } while (compararDni !== undefined);

        //SELECCION DE EVENTO (BODA, CUMPLEAÑOS, RECEPCION)-------------------------------------------------------

        do {
            tipoDeEvento = parseInt(prompt(`Seleccione el tipo de evento: 
        1_${eventoBoda[0].nombreEvento}
        2_${eventoCumpleaños[0].nombreEvento}
        3_${eventoRecepcion[0].nombreEvento}

        Ingresa el N° correspondiente.`))

            if (tipoDeEvento !== 1 && tipoDeEvento !== 2 && tipoDeEvento !== 3) {
                alert("No selecciono ningun evento.")
            }

        } while (tipoDeEvento !== 1 && tipoDeEvento !== 2 && tipoDeEvento !== 3);

        //SOLICITUD DE PRESUPUESTO-------------------------------------------------------------------------------

        const pedirPresupuesto = () => { presupuestoCliente = parseInt(prompt("Ingrese su presupuesto estimado. (Minimo $100)")) }

        pedirPresupuesto()

        while (presupuestoCliente < 100 || isNaN(presupuestoCliente)) {
            alert("El monto ingresado no es correcto.")
            pedirPresupuesto()
        }

        //INICIO DE IF POR EVENTO--------------------------------------------------------------------------------------------
        //FUNCION PARA RESTAR PRESUPUESTO Y COSTO TOTAL---------------------
        function presupuestoDisponible(presupuestoCliente, costo) {
            return presupuestoCliente - costo;
        }
        //------------------------------------------------------------------
        let acumulador = "";

        if (tipoDeEvento === 1) {
            //--------------------------------------------------------------------
            for (let index = 0; index < eventoBoda.length; index++) {
                acumulador += eventoBoda[index].Id + `_` + eventoBoda[index].servicio + ` $` + eventoBoda[index].precio + `\n`
            }
            //---------------------------------------------------------------------

            do {
                seleccionarServicio = parseInt(prompt(`Selecciona los servicios a contratar: (Ingresa los N° correspondientes)\n\n${acumulador}\n0_PARA FINALIZAR`)) - 1;

                let evento;

                if (seleccionarServicio < eventoBoda.length && seleccionarServicio >= 0) {
                    evento = new EventoContratado(eventoBoda[seleccionarServicio].nombreEvento, eventoBoda[seleccionarServicio].servicio, eventoBoda[seleccionarServicio].precio);
                    evento.agregarEvento();
                    evento.agregarCosto();
                    costo = eventosContratados[indexCliente].costoTotal.reduce((acumulador, valorActual) => acumulador + valorActual, 0)
                    disponible = presupuestoDisponible(presupuestoCliente, costo);
                    alert(`SERVICIO CONTRATADO\n\nCOSTO TOTAL: $${costo}\n\nDISPONIBLE PRESUPUESTO: $${disponible}`)
                } else if (seleccionarServicio === -1) {
                    alert(`GRACIAS POR ELEGIRNOS!\n\nCOSTO TOTAL: $${costo}`)
                } else {
                    alert("No selecciono ningun servicio.")
                }

                //INICIO IF PRESUPUESTO------------------------------------------------------------------------

                if (disponible < 0 && presupuestoSuperado != 1) {
                    do {
                        presupuestoSuperado = parseInt(prompt(`Ha superado su presupuesto, desea continuar cargando servicios?
                                
                                1_Si, deseo seguir comprando.
                
                                2_Terminar con mi presupuesto.
                                `))

                        if (presupuestoSuperado === 1) {
                            alert("Sigamos armando tu Boda!")
                        } else if (presupuestoSuperado === 2) {
                            evento.eliminarUltimoCosto()
                            costo = eventosContratados[indexCliente].costoTotal.reduce((acumulador, valorActual) => acumulador + valorActual, 0)
                            alert(`El ultimo servicio seleccionado a sido desestimado.\n\nGRACIAS POR ELEGIRNOS!\n\nSERVICIO/S CONTRATADO/S.\n\nCOSTO TOTAL: $${costo}`)
                            seleccionarServicio = -1;
                        } else {
                            alert("Opcion incorrecta.")
                        }
                    } while ((presupuestoSuperado !== 1 & presupuestoSuperado !== 2) || isNaN(presupuestoSuperado));
                }

            } while (seleccionarServicio !== -1);

        }

        else if (tipoDeEvento === 2) {
            alert(`PRONTO CONTAREMOS CON ESTE SERVICIO.
        
        GRACIAS POR ELEGIRNOS!`)
        }
        else if (tipoDeEvento === 3) {
            alert(`PRONTO CONTAREMOS CON ESTE SERVICIO.
        
        GRACIAS POR ELEGIRNOS!`)
        }

    } else if (inicio === 2) {
        let busqueda;
        let buscador;
        let filtro;

        do {
            busqueda = parseInt(prompt(`ELIJA UNA OPCION DE FILTRADO
            1_ DNI CLIENTE
            2_ NOMBRE CLIENTE
            3_ APELLIDO CLIENTE
            FILTRAR POR EVENTO:
                    4_BODA
            
            0_PARA SALIR`))

            let filtroCliente = "";
            let filtroServicio = "";
            let index = 0;

            function filtrar(parametro) {
                if (parametro.length === 0) {
                    alert("NO SE ENCONTRO NINGUN DATO")
                } else {
                    for (index = 0; index < parametro.length; index++) {
                        filtroCliente += `Nombre: ${parametro[index].nombre}\nApellildo: ${parametro[index].apellido}\nDNI: ${parametro[index].dni}\n`;

                        for (let e = 0; e < parametro[index].servicio.length; e++) {
                            filtroServicio += `_ ${parametro[index].servicio[e].servicio}\n`;
                        }

                        filtroCliente += filtroServicio + "\n";

                        filtroServicio = "";

                    }
                    alert(filtroCliente);
                }
            }

            switch (busqueda) {
                case 1:
                    do {
                        buscador = prompt(`INGRESE DNI DEL CLIENTE\n\n0_PARA MENU ANTERIOR`);
                        if (buscador !== "0") {
                            filtro = eventosContratados.filter(acumulador => acumulador.dni === buscador);
                            filtrar(filtro);
                        }
                    } while (filtro.length === 0 && buscador !== "0");
                    break;
                case 2:
                    do {
                        buscador = prompt(`INGRESE NOMBRE DEL CLIENTE\n\n0_PARA MENU ANTERIOR`).toUpperCase();
                        if (buscador !== "0") {
                            filtro = eventosContratados.filter(acumulador => acumulador.nombre === buscador);
                            filtrar(filtro);
                        }
                    } while (filtro.length === 0 && buscador !== "0");
                    break;
                case 3:
                    do {
                        buscador = prompt(`INGRESE APELLIDO DEL CLIENTE\n\n0_PARA MENU ANTERIOR`).toUpperCase();
                        if (buscador !== "0") {
                            filtro = eventosContratados.filter(acumulador => acumulador.apellido === buscador);
                            filtrar(filtro);
                        }
                    } while (filtro.length === 0 && buscador !== "0");
                    break;
                case 4:
                    filtro = eventosContratados.filter(acumulador => acumulador.servicio[0].nombreEvento === "Boda");
                    filtrar(filtro);
                    break;
                case 0:
                    alert("SESION CERRADA")
                    break;
                default:
                    alert("LA OPCION SELECCIONADA NO ES CORRECTA")
                    break;
            }
        } while (busqueda !== 0);

    } else if (inicio === 0) {
        alert("SALUDOS!")
    } else {
        alert("La opcion no es correcta")
    }

} while (inicio !== 0);