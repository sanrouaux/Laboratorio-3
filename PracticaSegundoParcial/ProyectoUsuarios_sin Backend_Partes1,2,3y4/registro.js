"use strict";
///<reference path='./node_modules/@types/jquery/index.d.ts' />
$(document).ready(function () {
    $("#btnLimpiar").click(function (event) {
        EscondeAlertRegistro();
    });
});
/* @resumen Toma todos los datos de un nuevo usuario. Verifica que el correo no exista previamente, y en caso
*  de que no exista, agrega el nuevo usuario al array de usuarios. Caso contrario, informa el conflicto
*  en un alert(BS)
*
* @param sin parametros
* @return sin retorno
*/
function EnviarRegistro() {
    var nombre = $('#nombreText').val();
    var apellido = $('#apellidoText').val();
    var mail = $('#mailText').val();
    var legajo = $('#legajoText').val();
    var perfil = $('#perfilText').val();
    var foto = $('#fotoFile').val();
    var clave = $('#claveText').val();
    var nombreFoto = foto.split("\\")[2];
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
            var nuevoUsuario = '{"correo":"' + mail + '", "clave":"' + clave + '", "nombre":"' + nombre + '", "apellido":"' + apellido + '", "legajo":"' + legajo + '", "perfil":"' + perfil + '", "foto":"' + nombreFoto + '"}';
            var nuevoUsuJson = JSON.parse(nuevoUsuario);
            arrayUsuarios.push(nuevoUsuJson);
            localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
            window.location.replace('./login.html');
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
