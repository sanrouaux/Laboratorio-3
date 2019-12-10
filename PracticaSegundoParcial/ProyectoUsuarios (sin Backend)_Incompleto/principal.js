"use strict";
///<reference path="node_modules/@types/jquery/index.d.ts"/>
$(document).ready(function () {
    CargarTabla();
    $('#modal-btn-si').click(function () {
        BorrarUsuario();
    });
    $('#btnGuardarCambios').click(function () {
        GuardarCambios();
    });
    AplicarCambios();
});
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
    if (perfil == 'Admin') {
        tabla += '<th scope="col">ACCIONES</th>';
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
            tabla += '<td><img src="' + usu.foto + '" class="rounded-circle" height="50px" width="50px"></td>';
            if (perfil == 'Admin') {
                tabla += '<td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#confirmarEliminar">BORRAR</button></td>';
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
    if (stringUsuarios != null) {
        var arrayUsuarios_2 = JSON.parse(stringUsuarios);
        var colBotones = document.getElementsByClassName('btn');
        var _loop_1 = function (i) {
            colBotones[i].addEventListener('click', function () {
                localStorage.setItem('usuarioABorrar', arrayUsuarios_2[i].correo);
            });
        };
        for (var i = 0; i < colBotones.length; i++) {
            _loop_1(i);
        }
    }
    if (perfil == 'Invitado') {
        document.getElementById('controles').style.display = "block";
    }
}
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
function GuardarCambios() {
    var colorFondo = $('#colorFondo').val();
    var colorFuente = $('#colorFuente').val();
    var estiloImagen = $('#marcoImagen').val();
    var preferenciasDeEstilo = '{"colorFondo": "' + colorFondo + '", "colorFuente": "' + colorFuente + '", "estiloImagen": "' + estiloImagen + '"}';
    var usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
        var usuObj = JSON.parse(usuarioLogueado);
        localStorage.setItem(usuObj.correo, preferenciasDeEstilo);
    }
    AplicarCambios();
}
function AplicarCambios() {
    var usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
        var usuObj = JSON.parse(usuarioLogueado);
        var correo = usuObj.correo;
        console.log(correo);
        var preferenciasDeEstilo = localStorage.getItem(correo);
        if (preferenciasDeEstilo != null) {
            var objPref_1 = JSON.parse(preferenciasDeEstilo);
            $('#tabla').css({ backgroundColor: objPref_1.colorFondo, color: objPref_1.colorFuente });
            $("#tabla tbody tr").each(function () {
                $(this).children("td").each(function () {
                    if (objPref_1.estiloImagen != "") {
                        $(this).children('img').addClass('img-' + objPref_1.estiloImagen);
                    }
                });
            });
        }
    }
}
