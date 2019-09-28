<?php

include ("usuario.php");

$respuesta = new stdClass();

$usuario = isset($_POST["usuario"]) ? $_POST["usuario"] : NULL;

$objeto = json_decode($usuario);

$destino = "./fotos/" . $objeto->correo . ".jpeg";

$objUsuario = new usuario($objeto->nombre, $objeto->apellido, $objeto->correo, $objeto->clave, $objeto->perfil, $destino);

if($objUsuario->AltaUsuario() && move_uploaded_file($_FILES["foto"]["tmp_name"], $destino)) 
{
    $respuesta->Exito = true;
}

echo json_encode($respuesta);