//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML

function calcular() {

     let formularioValido = validarFormulario();

    if (formularioValido == false) {
        return;
    }

    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);
 
    let disponible = calcularDisponible(ingresos, egresos);
    recuperarTexto("spnDisponible",disponible);
 
    let capacidadDePago = calcularCapacidadPago(disponible);
    recuperarTexto("spnCapacidadPago",capacidadDePago);

    let montoEntero = recuperarEntero("txtMonto");
    let plazoEntero = recuperarEntero("txtPlazo");
    let tasaInteresEntero = recuperarEntero("txtTasaInteres");

    let interesPorPagar = calcularInteresSimple(montoEntero,tasaInteresEntero,plazoEntero);
    recuperarTexto("spnInteresPagar", interesPorPagar);
    
    //let interesAPagar = document.getElementById("spnInteresPagar");
    //interesAPagar.innerText=interesPorPagar;

    let totalPrestamo = calcularTotalPagar(montoEntero,interesPorPagar);
    recuperarTextoEntero("spnTotalPrestamo",totalPrestamo );

    let cuotaMensual= calcularCuotaMensual(totalPrestamo,plazoEntero);
    recuperarTexto("spnCuotaMensual",cuotaMensual);

    let resultadoCredito = aprobarCredito(capacidadDePago,cuotaMensual);
  
    let estadoCredito = document.getElementById("spnEstadoCredito");
    
    if(resultadoCredito == true){
        estadoCredito.innerText= "CRÉDITO APROBADO";
    } else {
        estadoCredito.innerText= "CRÉDITO RECHAZADO";
    }
}

function reiniciar(){

    eliminarCaja("txtIngresos");
    eliminarCaja("txtEgresos");
    eliminarCaja("txtMonto");
    eliminarCaja("txtPlazo");
    eliminarCaja("txtTasaInteres");

    eliminarTexto("spnDisponible");
    eliminarTexto("spnCapacidadPago");
    eliminarTexto("spnInteresPagar");
    eliminarTexto("spnTotalPrestamo");
    eliminarTexto("spnCuotaMensual");

}

function validarFormulario(){
    limpiarErrores();

    let esValido = true;

    let ingresos = document.getElementById("txtIngresos").value;
    let egresos = document.getElementById("txtEgresos").value;
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

    if (egresos == "") {
        mostrarError("errorEgresos", "El campo egresos es obligatorio");
        esValido = false;
    } else if (isNaN(egresos)) {
        mostrarError("errorEgresos", "Ingrese un valor numérico válido");
        esValido = false;
    } else if (Number(egresos) < 0) {
        mostrarError("errorEgresos", "No puede ser negativo");
        esValido = false;
    } else if (!isNaN(ingresos) && Number(egresos) > Number(ingresos)) {
        mostrarError("errorEgresos", "No pueden ser mayores que los ingresos");
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

