function Login()
{
    var user : string = (<HTMLTextAreaElement>document.getElementById("user")).value;
    var password : string = (<HTMLTextAreaElement>document.getElementById("password")).value;

    var httpRequest : XMLHttpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "set_session-variable.php", true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send("user="+user+"&password="+password);
    httpRequest.onreadystatechange = () =>{
            if(httpRequest.response == "OK")
            {
                window.location.href="index.php";
            }                    
    }
}