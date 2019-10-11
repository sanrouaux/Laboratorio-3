<?php

$caso = isset($_POST['caso']) ? $_POST['caso'] : NULL;
$alien = isset($_POST['alien']) ? $_POST['alien'] : NULL;
$foto = isset($_FILES['foto']) ? $_FILES['foto'] : NULL;

$respuesta = new stdClass();
$respuesta->FotoExito = false;
$respuesta->JsonExito = false;

switch($caso) 
{
    case 'agregar':
        $destino = 'fotos\\'.date('h-i-s').'.png';
        if(move_uploaded_file($foto['tmp_name'], $destino))
        {
            $respuesta->FotoExito = true;
        }

        $obj = json_decode($alien);
        $obj->pathFoto = ".\\BACKEND\\".$destino;
        $alien = json_encode($obj);

        if(file_exists('./alien.json')) 
        {
            $pArchivo = fopen('./alien.json', 'a');
            $status = fstat($pArchivo);
            ftruncate($pArchivo, $status['size']-1);
            fwrite($pArchivo, ',');
            fwrite($pArchivo, $alien);
            fwrite($pArchivo, ']');
            $respuesta->JsonExito = true;
        }
        else 
        {
            $pArchivo = fopen('./alien.json', 'a');
            fwrite($pArchivo, '[');
            fwrite($pArchivo, $alien);
            fwrite($pArchivo, ']');
            $respuesta->JsonExito = true;
        }            
        fclose($pArchivo);   
        
        echo json_encode($respuesta);
        break;


        case 'traer':
            $pArchivo = fopen('./alien.json', 'r');
            $text = fread($pArchivo, filesize('./alien.json'));
            if($text != NULL) 
            {
               echo $text;
            }
            fclose($pArchivo);
        break;

        case 'eliminar':
            $pArchivo = fopen('./alien.json', 'r');
            $text = fread($pArchivo, filesize('./alien.json'));
            $textoCorregido = "";

            if(strpos($text, $alien.','))
            {
                $textoCorregido = str_replace($alien.",", "", $text);
            }
            if(strpos($text, ','.$alien.']'))
            {
                $textoCorregido = str_replace(','.$alien."]", "]", $text);
            }

            fclose($pArchivo);

            $pArchivo = fopen('./alien.json', 'w');   
            $resultado = fwrite($pArchivo, $textoCorregido);
            if($resultado > 0)
            {
                echo "Se modifico el archivo";
            }
            fclose($pArchivo);
        break;

        case 'modificar':
            


}


