$(document).ready(function () {

    $('#loginForm').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        
        fields: {
            mail: {
                validators: {
                    notEmpty: {
                        message: 'El e-mail es requerido'
                    },
                    emailAddress: {
                        message: 'Introduzca un e-mail válido'
                    }
                }
            },
            clave: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña es requerida'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'Ingrese entre 4 y 8 caracteres'
                    }
                }
            }
        }
    })
    .on('success.form.bv', function (e) {

        e.preventDefault();
        EnviarLogin();
    });

});