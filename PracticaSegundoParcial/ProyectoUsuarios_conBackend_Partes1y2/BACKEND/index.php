<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
require_once './clases/UsuarioAPI.php';
require_once './clases/MW.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);


/************************************************* */
/*********** VERBOS DE LA API-REST *****************/
/************************************************* */


/* @resumen Da de alta a un usuario en BD siempre y cuando no exista un email igual en BD
* @param 'usuario' = JSON con todos los datos del usuario, 'foto' = foto del usuario 
* @return Response con JSON (exito, mensaje, status code 200/418)
*/
$app->post('/usuarios', \UsuarioAPI::class . '::Alta');



/* @resumen Obtiene todos los usuarios de la BD y crea una tabla HTML con ellos
* @param sin parametros
* @return Response con JSON (exito, mensaje, arrayUsuarios, status code)
*/
$app->get('[/]', \UsuarioAPI::class . '::Listado');
//->add(\MW::class . ':EsTokenValido');



/* @resumen Verifica si un usuario esta en BD y, si lo esta, crea un token con sus datos (correo, nombre, apellido y perfil)
* @param 'datos' = JSON con correo y clave del usuario
* @return Response con JSON (exito true/false, JWT/NULL, datosUsuario/NULL, codigo de status 200/403)
*/
$app->post('/login', \UsuarioAPI::class . '::CreaJWT');



/* @resumen Verifica si un token es valido
* @param 'token'= token a verificar
* IMPORTANTE!!! Este parametro se pasa en el header
* @return Response con JSON (exito true/false, mensaje, perfil, codigo de status 200/403)
*/
$app->get('/login', \UsuarioAPI::class . '::VerificaJWT');



/* @resumen Da de alta un auto en BD
* @param 'auto' = JSON con color, marca, precio y modelo del auto a cargar
* @return Response con JSON (exito, mensaje, status code)
*/
$app->post('[/]', \AutoAPI::class . '::Alta')
->add(\MW::class . ':EsTokenValido');



/* @resumen Trae todos los autos de la BD
* @param sin parametros
* @return Response con JSON (exito, mensaje, tabla/NULL, status code)
*/
$app->get('/autos', \AutoAPI::class . '::Listado')
->add(\MW::class . ':EsTokenValido');



/* @resumen Borra un usuario de la BD
* @param 'id' = id del auto a eliminar 
* IMPORTANTE: (Content-Type: application/x-www-form-urlencoded)
* @return Response con JSON (exito, mensaje, status code 200/418/403 si token no valido)
*/
$app->delete('[/]', \UsuarioAPI::class . '::Borrar');
//->add(\MW::class . ':EsTokenValido');


/* @resumen Modifica un auto de la BD
* @param 'auto' = JSON con id del auto a modificar, nuevo color, nueva marca, nuevo precio y nuevo modelo
* IMPORTANTE: (Content-Type: application/x-www-form-urlencoded)
* @return Response con JSON (exito, mensaje, status code 200/418/403 si el token no es valido)
*/
$app->put('[/]', \AutoAPI::class . '::Modificar')
->add(\MW::class . ':EsTokenValido');


$app->run();


