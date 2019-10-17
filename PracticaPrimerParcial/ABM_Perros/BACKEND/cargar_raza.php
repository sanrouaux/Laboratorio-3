<?php

$a = fopen("./razas.json", "r");
$razas = fread($a, filesize("./razas.json"));
fclose($a);

echo ($razas);

?>