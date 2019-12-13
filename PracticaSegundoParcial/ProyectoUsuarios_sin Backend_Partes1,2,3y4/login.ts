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


/* @resumen Toma correo y clave del formulario de login y lo envia al BACKEND para verificar existencia 
* en la BD. Si el BACKEND responde afirmativamente, guarda token y perfil del usuario y redirige hacia 
* la pagina principal
*
* @param sin parametros
* @return sin retorno
*/
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
            $('#alertText').html('E-mail o clave incorrecta');
            $(".alert").show();
        }
    }
}


/* @resumen Guarda en el LocalStorage, al iniciar la pagina, un array de json con datos de usuarios, siempre
*  y cuando, el array no exista previamente
*
* @param sin parametros
* @return sin retorno
*/
function CargaInicialUsuarios(): void {
    if (localStorage.getItem('usuarios') == null) {

        let json = [{
            correo: 'santiago@mail.com',
            clave: '1234',
            nombre: 'Santiago',
            apellido: 'Rouaux',
            legajo: '1111',
            perfil: 'superadmin',
            foto: 'jack.jpg'
        },
        {
            correo: 'julia@mail.com',
            clave: '1234',
            nombre: 'Julia',
            apellido: 'Gonzalez',
            legajo: '4563',
            perfil: 'invitado',
            foto: 'julia.jpg'
        },
        {
            correo: 'martin@mail.com',
            clave: '1234',
            nombre: 'Martin',
            apellido: 'Rodriguez',
            legajo: '3333',
            perfil: 'invitado',
            foto: 'martin.jpg'
        },
        {
            correo: 'carolina@mail.com',
            clave: '1234',
            nombre: 'Carolina',
            apellido: 'Gutierrez',
            legajo: '5987',
            perfil: 'invitado',
            foto: 'carolina.jpg'
        },
        {
            correo: 'rodrigo@mail.com',
            clave: '1234',
            nombre: 'Rodrigo',
            apellido: 'Fernandez',
            legajo: '8734',
            perfil: 'invitado',
            foto: 'rodrigo.jpg'
        }];

        localStorage.setItem('usuarios', JSON.stringify(json));
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

