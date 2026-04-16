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
