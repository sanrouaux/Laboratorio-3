///<reference path='./node_modules/@types/jquery/index.d.ts' />

$(document).ready(function() {

    /*$('#btnEnviar').click(function(e : any) {
        e.preventDefault();
        EnviarRegistro();
    });*/

    $("#btnLimpiar").click(function (event: any) {
        EscondeAlertRegistro();
    }); 
})


function EnviarRegistro() {
    let nombre = <string>$('#nombreText').val();
    let apellido = <string>$('#apellidoText').val();
    let mail = <string>$('#mailText').val();
    let legajo = <string>$('#legajoText').val();
    let perfil = <string>$('#perfilText').val();
    let foto = <string>$('#fotoFile').val();
    let clave = <string>$('#claveText').val();

    let nombreFoto = foto.split("\\")[2];

    let existeUsuario : boolean = false;

    let stringUsuarios = localStorage.getItem('usuarios');
    if(stringUsuarios != null) {
        let arrayUsuarios = JSON.parse(stringUsuarios);
        for(let usu of arrayUsuarios) {
            if(usu.correo == mail) {
                existeUsuario = true;
                break;
            }
        } 
        if(existeUsuario == false) {
            let nuevoUsuario = '{"correo":"'+mail+'", "clave":"'+clave+'", "nombre":"'+nombre+'", "apellido":"'+apellido+'", "legajo":"'+legajo+'", "perfil":"'+perfil+'", "foto":"./fotos/'+nombreFoto+'"}';
            let nuevoUsuJson = JSON.parse(nuevoUsuario);
            arrayUsuarios.push(nuevoUsuJson);            
            localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));
            window.location.replace('./login.html');
        }
        else {
            $('#alertText').html('<h2>Ya existe un usuario registrado con este e-mail</h2>')
            $('.alert').show();
        }
    }
}

function EscondeAlertRegistro() {
    $(".alert").hide();
}