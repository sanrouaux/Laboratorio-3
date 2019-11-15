"use strict";
$(document).ready(function () {

    $("#form").bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            /*txtMail: {
                validators: {
                    notEmpty: {
                        message: 'El e-mail es requerido!!!'
                    },
                    stringLength: {
                        min: 3,
                        message: 'El mínimo de caracteres admitido es de 3!!!'
                    }
                }
            },*/
            txtClave: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña es requerida!!!'
                    },
                    stringLength: {
                        min: 6,
                        max: 20,
                        message: 'Por favor, ingrese entre 6 y 20 caracteres!!!'
                    }
                }
            }
        }
    })
    //SI SUPERA TODAS LAS VALIDACIONES, SE PROVOCA EL SUBMIT DEL FORM
    .on('success.form.bv', function (e) {

        e.preventDefault();
        alert("entro en el success");
        Aceptar();

    });

});

function Aceptar() {
    //TOMA LOS VALORES DE LAS CAJAS DE TEXTO
    var correo = document.getElementById("txtMail").value;
    var clave = document.getElementById("txtClave").value;
    //CREA UN STRING CON FORMATO JSON  
    var usuario = '{"correo": "' + correo + '", "clave": "' + clave + '"}';
    //DECLARA E INSTANCIA EL OBJETO XMLHTTPREQUEST
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "./login/");
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send("usuario=" + usuario);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.status == 200 && httpRequest.readyState == 4) {
            console.log(JSON.parse(httpRequest.responseText));
        }
    };
}
