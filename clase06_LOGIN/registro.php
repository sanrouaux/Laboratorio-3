<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script type="text/javascript" src="registro.js"></script>
</head>
<body>
    <h3>Nombre</h3>
    <input type="text" id="txtNombre" />
    <br/>
    <h3>Apellido</h3>
    <input type="text" id="txtApellido" />
    <br/>
    <h3>Correo</h3>
    <input type="text" id="txtCorreo" />
    <br/>
    <h3>Clave</h3>
    <input type="text" id="txtClave" />
    <br/>
    <h3>Perfil</h3>
    <input type="text" id="txtPerfil" />
    <br/>
    <br/>
    <input type="file" id="foto" />
    <br/>
    <br/>
    <input type="button" id="btnAceptar" value="Aceptar" onclick="Registro()"/>
    <a href="/login.php"><input type="button" id="btnCancelar" value="Cancelar"/></a>
</body>
</html>