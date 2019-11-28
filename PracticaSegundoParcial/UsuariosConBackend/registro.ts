//npm install --save @types/jquery
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
    let clave = <string>$('#claveText').val();
    let foto = $('#fotoFile').prop('files')[0];

    let nombreFoto = <string>$('#fotoFile').val();
    nombreFoto = nombreFoto.split("\\")[2];

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
            let nuevoUsuario = '{"correo":"'+mail+'", "clave":"'+clave+'", "nombre":"'+nombre+'", "apellido":"'+apellido+'", "legajo":"'+legajo+'", "perfil":"'+perfil+'", "foto":"/fotos/'+nombreFoto+'"}';
            
            let formData : FormData = new FormData();
            formData.append("usuario", nuevoUsuario);
            formData.append("foto",foto);

            $.ajax({
                type: "POST",
                url: "./BACKEND/Usuarios/",
                dataType: "json", //Indico el tipo de dato que quiero recibir. El objeto ajax lo parsea
                cache: false,
                contentType: false,
                processData: false,
                data: formData,
                async: true
              })
              .done(function(respuesta : any){
                let nuevoUsuJson = JSON.parse(nuevoUsuario);
                arrayUsuarios.push(nuevoUsuJson);            
                localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));

                window.location.replace('./login.html');
              })
              .fail(function() {
                alert("Hubo un error al conectar con la Base de Datos");
              })
              .always(function() {
              });
            
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