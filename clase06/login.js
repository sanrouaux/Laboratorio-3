"use strict";
function Aceptar() {
    //TOMA LOS VALORES DE LAS CAJAS DE TEXTO
    var correo = document.getElementById("txtCorreo").value;
    var clave = document.getElementById("txtClave").value;
    //CREA UN STRING CON FORMATO JSON  
    var usuario = '{"correo": "' + correo + '", "clave": "' + clave + '"}';
    //DECLARA E INSTANCIA EL OBJETO XMLHTTPREQUEST
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
