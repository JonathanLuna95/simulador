//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML

function calcular() {

    let formularioValido = validarFormulario();

    if (formularioValido == false) {
        return;
    }

    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let arriendo = parseFloat(document.getElementById("txtArriendo").value) || 0;
    let alimentacion = parseFloat(document.getElementById("txtAlimentacion").value) || 0;
    let varios = parseFloat(document.getElementById("txtVarios").value) || 0;

    let totalGastos = arriendo + alimentacion + varios;
    recuperarTexto("spnTotalGastos", totalGastos);

    let disponible = calcularDisponible(ingresos, totalGastos);
    recuperarTexto("spnDisponible", disponible);

    let capacidadDePago = calcularCapacidadPago(disponible);
    recuperarTexto("spnCapacidadPago", capacidadDePago);

    let montoEntero = recuperarEntero("txtMonto");
    let plazoEntero = recuperarEntero("txtPlazo");
    let tasaInteresEntero = recuperarEntero("txtTasaInteres");

    let interesPorPagar = calcularInteresSimple(montoEntero, tasaInteresEntero, plazoEntero);
    recuperarTexto("spnInteresPagar", interesPorPagar);

    let totalPrestamo = calcularTotalPagar(montoEntero, interesPorPagar);
    recuperarTextoEntero("spnTotalPrestamo", totalPrestamo);

    let cuotaMensual = calcularCuotaMensual(totalPrestamo, plazoEntero);
    recuperarTexto("spnCuotaMensual", cuotaMensual);

    let resultadoCredito = aprobarCredito(capacidadDePago, cuotaMensual);

    let estadoCredito = document.getElementById("spnEstadoCredito");

    if(resultadoCredito == true){
        estadoCredito.innerText = "CRÉDITO APROBADO";
    } else {
        estadoCredito.innerText = "CRÉDITO RECHAZADO";
    }
}

function reiniciar(){

    eliminarCaja("txtIngresos");
    eliminarCaja("txtArriendo");
    eliminarCaja("txtAlimentacion");
    eliminarCaja("txtVarios");
    eliminarCaja("txtMonto");
    eliminarCaja("txtPlazo");
    eliminarCaja("txtTasaInteres");

    eliminarTexto("spnTotalGastos");
    eliminarTexto("spnDisponible");
    eliminarTexto("spnCapacidadPago");
    eliminarTexto("spnInteresPagar");
    eliminarTexto("spnTotalPrestamo");
    eliminarTexto("spnCuotaMensual");

    limpiarErrores();

    document.getElementById("spnEstadoCredito").innerText = "ANALIZANDO...";
}

function validarFormulario(){
    limpiarErrores();

    let esValido = true;

    let ingresos = document.getElementById("txtIngresos").value;
    let arriendo = document.getElementById("txtArriendo").value;
    let alimentacion = document.getElementById("txtAlimentacion").value;
    let varios = document.getElementById("txtVarios").value;
    let monto = document.getElementById("txtMonto").value;
    let plazo = document.getElementById("txtPlazo").value;
    let tasa = document.getElementById("txtTasaInteres").value;

    if (ingresos == "") {
        mostrarError("errorIngresos", "El campo ingresos es obligatorio");
        esValido = false;
    } else if (isNaN(ingresos)) {
        mostrarError("errorIngresos", "Ingrese un valor numérico válido");
        esValido = false;
    } else if (Number(ingresos) <= 0) {
        mostrarError("errorIngresos", "Debe ser mayor a 0");
        esValido = false;
    }

    if (arriendo == "") {
        mostrarError("errorArriendo", "El campo arriendo es obligatorio");
        esValido = false;
    } else if (isNaN(arriendo)) {
        mostrarError("errorArriendo", "Ingrese un valor numérico válido");
        esValido = false;
    } else if (Number(arriendo) < 0) {
        mostrarError("errorArriendo", "No puede ser negativo");
        esValido = false;
    }

    if (alimentacion == "") {
        mostrarError("errorAlimentacion", "El campo alimentación es obligatorio");
        esValido = false;
    } else if (isNaN(alimentacion)) {
        mostrarError("errorAlimentacion", "Ingrese un valor numérico válido");
        esValido = false;
    } else if (Number(alimentacion) < 0) {
        mostrarError("errorAlimentacion", "No puede ser negativo");
        esValido = false;
    }

    if (varios == "") {
        mostrarError("errorVarios", "El campo varios es obligatorio");
        esValido = false;
    } else if (isNaN(varios)) {
        mostrarError("errorVarios", "Ingrese un valor numérico válido");
        esValido = false;
    } else if (Number(varios) < 0) {
        mostrarError("errorVarios", "No puede ser negativo");
        esValido = false;
    }

    if (monto == "") {
        mostrarError("errorMonto", "El campo monto es obligatorio");
        esValido = false;
    } else if (isNaN(monto)) {
        mostrarError("errorMonto", "Ingrese un valor numérico válido");
        esValido = false;
    } else if (Number(monto) <= 0) {
        mostrarError("errorMonto", "Debe ser mayor a 0");
        esValido = false;
    }

    if (plazo == "") {
        mostrarError("errorPlazo", "El campo plazo es obligatorio");
        esValido = false;
    } else if (isNaN(plazo)) {
        mostrarError("errorPlazo", "Ingrese un número válido");
        esValido = false;
    } else if (!Number.isInteger(Number(plazo))) {
        mostrarError("errorPlazo", "Debe ser un número entero");
        esValido = false;
    } else if (Number(plazo) <= 0) {
        mostrarError("errorPlazo", "Debe ser mayor a 0");
        esValido = false;
    } else if (Number(plazo) > 25) {
        mostrarError("errorPlazo", "Máximo 25 años");
        esValido = false;
    }

    if (tasa == "") {
        mostrarError("errorTasa", "Debe seleccionar una tasa de interés");
        esValido = false;
    }

    return esValido;
}