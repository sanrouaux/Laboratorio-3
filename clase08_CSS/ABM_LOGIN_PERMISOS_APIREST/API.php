<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
include './usuario.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;


$app = new \Slim\App(["settings" => $config]);

$app->post('/login', function (Request $request, Response $response) {    
    $params = $request->getParsedBody();
    $usu = $params['usuario'];
    $obj = json_decode($usu);
    $respuesta = usuario::ExisteEnBD($obj->correo, $obj->clave);
    $newResponse = $response->withJson("El usuario no existe", 403);
    if($respuesta->Existe == true) {

        $newResponse = $response->withJson($respuesta->user, 200);
    }
    else {
        $newResponse = $response->withJson("El usuario no existe", 403);
    }
    return $newResponse;
});

$app->run();