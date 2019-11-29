///<reference path="node_modules/@types/jquery/index.d.ts"/>

$(document).ready(function () {

    $("#btnLimpiar").click(function (event: any) {
        Manejadora.EscondeAlertLogin();
    });
});

class Manejadora {
    public static EnviarLogin() {
        let correo = <string>$("#mailText").val();
        let clave = <string>$("#claveText").val();

        let usuario = '{"correo": "' + correo + '", "clave": "' + clave + '"}';

        $.ajax({
            type: "POST",
            url: "../BACKEND/validarUsuario",
            dataType: "json",
            data: "json=" + usuario,
            async: true
        })
            .done(function (respuesta: any) {
                //Genera Token
                $.ajax({
                    type: "POST",
                    url: "../BACKEND/login",
                    dataType: "json", 
                    data: "json="+usuario,
                    async: true
                  })
                  .done(function(respuesta : any){                        
                    localStorage.setItem('token', respuesta.JWT);
                    window.location.replace('./principal.html');
                  })
                  .fail(function() {
                    alert("Error al geenerar token");
                  })
                  .always(function() {
                  });
            })
            .fail(function () {
                $('#alertText').html("Correo o clave incorrectos");
                $(".alert").show();
            })
            .always(function () {
            });
    }

    public static EnviarRegistro() {
        let nombre = <string>$('#nombre').val();
        let apellido = <string>$('#apellido').val();
        let mail = <string>$('#mail').val();
        let perfil = <string>$('#perfil').val();
        let clave = <string>$('#password').val();
        let foto = $('#foto').prop('files')[0];

        let nombreFoto = <string>$('#foto').val();
        nombreFoto = nombreFoto.split("\\")[2];

        let nuevoUsuario = '{"correo":"' + mail + '", "clave":"' + clave + '", "nombre":"' + nombre + '", "apellido":"' + apellido + '", "perfil":"' + perfil + '", "foto":"/fotos/' + nombreFoto + '", "confirmar": "si"}';

        let formData: FormData = new FormData();
        formData.append("json", nuevoUsuario);
        formData.append("img", foto);

        $.ajax({
            type: "POST",
            url: "../BACKEND/usuarios",
            dataType: "json", //Indico el tipo de dato que quiero recibir. El objeto ajax lo parsea
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            async: true
        })
            .done(function (respuesta: any) {
                console.log('entra al done');
            })
            .fail(function (respuesta : any) {
                $('#alertText').html('<h2>No se logro dar el alta</h2>');
                $('.alert').show();
            })
            .always(function () {
            });
    }




    public static EscondeAlertLogin() {
        $(".alert").hide();
    }
}


