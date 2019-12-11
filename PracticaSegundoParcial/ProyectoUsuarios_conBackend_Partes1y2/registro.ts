///<reference path='./node_modules/@types/jquery/index.d.ts' />


//Asigna funcionalidad al boton Limpiar al terminar de cargar el documento 
$(document).ready(function() {

    $("#btnLimpiar").click(function (event: any) {
        EscondeAlertRegistro();
    }); 

    $("#toggleAlert").click(function (event: any) {
        EscondeAlertRegistro();
    }); 

})


/* @resumen Recupero todos los datos ingresados y da de alta a un nuevo usuario, siempre y cuando el email
*  no exista previamente en BS
*
* @param Sin parametros
*
* @return Sin retorno
*/
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
            formData.append("foto", foto);

            $.ajax({
                type: "POST",
                url: "./BACKEND/usuarios",
                dataType: "json", 
                cache: false,
                contentType: false,
                processData: false,
                data: formData
              })
              .done(function(respuesta : any){
                //let nuevoUsuJson = JSON.parse(nuevoUsuario);
                //arrayUsuarios.push(nuevoUsuJson);            
                //localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));                
                window.location.replace('./login.html');
                TraerUsuariosDB();
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


/* @resumen Esconde el Alert(Bootstrap)
*
* @param Sin parametros
*
* @return Sin retorno
*/
function EscondeAlertRegistro() {
    $(".alert").hide();
}