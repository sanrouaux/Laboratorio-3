<?php

$pArchivo = fopen("autos.json", "r");
$texto = fread($pArchivo, filesize("autos.json"));
if($texto != null)
{
    echo $texto;
}
fclose($pArchivo);
