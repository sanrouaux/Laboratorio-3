window.onload = () =>
{
    //ir a verificacion.php 
    //me tiene que devolver ok o no-ok
    var http = new XMLHttpRequest();
    http.open("POST", "./verificacion.php", true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.send("");
    http.onreadystatechange = () => {
    if(http.status == 200 && http.readyState == 4)
    {
        (<HTMLDivElement>document.getElementById("divGrilla")).innerHTML = http.response;        
    }
    cargarGrilla();
}

function cargarGrilla()
{
  var http = new XMLHttpRequest();
  http.open("POST", "./administracion.php", true);
  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  http.send("queHago=mostrarGrilla");
  http.onreadystatechange = () => {
    if(http.status == 200 && http.readyState == 4)
    {
        (<HTMLDivElement>document.getElementById("divGrilla")).innerHTML = http.response;        
    }
  }
}