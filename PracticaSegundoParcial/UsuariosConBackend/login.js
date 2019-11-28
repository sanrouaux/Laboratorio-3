"use strict";
///<reference path="node_modules/@types/jquery/index.d.ts"/>
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
function EnviarLogin() {
    var correo = $("#mailText").val();
    var clave = $("#claveText").val();
    var usuariosString = localStorage.getItem('usuarios');
    if (usuariosString != null) {
        var arrayJson = JSON.parse(usuariosString);
        var bandera = 0;
        for (var _i = 0, arrayJson_1 = arrayJson; _i < arrayJson_1.length; _i++) {
            var usu = arrayJson_1[_i];
            if (usu.correo == correo && usu.clave == clave) {
                bandera = 1;
                localStorage.setItem('usuarioLogueado', JSON.stringify(usu));
                //Genera Token
                $.ajax({
                    type: "POST",
                    url: "./BACKEND/JWT/Crear",
                    dataType: "json",
                    data: "correo=" + correo,
                    async: true
                })
                    .done(function (respuesta) {
                    localStorage.setItem('token', respuesta.token);
                    window.location.replace('./principal.html');
                })
                    .fail(function () {
                    alert("Hubo un error al conectar con la Base de Datos");
                })
                    .always(function () {
                });
            }
        }
        if (bandera == 0) {
            $(".alert").show();
        }
    }
}
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
function EscondeAlertLogin() {
    $(".alert").hide();
}
function RedireccionaRegistro() {
    window.location.replace('./registro.html');
}
function TraerUsuariosDB() {
    $.ajax({
        type: "GET",
        url: "./BACKEND/Usuarios/",
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        async: true
    })
        .done(function (respuesta) {
        localStorage.setItem('usuarios', JSON.stringify(respuesta));
    })
        .fail(function () {
        alert("Hubo un error al conectar con la Base de Datos");
    })
        .always(function () {
    });
}
