<?php

$user = $_POST["user"];
$password = $_POST["password"];

$userOk = "santiago";
$pwOk = "1234";

if($user == $userOk && $pwOk == $password)
{
    $_SESSION["usuario"] = "OK";
}
