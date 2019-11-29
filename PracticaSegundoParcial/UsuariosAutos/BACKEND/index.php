<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
require_once './clases/auto.php';
require_once './clases/usuario.php';
//require_once './BACKEND/clases/Venta.php';
require_once './clases/MW.php';
require_once './clases/conexion.php';

//use Firebase\JWT\JWT;
$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

$app->post('/usuarios', \Usuario::class . ':AltaUsuario')->add(\MW::class . "::VerificarCorreo")->add(\MW::class . "::CampoVaciosCompletos");
$app->get('[/]', \Usuario::class . ':Tabla_Usuarios');
$app->post('[/]', \Auto::class . ':AltaAuto')->add(\MW::class . ":VerificarAuto");
$app->get('/autos', \Auto::class . ':Tabla_Autos');
$app->post('/login', \Usuario::class . ':retornoJWT')->add(\MW::class . ":VerificarExistencia")->add(\MW::class . "::CampoVacios")->add(\MW::class . ":SetClave_Correo");;
$app->get('/login', \Usuario::class . ':verificarLogin');
$app->post("/validarUsuario" , \Usuario::class . ":validarUsu")->add(\MW::class . "::CampoVacios");
$app->post("/autos" , \Usuario::class . ":EliminarAuto");
$app->post("/modificarAutos", \Auto::class . ":Modificar_Auto")->add(\MW::class . "::CamposVaciosAutos");







$app->run();