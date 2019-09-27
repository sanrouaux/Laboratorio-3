function Registro() {
    var nombre = (<HTMLTextAreaElement>document.getElementById("txtNombre")).value;
    var apellido = (<HTMLTextAreaElement>document.getElementById("txtApellido")).value;
    var correo = (<HTMLTextAreaElement>document.getElementById("txtCorreo")).value;
    var clave  = (<HTMLTextAreaElement>document.getElementById("txtClave")).value;
    var perfil = (<HTMLTextAreaElement>document.getElementById("txtPerfil")).value;
    let foto : any = (<HTMLInputElement> document.getElementById("foto"));

    let form : FormData = new FormData();
    form.append('foto', foto.files[0]);
    form.append('usuario', '{"nombre": "' + nombre + '", "apellido": "' + apellido + '", "correo": "' + correo + '", "clave": "' + clave + '", "perfil": "' + perfil + '"}');

    var httpRequest : XMLHttpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "./admin_registro.php");
    httpRequest.setRequestHeader("enctype", "multipart/form-data");
    httpRequest.send(form);
    httpRequest.onreadystatechange = () => {
        if(httpRequest.status == 200 && httpRequest.readyState == 4)
        {
            console.log(JSON.parse(httpRequest.responseText));
        }
    }
}