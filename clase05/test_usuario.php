<?php

include ("usuario.php");

$usuario = isset($_POST["usuario"]) ? $_POST["usuario"] : NULL;

$usuJson = json_decode($usuario);

$respuesta = new stdClass();
$respuesta->Exito = usuario::ExisteEnBD($usuJson->correo, $usuJson->clave);

echo json_encode($respuesta);