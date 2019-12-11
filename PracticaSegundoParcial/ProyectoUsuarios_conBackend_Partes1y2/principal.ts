///<reference path="node_modules/@types/jquery/index.d.ts"/>

$(document).ready(function () {

    CargarTabla();

    $('#modal-btn-si').click(function () {
        BorrarUsuario();
    });

    $('#btnGuardarCambios').click(function () {
        GuardarCambios();
    });
});


/* @resumen Verifica token del usuario logueado y construye tabla con los usuarios que recupera del 
*  LocalStorage.Si es 'admin', muestra botón de borrado; si es 'invitado', muestra controles de personalizacion
*  de la interfaz
*
* @param Sin parametros
*
* @return Sin retorno
*/
function CargarTabla() {
    let token = <string>localStorage.getItem('token');
    let perfil = <string>localStorage.getItem('perfil');
    let stringUsuarios = <string>localStorage.getItem('usuarios');

    $.ajax({
        method: "GET",
        url: "./BACKEND/login",
        dataType: "json",
        headers: { "token": token }
    })
        .done(function (respuesta: any) {

            let tabla = '<table class="table table-striped" id="tabla" style="background-color:rgb(76, 190, 165)">';
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

            if (stringUsuarios != null) {
                let arrayUsuarios = JSON.parse(stringUsuarios);
                for (let usu of arrayUsuarios) {
                    tabla += '<tr>';
                    tabla += '<td>' + usu.correo + '</td>';
                    tabla += '<td>' + usu.nombre + '</td>';
                    tabla += '<td>' + usu.apellido + '</td>';
                    tabla += '<td>' + usu.perfil + '</td>';
                    tabla += '<td>' + usu.legajo + '</td>';
                    tabla += '<td><img src="./BACKEND/' + usu.foto + '" class="rounded-circle" alt="SIN FOTO" height="50px" width="50px"></td>';
                    if (perfil == 'admin') {
                        tabla += '<td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#confirmarEliminar">BORRAR</button></td>';
                    }
                    tabla += '</tr>';
                    tabla += '</thead>';
                }
            }
            tabla += '</tbody>';
            tabla += ' </table>';

            $('#listadoDiv').html(tabla);

            if (stringUsuarios != null && perfil == 'admin') {
                let arrayUsuarios = JSON.parse(stringUsuarios);
                let colBotones = document.getElementsByClassName('btn');
                for (let i = 0; i < colBotones.length; i++) {
                    colBotones[i].addEventListener('click', function () {
                        $.ajax({
                            method: "GET",
                            url: "./BACKEND/login",
                            dataType: "json",
                            headers: { "token": token }
                        })
                            .done(function () {
                                localStorage.setItem('usuarioABorrar', arrayUsuarios[i].ID);
                                $('#confirmarTexto').html('Confirma que desea eliminar al usuario ' + arrayUsuarios[i].nombre + ' ' + arrayUsuarios[i].apellido + '?');
                            })
                            .fail(function () {
                                window.location.replace("./login.html");
                            })
                            .always(function () {
                            });
                    });
                }
            }

            if (perfil == 'invitado') {
                (<HTMLDivElement>document.getElementById('controles')).style.display = "inline";
                AplicarCambios();
            }
        })
        .fail(function () {
            window.location.replace("./login.html");
        })
        .always(function () {
        });
}


/* @resumen Verifica token del usuario logueado y construye tabla con los usuarios que recupera del 
*  LocalStorage.Si es 'admin', muestra botón de borrado; si es 'invitado', muestra controles de personalizacion
*  de la interfaz
*
* @param Sin parametros
*
* @return Sin retorno
*/
function BorrarUsuario() {
    let token = <string>localStorage.getItem('token');

    $.ajax({
        method: "GET",
        url: "./BACKEND/login",
        dataType: "json",
        headers: { "token": token }
    })
        .done(function (respuesta: any) {

            let id = localStorage.getItem('usuarioABorrar');
            $.ajax({
                type: "DELETE",
                url: "./BACKEND/",
                dataType: "json",
                data: "id=" + id
            })
                .done(function (respuesta: any) {

                    let stringUsuarios = localStorage.getItem('usuarios');
                    if (stringUsuarios != null) {
                        let arrayUsuarios = JSON.parse(stringUsuarios);
                        for (let i = 0; i < arrayUsuarios.length; i++) {
                            if (id == arrayUsuarios[i].ID) {
                                arrayUsuarios.splice(i, 1);
                                break;
                            }
                        }
                        localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
                        CargarTabla();
                    }
                })
                .fail(function () {
                    alert("No se pudo borrar el usuario");
                })
                .always(function () {
                });
        })
        .fail(function () {
            window.location.replace("./login.html");
        })
        .always(function () {
        });
}


function GuardarCambios() {
    let token = <string>localStorage.getItem('token');
    $.ajax({
        method: "GET",
        url: "./BACKEND/login",
        dataType: "json",
        headers: { "token": token }
    })
        .done(function () {
            let colorFondo = <string>$('#colorFondo').val();
            let colorFuente = <string>$('#colorFuente').val();
            let estiloImagen = <string>$('#estiloImagen').val();

            let preferenciasDeEstilo = '{"colorFondo": "' + colorFondo + '", "colorFuente": "' + colorFuente + '", "estiloImagen": "' + estiloImagen + '"}';
            let usuarioLogueado = localStorage.getItem('usuarioLogueado');
            if (usuarioLogueado != null) {
                localStorage.setItem(usuarioLogueado, preferenciasDeEstilo);
            }
            AplicarCambios();
        })
        .fail(function () {
            window.location.replace("./login.html");
        })
        .always(function () {
        });
}


function AplicarCambios() {
    let correo = localStorage.getItem('usuarioLogueado');
    if (correo != null) {
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
}