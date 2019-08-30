class Datos
{
  public static MostrarDatos() : void
  {
    let nombre : string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
    let edad : string = (<HTMLInputElement>document.getElementById("txtEdad")).value;

    console.log("Nombre: " + nombre + " - Edad: " + edad);
    alert("Nombre: " + nombre + " - Edad: " + edad);

    (<HTMLDivElement>document.getElementById("div")).innerHTML = "Nombre: " + nombre + " - Edad: " + edad;
  }
}
