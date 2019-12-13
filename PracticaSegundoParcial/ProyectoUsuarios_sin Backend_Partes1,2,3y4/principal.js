"use strict";
///<reference path="node_modules/@types/jquery/index.d.ts"/>
$(document).ready(function () {
    CargarTabla();
    AplicarCambios();
    $('#modal-btn-si').click(function () {
        BorrarUsuario();
    });
    $('#btnGuardarCambios').click(function () {
        GuardarCambios();
    });
    $('#btnLimpiar').click(function (e) {
        e.preventDefault();
        $('#nombreText').val('');
        $('#apellidoText').val('');
        $('#legajoText').val('');
        $('#perfilText').val('');
        $('#fotoFile').val('');
        $('#claveText').val('');
        $('#claveDuplicadaText').val('');
    });
});
/* @resumen Publica la tabla de usuarios, con distintas opciones de acuerdo al perfil del usuario logueado
*
* @param sin parametros
* @return sin retorno
*/
function CargarTabla() {
    //Trae el perfil de usuario logueado
    var usuarioString = localStorage.getItem('usuarioLogueado');
    if (usuarioString != null) {
        var usuarioJson = JSON.parse(usuarioString);
        var perfil = usuarioJson.perfil;
    }
    //Confecciona la tabla (teniendo en cuenta el perfil)
    var tabla = '<table class="table table-striped" id="tabla" style="background-color:rgb(76, 190, 165)">';
    tabla += '<thead>';
    tabla += '<tr>';
    tabla += '<th scope="col"><p>CORREO</p></th>';
    tabla += '<th scope="col"><p>NOMBRE</p></th>';
    tabla += '<th scope="col"><p>APELLIDO</p></th>';
    tabla += '<th scope="col"><p>PERFIL</p></th>';
    tabla += '<th scope="col"><p>LEGAJO</p></th>';
    tabla += '<th scope="col"><p>FOTO</p></th>';
    if (perfil == 'admin' || perfil == 'superadmin') {
        tabla += '<th scope="col">ELIMINAR</th>';
    }
    if (perfil == 'superadmin') {
        tabla += '<th scope="col">MODIFICAR</th>';
    }
    tabla += '</tr>';
    tabla += '</thead>';
    tabla += '<tbody>';
    var stringUsuarios = localStorage.getItem('usuarios');
    if (stringUsuarios != null) {
        var arrayUsuarios = JSON.parse(stringUsuarios);
        for (var _i = 0, arrayUsuarios_1 = arrayUsuarios; _i < arrayUsuarios_1.length; _i++) {
            var usu = arrayUsuarios_1[_i];
            tabla += '<tr>';
            tabla += '<td>' + usu.correo + '</td>';
            tabla += '<td>' + usu.nombre + '</td>';
            tabla += '<td>' + usu.apellido + '</td>';
            tabla += '<td>' + usu.perfil + '</td>';
            tabla += '<td>' + usu.legajo + '</td>';
            tabla += '<td><img src="./fotos/' + usu.foto + '" class="rounded-circle" height="50px" width="50px"></td>';
            if (perfil == 'admin' || perfil == 'superadmin') {
                tabla += '<td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#confirmarEliminar">BORRAR</button></td>';
            }
            if (perfil == 'superadmin') {
                tabla += '<td><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#modificacion">MODIFICAR</button></td>';
            }
            tabla += '</tr>';
            tabla += '</thead>';
        }
    }
    tabla += '</tbody>';
    tabla += ' </table>';
    //Publica la tabla
    $('#listadoDiv').html(tabla);
    //Asocia funcionalidad a los botonos de borrado
    if ((perfil == 'admin' || perfil == 'superadmin') && stringUsuarios != null) {
        var arrayUsuarios_2 = JSON.parse(stringUsuarios);
        var colBotones = document.getElementsByClassName('btn-danger');
        var _loop_1 = function (i) {
            colBotones[i].addEventListener('click', function () {
                $('#confirmarTexto').html('Se borrara el usuario ' + arrayUsuarios_2[i].nombre + ' ' + arrayUsuarios_2[i].apellido + '. Esta seguro?');
                localStorage.setItem('usuarioABorrar', arrayUsuarios_2[i].correo);
            });
        };
        for (var i = 0; i < colBotones.length; i++) {
            _loop_1(i);
        }
    }
    if (perfil == 'superadmin' && stringUsuarios != null) {
        var arrayUsuarios_3 = JSON.parse(stringUsuarios);
        var colBotones = document.getElementsByClassName('btn-warning');
        var _loop_2 = function (i) {
            colBotones[i].addEventListener('click', function () {
                $('#nombreText').val(arrayUsuarios_3[i].nombre);
                $('#apellidoText').val(arrayUsuarios_3[i].apellido);
                $('#mailText').val(arrayUsuarios_3[i].correo);
                $('#legajoText').val(arrayUsuarios_3[i].legajo);
                $('#perfilText').val(arrayUsuarios_3[i].perfil);
                $('#fotoFile').val('C:\\fakepath\\' + arrayUsuarios_3[i].foto);
                $('#claveText').val(arrayUsuarios_3[i].clave);
                $('#claveDuplicadaText').val(arrayUsuarios_3[i].clave);
            });
        };
        for (var i = 0; i < colBotones.length; i++) {
            _loop_2(i);
        }
    }
    if (perfil == 'invitado') {
        document.getElementById('controles').style.display = "block";
    }
}
/* @resumen Borra un usuario del array de json y vuelve a cargar la tabla de usuarios
*
* @param sin parametros
* @return sin retorno
*/
function BorrarUsuario() {
    var correo = localStorage.getItem('usuarioABorrar');
    var stringUsuarios = localStorage.getItem('usuarios');
    if (stringUsuarios != null && correo != null) {
        var arrayUsuarios = JSON.parse(stringUsuarios);
        for (var i = 0; i < arrayUsuarios.length; i++) {
            if (correo == arrayUsuarios[i].correo) {
                arrayUsuarios.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
        CargarTabla();
    }
}
/* @resumen Borra un usuario del array de json y vuelve a cargar la tabla de usuarios
*
* @param sin parametros
* @return sin retorno
*/
function ModificarUsuario() {
    var nombre = $('#nombreText').val();
    var apellido = $('#apellidoText').val();
    var correo = $('#mailText').val();
    var legajo = $('#legajoText').val();
    var perfil = $('#perfilText').val();
    var foto = $('#fotoFile').val();
    var clave = $('#claveText').val();
    var nombreFoto = foto.split("\\")[2];
    var stringUsuarios = localStorage.getItem('usuarios');
    if (stringUsuarios != null) {
        var arrayUsuarios = JSON.parse(stringUsuarios);
        for (var i = 0; i < arrayUsuarios.length; i++) {
            if (arrayUsuarios[i].correo == correo) {
                arrayUsuarios[i].nombre = nombre;
                arrayUsuarios[i].apellido = apellido;
                arrayUsuarios[i].legajo = legajo;
                arrayUsuarios[i].perfil = perfil;
                arrayUsuarios[i].foto = nombreFoto;
                arrayUsuarios[i].clave = clave;
                break;
            }
        }
        localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
        $('#modificacion').hide();
        $('.modal-backdrop').hide();
        CargarTabla();
    }
}
/* @resumen Borra un usuario del array de json y vuelve a cargar la tabla de usuarios
*
* @param sin parametros
* @return sin retorno
*/
function GuardarCambios() {
    var colorFondo = $('#colorFondo').val();
    var colorFuente = $('#colorFuente').val();
    var estiloImagen = $('#estiloImagen').val();
    var preferenciasDeEstilo = '{"colorFondo": "' + colorFondo + '", "colorFuente": "' + colorFuente + '", "estiloImagen": "' + estiloImagen + '"}';
    var usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
        var usuObj = JSON.parse(usuarioLogueado);
        localStorage.setItem(usuObj.correo, preferenciasDeEstilo);
    }
    AplicarCambios();
}
/* @resumen Borra un usuario del array de json y vuelve a cargar la tabla de usuarios
*
* @param sin parametros
* @return sin retorno
*/
function AplicarCambios() {
    var usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
        var usuObj = JSON.parse(usuarioLogueado);
        var correo = usuObj.correo;
        var preferenciasDeEstilo = localStorage.getItem(correo);
        if (preferenciasDeEstilo != null) {
            var objPref_1 = JSON.parse(preferenciasDeEstilo);
            $('#tabla').css({ backgroundColor: objPref_1.colorFondo, color: objPref_1.colorFuente });
            $("#tabla tbody tr").each(function () {
                $(this).children("td").each(function () {
                    if (objPref_1.estiloImagen != "") {
                        $(this).children('img').removeAttr('class');
                        $(this).children('img').addClass('img-' + objPref_1.estiloImagen); //VER. Hay que cambiar la clase, no agregar
                    }
                });
            });
        }
    }
}
