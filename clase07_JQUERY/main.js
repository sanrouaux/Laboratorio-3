"use strict";
/// <reference path="./node_modules/@types/jquery/index.d.ts" />
function MostrarMensaje() {
    var mensaje = $("#mensaje").val(); //Recupero por JQuery el valor del elemento con id = mensaje 
    //$("#div_mensaje").html(mensaje); //Seteo el contenido HTML del elemento con id = div_mensaje
    //Petición AJAX con JQUERY
    $.ajax({
        type: "POST",
        url: "./test.php",
        data: "mensaje=" + mensaje,
        dataType: "json" //Indico el tipo de dato que quiero recibir. El objeto ajax lo parsea
    })
        .done(function (respuesta) {
        $("#div_mensaje").html(respuesta.mensaje + " - " + respuesta.fecha);
    })
        .fail(function () {
        alert("Hubo un error");
    })
        .always(function () {
    });
}
function EnviarImagen() {
    var mensaje = $("#mensaje").val(); //Recupero por JQuery el valor del elemento con id = mensaje 
    //$("#div_mensaje").html(mensaje); //Seteo el contenido HTML del elemento con id = div_mensaje
    var imagen = document.getElementById("imagen");
    var formData = new FormData();
    formData.append("mensaje", mensaje);
    formData.append("imagen", imagen.files[0]);
    //Petición AJAX con JQUERY
    $.ajax({
        type: "POST",
        url: "./test.php",
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        async: true
    })
        .done(function (respuesta) {
        $("#div_mensaje").html(respuesta.mensaje + " - " + respuesta.fecha);
        $("#muestraImagen").attr("src", respuesta.foto);
    })
        .fail(function () {
        alert("Hubo un error");
    })
        .always(function () {
    });
}
