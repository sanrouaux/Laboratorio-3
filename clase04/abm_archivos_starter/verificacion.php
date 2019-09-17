<?php
session_start();

if(isset($_SESSION["usuario"]) && $_SESSION["usuario"] == "OK")
{
    echo "OK";
}
else
{ 
    echo "NO-OK";   
    //header("location:login.php");        
}

?>