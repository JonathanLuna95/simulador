//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO

function calcularDisponible(ingresos, egresos){
    let disponible = ingresos - egresos;
    if(disponible < 0){
        disponible = 0;
    }
    return disponible;
}

function calcularCapacidadPago(montoDisponible){
    let capacidadDePago = montoDisponible/2;

    return capacidadDePago;
}

function recuperarTexto(spn,valor){
    let texto = document.getElementById(spn);
    texto.innerText=valor.toFixed(2);
}

function recuperarTextoEntero(spn,valor){
    let texto = document.getElementById(spn);
    texto.innerText=valor;
}

function calcularInteresSimple(monto,tasa,plazoAnios){
    let interes = plazoAnios*monto*(tasa/100);

    return interes;
}

function recuperarEntero(spn){
    let valor = document.getElementById(spn).value;
    
    return parseInt(valor);
}

function calcularTotalPagar(monto,interes){
    let totalAPagar = monto+interes+100;
    
    return totalAPagar;
}

function calcularCuotaMensual(total,plazoAnios){
    let cuotaMensual = total/(plazoAnios*12);

    return cuotaMensual;
}

function aprobarCredito(capacidadPago,cuotaMensual){
    if(capacidadPago>cuotaMensual){
        return true;
    } else {
        return false;
    }

}

function eliminarCaja(spn){
    let caja = document.getElementById(spn);
    caja.value = "";

}

function eliminarTexto(spn){
    let texto = document.getElementById(spn);
    texto.innerText = "";
    
}

