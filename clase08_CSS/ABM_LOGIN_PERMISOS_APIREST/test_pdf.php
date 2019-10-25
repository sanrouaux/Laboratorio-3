<?php

require_once __DIR__ . './vendor/autoload.php';
include ("usuario.php");

header('content-type:application/pdf');

$opcion = isset($_GET["opcion"]) ? $_GET["opcion"] : NULL;

$mpdf = new \Mpdf\Mpdf();

switch($opcion)
{
case 1:
try {
    $pdo = new PDO("mysql:host=localhost;dbname=mercado;charset=utf8", "root", "");
    $sentencia = $pdo->prepare("SELECT * FROM productos");
    $sentencia->execute(); 
    $tabla = "<table border='1' width='100%' style='text-align:center'>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>CODIGO BARRA</td>
                    <td>NOMBRE</td>
                    <td>FOTO</td>
                </tr>
            </thead>";
    while($row = $sentencia->fetch(PDO::FETCH_OBJ))                 	 
    {
        $tabla .= "<tr>
                     <td>".$row->id."</td>
                     <td>".$row->codigo_barra."</td>
                     <td>".$row->nombre."</td>
                     <td>".$row->path_foto."</td>
                </tr>";
    }
    $tabla .= "</table>";
    $mpdf->WriteHTML($tabla);
    $mpdf->Output();
 }
 catch(PDOException $e) {
    echo $e->getMessage();
 }
break;

case 2:
$usuarios = usuario::TraerTodosLosUsuarios();
$tabla = "<table border='1' width='100%' style='text-align:center'>
            <thead>
                <tr>
                <td>ID</td>
                <td>NOMBRE</td>
                <td>APELLIDO</td>
                <td>CORREO</td>
                <td>PERFIL</td>
                <td>FOTO</td>
                </tr>
            </thead>";

foreach($usuarios as $usu)
{
    $tabla .= "<tr>
                <td>$usu->id</td>
                <td>$usu->nombre</td>
                <td>$usu->apellido</td>
                <td>$usu->correo</td>
                <td>$usu->perfil</td>
                <td>$usu->foto</td>
            </tr>";    
}

$tabla .= "</table>";

$mpdf->WriteHTML($tabla);
$mpdf->Output();
break;
}


