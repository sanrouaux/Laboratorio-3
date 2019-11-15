<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
use Firebase\JWT\JWT;

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

$app->group('/login', function () {    
    
    $this->post('[/]', function (Request $request, Response $response) {  
        
        //Aca deberia conectarse con la base de datos para corroborar ususario y contraseña. 
        //Esto se hace a traves de Middleware

        $params = $request->getParsedBody();
        $datos = $params['usuario'];
        $ahora = time();
        
        $payload = array(
            'iat' => $ahora,            //CUANDO SE CREO EL JWT (OPCIONAL)
            'exp' => $ahora + (30),     //INDICA EL TIEMPO DE VENCIMIENTO DEL JWT (OPCIONAL)
            'data' => $datos,           //DATOS DEL JWT
            'app' => "API REST 2019"    //INFO DE LA APLICACION (PROPIO)
        );
          
        //CODIFICO A JWT
        $token = JWT::encode($payload, "miClaveSecreta");

        $retorno = new stdClass();
        $retorno->Exito = true;
        $retorno->JWT = $token;
        
        return $response->withJson(json_encode($retorno), 200);    
        return $response;
    });
});

$app->run();