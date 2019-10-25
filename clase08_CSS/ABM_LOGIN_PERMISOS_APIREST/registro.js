"use strict";
function Registro() {
    //UTILIZANDO EL DOM, TOMA VALORES DE LAS DISTINTAS CAJAS DE TEXTO
    var nombre = document.getElementById("txtNombre").value;
    var apellido = document.getElementById("txtApellido").value;
    var correo = document.getElementById("txtCorreo").value;
    var clave = document.getElementById("txtClave").value;
    var perfil = document.getElementById("txtPerfil").value;
    //RECUPERA LA FOTO EN FORMATO BINARIO
    var foto = document.getElementById("foto");
    //PARA ENVIAR ARCHIVOS A TRAVES DE UN XMLHTTPREQUEST, SE UTILIZA EL OBJETO FORMDATA
    //
    var form = new FormData();
    form.append('usuario', '{"nombre": "' + nombre + '", "apellido": "' + apellido
        + '", "correo": "' + correo + '", "clave": "' + clave + '", "perfil": "' + perfil + '"}');
    form.append('foto', foto.files[0]);
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "./admin_registro.php");
    //IMPORTANTE!!! CUANDO SE ENVIAN ARCHIVOS, EL ENCABEZADO DEL REQUEST ES DIFERENTE
    httpRequest.setRequestHeader("enctype", "multipart/form-data");
    httpRequest.send(form);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.status == 200 && httpRequest.readyState == 4) {
            window.location.href = "./login.php";
            console.log(JSON.parse(httpRequest.responseText));
        }
    };
}
