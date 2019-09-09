if(localStorage.getItem("Empleados") == null)
{
  localStorage.setItem("Empleados", "Juan-123,Rosa-456,Carlos-666");
}

function Loguear()
{
  
  var bandera = 0;

  var nombre : string = (<HTMLTextAreaElement>document.getElementById("txtNombre")).value;
  var legajo = (<HTMLTextAreaElement>document.getElementById("txtLegajo")).value;

  var todosEmpleados = localStorage.getItem("Empleados");

  if(todosEmpleados != null)
  {
    var arrayEmpleados : string[] = todosEmpleados.split(",");
    for(let i = 0; i < arrayEmpleados.length; i++)
    {
      var emp : string [] = arrayEmpleados[i].split("-");

      if(emp[0] == nombre && emp[1] == legajo)
      {
        alert("Se encontro al empleado " + emp[0] + ", cuyo numero de legajo es " + emp[1]);
        bandera = 1;
        window.location.href="principal.html";
        break;
      }
    }

    if(bandera == 0)
    {
      alert("No se encontro al empleado");
    }
  }



}

