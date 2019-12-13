$(document).ready(function () {

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
            legajo: {
                validators: {
                    notEmpty: {
                        message: 'Campo requerido'
                    },
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: 'El legajo debe tener entre 3 y 6 números'
                    },
                    integer: {
                        message: 'El legajo es no adminite caracteres numéricos'
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
                        type: 'image/jpeg,image/png',
                        message: 'El archivo seleccionado no es válido!'
                    },
                }
            },
            clave: {
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
                        field: 'claveDuplicada',
                        message: 'La contraseña y su duplicado no coinciden'
                    }
                }
            },
            claveDuplicada: {
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
                        field: 'clave',
                        message: 'La contraseña y su duplicado no coinciden'
                    }
                }
            },
        }
    })
    .on('success.form.bv', function (e) {

        e.preventDefault();
        EnviarRegistro();
    });

});