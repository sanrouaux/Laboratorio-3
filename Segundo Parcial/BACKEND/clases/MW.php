<?php
class MW
{
    public function SetClave_Correo($request,$response,$next)
    {
        $datos = $request->getParsedBody();
        $json = json_decode($datos["json"]);
        //var_dump($json);
        $retorno = new StdClass();
        $retorno->msj = "Los campos correo y clave no existen";
        $retorno->status = 409;
        if(isset($json->clave) && isset($json->correo))
        { 
            $response = $next($request,$response);
        }
        else if(!isset($json->clave) && isset($json->correo))
        {
            $retorno->msj = "El campo clave no existe"; 
            
            $newResponse = $response->withJson($retorno,409);
            return $newResponse;
        }
        else if(isset($json->clave) && !isset($json->correo))
        {
            $retorno->msj = "El campo correo no existe";
            
            $newResponse = $response->withJson($retorno,409);
            return $newResponse;
        }
        else
        {
            $newResponse = $response->withJson($retorno,409);
            return $newResponse;
        }
        return $response;
    }
    public static function CampoVacios($request,$response,$next)
    {
        $datos = $request->getParsedBody();
        $retorno = new StdClass();
        $json = json_decode($datos["json"]);
        $retorno->msj = "Los campos correo y clave estan vacios";
        $retorno->status = 409;
        if($json->clave != "" && $json->correo != "")
        {
            $response = $next($request,$response);
        }
        else if($json->clave == "" && $json->correo != "")
        {
            $retorno->msj = "El campo clave esta vacio"; 
            $newResponse = $response->withJson($retorno,409);
            return $newResponse;
        }
        else if($json->clave != "" && $json->correo == "")
        {
            $retorno->msj = "El campo correo esta vacio"; 
            $newResponse = $response->withJson($retorno,409);
            return $newResponse;
        }
        else
        {
            $newResponse = $response->withJson($retorno,409);
            return $newResponse;
        }
        return $response;
    }
    public static function CampoVaciosCompletos($request,$response,$next)
    {
        $datos = $request->getParsedBody();
        $retorno = new StdClass();
        $json = json_decode($datos["json"]);
        $retorno->msj = "Hay campos que estan vacios. Por favor completelos";
        $retorno->status = 409;
        //var_dump($json->nombreFoto);
        if($json->clave != "" && $json->correo != "" && $json->nombre != "" && $json->apellido != "" && $json->perfil != "" && $json->foto != "fotos/" && $json->confirmar != "")
        {
            $response = $next($request,$response);
        }
        else
        {
            $newResponse = $response->withJson($retorno,409);
            return $newResponse;
        }
        return $response;
    }
    public static function CamposVaciosAutos($request,$response,$next)
    {
        $datos = $request->getParsedBody();
        $retorno = new StdClass();
        
        $json = json_decode($datos["json"]);
        $retorno->msj = "Hay campos que estan vacios. Por favor completelos";
        $retorno->status = 409;
        //var_dump($json->nombreFoto);
        if($json->precio != "" && $json->modelo != "" && $json->color != "" && $json->marca != "")
        {
            $response = $next($request,$response);
        }
        else
        {
            $newResponse = $response->withJson($retorno,409);
            return $newResponse;
        }
        return $response;
    }
    public function VerificarExistencia($request,$response,$next)
    {
        $datos = $request->getParsedBody();
        $json = json_decode($datos["json"]);
        $retorno = new StdClass();
        $retorno->msj = ", el usuario no existe o ingreso mal sus datos";
        $retorno->status = 403;

        if(Usuario::verificarUsuario($json))
        {
            $response = $next($request,$response);
        }
        else
        {
            return $response->withJson($retorno,403);
        }
        return $response;
    }
    public static function VerificarCorreo($request,$response,$next)
    {
        $datos = $request->getParsedBody();
        $obJson = json_decode($datos["json"]);
        $retorno = new StdClass();
        $retorno->status = 408;
        $retorno->msj = "El correo ya existe...intente con otro";

        if(!(Usuario::verificarCorreo($obJson)))
        {
            ///$retorno->existe = true;
            $response = $next($request,$response);
        }
        else
        {
            return $response->withJson($retorno,405); 
        }
        return $response;
    }
    public function VerificarAuto($request,$response,$next)
    {
        $datos = $request->getParsedBody();
        $json = json_decode($datos["json"]);
        $retorno = new StdClass();
        $retorno->msj = "El precio y el color no es valido";
        $retorno->status = 408;

        if($json->precio >= 50000 && $json->precio <= 600000 && $json->color != "azul") 
        {
            $response = $next($request,$response);
            
        }
        else if($json->color == "azul" && $json->precio >= 50000 && $json->precio <= 600000)
        {
            $retorno->msj = "El color no es valido";
            return $response->withJson($retorno,403);
        }
        else if($json->precio < 50000 && $json->precio > 600000 && $json->color != "azul")
        {
            $retorno->msj = "El precio no es valido";
            return $response->withJson($retorno,403);
        }
        
        return $response;
    }
}