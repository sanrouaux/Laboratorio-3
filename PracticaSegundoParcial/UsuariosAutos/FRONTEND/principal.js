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
    /*let usuarioString = localStorage.getItem('token');
    if (usuarioString != null) {
        let usuarioJson = JSON.parse(usuarioString);
        var perfil = usuarioJson.perfil;
    }*/
    //Confecciona la tabla (teniendo en cuenta el perfil)
    /*let tabla = '<table class="table table-striped" id="tabla" style="background-color:rgb(76, 190, 165)">';
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
    tabla += '<tbody>';*/
    var token = localStorage.getItem('token');
    $.ajax({
        type: "GET",
        url: "../BACKEND/",
        dataType: "json",
        headers: { "perfil": token }
    })
        .done(function (respuesta) {
        $('#listadoDiv').html(respuesta.tabla);
    })
        .fail(function () {
        alert("Error al traer trabla");
    })
        .always(function () {
    });
    /*let stringUsuarios = localStorage.getItem('usuarios');
    if (stringUsuarios != null) {
        let arrayUsuarios = JSON.parse(stringUsuarios);
        for (let usu of arrayUsuarios) {
            tabla += '<tr>';
            tabla += '<td>' + usu.correo + '</td>';
            tabla += '<td>' + usu.nombre + '</td>';
            tabla += '<td>' + usu.apellido + '</td>';
            tabla += '<td>' + usu.perfil + '</td>';
            tabla += '<td>' + usu.legajo + '</td>';
            tabla += '<td><img src="./BACKEND' + usu.foto + '" class="rounded-circle" alt="SIN FOTO" height="50px" width="50px"></td>';
            if (perfil == 'admin') {
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
    if (stringUsuarios != null && perfil == 'admin') {
        let arrayUsuarios = JSON.parse(stringUsuarios);
        let colBotones = document.getElementsByClassName('btn');
        for (let i = 0; i < colBotones.length; i++) {
            colBotones[i].addEventListener('click', function () {
                localStorage.setItem('usuarioABorrar', arrayUsuarios[i].correo);
            });
        }
    }

    if (perfil == 'invitado') {
        (<HTMLDivElement>document.getElementById('controles')).style.display = "inline";
    }*/
}
function VerificarToken(callback) {
    var token = localStorage.getItem('token');
    $.ajax({
        method: "GET",
        url: "./BACKEND/JWT/Verificar",
        headers: { "token": token },
        async: false,
        success: function (xhr) {
            if (!xhr.ok) {
                window.location.replace("./login.html");
            }
            else {
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
