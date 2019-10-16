<?php

$accion = $_POST["accion"];

switch($accion)
{
    case "agregar":
        AgregarCiudadano();
        break;
    case "mostrar":
        MostrarCiudadanos();
        break;
    case "eliminar":
         EliminarCiudadano();
         break;
    case "modificar":
         ModificarCiudadano();
         break;
    case "filtrar":
         FiltrarCiudadano();
         break;
    case "paises":
         CargarPaises();
         break;
    default:
        echo "=(";
        break;
}

function AgregarCiudadano()
{
    $ciudadano =  $_POST["obJSON"];

    $pathOrigen = $_FILES['foto']['tmp_name'];           
    $objJson = json_decode($ciudadano);           
    $pathDestino = "./fotos/".$objJson->_foto;        
    move_uploaded_file($pathOrigen, $pathDestino);
    
    $file = fopen("ciudadanos.json","a");
    if(fwrite($file,$ciudadano . "\n") > 0)
    {
        echo "1";
    }
    fclose($file);
}

function MostrarCiudadanos()
{
    $tabla = "<table border = '2' width='100%' style='text-align:center'>";
    $tabla .= "<tr>";
    if($_POST['mostrarDni'] === 'true') $tabla .= "<td>DNI</td>";
    if($_POST['mostrarApellido'] === 'true') $tabla .= "<td>Apellido</td>";
    if($_POST['mostrarNombre'] === 'true') $tabla .= "<td>Nombre</td>";
    if($_POST['mostrarEdad'] === 'true') $tabla .= "<td>Edad</td>";
    if($_POST['mostrarPais'] === 'true') $tabla .= "<td>Nacionalidad</td>";
    if($_POST['mostrarFoto'] === 'true') $tabla .= "<td>Foto</td>";
    $tabla .= "<td>Accion</td>";
    $tabla .= "</tr>";
    $ciudadanos = ArrayCiudadanos();
    
    foreach($ciudadanos as $element)
    {
        $obJSON = json_encode($element);
        $tabla .= "<tr>";
        if($_POST['mostrarDni'] === 'true') $tabla .= "<td>{$element->_dni}</td>";
        if($_POST['mostrarApellido'] === 'true') $tabla .= "<td>{$element->_apellido}</td>";
        if($_POST['mostrarNombre'] === 'true') $tabla .= "<td>{$element->_nombre}</td>";
        if($_POST['mostrarEdad'] === 'true') $tabla .= "<td>{$element->_edad}</td>";
        if($_POST['mostrarPais'] === 'true') $tabla .= "<td>{$element->_pais}</td>";
        if($_POST['mostrarFoto'] === 'true') $tabla .= "<td><img src='./BACKEND/fotos/{$element->_foto}' heigth='100px' width='100px' /></td>";
        $tabla .= "<td><input type = 'button' value = 'Eliminar' onclick = 'Test.Manejadora.eliminarCiudadano({$obJSON})'><br>";
        $tabla .= "<input type = 'button' value = 'Modificar' onclick = 'Test.Manejadora.modificarCiudadano({$obJSON})'></td>";
        
        $tabla .= "</tr>";
    }
    $tabla .= "</table>";
    echo $tabla;
}
function EliminarCiudadano()
{
    $obJSON = json_decode($_POST["obJSON"]);
    $ciudadanos = ArrayCiudadanos();
    $archivo = fopen("ciudadanos.json","w");
    $datos = "";

      foreach($ciudadanos as $element)
    {
        if($element->_dni != $obJSON->_dni)
        {
            $datos .= json_encode($element) . "\n";
        }
    }
    if(fwrite($archivo,$datos) > 0)
    {
        echo "1";
    }
}

function ModificarCiudadano()
{
    $obJSON = json_decode($_POST["obJSON"]);
    $ciudadanos = ArrayCiudadanos();
    $archivo = fopen("ciudadanos.json","w");
    $datos = "";

    foreach($ciudadanos as $element)
    {
        if($element->_dni == $obJSON->_dni)
        {
            $element->_nombre = $obJSON->_nombre;
            $element->_apellido = $obJSON->_apellido;
            $element->_edad = $obJSON->_edad;
            $element->_nacionalidad = $obJSON->_pais;
            $element->_foto = $obJSON->_foto;
            
            $datos .= json_encode($element) . "\n";
        }
        else
        {
            $datos .= json_encode($element) . "\n";
        }
    }
    if(fwrite($archivo,$datos) > 0)
    {
        echo "1";
    }


}
function FiltrarCiudadano()
{
    $nac = $_POST["pais"];
    $tabla = "<table border = '2' width='100%' style='text-align:center'><tr><td>DNI</td><td>Apellido</td><td>Nombre</td><td>Edad</td><td>Nacionalidad</td><td>Foto</td><td>Accion</td></tr>";
    $ciudadanos = ArrayCiudadanos();
    
    foreach($ciudadanos as $element)
    {
        if($element->_nacionalidad == $nac)
        {
            $obJSON = json_encode($element);
            $tabla .= "<tr>
                        <td>{$element->_dni}</td>
                        <td>{$element->_apellido}</td>
                        <td>{$element->_nombre}</td>
                        <td>{$element->_edad}</td>
                        <td>{$element->_pais}</td>
                        <td><img src='./BACKEND/fotos/{$element->_foto}' heigth='100px' width='100px' /></td>
                        <td><input type = 'button' value = 'Eliminar' onclick = 'Test.Manejadora.eliminarCiudadano({$obJSON})'><br>
                        <input type = 'button' value = 'Modificar' onclick = 'Test.Manejadora.modificarCiudadano({$obJSON})'></td>           
                        </tr>";
        }
    }
    $tabla .= "</table>";
    echo $tabla;
}
function ArrayCiudadanos()
{
    $archivo = fopen("ciudadanos.json","r");
    $ciudadanos = array();
    while(!feof($archivo))
    {
       
       $dato = json_decode(fgets($archivo));
       if($dato == null)
       {
           continue;
       }
       
       array_push($ciudadanos,$dato);
    }
    fclose($archivo);
    return $ciudadanos;
}
function CargarPaises()
{
    $archivo = fopen("paises.json","r");
    echo fread($archivo,filesize("paises.json"));
    fclose($archivo);
}