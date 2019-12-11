"use strict";
///<reference path="node_modules/@types/jquery/index.d.ts"/>
// Manejadora de eventos. Asigna una funcion anonima al evento Ready 
// Este evento se dispara cuando finaliza el rendetizado de la pagina HTML
$(document).ready(function () {
    $("#btnLimpiar").click(function (event) {
        Manejadora.EscondeAlertLogin();
    });
});
var Manejadora = /** @class */ (function () {
    function Manejadora() {
    }
    /* @resumen Toma correo y clave del formulario de login y lo envia al BACKEND para verificar existencia
    * en la BD. Si el BACKEND responde afirmativamente, guarda token y perfil del usuario y redirige hacia
    * la pagina principal
    *
    * @param sin parametros
    * @return sin retorno
    */
    Manejadora.EnviarLogin = function () {
        var correo = $("#mailText").val();
        var clave = $("#claveText").val();
        var usuario = '{"correo": "' + correo + '", "clave": "' + clave + '"}';
        $.ajax({
            type: "POST",
            url: "../BACKEND/login",
            dataType: "json",
            data: "datos=" + usuario,
        })
            .done(function (respuesta) {
            localStorage.setItem('token', respuesta.JWT);
            localStorage.setItem('perfil', respuesta.usuario.perfil);
            window.location.replace('./principal.html');
        })
            .fail(function () {
            $('#alertText').html('<h2>Correo o clave incorrectos</h2>');
            $('.alert').show();
        })
            .always(function () {
        });
    };
    /* @resumen Toma todos los datos del usuario del formulario de registro y los envia al BACKEND.
    * Si el correo ingresado no existe previamente en BD, se da de alta al nuevo usuario; si el correo
    * ya fue utilizado se avisa a traves de un alert de bootstrap
    *
    * @param sin parametros
    * @return sin retorno
    */
    Manejadora.EnviarRegistro = function () {
        var apellido = $('#apellido').val();
        var nombre = $('#nombre').val();
        var correo = $('#mail').val();
        var perfil = $('#perfil').val();
        var clave = $('#password').val();
        var foto = $('#foto').prop('files')[0];
        //let nombreFoto = <string>$('#foto').val();
        //nombreFoto = nombreFoto.split("\\")[2];
        var usuario = '{"correo":"' + correo + '", "clave":"' + clave + '", "nombre":"' + nombre + '", "apellido":"' + apellido + '", "perfil":"' + perfil + '"}';
        var formData = new FormData();
        formData.append("usuario", usuario);
        formData.append("foto", foto);
        $.ajax({
            type: "POST",
            url: "../BACKEND/usuarios",
            dataType: "json",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
        })
            .done(function (respuesta) {
            console.log('Se dio de alta un nuevo usuario');
            $('#registro').hide();
            $('.modal-backdrop').hide();
        })
            .fail(function (respuesta) {
            $('#registro').hide();
            $('.modal-backdrop').hide();
            $('#alertText').html('<h2>' + respuesta.responseJSON.mensaje + '</h2>');
            $('.alert').show();
        })
            .always(function () {
        });
    };
    /* @resumen Esconde todos los alert de bootstrap de la pagina
    *
    * @param sin parametros
    * @return sin retorno
    */
    Manejadora.EscondeAlertLogin = function () {
        $(".alert").hide();
    };
    return Manejadora;
}());
