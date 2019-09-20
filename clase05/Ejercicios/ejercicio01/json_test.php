<?php

$prod = isset($_POST["producto"]) ? $_POST["producto"] : NULL;

$jsonProd = json_decode($prod); //convierte un string en un json

$jsonProd->nombre = "pera";
$jsonProd->Precio = 1234;

echo json_encode($jsonProd); //convierte un json en un string

