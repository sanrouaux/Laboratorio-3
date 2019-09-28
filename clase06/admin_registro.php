<?php

include ("usuario.php");

$usuario = isset($_POST["usuario"]) ? $_POST["usuario"] : NULL;

$usuJson = json_decode($usuario);

$destino = "./fotos/" . "1" . ".jpg";

$objUsuario = new usuario($usuJson->nombre, $usuJson->apellido, $usuJson->correo, $usuJson->clave, $usuJson->perfil, $destino);

$objUsuario->AltaUsuario();
move_uploaded_file($_FILES["foto"]["tmp_name"], $destino); 

$respuesta = new stdClass();
$respuesta->Exito = true;

echo json_encode($respuesta);