/// <reference path="empleado.ts" />

var emp : Ejercicio.Empleado = new Ejercicio.Empleado("Juan", "Dominguez", 32456765, "m", 2514, 10000);

console.log(emp.GetNombre());

console.log(emp.GetApellido());

console.log(emp.GetDni());

console.log(emp.GetSexo());

console.log(emp.GetLegajo());

console.log(emp.GetSueldo());

console.log(emp.Hablar("Español"));

console.log(emp.ToString());


