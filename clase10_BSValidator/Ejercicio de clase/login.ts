function Aceptar() {
    
    //TOMA LOS VALORES DE LAS CAJAS DE TEXTO
    var correo = (<HTMLTextAreaElement>document.getElementById("txtMail")).value;
    var clave  = (<HTMLTextAreaElement>document.getElementById("txtClave")).value;

    //CREA UN STRING CON FORMATO JSON  
    var usuario = '{"correo": "' + correo + '", "clave": "' + clave + '"}'; 

    //DECLARA E INSTANCIA EL OBJETO XMLHTTPREQUEST
    var httpRequest : XMLHttpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "./login/");
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send("usuario="+usuario);
    httpRequest.onreadystatechange = () => {
        if(httpRequest.status == 200 && httpRequest.readyState == 4)
        {
            console.log(JSON.parse(httpRequest.responseText));
        }
    }
}