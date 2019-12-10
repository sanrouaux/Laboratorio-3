///<reference path="node_modules/@types/jquery/index.d.ts"/>


$(document).ready(function () {

    //CargaInicialUsuarios();

    TraerUsuariosDB();

    $("#btnRegistrar").click(function (event: any) {
        RedireccionaRegistro();
    });

    $("#btnLimpiar").click(function (event: any) {
        EscondeAlertLogin();
    });  

});


function EnviarLogin() {
    let correo = <string>$("#mailText").val();
    let clave = <string>$("#claveText").val();

    let usuariosString = localStorage.getItem('usuarios');
    if (usuariosString != null) {
        let arrayJson = JSON.parse(usuariosString);

        let bandera = 0;
        for (let usu of arrayJson) {
            if (usu.correo == correo && usu.clave == clave) {
                bandera = 1;
                localStorage.setItem('usuarioLogueado', JSON.stringify(usu));

                //Genera Token
                $.ajax({
                    type: "POST",
                    url: "./BACKEND/JWT/Crear",
                    dataType: "json", 
                    data: "correo="+correo,
                    async: true
                  })
                  .done(function(respuesta : any){                        
                    localStorage.setItem('token', respuesta.token);
                    window.location.replace('./principal.html');
                  })
                  .fail(function() {
                    alert("Hubo un error al conectar con la Base de Datos");
                  })
                  .always(function() {
                  });
            }
        }
        if (bandera == 0) {
            $(".alert").show();
        }
    }
}


function CargaInicialUsuarios() : void {
    if (localStorage.getItem('usuarios') == null) {
        let json = '[{"correo":"santiago@mail.com", "clave":"1234", "nombre":"santiago", "apellido":"rouaux", "legajo":"1432", "perfil":"Admin", "foto":"/fotos/jack.jpg"},' +
            '{"correo":"julia@mail.com", "clave":"1234", "nombre":"julia", "apellido":"gonzalez", "legajo":"8765", "perfil":"Invitado", "foto":"/fotos/julia.jpg"},' +
            '{"correo":"martin@mail.com", "clave":"1234", "nombre":"martin", "apellido":"rodriguez", "legajo":"3456", "perfil":"Invitado", "foto":"/fotos/house.jpg"},' +
            '{"correo":"rodrigo@mail.com", "clave":"1234", "nombre":"rodrigo", "apellido":"santillan", "legajo":"3232", "perfil":"Invitado", "foto":"/fotos/rodrigo.jpg"},' +
            '{"correo":"carolina@mail.com", "clave":"1234", "nombre":"carolina", "apellido":"roca", "legajo":"4321", "perfil":"Invitado", "foto":"/fotos/carolina.jpg"}]';

        localStorage.setItem('usuarios', json);
        console.log(json);
    }
    else {
        console.log('Ya existe el listado de usuario en LocalStorage');
    }
}

function EscondeAlertLogin() {
    $(".alert").hide();
}

function RedireccionaRegistro() {
    window.location.replace('./registro.html');
}

function TraerUsuariosDB() {
    $.ajax({
        type: "GET",
        url: "./BACKEND/Usuarios/",
        dataType: "json", //Indico el tipo de dato que quiero recibir. El objeto ajax lo parsea
        cache: false,
        contentType: false,
        processData: false,
        async: true
      })
      .done(function(respuesta : any){
        localStorage.setItem('usuarios', JSON.stringify(respuesta));            
      })
      .fail(function() {
        alert("Hubo un error al conectar con la Base de Datos");
      })
      .always(function() {
      });
}
