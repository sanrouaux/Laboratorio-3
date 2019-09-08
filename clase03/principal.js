var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
/// <reference path="persona.ts" />
var Ejercicio;
(function (Ejercicio) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, dni, sexo, legajo, sueldo) {
            var _this = _super.call(this, nombre, apellido, dni, sexo) || this;
            _this._legajo = legajo;
            _this._sueldo = sueldo;
            return _this;
        }
        Empleado.prototype.GetLegajo = function () {
            return this._legajo;
        };
        Empleado.prototype.GetSueldo = function () {
            return this._sueldo;
        };
        Empleado.prototype.Hablar = function (idioma) {
            return "El empleado habla " + idioma;
        };
        Empleado.prototype.ToString = function () {
            return _super.prototype.ToString.call(this) + this.GetSueldo() + " - " + this.GetLegajo();
        };
        return Empleado;
    }(Ejercicio.Persona));
    Ejercicio.Empleado = Empleado;
})(Ejercicio || (Ejercicio = {}));
/// <reference path="empleado.ts" />
var emp = new Ejercicio.Empleado("Juan", "Dominguez", 32456765, "m", 2514, 10000);
console.log(emp.GetNombre());
console.log(emp.GetApellido());
console.log(emp.GetDni());
console.log(emp.GetSexo());
console.log(emp.GetLegajo());
console.log(emp.GetSueldo());
console.log(emp.Hablar("Español"));
console.log(emp.ToString());
