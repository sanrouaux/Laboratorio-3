"use strict";
function Login() {
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "set_session-variable.php", true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send("user=" + user + "&password=" + password);
    httpRequest.onreadystatechange = function () {
        alert(httpRequest.response);
        window.location.href = "index.php";
    };
}
