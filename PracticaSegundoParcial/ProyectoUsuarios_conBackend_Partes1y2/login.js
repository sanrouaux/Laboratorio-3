"use strict";
///<reference path="node_modules/@types/jquery/index.d.ts"/>
//Al terminar de cargar el documento, llama una serie de funciones y agrega funcionalidad a botones
$(document).ready(function () {
    //CargaInicialUsuarios();
    TraerUsuariosDB();
    $("#btnRegistrar").click(function (event) {
        RedireccionaRegistro();
    });
    $("#btnLimpiar").click(function (event) {
        EscondeAlertLogin();
    });
});
/* @resumen Carga en el LocalStorage un array de usuarios
*
* @param Sin parametros
*
* @return Sin retorno
*/
function CargaInicialUsuarios() {
    if (localStorage.getItem('usuarios') == null) {
        var json = '[{"correo":"santiago@mail.com", "clave":"1234", "nombre":"santiago", "apellido":"rouaux", "legajo":"1432", "perfil":"Admin", "foto":"/fotos/jack.jpg"},' +
            '{"correo":"julia@mail.com", "clave":"1234", "nombre":"julia", "apellido":"gonzalez", "legajo":"8765", "perfil":"Invitado", "foto":"/fotos/julia.jpg"},' +
            '{"correo":"martin@mail.com", "clave":"1234", "nombre":"martin", "apellido":"rodriguez", "legajo":"3456", "perfil":"Invitado", "foto":"/fotos/house.jpg"},' +
            '{"correo":"rodrigo@mail.com", "clave":"1234", "nombre":"rodrigo", "apellido":"santillan", "legajo":"3232", "perfil":"Invitado", "foto":"/fotos/rodrigo.jpg"},' +
            '{"correo":"carolina@mail.com", "clave":"1234", "nombre":"carolina", "apellido":"roca", "legajo":"4321", "perfil":"Invitado", "foto":"/fotos/carolina.jpg"}]';
        localStorage.setItem('usuarios', json);
        console.log(json);
    }
    else {
        console.log('Ya existe el listado de usuario en LocalStorage');
    }
}
/* @resumen Toma correo y clave de los inputs y verifica si el usuario existe en el array de json
*
* @param Sin parametros
*
* @return Sin retorno
*/
function EnviarLogin() {
    var correo = $("#mailText").val();
    var clave = $("#claveText").val();
    var datos = '{"correo": "' + correo + '", "clave": "' + clave + '"}';
    //Genera Token
    $.ajax({
        type: "POST",
        url: "./BACKEND/login",
        dataType: "json",
        data: "datos=" + datos,
    })
        .done(function (respuesta) {
        localStorage.setItem('token', respuesta.JWT);
        localStorage.setItem('perfil', respuesta.usuario.perfil);
        localStorage.setItem('usuarioLogueado', respuesta.usuario.correo);
        window.location.replace('./principal.html');
    })
        .fail(function () {
        $('#alertText').html('E-mail o clave incorrecta');
        $('.alert').show();
    })
        .always(function () {
    });
}
/* @resumen Toma correo y clave de los inputs y verifica si el usuario existe en el array de json
*
* @param Sin parametros
*
* @return Sin retorno
*/
function TraerUsuariosDB() {
    $.ajax({
        type: "GET",
        url: "./BACKEND",
        dataType: "json",
    })
        .done(function (respuesta) {
        localStorage.setItem('usuarios', JSON.stringify(respuesta.usuarios));
    })
        .fail(function () {
        alert("Hubo un error al conectar con la Base de Datos");
    })
        .always(function () {
    });
}
function EscondeAlertLogin() {
    $(".alert").hide();
}
function RedireccionaRegistro() {
    window.location.replace('./registro.html');
}
