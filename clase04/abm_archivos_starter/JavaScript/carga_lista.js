"use strict";
window.onload = function () {
    cargarGrilla();
};
function cargarGrilla() {
    var http = new XMLHttpRequest();
    http.open("POST", "./administracion.php", true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.send("queHago=mostrarGrilla");
    http.onreadystatechange = function () {
        if (http.status == 200 && http.readyState == 4) {
            document.getElementById("divGrilla").innerHTML = http.response;
        }
    };
}
