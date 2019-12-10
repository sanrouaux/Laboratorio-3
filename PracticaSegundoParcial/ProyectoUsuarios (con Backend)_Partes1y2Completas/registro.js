"use strict";
//npm install --save @types/jquery
///<reference path='./node_modules/@types/jquery/index.d.ts' />
$(document).ready(function () {
    /*$('#btnEnviar').click(function(e : any) {
        e.preventDefault();
        EnviarRegistro();
    });*/
    $("#btnLimpiar").click(function (event) {
        EscondeAlertRegistro();
    });
});
function EnviarRegistro() {
    var nombre = $('#nombreText').val();
    var apellido = $('#apellidoText').val();
    var mail = $('#mailText').val();
    var legajo = $('#legajoText').val();
    var perfil = $('#perfilText').val();
    var clave = $('#claveText').val();
    var foto = $('#fotoFile').prop('files')[0];
    var nombreFoto = $('#fotoFile').val();
    nombreFoto = nombreFoto.split("\\")[2];
    var existeUsuario = false;
    var stringUsuarios = localStorage.getItem('usuarios');
    if (stringUsuarios != null) {
        var arrayUsuarios_2 = JSON.parse(stringUsuarios);
        for (var _i = 0, arrayUsuarios_1 = arrayUsuarios_2; _i < arrayUsuarios_1.length; _i++) {
            var usu = arrayUsuarios_1[_i];
            if (usu.correo == mail) {
                existeUsuario = true;
                break;
            }
        }
        if (existeUsuario == false) {
            var nuevoUsuario_1 = '{"correo":"' + mail + '", "clave":"' + clave + '", "nombre":"' + nombre + '", "apellido":"' + apellido + '", "legajo":"' + legajo + '", "perfil":"' + perfil + '", "foto":"/fotos/' + nombreFoto + '"}';
            var formData = new FormData();
            formData.append("usuario", nuevoUsuario_1);
            formData.append("foto", foto);
            $.ajax({
                type: "POST",
                url: "./BACKEND/Usuarios/",
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                data: formData,
                async: true
            })
                .done(function (respuesta) {
                var nuevoUsuJson = JSON.parse(nuevoUsuario_1);
                arrayUsuarios_2.push(nuevoUsuJson);
                localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios_2));
                window.location.replace('./login.html');
            })
                .fail(function () {
                alert("Hubo un error al conectar con la Base de Datos");
            })
                .always(function () {
            });
        }
        else {
            $('#alertText').html('<h2>Ya existe un usuario registrado con este e-mail</h2>');
            $('.alert').show();
        }
    }
}
function EscondeAlertRegistro() {
    $(".alert").hide();
}
