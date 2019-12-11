<?php

use Firebase\JWT\JWT;

class MW {

    /* @resumen Verifica que sea un token valido
    * @param string $request con header 'token'=token a verificar
    * @param string $response
    * @param function $next proxima funcion a llamar
    * @return string response de proxima funcion/mensaje de error, status
    */
    public function EsTokenValido($request, $response, $next) {
        $headers = getallheaders();  
        $token = $headers['token'];   
        
        try {         
            $payload = JWT::decode(
            $token,
            "miClaveSecreta",
            ['HS256']
            );
            $response = $next($request, $response);
        } 
        catch (Exception $e) {
            $retorno = new stdClass();
            $retorno->exito = false;
            $retorno->mensaje = $e->getMessage();
            $response = $response->withJson($retorno, 403);            
        }
        return $response;
    }
    

    /* @resumen Verifica si el token corresponde a un propietario
    * @param string $request con header 'token'=token a verificar
    * @param string $response
    * @param function $next proxima funcion a llamar
    * @return string response de proxima funcion/mensaje de error, status
    */
    public static function EsPropietario($request, $response, $next) {
        $headers = getallheaders();   
        $token = $headers['token'];  
        
        try {         
            $payload = JWT::decode(
            $token,
            "miClaveSecreta",
            ['HS256']
            );
            $data = $payload->data;
            $perfil = $data->perfil;
            if($perfil === 'propietario') {
                $response = $next($request, $response);
            }
            else {
                $retorno = new stdClass();
                $retorno->exito = false;
                $retorno->mensaje = 'El usuario '.$data->apellido .", ". $data->nombre.' no es propietario';
                $response = $response->withJson($retorno, 409);
            }            
        } 
        catch (Exception $e) {
            $retorno = array('exito'=>false, 'mensaje'=> $e->getMessage());
            $response = $response->withJson($retorno, 409);
        }
        return $response;
    }


    /* @resumen Verifica si el token corresponde a un encargado (o rango superior);
    * llama a la siguiente funcion en caso de que lo sea
    *
    * @param string $request con header 'token'=token a verificar
    * @param string $response
    * @param function $next proxima funcion a llamar
    *
    * @return string response de proxima funcion/mensaje de error, status
    */
    public function EsEncargado($request, $response, $next) {
        $headers = getallheaders();   
        $token = $headers['token'];  
        
        try {         
            $payload = JWT::decode(
            $token,
            "miClaveSecreta",
            ['HS256']
            );
            $data = $payload->data;
            $perfil = $data->perfil;

            if($perfil === 'encargado' || $perfil === 'propietario') {
                $response = $next($request, $response);
            }
            else {
                $retorno = new stdClass();
                $retorno->exito = false;
                $retorno->mensaje = 'El usuario '.$data->apellido .", ". $data->nombre.' no es encargado (o rango superior)';
                $response = $response->withJson($retorno, 409);
            }            
        } 
        catch (Exception $e) {
            $retorno = array('exito'=>false, 'mensaje'=> $e->getMessage());
            $response = $response->withJson($retorno, 409);
        }
        return $response;
    }

    
    /* @resumen Pasa a la siguiente funcion sin restricciones. Al recibir la respuesta de la siguiente 
    * funcion, verifica a traves del token el perfil del usuario logueado; si es encargado, filtra la 
    * informacion del array de objetos presente en el atributo 'tabla' del cuerpo de la respuesta
    *
    * @param string $request con header 'token'=token a verificar
    * @param string $response
    * @param function $next proxima funcion a llamar
    *
    * @return Response con JSON (exito, mensaje, array de objetos -color,marca,precio,modelo- y status code)
    */
    public function FiltraContenidoParaEncargado($request, $response, $next) {    
        $response = $next($request, $response);
        
        $headers = getallheaders();   
        $token = $headers['token'];        
        try {
            $payload = JWT::decode(
            $token,
            "miClaveSecreta",
            ['HS256']
            );
            $perfil = $payload->data->perfil;
            if($perfil == 'encargado') {
                $body = $response->getBody();
                $body->rewind();
                $bodyStr = $body->getContents();
                $bodyObj = json_decode($bodyStr);
                $arrayAutos = $bodyObj->info;
                $nuevoArrayAutos = array();
                foreach($arrayAutos as $autoAux) {
                    $auto = new stdClass();
                    $auto->color = $autoAux->color;
                    $auto->marca = $autoAux->marca;
                    $auto->precio = $autoAux->precio;
                    $auto->modelo = $autoAux->modelo;
                    array_push($nuevoArrayAutos, $auto);
                }
                $bodyObj->info = $nuevoArrayAutos;
                $response = $response->withJson($bodyObj, 200);
            }
        }
        catch (Exception $e) {
            $retorno = array('exito'=>false, 'mensaje'=> $e->getMessage());
            $response = $response->withJson($retorno, 409);
        }
        return $response;
    }


