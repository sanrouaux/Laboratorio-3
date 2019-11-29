<?php
use Firebase\JWT\JWT;
class Usuario
{
    public static function Agregar($usuario)
    {
        $retorno = false;
        $con = new Conexion();
        $consulta = $con->objPDO()->prepare("INSERT INTO usuarios (correo,clave,nombre,apellido,perfil,foto) VALUES (:correo,:clave,:nombre,:apellido,:perfil,:foto)");
        
        //$consulta->bindParam(':id',  $id, PDO::PARAM_INT);
        $consulta->bindValue(':correo',  $usuario->correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave',  $usuario->clave, PDO::PARAM_STR);
        $consulta->bindValue(':nombre',  $usuario->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido',  $usuario->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':perfil',  $usuario->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':foto',  $usuario->foto, PDO::PARAM_STR);
        if($consulta->execute())
        {
            $retorno =  true;
        }
        return $retorno;
    }
    public function AltaUsuario($request,$response,$args)
    {
       $datos = $request->getParsedBody();

       $obJson = json_decode($datos["json"]);
       //var_dump($obJson);
       $usuario = new StdClass();
       $usuario->correo = $obJson->correo;
       $usuario->clave = $obJson->clave;
       $usuario->nombre = $obJson->nombre;
       $usuario->apellido = $obJson->apellido;
       $usuario->perfil = $obJson->perfil;
       
       $archivos = $request->getUploadedFiles();
       $usuario->foto = $obJson->foto;//"fotos/" . $obJson->nombre . "-" . $obJson->apellido . "." . pathinfo($archivos['foto']->getClientFilename(),PATHINFO_EXTENSION);
       
       $retorno = new StdClass();
       $retorno->exito = false;
       $retorno->msj = "No se pudo agregar el usuario a la base de datos";
       if(Usuario::Agregar($usuario))
       {
           $archivos['img']->moveTo("./" . $usuario->foto);
           $retorno->msj = "Se agrego el usuario con exito!";
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
        $consulta = $con->objPDO()->prepare("SELECT * FROM usuarios");
        $consulta->execute();
        
        
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
    }
    public static function GenerarTabla($perfil)
    {
        $lista = Usuario::TraerTodo();
        $retorno = new StdClass();
        if($lista != null)
        {
            $retorno->exito = true;
            $retorno->msj = "Tabla de usuarios";
            $retorno->status = 200;
        }
        else
        {
            $retorno->exito = false;
            $retorno->msj = "Tabla no disponible";
            $retorno->status = 424;
        }
        $retorno->tabla = "<table class='table table-hover' border = '2'><tr><td>ID</td><td>E-MAIL</td><td>NOMBRE</td><td>APELLIDO</td><td>PERFIL</td><td>FOTO</td></tr>";
        foreach($lista as $element)
        {
          $path = "../BACKEND/" . $element->foto;
          $retorno->tabla .= "<tr>
             <td>{$element->id}</td>
             <td>{$element->correo}</td>
             <td>{$element->nombre}</td>
             <td>{$element->apellido}</td>
             <td>{$element->perfil}</td>";
             if(file_exists($path))
             {
                if($perfil == "empleado")
                {
                    $retorno->tabla .= "<td><img class='img-rounded' src = '{$path}' width='60px' height='60px'</td>"; 
                }
                else if($perfil == "encargado"){
                    $retorno->tabla .= "<td><img class='img-thumbnail' src = '{$path}' width='60px' height='60px'</td>"; 
                }
                else{
                    $retorno->tabla .= "<td><img src = '{$path}' width='60px' height='60px'</td>"; 
                }
                
             }
             else
             {
                $retorno->tabla .= "<td>No disponible</td>";
             }
             $retorno->tabla.="</tr>";
            
        }
        $retorno->tabla .= "</table>";
        return $retorno;
    }

    public function Tabla_Usuarios($request,$response,$args)
    {
        $headers = getallheaders();
        $perfil = $headers["perfil"];
        return $response->withJson(Usuario::GenerarTabla($perfil));
    }


    public function retornoJWT($request,$response,$args)
    {
        $datos = $request->getParsedBody();
        $obJson = json_decode($datos["json"]);
        
        $retorno = new StdClass();
        $retorno->exito = false;
        $retorno->JWT = null;
        $retorno->status = 403;
        $payload = array(
           'iat' => time(),
           'exp' => time() + 15,
           'data' => Usuario::TraerUno($obJson->correo),
        );
        

        $token = JWT::encode($payload,"miClaveSecreta");
        if($token != null)
        {
            $retorno->exito = true;
            $retorno->JWT = $token;
            $retorno->status = 200;
            return $response->withJson($retorno,200);
        }


        return $response->withJson($retorno,403);
    }
    public static function verificarUsuario($usuario)
    {
        $retorno = false;
        $con = new Conexion();
        $consulta = $con->objPDO()->prepare("SELECT * FROM usuarios WHERE correo = '{$usuario->correo}' and clave = '{$usuario->clave}'");
        $consulta->execute();
        if($consulta->fetchObject("Usuario") != null)
        {
            $retorno = true;
        }
        
        return $retorno;
    }
    public static function TraerUno($correo)
    {
        $retorno = false;
        $con = new Conexion();
        $consulta = $con->objPDO()->prepare("SELECT * FROM usuarios WHERE correo = '{$correo}'");
        $consulta->execute();
        return $consulta->fetchObject("Usuario");
    }
    public function validarUsu($request,$response,$args)
    {
        $datos = $request->getParsedBody();
        /*$usuario = new StdClass();
        $usuario->correo = $datos["correo"];
        $usuario->clave = $datos["clave"];*/
        $retorno = new StdClass();
        $usuario = json_decode($datos["json"]);
        $retorno->exito = false;
        $retorno->msj = "Usted no esta registrado o ingreso mal sus datos.";
        if(Usuario::verificarUsuario($usuario))
        {
           $retorno->exito = true;
           $retorno->msj = "Usted esta registrado.";
           return $response->withJson($retorno,200);
        }
        return $response->withJson($retorno,403);
    }
    public static function verificarCorreo($usuario)
    {
        $retorno = false;
        $con = new Conexion();
        $consulta = $con->objPDO()->prepare("SELECT * FROM usuarios WHERE correo = '{$usuario->correo}'");
        $consulta->execute();
        if($consulta->fetchObject("Usuario") != null)
        {
            $retorno = true;
            
        }
        return $retorno;
    }
    public function verificarLogin($request,$response,$args)
    {
        //$datos = $request->getParsedBody();
        $headers = getallheaders();
        $token = $headers["token"];
        $retorno = new StdClass();
        try
        {
            $decodificado = JWT::decode($token,"miClaveSecreta",['HS256']);
            if(Usuario::verificarUsuario($decodificado->data))
            {
                $retorno->ok = true;
              $retorno->usuario = $decodificado->data;
              $retorno->msj = "Se ha logeado correctamente :)"; 
              $retorno->status = 200;
              return $response->withJson($retorno,200);
            }
            else
            {
                $retorno->ok = false;
                $retorno->msj = "Usuario inexistente";
                $retorno->status = 403;  
                return $response->withJson($retorno,403); 
            }
        }
        catch(Exception $e)
        {
            $retorno->msj = "Token invalido";
            $retorno->status = 403;  
            return $response->withJson($retorno,403);
        }
         //var_dump($decodificado->data);
        
        
    }
    public function EliminarAuto($request,$response,$args)
    {
        $retorno = new StdClass();
        $datos = $request->getParsedBody();
        $id = $datos["id"];
        
       
        if(Auto::EliminarAuto($id))
        {
            $retorno->msj = "Se ha eliminado el auto de la ID {$id} correctamente";
            $retorno->status = 200;
            $retorno->exito = true;

            return $response->withJson($retorno,200);
        }
        else
        {
            $retorno->msj = "No se ha eliminado el auto de la ID {$id} correctamente";
            $retorno->status = 418;
            $retorno->exito = false;

            return $response->withJson($retorno,418); 
        }
           
         
    }
    

}