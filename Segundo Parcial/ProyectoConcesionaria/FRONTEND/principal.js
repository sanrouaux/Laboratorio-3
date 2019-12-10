"use strict";
///<reference path="node_modules/@types/jquery/index.d.ts"/>
$(document).ready(function () {
    ManejadoraPrincipal.CargarListadoUsuarios();
    ManejadoraPrincipal.CargarListadoAutos();
    $('#modal-btn-si').click(function () {
        ManejadoraPrincipal.ConfirmaBorradoAuto();
    });
    $('#modal-btn-no').click(function () {
        $('#alertText').html('Se cancelo la eliminacion del auto');
        $('.alert').show();
    });
    $('#btnLimpiarModificacion').click(function (e) {
        e.preventDefault();
        $('#marca').val("");
        $('#color').val("");
        $('#precio').val("");
        $('#modelo').val("");
    });
    /*
    $('#btnGuardarCambios').click(function () {
        GuardarCambios();
    });

    AplicarCambios();
    */
});
var ManejadoraPrincipal = /** @class */ (function () {
    function ManejadoraPrincipal() {
    }
    ManejadoraPrincipal.CargarListadoUsuarios = function () {
        var token = localStorage.getItem('token');
        var perfil = localStorage.getItem('perfil');
        $.ajax({
            type: "GET",
            url: "../BACKEND/",
            dataType: "json",
            headers: {
                "token": token
            }
        })
            .done(function (respuesta) {
            var tabla = ManejadoraPrincipal.ConstruyeTablaUsuarios(perfil, respuesta.usuarios);
            $('#listadoUsuarios').html(tabla);
        })
            .fail(function (respuesta) {
        })
            .always(function () {
        });
    };
    ManejadoraPrincipal.CargarListadoAutos = function () {
        var token = localStorage.getItem('token');
        var perfil = localStorage.getItem('perfil');
        $.ajax({
            type: "GET",
            url: "../BACKEND/autos",
            dataType: "json",
            headers: { "token": token }
        })
            .done(function (respuesta) {
            var tabla = ManejadoraPrincipal.ConstruyeTablaAutos(perfil, respuesta.autos);
            $('#listadoAutos').html(tabla);
            if (perfil == 'propietario') {
                ManejadoraPrincipal.AtribuyeFuncionalidadBotonesBorrar(respuesta.autos);
                ManejadoraPrincipal.AtribuyeFuncionalidadBotonesModificar(respuesta.autos);
            }
            else if (perfil == 'encargado') {
                ManejadoraPrincipal.AtribuyeFuncionalidadBotonesModificar(respuesta.autos);
            }
        })
            .fail(function (respuesta) {
            alert('Se venció la sesión. Vuelva a iniciar sesión');
            window.location.replace('./login.html');
        })
            .always(function () {
        });
    };
    ManejadoraPrincipal.AtribuyeFuncionalidadBotonesBorrar = function (autos) {
        var token = localStorage.getItem('token');
        var botones = document.getElementsByClassName('borrar');
        var _loop_1 = function (i) {
            botones[i].addEventListener('click', function () {
                $.ajax({
                    type: "GET",
                    url: "../BACKEND/login",
                    dataType: "json",
                    headers: { "token": token }
                })
                    .done(function () {
                    localStorage.setItem('idAutoABorrar', autos[i].id);
                    $('#confirmarTexto').html('Se eliminara el ' + autos[i].marca + ' ' + autos[i].modelo + '. ¿Esta seguro?');
                })
                    .fail(function () {
                    alert('Se venció la sesión. Vuelva a iniciar sesión');
                    window.location.replace('./login.html');
                })
                    .always(function () {
                });
            });
        };
        for (var i = 0; i < botones.length; i++) {
            _loop_1(i);
        }
    };
    ManejadoraPrincipal.AtribuyeFuncionalidadBotonesModificar = function (autos) {
        var token = localStorage.getItem('token');
        var botones = document.getElementsByClassName('modificar');
        var _loop_2 = function (i) {
            botones[i].addEventListener('click', function () {
                $.ajax({
                    type: "GET",
                    url: "../BACKEND/login",
                    dataType: "json",
                    headers: { "token": token }
                })
                    .done(function () {
                    $('#id').val(autos[i].id);
                    $('#marca').val(autos[i].marca);
                    $('#color').val(autos[i].color);
                    $('#precio').val(autos[i].precio);
                    $('#modelo').val(autos[i].modelo);
                })
                    .fail(function () {
                    alert('Se venció la sesión. Vuelva a iniciar sesión');
                    window.location.replace('./login.html');
                })
                    .always(function () {
                });
            });
        };
        for (var i = 0; i < botones.length; i++) {
            _loop_2(i);
        }
    };
    ManejadoraPrincipal.ConstruyeTablaUsuarios = function (perfil, arrayUsuarios) {
        var tabla = "<table class='table table-striped'>";
        tabla += "<tr>";
        tabla += "<td>CORREO</td>";
        tabla += "<td>NOMBRE</td>";
        tabla += "<td>APELLIDO</td>";
        tabla += "<td>PERFIL</td>";
        tabla += "<td>FOTO</td>";
        tabla += "</tr>";
        for (var i = 0; i < arrayUsuarios.length; i++) {
            tabla += "<tr>";
            tabla += "<td>" + arrayUsuarios[i].correo + "</td>";
            tabla += "<td>" + arrayUsuarios[i].nombre + "</td>";
            tabla += "<td>" + arrayUsuarios[i].apellido + "</td>";
            tabla += "<td>" + arrayUsuarios[i].perfil + "</td>";
            if (perfil == 'empleado') {
                tabla += "<td><img class='img-rounded' heigth='50px' width='50px' src='../BACKEND/" + arrayUsuarios[i].foto + "'/></td>";
            }
            else if (perfil == 'encargado') {
                tabla += "<td><img class='img-thumbnail' heigth='50px' width='50px' src='../BACKEND/" + arrayUsuarios[i].foto + "'/></td>";
            }
            else {
                tabla += "<td><img heigth='50px' width='50px' src='../BACKEND/" + arrayUsuarios[i].foto + "'/></td>";
            }
            tabla += "</tr>";
        }
        tabla += "</table>";
        return tabla;
    };
    ManejadoraPrincipal.ConstruyeTablaAutos = function (perfil, arrayUsuarios) {
        var tabla = "<table class='table'>";
        tabla += "<tr>";
        tabla += "<td>ID</td>";
        tabla += "<td>MARCA</td>";
        tabla += "<td>COLOR</td>";
        tabla += "<td>PRECIO</td>";
        tabla += "<td>MODELO</td>";
        if (perfil == 'propietario') {
            tabla += "<td>ACCIONES</td>";
        }
        tabla += "</tr>";
        for (var i = 0; i < arrayUsuarios.length; i++) {
            tabla += "<tr>";
            tabla += "<td>" + arrayUsuarios[i].id + "</td>";
            tabla += "<td>" + arrayUsuarios[i].marca + "</td>";
            tabla += "<td>" + arrayUsuarios[i].color + "</td>";
            tabla += "<td>" + arrayUsuarios[i].precio + "</td>";
            tabla += "<td>" + arrayUsuarios[i].modelo + "</td>";
            if (perfil == 'propietario') {
                tabla += "<td><button type='button' class='btn btn-danger borrar' data-toggle='modal' data-target='#confirmarEliminar'>BORRAR</button>";
                tabla += "<button type='button' class='btn btn-warning modificar' data-toggle='modal' data-target='#modificarAuto'>MODIFICAR</button></td>";
            }
            else if (perfil == 'encargado') {
                tabla += "<td><button type='button' class='btn btn-warning modificar' data-toggle='modal' data-target='#modificarAuto'>MODIFICAR</button></td>";
            }
            tabla += "</tr>";
        }
        tabla += "</table>";
        return tabla;
    };
    ManejadoraPrincipal.ConfirmaBorradoAuto = function () {
        var token = localStorage.getItem('token');
        var idAuto = localStorage.getItem('idAutoABorrar');
        $.ajax({
            type: "DELETE",
            url: "../BACKEND",
            //dataType: "json",
            data: "id=" + idAuto,
            headers: {
                "token": token
            },
            statusCode: {
                418: function (respuesta) {
                    $('#alertText').html('No se pudo eliminar el auto');
                    $('.alert').show();
                },
                403: function () {
                    alert('Se venció la sesión. Vuelva a iniciar sesión');
                    window.location.replace('./login.html');
                }
            }
        })
            .done(function (respuesta) {
            ManejadoraPrincipal.CargarListadoAutos();
        })
            .fail(function () {
        })
            .always(function () {
        });
    };
    ManejadoraPrincipal.ModificaAuto = function () {
        var token = localStorage.getItem('token');
        var id = $('#id').val();
        var marca = $('#marca').val();
        var color = $('#color').val();
        var precio = $('#precio').val();
        var modelo = $('#modelo').val();
        var auto = '{"id": "' + id + '", "marca": "' + marca + '", "color": "' + color + '", "precio": "' + precio + '", "modelo": "' + modelo + '"}';
        $.ajax({
            type: "PUT",
            url: "../BACKEND",
            dataType: "json",
            data: "auto=" + auto,
            headers: { "token": token },
            statusCode: {
                418: function (respuesta) {
                    $('#modificarAuto').hide();
                    $('.modal-backdrop').hide();
                    $('#alertText').html('No se pudo modificar el auto');
                    $('.alert').show();
                },
                403: function () {
                    alert('Se venció la sesión. Vuelva a iniciar sesión');
                    window.location.replace('./login.html');
                }
            }
        })
            .done(function (respuesta) {
            $('#modificarAuto').hide();
            $('.modal-backdrop').hide();
            ManejadoraPrincipal.CargarListadoAutos();
        })
            .fail(function () {
        })
            .always(function () {
        });
    };
    return ManejadoraPrincipal;
}());
/*
function GuardarCambios() {
    let guardarCambios = function () {
        let colorFondo = <string>$('#colorFondo').val();
        let colorFuente = <string>$('#colorFuente').val();
        let estiloImagen = <string>$('#marcoImagen').val();

        let preferenciasDeEstilo = '{"colorFondo": "' + colorFondo + '", "colorFuente": "' + colorFuente + '", "estiloImagen": "' + estiloImagen + '"}';
        let usuarioLogueado = localStorage.getItem('usuarioLogueado');
        if (usuarioLogueado != null) {
            let usuObj = JSON.parse(usuarioLogueado);
            localStorage.setItem(usuObj.correo, preferenciasDeEstilo);
        }
        AplicarCambios();
    }
}


function AplicarCambios() {
    let usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
        let usuObj = JSON.parse(usuarioLogueado);
        let correo = usuObj.correo;

        console.log(correo);

        let preferenciasDeEstilo = localStorage.getItem(correo);
        if (preferenciasDeEstilo != null) {
            let objPref = JSON.parse(preferenciasDeEstilo);
            $('#tabla').css({ backgroundColor: objPref.colorFondo, color: objPref.colorFuente });
            $("#tabla tbody tr").each(function () {
                $(this).children("td").each(function () {
                    if (objPref.estiloImagen != "") {
                        $(this).children('img').addClass('img-' + objPref.estiloImagen);
                    }
                });
            });
        }
    }
}*/ 
