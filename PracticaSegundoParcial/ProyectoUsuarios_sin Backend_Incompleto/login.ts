///<reference path="node_modules/@types/jquery/index.d.ts"/>


$(document).ready(function () {

    CargaInicialUsuarios();

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
                window.location.replace('./principal.html');
            }
        }
        if (bandera == 0) {
            $(".alert").show();
        }
    }
}


function CargaInicialUsuarios() : void {
    if (localStorage.getItem('usuarios') == null) {
        let json = '[{"correo":"santiago@mail.com", "clave":"1234", "nombre":"santiago", "apellido":"rouaux", "legajo":"1432", "perfil":"Admin", "foto":"./fotos/jack.jpg"},' +
            '{"correo":"julia@mail.com", "clave":"1234", "nombre":"julia", "apellido":"gonzalez", "legajo":"8765", "perfil":"Invitado", "foto":"./fotos/julia.jpg"},' +
            '{"correo":"martin@mail.com", "clave":"1234", "nombre":"martin", "apellido":"rodriguez", "legajo":"3456", "perfil":"Invitado", "foto":"./fotos/house.jpg"},' +
            '{"correo":"rodrigo@mail.com", "clave":"1234", "nombre":"rodrigo", "apellido":"santillan", "legajo":"3232", "perfil":"Invitado", "foto":"./fotos/rodrigo.jpg"},' +
            '{"correo":"carolina@mail.com", "clave":"1234", "nombre":"carolina", "apellido":"roca", "legajo":"4321", "perfil":"Invitado", "foto":"./fotos/carolina.jpg"}]';

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

