"use strict";
///<reference path='./node_modules/@types/jquery/index.d.ts' />
//Asigna funcionalidad al boton Limpiar al terminar de cargar el documento 
$(document).ready(function () {
    $("#btnLimpiar").click(function (event) {
        EscondeAlertRegistro();
    });
    $("#toggleAlert").click(function (event) {
        EscondeAlertRegistro();
    });
});
/* @resumen Recupero todos los datos ingresados y da de alta a un nuevo usuario, siempre y cuando el email
*  no exista previamente en BS
*
* @param Sin parametros
*
* @return Sin retorno
*/
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
        var arrayUsuarios = JSON.parse(stringUsuarios);
        for (var _i = 0, arrayUsuarios_1 = arrayUsuarios; _i < arrayUsuarios_1.length; _i++) {
            var usu = arrayUsuarios_1[_i];
            if (usu.correo == mail) {
                existeUsuario = true;
                break;
            }
        }
        if (existeUsuario == false) {
            var nuevoUsuario = '{"correo":"' + mail + '", "clave":"' + clave + '", "nombre":"' + nombre + '", "apellido":"' + apellido + '", "legajo":"' + legajo + '", "perfil":"' + perfil + '", "foto":"/fotos/' + nombreFoto + '"}';
            var formData = new FormData();
            formData.append("usuario", nuevoUsuario);
            formData.append("foto", foto);
            $.ajax({
                type: "POST",
                url: "./BACKEND/usuarios",
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                data: formData
            })
                .done(function (respuesta) {
                //let nuevoUsuJson = JSON.parse(nuevoUsuario);
                //arrayUsuarios.push(nuevoUsuJson);            
                //localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));                
                window.location.replace('./login.html');
                TraerUsuariosDB();
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
/* @resumen Esconde el Alert(Bootstrap)
*
* @param Sin parametros
*
* @return Sin retorno
*/
function EscondeAlertRegistro() {
    $(".alert").hide();
}
