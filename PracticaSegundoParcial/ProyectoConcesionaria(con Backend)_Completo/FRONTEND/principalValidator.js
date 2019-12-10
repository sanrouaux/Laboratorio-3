$(document).ready(function () {

    $('#modificarForm').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            id: {
                validators: {
                    notEmpty: {
                        message: 'Campo requerido'
                    }
                }
            },
            marca: {
                validators: {
                    notEmpty: {
                        message: 'Campo requerido'
                    },
                    stringLength: {
                        max: 30,
                        message: 'Demasiados caracteres'
                    }
                }
            },
            color: {
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
            precio: {
                validators: {
                    notEmpty: {
                        message: 'Campo requerido'
                    },
                    integer: {
                        message: 'Se espera un valor numerico'
                    },
                    between: {
                        min: 40000,
                        max: 600000,
                        message: 'El valor ingresado esta fuera de rango'
                    }
                }
            },
            modelo: {
                validators: {
                    notEmpty: {
                        message: 'Campo requerido'
                    },
                    stringLength: {
                        max: 30,
                        message: 'Demasiados caracteres'
                    }
                }
            }
        }
    })
    .on('success.form.bv', function (e) {

        e.preventDefault();
        ManejadoraPrincipal.ModificaAuto();
    });

})