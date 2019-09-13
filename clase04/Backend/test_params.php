<?php

if(isset($_POST["txt"]))
{
    if($_POST["txt"] != "")
    {
        echo "Hola, " . $_POST["txt"];
    }
    else
    {
        echo ":(";
    }
}
