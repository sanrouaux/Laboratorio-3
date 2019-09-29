"use strict";
/// <reference path="empleado.ts" />
function AltaEmpleado() {
    var nombre = document.getElementById("txtNombre").value;
    var apellido = document.getElementById("txtApellido").value;
    var dni = parseInt(document.getElementById("txtDni").value);
    var sexo = document.getElementById("txtSexo").value;
    var legajo = parseInt(document.getElementById("txtLegajo").value);
    var sueldo = parseInt(document.getElementById("txtSueldo").value);
    var empleado = new Ejercicio.Empleado(nombre, apellido, dni, sexo, legajo, sueldo);
    //LOCALSTORAGE es un espacio de memoria del navegador. Es un diccionario con clave y valor.
    //Los métodos setItem y getItem permiten setear y acceder al valor almacenado a través de la clave
    localStorage.setItem("Empleados", nombre + "," + legajo);
}
//# sourceMappingURL=alta.js.map