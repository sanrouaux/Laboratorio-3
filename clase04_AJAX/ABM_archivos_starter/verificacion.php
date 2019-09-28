<?php
session_start();

if(isset($_SESSION["usuario"]) && $_SESSION["usuario"] == "OK")
{
    //echo "ok";
}
else
{
    //echo "NO-OK";
    header("location:login.php");
}

?>
