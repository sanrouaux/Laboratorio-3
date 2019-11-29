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
        Manejadora.EnviarLogin();
    });


    $('#registroForm').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            nombre: {
                validators: {
                    notEmpty: {
                        message: 'Campo requerido'
                    },
                    stringLength: {
                        max: 15,
                        message: 'Demasiados caracteres'
                    }
                }
            },
            apellido: {
                validators: {
                    notEmpty: {
                        message: 'Campo requerido'
                    },
                    stringLength: {
                        max: 10,
                        message: 'Demasiados caracteres'
                    }
                }
            },
            mail: {
                validators: {
                    notEmpty: {
                        message: 'Campo requerido'
                    },
                    emailAddress: {
                        message: 'El e-mail no posee un formato válido'
                    }
                }
            },
            foto: {
                validators: {
                    notEmpty: {
                        message: 'Seleccione una imagen'
                    },
                    file: {
                        extension: 'jpg,png',
                        //type: 'image/jpeg,image/png',
                        message: 'El archivo seleccionado no es válido!'
                    },
                }
            },
            perfil: {
                validators: {
                    notEmpty: {
                        message: 'Debe elegir un perfil'
                    },
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'Campo requerido'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'La contraseña debe tener entre 4 y 8 caracteres'
                    },
                    identical: {
                        field: 'confirm',
                        message: 'La contraseña y su duplicado no coinciden'
                    }
                }
            },
            confirm: {
                validators: {
                    notEmpty: {
                        message: 'Campo requerido'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'La contraseña duplicada debe tener entre 4 y 8 caracteres'
                    },
                    identical: {
                        field: 'password',
                        message: 'La contraseña y su duplicado no coinciden'
                    }
                }
            },
        }
    })
    .on('success.form.bv', function (e) {
        e.preventDefault();
        Manejadora.EnviarRegistro();
        $('#registro').hide();
    });

});