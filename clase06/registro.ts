function Registro() {

    //UTILIZANDO EL DOM, TOMA VALORES DE LAS DISTINTAS CAJAS DE TEXTO
    var nombre = (<HTMLTextAreaElement>document.getElementById("txtNombre")).value;
    var apellido = (<HTMLTextAreaElement>document.getElementById("txtApellido")).value;
    var correo = (<HTMLTextAreaElement>document.getElementById("txtCorreo")).value;
    var clave  = (<HTMLTextAreaElement>document.getElementById("txtClave")).value;
    var perfil = (<HTMLTextAreaElement>document.getElementById("txtPerfil")).value;

    //RECUPERA LA FOTO EN FORMATO BINARIO
    let foto : any = (<HTMLInputElement> document.getElementById("foto"));

    //PARA ENVIAR ARCHIVOS A TRAVES DE UN XMLHTTPREQUEST, SE UTILIZA EL OBJETO FORMDATA
    //
    let form : FormData = new FormData();
    form.append('usuario', '{"nombre": "' + nombre + '", "apellido": "' + apellido 
        + '", "correo": "' + correo + '", "clave": "' + clave + '", "perfil": "' + perfil + '"}');
    form.append('foto', foto.files[0]);
    
    var httpRequest : XMLHttpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "./admin_registro.php");
    //IMPORTANTE!!! CUANDO SE ENVIAN ARCHIVOS, EL ENCABEZADO DEL REQUEST ES DIFERENTE
    httpRequest.setRequestHeader("enctype", "multipart/form-data"); 
    httpRequest.send(form);
    httpRequest.onreadystatechange = () => {
        if(httpRequest.status == 200 && httpRequest.readyState == 4)
        {
            console.log(JSON.parse(httpRequest.responseText));
        }
    }
}