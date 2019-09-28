<?php

include ("usuario.php");

//CHEQUEA QUE LA VARIABLE $_POST ESTE SETEADA EN LA CLAVE 'USUARIO'
$usuario = isset($_POST["usuario"]) ? $_POST["usuario"] : NULL;

//JSON_DECODE CONVIERTE UN STRING CON FORMATO JSON EN UN OBJETO PHP
$usuJson = json_decode($usuario);

$respuesta = new stdClass();
$respuesta->Exito = usuario::ExisteEnBD($usuJson->correo, $usuJson->clave);

//JSON_ENCODE CONVIERTE UN OBJETO PHP EN UN STRING CON FORMATO JSON
echo json_encode($respuesta);
