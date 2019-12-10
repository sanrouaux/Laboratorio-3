<?php

require_once 'AccesoDatos.php';

use Firebase\JWT\JWT;

class Usuario {

    public $correo;
    public $clave;
    public $nombre;
    public $apellido;
    public $perfil; 
    public $foto;

    /*
    * Constructor de la clase
    *
    * @param string $correo correo del usuario
    * @param string $clave clave del usuario
    * @param string $nombre nombre del usuario
    * @param string $apellido apellido del usuario
    * @param string $perfil perfil del usuario (propietario, encargado, empleado)
    * @param string $foto ruta a la foto guardada en Backend
    *
    * @return nueva instancia de la clase Usuario
    */
    public function __construct($correo, $clave, $nombre, $apellido, $perfil, $foto) {
        $this->correo = $correo;
        $this->clave = $clave;
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->perfil = $perfil;
        $this->foto = $foto;
    } 

    
    /* Verifica si existe en BD un usuario registrado con determinado correo 
    *
    * @param string $correo correo con el que pretende registrarse el usuario
    *
    * @return TRUE si el correo existe en BD; FALSE en caso contrario
    */
    public static function ExisteEnBD($correo) {
        $retorno = false;
        $objAccesoDatos = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objAccesoDatos->RetornarConsulta('SELECT * FROM usuarios WHERE correo = :correo');
        $consulta->bindValue(':correo',$correo, PDO::PARAM_STR);
        $consulta->execute();
        if($consulta->fetch(PDO::FETCH_OBJ)) {
            $retorno = true;
        }
        return $retorno;
    }


    /*
    * Da el alta a un nuevo usuario en la base de datos
    *
    * @param obj $usuario objeto estandar con los datos del usuario
    * @superglobal file $foto toma el archivo asociado a la clave 'foto' de la variable $_FILES
    *
    * @return TRUE si logra dar alta en BD y guardar la foto en backend; FALSE en caso contrario
    */
    public static function Alta($usuario) {
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = 'No se logro dar el alta';

        $existeEnBD = self::ExisteEnBD($usuario->correo);

        if(!$existeEnBD) {
            $nombreAnterior = $_FILES['foto']['name'];
            $extension= explode(".", $nombreAnterior);
            $extension = array_reverse($extension);
            $extension = $extension[0];
            $destino = 'fotos/'.date('His').'.'.$extension;
            $fotoArchivada = move_uploaded_file($_FILES['foto']['tmp_name'], $destino);
            if($fotoArchivada) {
                $objAccesoDatos = AccesoDatos::dameUnObjetoAcceso();
                $consulta = $objAccesoDatos->RetornarConsulta('INSERT INTO usuarios (correo, clave, nombre, apellido, perfil, foto) VALUES (:correo, :clave, :nombre, :apellido, :perfil, :foto)');
                $consulta->bindValue(':correo',$usuario->correo, PDO::PARAM_STR);
                $consulta->bindValue(':clave',$usuario->clave, PDO::PARAM_STR);
                $consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
                $consulta->bindValue(':apellido',$usuario->apellido, PDO::PARAM_STR);
                $consulta->bindValue(':perfil',$usuario->perfil, PDO::PARAM_STR);
                $consulta->bindValue(':foto',$destino, PDO::PARAM_STR);
                $consulta->execute();

                if($consulta->rowCount() > 0) {
                    $retorno->exito = true;
                    $retorno->mensaje = 'Se dio el alta con exito';
                }
                else {
                    unlink($destino);
                }            
            }
        }
        else {
            $retorno->exito = false;
            $retorno->mensaje = 'Ya existe un usuario con ese correo';
        }
        return $retorno;
    }


