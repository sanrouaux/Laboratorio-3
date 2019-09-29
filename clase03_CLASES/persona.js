"use strict";
var Ejercicio;
(function (Ejercicio) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, dni, sexo) {
            this._nombre = nombre;
            this._apellido = apellido;
            this._dni = dni;
            this._sexo = sexo;
        }
        Persona.prototype.GetApellido = function () {
            return this._apellido;
        };
        Persona.prototype.GetDni = function () {
            return this._dni;
        };
        Persona.prototype.GetNombre = function () {
            return this._nombre;
        };
        Persona.prototype.GetSexo = function () {
            return this._sexo;
        };
        Persona.prototype.ToString = function () {
            return this.GetNombre() + " - " + this.GetApellido()
                + " - " + this.GetDni() + " - " + this.GetSexo() + " - ";
        };
        return Persona;
    }());
    Ejercicio.Persona = Persona;
})(Ejercicio || (Ejercicio = {}));
//# sourceMappingURL=persona.js.map