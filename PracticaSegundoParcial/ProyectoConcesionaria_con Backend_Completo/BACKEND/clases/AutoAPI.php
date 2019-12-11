<?php

require_once 'Auto.php';
require_once 'IAPIUsable.php';

class AutoAPI implements IAPIUsable{

    /* @resumen Da de alta un auto en BD
    * @param string $request con para metro 'auto'=JSON con datos del auto a cargar
    * @param string $response 
    * @param array $args  
    * @return response con JSON: exito, mensaje, status code
    */
    public static function Alta($request, $response, $args) {
        $arrayParams = $request->getParsedBody();
        $auto = json_decode($arrayParams['auto']);

        $retorno = new stdClass();
        if(Auto::Alta($auto)) {
            $retorno->exito = true;
            $retorno->mensaje = 'Se dio de alta un auto';
            $response = $response->withJson($retorno, 200);
        }
        else {
            $retorno->exito = false;
            $retorno->mensaje = 'No se pudo dar de alta el auto';
            $response = $response->withJson($retorno, 418);
        }
        return $response;
    }


    /* @resumen Trae todos los autos de la BD
    * @param string $request sin parametros
    * @param string $response 
    * @param array $args  
    * @return Response con JSON (exito, mensaje, tabla/NULL, status code)
    */
    public static function Listado($request, $response, $args) {
            $arrayAutos = Auto::TraerTodos();        
            $retorno = new stdClass();
            if(count($arrayAutos) > 0) {
                //$tabla = Auto::CrearTabla($arrayAutos);
                $retorno->exito = true;
                $retorno->mensaje = 'Se trajo todos los autos de BD';
                //$retorno->tabla = $tabla;
                $retorno->autos = $arrayAutos;
                $response = $response->withJson($retorno, 200);
            }
            else {
                $retorno->exito = false;
                $retorno->mensaje = 'Base de datos vacia';
                $retorno->autos = NULL;
                $response = $response->withJson($retorno, 424);
            }     
        return $response;
    }

   
     /* @resumen Trae un auto de la BD
    * @param string $request con parametro 'id'=id del auto a traer
    * @param string $response 
    * @param array $args 
    * @return response con JSON: exito, mensaje, status code
    */
    public static function TraerUno($request, $response, $args) {
        $arrayParams = $request->getParsedBody();
        $id = $arrayParams['id'];
        
        $auto = Auto::TraerUno($id);        
        $retorno = new stdClass();
        if($auto) {
            $retorno->exito = true;
            $retorno->mensaje = 'Se trajo un auto de BD';
            $response = $response->withJson($retorno, 200);
        }
        else {
            $retorno->exito = false;
            $retorno->mensaje = 'No se encontro el auto en BD';
            $response = $response->withJson($retorno, 424);
        }
        return $response;
    }


    /* @resumen Borra un auto de la BD
    * @param string $request con para metro 'id'=id del auto a eliminar
    * @param string $response 
    * @param array $args  
    * @return response con JSON: exito, mensaje, status code
    */
   	public static function Borrar($request, $response, $args) {
        $arrayParams = $request->getParsedBody();
        $id = $arrayParams['id'];
        $retorno = new stdClass();
        if(Auto::BorrarPorId($id)) {
            //echo 'funcion de auto devuelve true';
            $retorno->exito = true;
            $retorno->mensaje = 'Se elimino el auto de la BD';
            $response = $response->withJson($retorno, 200);
        }
        else {
            //echo 'funcion de auto devuelve false';
            $retorno->exito = false;
            $retorno->mensaje = 'No se pudo eliminar el auto de la BD';
            $response = $response->withJson($retorno, 418);
        }
        return $response;
    }


    /* @resumen Borra un auto de la BD
    * @param string $request con para metro 'id'=id del auto a eliminar
    * @param string $response 
    * @param array $args  
    * @return response con JSON: exito, mensaje, status code
    */
   	public static function Modificar($request, $response, $args) {
        $arrayParams = $request->getParsedBody();
        $auto = json_decode($arrayParams['auto']);
        $retorno = new stdClass();
        if(Auto::ModificarPorId($auto)) {
            $retorno->exito = true;
            $retorno->mensaje = 'Se modifico el auto de la BD';
            $response = $response->withJson($retorno, 200);
        }
        else {
            $retorno->exito = false;
            $retorno->mensaje = 'No se pudo modificar el auto de la BD';
            $response = $response->withJson($retorno, 418);
        }
        return $response;
    }

}