    /* @resumen Pasa a la siguiente funcion sin restricciones. Al recibir la respuesta de la siguiente 
    * funcion, verifica a traves del token el perfil del usuario logueado; si es empleado, agregara 
    * informacion. Calcula el numero de colores diferentes en el arrau de autos y agrega esa info a la respuesta
    *
    * @param string $request con header 'token'=token a verificar
    * @param string $response
    * @param function $next proxima funcion a llamar
    *
    * @return Response con JSON: (exito, mensaje, array de objetos, numero de colores, status code)
    */
    public function FiltraContenidoParaEmpleado($request, $response, $next) {    
        $response = $next($request, $response);
        
        $headers = getallheaders();   
        $token = $headers['token'];        
        try {
            $payload = JWT::decode(
            $token,
            "miClaveSecreta",
            ['HS256']
            );
            $perfil = $payload->data->perfil;
            if($perfil == 'empleado') {
                $body = $response->getBody();
                $body->rewind();
                $bodyStr = $body->getContents();
                $bodyObj = json_decode($bodyStr);
                $arrayAutos = $bodyObj->info;
                $contador = 0;
                for($i = 0; $i < count($arrayAutos); $i++) {
                    $sumar = true;
                    for($j = $i+1; $j < count($arrayAutos); $j++) {
                        if($arrayAutos[$i]->color == $arrayAutos[$j]->color) {
                            $sumar = false; 
                            break;
                        }
                    }
                    if($sumar == true) {
                        $contador++;
                    }
                }
                $bodyObj->info = 'El numero de colores distintos es ' . $contador;
                $response = $response->withJson($bodyObj, 200);
            }
        }
        catch (Exception $e) {
            $retorno = array('exito'=>false, 'mensaje'=> $e->getMessage());
            $response = $response->withJson($retorno, 409);
        }
        return $response;
    }


    /* @resumen Pasa a la siguiente funcion sin restricciones. Al recibir la respuesta de la siguiente 
    * funcion, verifica a traves del token el perfil del usuario logueado; si es PROPIETARIO, filtra la 
    * informacion del array de objetos presente en el atributo 'info' del cuerpo de la respuesta.
    * Si hay un ID, guarda en 'info' la informacion de ese auto particular. Si no hay ID o el ID
    * esta vacio, guarda en 'info' la info de todos los autos de la BD
    * IMPORTANTE!!! El ID debe ser enviado en el body con el encabezado x-www-form-urlencoded; como form-data
    * llega vacio
    *
    * @param string $request con header 'token'=token a verificar, y parametro en el body 'id'=id del auto a traer
    * @param string $response
    * @param function $next proxima funcion a llamar
    *
    * @return Response con JSON (exito, mensaje, array de objetos -color,marca,precio,modelo- y status code)
    */
    public function FiltraContenidoParaPropietario($request, $response, $next) {    
        $response = $next($request, $response);
        
        $arrayParams = $request->getParsedBody();
        $id = NULL;
        if(isset($arrayParams['id']) && $arrayParams['id'] != "") {
            $id = $arrayParams['id'];
        }

        $headers = getallheaders();   
        $token = $headers['token'];        
        try {
            $payload = JWT::decode(
            $token,
            "miClaveSecreta",
            ['HS256']
            );
            $perfil = $payload->data->perfil;
            if($perfil == 'propietario') {
                if($id != NULL) {
                    $body = $response->getBody();
                    $body->rewind();
                    $bodyStr = $body->getContents();
                    $bodyObj = json_decode($bodyStr);
                    $arrayAutos = $bodyObj->info;

                    $bodyObj->info = 'No se encontro el ID';
                    foreach($arrayAutos as $autoAux) {
                        if($id == $autoAux->id) {
                            $bodyObj->info = $autoAux;
                            break;
                        }
                    }
                    $response = $response->withJson($bodyObj, 200);
                }                
            }
        }
        catch (Exception $e) {
            $retorno = array('exito'=>false, 'mensaje'=> $e->getMessage());
            $response = $response->withJson($retorno, 409);
        }
        return $response;
    }


}



    /* @resumen Verifica si el token corresponde a un encargado (o rango superior);
    * llama a la siguiente funcion en caso de que lo sea
    *
    * @param string $request con header 'token'=token a verificar
    * @param string $response
    * @param function $next proxima funcion a llamar
    *
    * @return string response de proxima funcion/mensaje de error, status
    */
    /*public function SeteaEncargado($request, $response, $next) {
        $headers = getallheaders();   
        $token = $headers['token'];  
        
        try {         
            $payload = JWT::decode(
            $token,
            "miClaveSecreta",
            ['HS256']
            );
            
            $perfil = $payload->data->perfil;

            if($perfil == 'encargado') {
                $request = $request->withAttribute('encargado', true);               
            }
            else {
                $request = $request->withAttribute('encargado', false); 
            }
            $response = $next($request, $response);            
        }          
        catch (Exception $e) {
            $retorno = array('exito'=>false, 'mensaje'=> $e->getMessage());
            $response = $response->withJson($retorno, 409);
        }
        return $response;
    }*/


/*
class MW {
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
*/