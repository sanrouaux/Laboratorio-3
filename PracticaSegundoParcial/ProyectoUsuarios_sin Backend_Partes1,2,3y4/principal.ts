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

    $('#btnLimpiar').click(function (e: any) {
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
    let usuarioString = localStorage.getItem('usuarioLogueado');
    if (usuarioString != null) {
        let usuarioJson = JSON.parse(usuarioString);
        var perfil = usuarioJson.perfil;
    }

    //Confecciona la tabla (teniendo en cuenta el perfil)
    let tabla = '<table class="table table-striped" id="tabla" style="background-color:rgb(76, 190, 165)">';
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

    let stringUsuarios = localStorage.getItem('usuarios');
    if (stringUsuarios != null) {
        let arrayUsuarios = JSON.parse(stringUsuarios);
        for (let usu of arrayUsuarios) {
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
        let arrayUsuarios = JSON.parse(stringUsuarios);
        let colBotones = document.getElementsByClassName('btn-danger');
        for (let i = 0; i < colBotones.length; i++) {
            colBotones[i].addEventListener('click', function () {
                $('#confirmarTexto').html('Se borrara el usuario ' + arrayUsuarios[i].nombre + ' ' + arrayUsuarios[i].apellido + '. Esta seguro?');
                localStorage.setItem('usuarioABorrar', arrayUsuarios[i].correo);
            });
        }
    }
    if (perfil == 'superadmin' && stringUsuarios != null) {
        let arrayUsuarios = JSON.parse(stringUsuarios);
        let colBotones = document.getElementsByClassName('btn-warning');
        for (let i = 0; i < colBotones.length; i++) {
            colBotones[i].addEventListener('click', function () {
                $('#nombreText').val(arrayUsuarios[i].nombre);
                $('#apellidoText').val(arrayUsuarios[i].apellido);
                $('#mailText').val(arrayUsuarios[i].correo);
                $('#legajoText').val(arrayUsuarios[i].legajo);
                $('#perfilText').val(arrayUsuarios[i].perfil);
                $('#fotoFile').val('C:\\fakepath\\'+arrayUsuarios[i].foto);
                $('#claveText').val(arrayUsuarios[i].clave);
                $('#claveDuplicadaText').val(arrayUsuarios[i].clave);
            });
        }
    }

    if (perfil == 'invitado') {
        (<HTMLDivElement>document.getElementById('controles')).style.display = "block";
    }
}


/* @resumen Borra un usuario del array de json y vuelve a cargar la tabla de usuarios
*
* @param sin parametros
* @return sin retorno
*/
function BorrarUsuario() {
    let correo = localStorage.getItem('usuarioABorrar');
    let stringUsuarios = localStorage.getItem('usuarios');
    if (stringUsuarios != null && correo != null) {
        let arrayUsuarios = JSON.parse(stringUsuarios);
        for (let i = 0; i < arrayUsuarios.length; i++) {
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
    let nombre = <string>$('#nombreText').val();
    let apellido = <string>$('#apellidoText').val();
    let correo = <string>$('#mailText').val();
    let legajo = <string>$('#legajoText').val();
    let perfil = <string>$('#perfilText').val();
    let foto = <string>$('#fotoFile').val();
    let clave = <string>$('#claveText').val();
    let nombreFoto = foto.split("\\")[2];

    let stringUsuarios = localStorage.getItem('usuarios');
    if (stringUsuarios != null) {
        let arrayUsuarios = JSON.parse(stringUsuarios);
        for (let i = 0; i < arrayUsuarios.length; i++) {
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
    let colorFondo = <string>$('#colorFondo').val();
    let colorFuente = <string>$('#colorFuente').val();
    let estiloImagen = <string>$('#estiloImagen').val();

    let preferenciasDeEstilo = '{"colorFondo": "' + colorFondo + '", "colorFuente": "' + colorFuente + '", "estiloImagen": "' + estiloImagen + '"}';
    let usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
        let usuObj = JSON.parse(usuarioLogueado);
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
    let usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
        let usuObj = JSON.parse(usuarioLogueado);
        let correo = usuObj.correo;

        let preferenciasDeEstilo = localStorage.getItem(correo);
        if (preferenciasDeEstilo != null) {
            let objPref = JSON.parse(preferenciasDeEstilo);
            $('#tabla').css({ backgroundColor: objPref.colorFondo, color: objPref.colorFuente });
            $("#tabla tbody tr").each(function () {
                $(this).children("td").each(function () {
                    if (objPref.estiloImagen != "") {
                        $(this).children('img').removeAttr('class');
                        $(this).children('img').addClass('img-' + objPref.estiloImagen); //VER. Hay que cambiar la clase, no agregar
                    }
                });
            });
        }
    }
}