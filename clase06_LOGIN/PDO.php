<?php

try {

    $conec = new PDO("mysql:host=localhost;dbname=cdcol;charset=utf8", "root", "");
    $result = $conec->query("SELECT * FROM `cds`");
    $array = $result->fetchAll();
    
    $tabla = "<table>
                <theader>
                    <td>TITULO</td>
                    <td>INTERPRETE</td>
                    <td>ANIO</td>
                    <td>ID</td>
                </theader>";

    foreach($array as $row)
    {
        $tabla .= "<tr>
                    <td>".$row["titel"]."</td>
                    <td>".$row["interpret"]."</td>
                    <td>".$row["jahr"]."</td>
                    <td>".$row["id"]."</td>
                </tr>";        
    }
    $tabla .= "</table>";
    echo $tabla;
}
catch(PDOException $e) {
    echo $e->getMessage();
}