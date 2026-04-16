//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML

function calcular() {
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
    interesAPagar.innerText=interesPorPagar;


}

