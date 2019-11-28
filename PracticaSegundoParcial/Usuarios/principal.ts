///<reference path="node_modules/@types/jquery/index.d.ts"/>

$(document).ready(function () {

    CargarTabla();

    $('#modal-btn-si').click(function() {
        BorrarUsuario();
    });

    $('#btnGuardarCambios').click(function() {
        GuardarCambios();
    });

    AplicarCambios();

});

function CargarTabla() {

    //Trae el perfil de usuario logueado
    let usuarioString = localStorage.getItem('usuarioLogueado');
    if(usuarioString != null) {
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
    if(perfil == 'Admin') {
        tabla += '<th scope="col">ACCIONES</th>';
    }
    tabla += '</tr>';
    tabla += '</thead>';
    tabla += '<tbody>';

    let stringUsuarios = localStorage.getItem('usuarios');
    if(stringUsuarios != null) {
        let arrayUsuarios = JSON.parse(stringUsuarios);
        for(let usu of arrayUsuarios) {            
            tabla += '<tr>';
            tabla += '<td>'+usu.correo+'</td>';
            tabla += '<td>'+usu.nombre+'</td>';
            tabla += '<td>'+usu.apellido+'</td>';
            tabla += '<td>'+usu.perfil+'</td>';
            tabla += '<td>'+usu.legajo+'</td>';
            tabla += '<td><img src="'+usu.foto+'" class="rounded-circle" height="50px" width="50px"></td>';
            if(perfil == 'Admin') {
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
    if(stringUsuarios != null) {
        let arrayUsuarios = JSON.parse(stringUsuarios);
        let colBotones = document.getElementsByClassName('btn');
        for(let i = 0; i < colBotones.length; i++) {
            colBotones[i].addEventListener('click', function() {
                localStorage.setItem('usuarioABorrar', arrayUsuarios[i].correo);
            });
        }
    }

    if(perfil == 'Invitado') {
        (<HTMLDivElement>document.getElementById('controles')).style.display = "block";
    }
} 

function BorrarUsuario() {
    let correo = localStorage.getItem('usuarioABorrar');
    let stringUsuarios = localStorage.getItem('usuarios');
    if(stringUsuarios != null && correo != null) {
        let arrayUsuarios = JSON.parse(stringUsuarios);
        for(let i = 0; i < arrayUsuarios.length; i++) {
            if(correo == arrayUsuarios[i].correo) {
                arrayUsuarios.splice(i, 1);
                break;
            }
        } 
        localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
        CargarTabla();
    }
}

function GuardarCambios() {
    let colorFondo = <string>$('#colorFondo').val();
    let colorFuente = <string>$('#colorFuente').val();
    let estiloImagen = <string>$('#marcoImagen').val();

    let preferenciasDeEstilo = '{"colorFondo": "'+colorFondo+'", "colorFuente": "'+colorFuente+'", "estiloImagen": "'+estiloImagen+'"}';
    let usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if(usuarioLogueado != null) {
        let usuObj = JSON.parse(usuarioLogueado);
        localStorage.setItem(usuObj.correo, preferenciasDeEstilo);
    }

    AplicarCambios();    
}


function AplicarCambios() {
    let usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if(usuarioLogueado != null) {
        let usuObj = JSON.parse(usuarioLogueado);
        let correo = usuObj.correo;

        console.log(correo);

        let preferenciasDeEstilo = localStorage.getItem(correo);
        if(preferenciasDeEstilo != null) {
            let objPref = JSON.parse(preferenciasDeEstilo);
            $('#tabla').css({backgroundColor: objPref.colorFondo, color: objPref.colorFuente});
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