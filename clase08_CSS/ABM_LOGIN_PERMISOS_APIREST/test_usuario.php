<?php

include ("usuario.php");

//CHEQUEA QUE LA VARIABLE $_POST ESTE SETEADA EN LA CLAVE 'USUARIO'
$usuario = isset($_POST["usuario"]) ? $_POST["usuario"] : NULL;

//JSON_DECODE CONVIERTE UN STRING CON FORMATO JSON EN UN OBJETO PHP
$usuJson = json_decode($usuario);

//$respuesta = new stdClass();
$respuesta = usuario::ExisteEnBD($usuJson->correo, $usuJson->clave);

//PENDIENTE: SETEO VARIABLA DE SESION
if($respuesta->Existe == true)
{
    session_start();
    $_SESSION["Estado"] = "Activo";
    $_SESSION["Perfil"] = ($respuesta->user)->perfil;
}

//JSON_ENCODE CONVIERTE UN OBJETO PHP EN UN STRING CON FORMATO JSON
echo json_encode($respuesta);
