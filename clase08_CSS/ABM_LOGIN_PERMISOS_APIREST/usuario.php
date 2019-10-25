<?php

include ("AccesoDatos.php");

class usuario
{
    private $id;
    private $nombre;
    private $apellido;
    private $clave;
    private $perfil;
    private $estado;
    private $correo;
    private $foto;

    function __construct($nombre = "", $apellido = "", $correo = "", $clave = "", $perfil = 0, $foto = "")
    {
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->clave = $clave;
        $this->perfil = $perfil;
        $this->estado = 1;
        $this->correo = $correo;
        $this->foto = $foto;
    }

    public function MostrarUsuario()
    {
            return $this->id." - ".$this->nombre." - ".$this->apellido." - ".$this->perfil." - ".$this->estado." - ".$this->correo;
    }

    public static function ExisteEnBD($correo, $clave)
    {
        $respuesta = new stdClass();

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE correo = :correo && clave = :clave");
        $consulta->bindParam(':correo', $correo, PDO::PARAM_STR);
        $consulta->bindParam(':clave', $clave, PDO::PARAM_STR);
        $consulta->execute();        
        if($consulta->rowCount() > 0) {
            $objUser = $consulta->fetch(PDO::FETCH_OBJ);
            $respuesta->Existe = true;
            $respuesta->user = $objUser;
        }
        else {
            $respuesta->Existe = false;
            $respuesta->user = null;
        }   
        return $respuesta;     
    }
    
    public static function TraerTodosLosUsuarios()
    {    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id, nombre, apellido, correo, clave, perfil, foto FROM usuarios");        
        
        $consulta->execute();
        
        $arrayUsuarios = array();
        while($Obj = $consulta->fetch(PDO::FETCH_OBJ))
        {
            array_push($arrayUsuarios, $Obj);
        }
        return $arrayUsuarios;                                                 
    }
    
    public function AltaUsuario() : bool 
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();        
        try {            
            $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (nombre, apellido, clave, perfil, estado, correo, foto)"
                                                    . " VALUES (:nombre, :apellido, :clave, :perfil, :estado, :correo, :foto)");
        
            $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido', $this->apellido, PDO::PARAM_STR);
            $consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
            $consulta->bindValue(':perfil', $this->perfil, PDO::PARAM_INT);
            $consulta->bindValue(':estado', $this->estado, PDO::PARAM_INT);
            $consulta->bindValue(':correo', $this->correo, PDO::PARAM_STR);
            $consulta->bindValue(':foto', $this->foto, PDO::PARAM_STR);

            $consulta->execute();
            return true;
        }
        catch (PDOException $e){
            return false;
        }   
    }
    
    public static function ModificarUsuario($id, $nombre, $apellido, $clave, $perfil, $estado, $correo)
    {

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET nombre = :nombre, apellido = :apellido,
                                                        clae = :clave 
                                                        jahr = :anio WHERE id = :id");
        
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->bindValue(':titulo', $titulo, PDO::PARAM_INT);
        $consulta->bindValue(':anio', $anio, PDO::PARAM_INT);
        $consulta->bindValue(':cantante', $cantante, PDO::PARAM_STR);

        return $consulta->execute();

    }

    public static function EliminarUsuario($usuario)
    {

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM cds WHERE id = :id");
        
        $consulta->bindValue(':id', $usuario->id, PDO::PARAM_INT);

        return $consulta->execute();

    }
    

}