    /*
    * Busca en base de datos la existencia de un usuario por correo y clave y trae todos los
    * datos del usuario
    *
    * @param string $correo correo del usuario
    * @param string $clave clave del usuario
    *
    * @return objeto generico con todos los datos del usuario; FALSE si hubo error
    */
    public static function TraerUno($correo, $clave) {
        $objAccesoDatos = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objAccesoDatos->RetornarConsulta("SELECT * FROM usuarios WHERE correo = :correo AND clave = :clave");
        $consulta->bindValue(':correo', $correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $clave, PDO::PARAM_STR);        
        $consulta->execute();
        $usuario = $consulta->fetch(PDO::FETCH_OBJ);
        return $usuario;    
    }


    /*
    * Trae todos los usuarios de la base de datos
    *
    * @return array de objetos estandar con todos los usuarios de la BD; puede ser array vacio  
    */
    public static function TraerTodos() {

        $objAccesoDatos = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objAccesoDatos->RetornarConsulta("SELECT * FROM usuarios");
        $exitoConsulta = $consulta->execute();

        $arrayUsuarios = array();
        while($row = $consulta->fetch(PDO::FETCH_OBJ)) {
            array_push($arrayUsuarios, $row);            
        }
        return $arrayUsuarios;        	  
    }

    /*
    * Construye tabla en formato HTML a partir de un array de usuarios
    *
    * @param array array de objetos con todos los datos de los usuarios
    *
    * @return string tabla en formato HTML
    */
    public static function ConstruyeTabla($arrayUsuarios) {

        $tabla = "<table border='1' width='100%' style='text-align:center'>";
        $tabla .= "<tr>";
        $tabla .= "<td>CORREO</td>";
        $tabla .= "<td>CLAVE</td>";
        $tabla .= "<td>NOMBRE</td>";
        $tabla .= "<td>APELLIDO</td>";
        $tabla .= "<td>PERFIL</td>";
        $tabla .= "<td>FOTO</td>";
        $tabla .= "</tr>";

        foreach($arrayUsuarios as $usu) {
            $tabla .= "<tr>";
            $tabla .= "<td>".$usu->correo."</td>";
            $tabla .= "<td>".$usu->clave."</td>";
            $tabla .= "<td>".$usu->nombre."</td>";
            $tabla .= "<td>".$usu->apellido."</td>";
            $tabla .= "<td>".$usu->perfil."</td>";
            $tabla .= "<td><img heigth='150px' width='150px' src='".$usu->foto."'/></td>";
            $tabla .= "</tr>";
        }
        $tabla .= "</table>";
        return $tabla;
    } 


    /*
    * @resumen Crea token con todos los datos del usuario
    *
    * @param string $correo correo del usuario
    * @param string $clave clave del usuario
    *
    * @return string JWT con todos los datos del usuario; NULL en caso de que el usuario no exista en BD
    */
    public static function CreaJWT($correo, $clave) {
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->JWT = NULL;
        $retorno->usuario = NULL;

        $usuario = self::TraerUno($correo, $clave);
        
        if($usuario) {   
            
            $data = new stdClass();
            $data->correo = $usuario->correo;
            $data->nombre = $usuario->nombre;
            $data->apellido = $usuario->apellido;
            $data->perfil = $usuario->perfil;

            $ahora = time();
            $payload = array(
            'iat' => $ahora,            //CUANDO SE CREO EL JWT (OPCIONAL)
            'exp' => $ahora + (60),    //INDICA EL TIEMPO DE VENCIMIENTO DEL JWT (OPCIONAL)
            'data' => $data,         //DATOS DEL JWT
            'app' => "LOGIN"            //INFO DE LA APLICACION (PROPIO)
            );
            
            $token = JWT::encode($payload, "miClaveSecreta"); 
            $retorno->exito = true;
            $retorno->JWT = $token;
            $retorno->usuario = $data;
        }
        return $retorno;
    }

    /*
    * @resumen Verifica si un token es valido
    *
    * @param string $token token a verificar
    *
    * @return TRUE si el token es valido; FALSE caso contrario
    */
    public static function VerificaJWT($token) {
        try {         
            $decodificado = JWT::decode(
            $token,
            "miClaveSecreta",
            ['HS256']
            );
            $retorno = true;
        } 
        catch (Exception $e) {
            $retorno = false;
        }
        return $retorno;
    }
}