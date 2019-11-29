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

    let cargarTabla = function () {
        let token = <string>localStorage.getItem('token');

        $.ajax({
            type: "GET",
            url: "../BACKEND/",
            dataType: "json",
            headers: { "perfil": localStorage.getItem('perfil') }
        })
            .done(function (respuesta: any) {
                $('#listadoDiv').html(respuesta.tabla);
            })
            .fail(function () {
                alert("Error al traer trabla");
            })
            .always(function () {
            });
    }
    VerificarToken(cargarTabla);    
}

function VerificarToken(callback: any) {
    let token = <string>localStorage.getItem('token');
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
                localStorage.setItem('perfil', <string>localStorage.getItem('perfil'));
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
    let borrarUsuario = function () {
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

            $.ajax({
                type: "DELETE",
                url: "./BACKEND/Usuarios/Borrar",
                dataType: "json", //Indico el tipo de dato que quiero recibir. El objeto ajax lo parsea
                data: "correo=" + correo
            })
                .done(function (respuesta: any) {
                    console.log(respuesta);
                })
                .fail(function () {
                    alert("Hubo un error al conectar con la Base de Datos");
                })
                .always(function () {
                });

        }
    }
    VerificarToken(borrarUsuario);
}

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
    VerificarToken(guardarCambios);
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
}