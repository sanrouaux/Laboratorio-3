<?php
session_start();

$user = "santiago";
$password = "1234";

if($_POST["user"] == $user && $_POST["password"] == $password)
{
    $_SESSION["usuario"] = "OK";
    echo "ok";
}
else
{
    $_SESSION["usuario"] = "NO-OK";
    echo "NO-OK";
}
