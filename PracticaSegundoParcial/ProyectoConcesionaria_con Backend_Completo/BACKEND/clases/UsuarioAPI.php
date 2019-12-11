<?php

require_once 'Usuario.php';
include 'IAPIUsable.php';

class UsuarioAPI implements IAPIUsable{    

    /* @resumen Da de alta a un usuario en BD
    * @param string $request con parametros 'usuario'= datos del usuario, 'foto'= foto del usuario 
    * @param string $response  
    * @return $response con JSON: exito, mensaje, status
    */
    public static function Alta($request, $response, $args) {

        $arrayParams = $request->getParsedBody();        
        $usuario = json_decode($arrayParams['usuario']);  

        $respuesta = Usuario::Alta($usuario);

        if($respuesta->exito) { 
            $response = $response->withJson($respuesta, 200);            	
        }
        else {
            $response = $response->withJson($respuesta, 418);     
        }  
        return $response;      
    }


    /* @resumen Obtiene todos los usuarios de la BD
    * @param string $request
    * @param string $response  
    * @return $response con JSON: exito, mensaje, array de usuarios, codigo de status
    */
    public static function Listado($request, $response, $args) {
        $arrayUsuarios = Usuario::TraerTodos();
        //$tabla = Usuario::ConstruyeTabla($arrayUsuarios);
        
        $retorno = new stdClass();
        if(count($arrayUsuarios) > 0) {
            $retorno->exito = true;
            $retorno->mensaje = 'Usuarios traidos de BD';
            //$retorno->tabla = $tabla;
            $retorno->usuarios = $arrayUsuarios;
            $response = $response->withJson($retorno, 200);
        }     
        else {
            $retorno->exito = false;
            $retorno->mensaje = 'Base de datos vacia';
            $retorno->usuarios = NULL;
            $response = $response->withJson($retorno, 424);
        }         
        return $response;
    }


    /* @resumen Verifica si un usuario esta en BD y crea un token con sus datos
    * @param string $request con param 'datos'= JSON con correo y clave del usuario
    * @param string $response 
    * @return response con JSON: exito, JWT/NULL, codigo de status
    */
    public static function CreaJWT($request, $response) {
        $retorno = new stdClass();

        $arrayParams = $request->getParsedBody();
        $datos = $arrayParams['datos'];
        $objDatos = json_decode($datos);

        $respuesta = Usuario::CreaJWT($objDatos->correo, $objDatos->clave);
        if($respuesta->exito) {
            $retorno->exito = true;
            $retorno->JWT = $respuesta->JWT;
            $retorno->usuario = $respuesta->usuario;
            $response = $response->withJson($retorno, 200);
        }
        else {
            $retorno->exito = false;
            $retorno->JWT = $respuesta->JWT;
            $retorno->usuario = $respuesta->usuario;
            $response = $response->withJson($retorno, 403);
        }
        return $response;
    }


    /* @resumen Verifica si un token es valido
    * @param string $request con param 'token'= token a verificar
    * @return response con JSON: mensaje, codigo de status
    */
    public static function VerificaJWT($request, $response) {
        $headers = getallheaders();
        $token = $headers['token'];

        $retorno = new stdClass();

        if(Usuario::VerificaJWT($token)) {
            $retorno->mensaje = 'Token valido';
            $response = $response->withJson($retorno, 200);
        }
        else {
            $retorno->mensaje = 'Token invalido';
            $response = $response->withJson($retorno, 403);
        }
        return $response;
    }

    
    //FUNCIONES SIN IMPLEMENTAR
    public static function TraerUno($request, $response, $args) {
        throw new Exception();
    }

    public static function Borrar($request, $response, $args) {
        throw new Exception();
    }

    public static function Modificar($request, $response, $args) {
        throw new Exception();
    }
}

