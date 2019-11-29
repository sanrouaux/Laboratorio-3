"use strict";
///<reference path="node_modules/@types/jquery/index.d.ts"/>
$(document).ready(function () {
    CargarTabla();
    /*
        $('#modal-btn-si').click(function () {
            BorrarUsuario();
        });
    
        $('#btnGuardarCambios').click(function () {
            GuardarCambios();
        });
    
        AplicarCambios();*/
});
function CargarTabla() {
    var cargarTabla = function () {
        var token = localStorage.getItem('token');
        $.ajax({
            type: "GET",
            url: "../BACKEND/",
            dataType: "json",
            headers: { "perfil": localStorage.getItem('perfil') }
        })
            .done(function (respuesta) {
            $('#listadoDiv').html(respuesta.tabla);
        })
            .fail(function () {
            alert("Error al traer trabla");
        })
            .always(function () {
        });
    };
    VerificarToken(cargarTabla);
}
function VerificarToken(callback) {
    var token = localStorage.getItem('token');
    $.ajax({
        method: "GET",
        url: "../BACKEND/login",
        headers: { "token": token },
        async: false,
        success: function (xhr) {
            if (!xhr.ok) {
                window.location.replace("./login.html");
            }
            else {
                localStorage.setItem('perfil', localStorage.getItem('perfil'));
                callback();
                //console.log("El token todavia es valido");
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
        }
    });
}
function BorrarUsuario() {
    var borrarUsuario = function () {
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
            $.ajax({
                type: "DELETE",
                url: "./BACKEND/Usuarios/Borrar",
                dataType: "json",
                data: "correo=" + correo
            })
                .done(function (respuesta) {
                console.log(respuesta);
            })
                .fail(function () {
                alert("Hubo un error al conectar con la Base de Datos");
            })
                .always(function () {
            });
        }
    };
    VerificarToken(borrarUsuario);
}
function GuardarCambios() {
    var guardarCambios = function () {
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
    };
    VerificarToken(guardarCambios);
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
