<?php
    session_start();

    if(!(isset($_SESSION["Estado"]) && $_SESSION["Estado"] == "Activo"))
    {
        //header("location: login.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Generador de PDFs</title>
    <script src="principal.js"></script>
</head>
<body>
    <h1>Generador de PDFs</h1>
    <input type="button" id="btnProductos" value="Listado productos" onclick="window.location.href='./test_pdf.php?opcion=1'"/>
    
    <?php
        if($_SESSION["Perfil"] == 1)
        {
            echo '<input type="button" id="btnUsuarios" value="Listado usuarios" onclick="window.location.href=`./test_pdf.php?opcion=2`"/>';
        }
    ?>

</body>
</html>