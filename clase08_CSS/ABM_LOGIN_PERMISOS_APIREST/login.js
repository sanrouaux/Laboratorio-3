"use strict";
/// <reference path="./node_modules/@types/jquery/index.d.ts" />
function Enviar() {
    //TOMA LOS VALORES DE LAS CAJAS DE TEXTO
    var correo = document.getElementById("txtCorreo").value;
    var clave = document.getElementById("txtClave").value;
    //CREA UN STRING CON FORMATO JSON
    var usuario = '{"correo": "' + correo + '", "clave": "' + clave + '"}';
    //DECLARA E INSTANCIA EL OBJETO XMLHTTPREQUEST
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "./login");
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send("usuario=" + usuario);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.status == 200 && httpRequest.readyState == 4) {
            //window.location.href = "./principal.php";
            //console.log(JSON.parse(httpRequest.responseText));
            $("#div").addClass("Exito");
            $("#div").html("El usuario existe");
        }
        if (httpRequest.status == 403 && httpRequest.readyState == 4) {
            //console.log(httpRequest.responseText);
            $("#div").addClass("Error");
            $("#div").html("El usuario no existe");
        }
    };
}
function Cancelar() {
    if ($("#div").attr("class") == "Exito") {
        $("#div").removeClass("Exito");
    }
    if ($("#div").attr("class") == "Error") {
        $("#div").removeClass("Error");
    }
    $("#div").html("");
}
