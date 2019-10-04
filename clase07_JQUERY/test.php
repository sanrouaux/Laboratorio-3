<?php

$mensaje = isset($_POST["mensaje"]) ? $_POST["mensaje"] : NULL;
$imagen = isset($_FILES["imagen"]) ? $_FILES["imagen"] : NULL;

$rutaImagen = "./fotos/".time().".jpg";

move_uploaded_file($imagen["tmp_name"], $rutaImagen);

$obj = new stdClass();
$obj->mensaje = $mensaje;
$obj->fecha = date("d-m-Y");
$obj->foto = $rutaImagen;

echo json_encode($obj);
