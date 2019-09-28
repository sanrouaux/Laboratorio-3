function Aceptar() {
    var correo = (<HTMLTextAreaElement>document.getElementById("txtCorreo")).value;
    var clave  = (<HTMLTextAreaElement>document.getElementById("txtClave")).value;

    var usuario = '{"correo": "' + correo + '", "clave": "' + clave + '"}';

    var httpRequest : XMLHttpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "./test_usuario.php");
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send("usuario="+usuario);
    httpRequest.onreadystatechange = () => {
        if(httpRequest.status == 200 && httpRequest.readyState == 4)
        {
            console.log(JSON.parse(httpRequest.responseText));
        }
    }
}