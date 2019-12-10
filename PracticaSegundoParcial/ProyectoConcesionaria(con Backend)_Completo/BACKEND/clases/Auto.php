<?php

require_once 'AccesoDatos.php';

class Auto {

    public $color;
    public $marca;
    public $precio;
    public $modelo;
    

    /* @resumen Constructor de la clase Auto
    * @param string $color color del auto 
    * @param string $marca marca del auto 
    * @param float $precio precio del auto 
    * @param string $modelo modelo del auto  
    * @return instancia de la clase auto
    */
    public function __construct($color, $marca, $precio, $modelo) {
        $this->color = $color;
        $this->marca = $marca;
        $this->precio = $precio;
        $this->modelo = $modelo;
    } 

    /* @resumen Da de alta un auto en BD
    * @param obj $auto objeto con todos los atributos del auto 
    * @return TRUE si logro dar de alta el auto; FALSE caso contrario
    */
    public static function Alta($auto) {
        $retorno = false;        
        $objAccesoDatos = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objAccesoDatos->RetornarConsulta('INSERT INTO autos (color, marca, precio, modelo) VALUES (:color, :marca, :precio, :modelo)');
        $consulta->bindValue(':color',$auto->color, PDO::PARAM_STR);
        $consulta->bindValue(':marca',$auto->marca, PDO::PARAM_STR);
        $consulta->bindValue(':precio',$auto->precio);
        $consulta->bindValue(':modelo',$auto->modelo, PDO::PARAM_STR);
        $consulta->execute();
        if($consulta->rowCount() > 0) { 
            $retorno = true;
        }
        return $retorno;
    }


    /* @resumen Trae un auto de la BD
    * @param int $id ID del auto a traer 
    * @return objeto con la info del auto; FALSE si no existe el auto
    */
    public static function TraerUno($id) {
        $objAccesoDatos = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objAccesoDatos->RetornarConsulta("SELECT * FROM autos WHERE id = :id");
        $consulta->bindValue(':id', $id);
        $consulta->execute();
        $auto = $consulta->fetch(PDO::FETCH_OBJ);	
        return $auto;   
    }


    /* @resumen Traer todos los autos presentes en la BD
    * @return array con todos los usuarios (puede ser array vacio)
    */
    public static function TraerTodos() {
        $objAccesoDatos = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objAccesoDatos->RetornarConsulta("SELECT * FROM autos WHERE 1");
        $consulta->execute();
        $arrayAutos = array();
        while($row = $consulta->fetch(PDO::FETCH_OBJ)) {
            array_push($arrayAutos, $row);            
        }        	
        return $arrayAutos;     
    }


    /* @resumen Crea una tabla HTML de autos
    * @param array $arrayAutos array de objetos estandar con toda la informacion de cada auto 
    * @return tabla HTML
    */
    public static function CrearTabla($arrayAutos) {
        
        $tabla = "<table border='1' width='100%' style='text-align:center'>";
        $tabla .= "<tr>";
        $tabla .= "<td>ID</td>";
        $tabla .= "<td>COLOR</td>";
        $tabla .= "<td>MARCA</td>";
        $tabla .= "<td>PRECIO</td>";
        $tabla .= "<td>MODELO</td>";
        $tabla .= "</tr>";

        foreach($arrayAutos as $auto) {
            $tabla .= "<tr>";
            $tabla .= "<td>".$auto->id."</td>";
            $tabla .= "<td>".$auto->color."</td>";
            $tabla .= "<td>".$auto->marca."</td>";
            $tabla .= "<td>".$auto->precio."</td>";
            $tabla .= "<td>".$auto->modelo."</td>";
            $tabla .= "</tr>";
        }
        $tabla .= "</table>";
        return $tabla;
    }
    

    /* @resumen Borra un auto de la BD
    * @param int $id ID del auto a borrar 
    * @return TRUE si logro borrar el auto; FALSE caso contrario
    */
    public static function BorrarPorId($id) {
        $retorno = false;
        $objAccesoDatos = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objAccesoDatos->RetornarConsulta("DELETE FROM autos WHERE id=:id");
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
        if($consulta->rowCount() > 0) { 
            $retorno = true;
        }            	
        return $retorno;
    }
    
    /* @resumen Modifica un auto de la BD
    * @param obj $auto objeto estandar con el ID y la info a actualizar en la BD 
    * @return TRUE si logro actualizar el auto; FALSE caso contrario
    */
    public static function ModificarPorId($auto) {        
        $retorno = false;
        $objAccesoDatos = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objAccesoDatos->RetornarConsulta("UPDATE autos SET color=:color,marca=:marca,precio=:precio,modelo=:modelo WHERE id=:id");
        $consulta->bindValue(':color',$auto->color, PDO::PARAM_STR);
        $consulta->bindValue(':marca',$auto->marca, PDO::PARAM_STR);
        $consulta->bindValue(':precio',$auto->precio);
        $consulta->bindValue(':modelo',$auto->modelo);
        $consulta->bindValue(':id',$auto->id, PDO::PARAM_INT);
        $consulta->execute();        
        if($consulta->rowCount() > 0) { 
            $retorno = true;
        }          	
        return $retorno;
    }

}






