<?php
 
interface IApiUsable{ 
	
	public static function Alta($request, $response, $args);
	public static function Listado($request, $response, $args);    
	public static function TraerUno($request, $response, $args);
   	public static function Borrar($request, $response, $args);
   	public static function Modificar($request, $response, $args);
}
