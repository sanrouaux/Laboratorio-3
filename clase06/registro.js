"use strict";
function Registro() {
    var nombre = document.getElementById("txtNombre").value;
    var apellido = document.getElementById("txtApellido").value;
    var correo = document.getElementById("txtCorreo").value;
    var clave = document.getElementById("txtClave").value;
    var perfil = document.getElementById("txtPerfil").value;
    var foto = document.getElementById("foto");
    var form = new FormData();
    form.append('foto', foto.files[0]);
    form.append('usuario', '{"nombre": "' + nombre + '", "apellido": "' + apellido + '", "correo": "' + correo + '", "clave": "' + clave + '", "perfil": "' + perfil + '"}');
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "./admin_registro.php");
    httpRequest.setRequestHeader("enctype", "multipart/form-data");
    httpRequest.send(form);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.status == 200 && httpRequest.readyState == 4) {
            console.log(JSON.parse(httpRequest.responseText));
        }
    };
}
