class Datos
{
  public static MostrarDatos() : void
  {
    //UTILIZA EL DOM PARA TRAER ELEMENTOS DEL HTML
    let nombre : string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
    let edad : string = (<HTMLInputElement>document.getElementById("txtEdad")).value;

    //console.log("Nombre: " + nombre + " - Edad: " + edad);
    //alert("Nombre: " + nombre + " - Edad: " + edad);

    //UTILIZA EL DOM PARA INSERTAR ELEMENTOS EN EL HTML
    (<HTMLDivElement>document.getElementById("div")).innerHTML = "Nombre: " + nombre + " - Edad: " + edad;
  }
}
