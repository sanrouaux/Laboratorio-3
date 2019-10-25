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
    <table width="100%" style="text-align:center">
        <tr>
            <td>
                <h4>Nombre</h4>
            </td>
        </tr>
        <tr>
            <td>
                <input type="text" id="txtNombre" />
            </td>
        </tr>
        <tr>
            <td>
                <h4>Apellido</h4>
            </td>
        </tr>
        <tr>
            <td>
                <input type="text" id="txtApellido" />
            </td>
        </tr>
        <tr>
            <td>
                <h4>Correo</h4>
            </td>
        </tr>
        <tr>
            <td>
                <input type="text" id="txtCorreo" />
            </td>
        </tr>
        <tr>
            <td>
                <h4>Clave</h4>
            </td>
        </tr>
        <tr>
            <td>
                <input type="text" id="txtClave" />
            </td>
        </tr>
        <tr>
            <td>
               <h4>Perfil</h4> 
            </td>
        </tr>
        <tr>
            <td>
                <input type="text" id="txtPerfil" />
            </td>
        </tr>
        <tr>
            <td>
                <br>
            </td>
        </tr>
        <tr>
            <td>
                <input type="file" id="foto" />
            </td>
        </tr>
        <tr>
            <td>
                <br>
            </td>
        </tr>
        <tr>
            <td>
                <a href="./login.php"><input type="button" id="btnCancelar" value="Cancelar"/></a>
                <input type="button" id="btnAceptar" value="Aceptar" onclick="Registro()"/>
            </td>
        </tr>
        
    </table>
    
</body>
</html>