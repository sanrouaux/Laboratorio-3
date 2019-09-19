"use strict";
function Login() {
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "set_session-variable.php", true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send("user=" + user + "&password=" + password);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.status == 200 && httpRequest.readyState == 4) {
            if (httpRequest.response == "ok") {
                window.location.href = "index.php";
            }
            else {
                alert("Usuario o contraseña incorrectos");
            }
        }
    };
}
