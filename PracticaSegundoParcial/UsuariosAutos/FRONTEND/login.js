"use strict";
///<reference path="node_modules/@types/jquery/index.d.ts"/>
$(document).ready(function () {
    $("#btnLimpiar").click(function (event) {
        Manejadora.EscondeAlertLogin();
    });
});
var Manejadora = /** @class */ (function () {
    function Manejadora() {
    }
    Manejadora.EnviarLogin = function () {
        var correo = $("#mailText").val();
        var clave = $("#claveText").val();
        var usuario = '{"correo": "' + correo + '", "clave": "' + clave + '"}';
        $.ajax({
            type: "POST",
            url: "../BACKEND/validarUsuario",
            dataType: "json",
            data: "json=" + usuario,
            async: true
        })
            .done(function (respuesta) {
            //Genera Token
            $.ajax({
                type: "POST",
                url: "../BACKEND/login",
                dataType: "json",
                data: "json=" + usuario,
                async: true
            })
                .done(function (respuesta) {
                localStorage.setItem('token', respuesta.JWT);
                window.location.replace('./principal.html');
            })
                .fail(function () {
                alert("Error al geenerar token");
            })
                .always(function () {
            });
        })
            .fail(function () {
            $('#alertText').html("Correo o clave incorrectos");
            $(".alert").show();
        })
            .always(function () {
        });
    };
    Manejadora.EnviarRegistro = function () {
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var mail = $('#mail').val();
        var perfil = $('#perfil').val();
        var clave = $('#password').val();
        var foto = $('#foto').prop('files')[0];
        var nombreFoto = $('#foto').val();
        nombreFoto = nombreFoto.split("\\")[2];
        var nuevoUsuario = '{"correo":"' + mail + '", "clave":"' + clave + '", "nombre":"' + nombre + '", "apellido":"' + apellido + '", "perfil":"' + perfil + '", "foto":"/fotos/' + nombreFoto + '", "confirmar": "si"}';
        var formData = new FormData();
        formData.append("json", nuevoUsuario);
        formData.append("img", foto);
        $.ajax({
            type: "POST",
            url: "../BACKEND/usuarios",
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            async: true
        })
            .done(function (respuesta) {
            console.log('entra al done');
        })
            .fail(function (respuesta) {
            $('#alertText').html('<h2>No se logro dar el alta</h2>');
            $('.alert').show();
        })
            .always(function () {
        });
    };
    Manejadora.EscondeAlertLogin = function () {
        $(".alert").hide();
    };
    return Manejadora;
}());
