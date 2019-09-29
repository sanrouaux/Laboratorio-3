function Cambio(numero, cadena) {
    if (cadena != null) {
        for (var i = 0; i < numero; i++) {
            console.log(cadena);
        }
    }
    else {
        console.log(-numero);
    }
}
Cambio(3, "hola");
