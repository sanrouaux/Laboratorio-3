/// <reference path="empleado.ts" />

function AltaEmpleado()
{
    var nombre : string = (<HTMLTextAreaElement>document.getElementById("txtNombre")).value;
    var apellido : string = (<HTMLTextAreaElement>document.getElementById("txtApellido")).value;
    var dni : number = parseInt((<HTMLTextAreaElement>document.getElementById("txtDni")).value);
    var sexo : string = (<HTMLTextAreaElement>document.getElementById("txtSexo")).value;
    var legajo : number = parseInt((<HTMLTextAreaElement>document.getElementById("txtLegajo")).value);
    var sueldo :  number = parseInt((<HTMLTextAreaElement>document.getElementById("txtSueldo")).value);

    var empleado = new Ejercicio.Empleado(nombre, apellido, dni, sexo, legajo, sueldo);

    localStorage.setItem("Empleados", nombre+","+legajo);
}