<?php
class Conexion
{
   private $_objPDO;
   
   public function __construct()
   {
      $strCon = "mysql:host=localhost;dbname=concesionaria_bd";
      try
      {
        $this->_objPDO = new PDO($strCon,"root","");
      }
      catch(PDOException $e)
      {
          echo "Fallo la conexión...." . $e->getMessage();
      }
      
   }
   public function objPDO()
   {
       return $this->_objPDO;
   }
}