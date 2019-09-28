"use strict";
function Aceptar() {
    var correo = document.getElementById("txtCorreo").value;
    var clave = document.getElementById("txtClave").value;
    var usuario = '{"correo": "' + correo + '", "clave": "' + clave + '"}';
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "./test_usuario.php");
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send("usuario=" + usuario);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.status == 200 && httpRequest.readyState == 4) {
            console.log(JSON.parse(httpRequest.responseText));
        }
    };
}
