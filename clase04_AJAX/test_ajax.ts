function Test()
{
  var http = new XMLHttpRequest();

  http.open("GET", "./Backend/test.php");

  http.send();

  http.onreadystatechange = () => {
    if(http.status == 200 && http.readyState == 4)
    {
        alert(http.responseText);
    }
  }
}

function Test_params()
{
  var texto : string = (<HTMLTextAreaElement>document.getElementById("txt")).value;
  
  var http = new XMLHttpRequest();

  http.open("POST", "./Backend/test_params.php", true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.send("txt="+texto);

  http.onreadystatechange = () => {
    if(http.status == 200 && http.readyState == 4)
    {
        alert(http.responseText);
    }
  }
}

//window es la ventana de navegacion y el onload es un manejador de eventos; se ejecuta
//cuando se termina de cargar el DOM de la pagina
window.onload = () => {
  Test();
}