/*
use Firebase\JWT\JWT;

class Auto
{
    public static function Agregar($auto)
    {
        $retorno = false;
        $con = new Conexion();
        $consulta = $con->objPDO()->prepare("INSERT INTO autos (color,marca,precio,modelo) VALUES (:color,:marca,:precio,:modelo)");
        
        //$consulta->bindParam(':id',  $id, PDO::PARAM_INT);
        $consulta->bindValue(':color',  $auto->color, PDO::PARAM_STR);
        $consulta->bindValue(':marca',  $auto->marca, PDO::PARAM_STR);
        $consulta->bindValue(':precio',  $auto->precio, PDO::PARAM_STR);
        $consulta->bindValue(':modelo',  $auto->modelo, PDO::PARAM_STR);
        if($consulta->execute())
        {
            $retorno =  true;
        }
        return $retorno;
    }
    public function AltaAuto($request,$response,$args)
    {
       $datos = $request->getParsedBody();

       $obJson = json_decode($datos["json"]);
       //var_dump($obJson);
       $auto = new StdClass();
       $auto->color = $obJson->color;
       $auto->marca = $obJson->marca;
       $auto->precio = $obJson->precio;
       $auto->modelo = $obJson->modelo;

       
       //$archivos = $request->getUploadedFiles();
       //$usuario->foto = $obJson->foto;//"fotos/" . $obJson->nombre . "-" . $obJson->apellido . "." . pathinfo($archivos['foto']->getClientFilename(),PATHINFO_EXTENSION);
       
       $retorno = new StdClass();
       $retorno->exito = false;
       $retorno->msj = "No se pudo agregar el auto a la base de datos";
       if(Auto::Agregar($auto))
       {
           //$archivos['foto']->moveTo("./BACKEND/" . $usuario->foto);
           $retorno->msj = "Se agrego el auto con exito!";
           $retorno->exito = true;
           $newResponse = $response->withJson($retorno,200);
           return $newResponse;
       }
       $newResponse = $response->withJson($retorno,418);
       return $newResponse;

    }
    public static function TraerTodo()
    {
        $con = new Conexion();
        $consulta = $con->objPDO()->prepare("SELECT * FROM autos");
        $consulta->execute();
        
        
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Auto");
    }
    public static function GenerarTabla($perfil)
    {
        $lista = Auto::TraerTodo();
        $retorno = new StdClass();
        if($lista != null)
        {
            $retorno->exito = true;
            $retorno->msj = "Tabla de autos";
            $retorno->status = 200;
        }
        else
        {
            $retorno->exito = false;
            $retorno->msj = "Tabla no disponible";
            $retorno->status = 424;
        }
        if($perfil == "propietario" || $perfil == "encargado")
        {
            $retorno->tabla = "<table class = 'table' border = '2'><tr><td>ID</td><td>COLOR</td><td>MARCA</td><td>PRECIO</td><td>MODELO</td><td>ACCION</td></tr>";
        }
        else
        {
            $retorno->tabla = "<table class = 'table' border = '2'><tr><td>ID</td><td>COLOR</td><td>MARCA</td><td>PRECIO</td><td>MODELO</td></tr>";
        }
        
        foreach($lista as $element)
        {
          
          $json = json_encode($element);
          $retorno->tabla .= "<tr>
             <td>{$element->id}</td>
             <td>{$element->color}</td>
             <td>{$element->marca}</td>
             <td>{$element->precio}</td>
             <td>{$element->modelo}</td>";
             if($perfil == "propietario")
             {
                 $retorno->tabla .= "<td><button type = 'button' class='btn btn-danger' onclick = eliminarAuto({$json})><span class='glyphicon glyphicon-trash'></span></button><br><br><button type = 'button' class='btn btn-success' onclick = obtenerAuto({$json}) data-toggle='modal' data-target='#myModal'><span class= 'glyphicon glyphicon-pencil'></span></button></td>";
             }
             else if($perfil == "encargado")
             {
                 $retorno->tabla .= "<td><button type = 'button' class='btn btn-success' onclick = obtenerAuto({$json}) data-toggle='modal' data-target='#myModal' ><span class= 'glyphicon glyphicon-pencil'></span></button></td>";
             }

             $retorno->tabla.="</tr>";
            
        }
        $retorno->tabla .= "</table>";
        return $retorno;
    }
    public function Tabla_Autos($request,$response,$args)
    {
        //$datos = $request->getParsedBody();
        $headers = getallheaders();
        $perfil = $headers["perfil"];
        return $response->withJson(Auto::GenerarTabla($perfil));
    }
    public static function EliminarAuto($id)
    {
        $con = new Conexion();
        $consulta = $con->objPDO()->prepare("DELETE FROM autos WHERE id = {$id}");
        
        if($consulta->execute())
        {
            return true;
        }
        return false;
    }
    public static function ModificarAuto($auto)
    {
        $retorno = false;
        $con = new Conexion();
        $consulta = $con->objPDO()->prepare("UPDATE autos SET color = :color, marca = :marca, precio = :precio, modelo = :modelo WHERE id = {$auto->id}");

        $consulta->bindValue(':color',  $auto->color, PDO::PARAM_STR);
        $consulta->bindValue(':marca',  $auto->marca, PDO::PARAM_STR);
        $consulta->bindValue(':precio',  $auto->precio, PDO::PARAM_STR);
        $consulta->bindValue(':modelo',  $auto->modelo, PDO::PARAM_STR);
        if($consulta->execute())
        {
            $retorno =  true;
        }
        return $retorno;
    }
    public function Modificar_Auto($request,$response,$args)
    {
        $datos = $request->getParsedBody();
        $auto = json_decode($datos["json"]);
        //$decodificado = JWT::decode($datos["token"],"miClaveSecreta",["HS256"]);
        $retorno = new StdClass();

        if(Auto::ModificarAuto($auto))
        {
           $retorno->msj = "Se ha modificado el auto correctamente";
           $retorno->status = 200;
           $retorno->exito = true;

           return $response->withJson($retorno,200);
        }
        else
        {
            $retorno->msj = "No se pudo realizar la accion de eliminar el auto correctamente";
            $retorno->status = 418;
            $retorno->exito = false;
 
            return $response->withJson($retorno,418);
        }
    }

}*/