"use strict";
window.onload = function () {
    //ir a verificacion.php 
    //me tiene que devolver ok o no-ok
    var http = new XMLHttpRequest();
    http.open("POST", "./verificacion.php", true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.send("");
    http.onreadystatechange = function () {
        if (http.status == 200 && http.readyState == 4) {
            if (http.response == "ok") {
                cargarGrilla();
            }
            else {
                window.location.href = "login.php";
            }
        }
    };
};
function cargarGrilla() {
    var httpAd = new XMLHttpRequest();
    httpAd.open("POST", "./administracion.php", true);
    httpAd.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpAd.send("queHago=mostrarGrilla");
    httpAd.onreadystatechange = function () {
        if (httpAd.status == 200 && httpAd.readyState == 4) {
            document.getElementById("divGrilla").innerHTML = httpAd.response;
        }
    };
}
