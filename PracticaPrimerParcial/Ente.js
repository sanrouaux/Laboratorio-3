"use strict";
var Entidades;
(function (Entidades) {
    var Ente = /** @class */ (function () {
        function Ente(cuadrante, edad, altura) {
            this.cuadrante = cuadrante;
            this.edad = edad;
            this.altura = altura;
        }
        Ente.prototype.ToString = function () {
            return '"cuadrante" : "' + this.cuadrante + '", "edad" : "' + this.edad + '", "altura" : "' + this.altura + '"';
        };
        return Ente;
    }());
    Entidades.Ente = Ente;
})(Entidades || (Entidades = {}));
