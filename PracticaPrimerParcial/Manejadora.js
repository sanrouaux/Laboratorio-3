"use strict";
/// <reference path="./Alien.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarAlien = function () {
            var cuadrante = document.getElementById("cuadrante").value;
            var edad = document.getElementById("edad").value;
            var altura = document.getElementById("altura").value;
            var raza = document.getElementById("raza").value;
            var planetOrigen = document.getElementById("planetaOrigen").value;
            var foto = document.getElementById("pathFoto").value;
            //let foto : any = (<HTMLInputElement> document.getElementById("pathFoto"));
            alert(foto);
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
