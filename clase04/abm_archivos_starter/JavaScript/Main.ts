function AgregarProducto()
{
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "./administracion.php", true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send("queHago=agregar");
    httpRequest.onreadystatechange = () => {
    if(httpRequest.status == 200 && httpRequest.readyState == 4)
    {
        alert(httpRequest.response);        
    }
  }
}