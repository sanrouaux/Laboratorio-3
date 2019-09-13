<?php

if(isset($_SESSION["usuario"]) && $_SESSION["usuario"] == "OK")
{

}
else
{
    header("location:login.php");
}