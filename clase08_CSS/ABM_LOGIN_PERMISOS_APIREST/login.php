<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link type="text/css" rel="stylesheet" href="estilos.css" />

	<!-- AGREGO LA LIBRERIA DE JQUERY -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        
    <!-- AGREGO FUNCIONES PROPIAS CON USO DE JQUERY -->
    <script type="text/javascript" src="login.js"></script>
</head>

<body>
    <table width="100%" style="text-align:center">
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
                <br>
            </td>
        </tr>
        <tr>
            <td>
                <input type="button" id="btnAceptar" value="Aceptar" onclick="Enviar()"/>
                <input type="button" id="btnCancelar" value="Cancelar"  onclick="Cancelar()"/>
            </td>
        </tr>
        <tr>
            <td>
                <br>
            </td>
        </tr>
        <tr>
            <td>
                <a href="registro.php"><input type="button" id="btnRegistrarse" value="Registrarse" /></a>
            </td>
        </tr>
        <tr>
            <td>
               <div id="div"></div>
            </td>
        </tr>
    </table>

</body>
</html>
