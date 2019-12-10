<?php

    class Producto {

        public static function AdministrarBase($request , $response , $consulta) {

            $datos = "mysql:host=localhost;dbname=donfubd";
            $user = "root";
            $pass = "";

            try {
            
                $conexcion = new PDO($datos , $user , $pass);
                $resultados = $conexcion->prepare($consulta);
                $resultados->execute();

                $response->getBody()->write('{"valido":"true"}');
            }
            catch(Exception $exception) {
            
                $response->getBody()->write("Se ha atrapado una excepcion: ".$exception->getMessage());
            }
        }

        public static function RetornarProductos($response) {

            $datos = "mysql:host=localhost;dbname=donfubd";
            $user = "root";
            $pass = "";
            $productos = array();

            try {

                $conexcion = new PDO($datos , $user , $pass);
                $resultados = $conexcion->prepare("SELECT `id`,`nombre`,`precio` FROM `productos` WHERE 1");
                $resultados->execute();

                while($fila = $resultados->fetch(PDO::FETCH_ASSOC)) {

                    array_push($productos , $fila);
                }

                $response->getBody()->write(json_encode($productos));
            }
            catch(Exception $exception) {

                $response->getBody()->write("Se ha atrapado una excepcion: ".$exception->getMesagge());
            }
        }
    }

?>