"use strict";
var Datos = /** @class */ (function () {
    function Datos() {
    }
    Datos.MostrarDatos = function () {
        var nombre = document.getElementById("txtNombre").value;
        var edad = document.getElementById("txtEdad").value;
        console.log("Nombre: " + nombre + " - Edad: " + edad);
        alert("Nombre: " + nombre + " - Edad: " + edad);
        document.getElementById("div").innerHTML = "Nombre: " + nombre + " - Edad: " + edad;
    };
    return Datos;
}());
//# sourceMappingURL=main.js.map