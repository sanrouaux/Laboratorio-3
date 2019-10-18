var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Producto = /** @class */ (function () {
        function Producto(codigo, marca, precio) {
            this.codigo = codigo;
            this.marca = marca;
            this.precio = precio;
        }
        Producto.prototype.ToString = function () {
            return '"codigo" : "' + this.codigo + '", "marca" : "' + this.marca + '", "precio" : "' + this.precio + '"';
        };
        return Producto;
    }());
    Entidades.Producto = Producto;
})(Entidades || (Entidades = {}));
/// <reference path="./Producto.ts" />
var Entidades;
(function (Entidades) {
    var Televisor = /** @class */ (function (_super) {
        __extends(Televisor, _super);
        function Televisor(codigo, marca, precio, tipo, paisOrigen, pathFoto) {
            var _this = _super.call(this, codigo, marca, precio) || this;
            _this.tipo = tipo;
            _this.paisOrigen = paisOrigen;
            _this.pathFoto = pathFoto;
            return _this;
        }
        Televisor.prototype.ToJSON = function () {
            var cadenaJSON = '{' + this.ToString() + ', "tipo" : "' + this.tipo + '", "paisOrigen" : "' + this.paisOrigen + '", "pathFoto" : "' + this.pathFoto + '"}';
            return JSON.parse(cadenaJSON);
        };
        return Televisor;
    }(Entidades.Producto));
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
/// <reference path="./Televisor.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarTelevisor = function (caso) {
            if (Manejadora.AdministrarValidaciones()) {
                var codigo = document.getElementById("codigo").value;
                var marca = document.getElementById("marca").value;
                var precio = document.getElementById("precio").value;
                var tipo = document.getElementById("tipo").value;
                var paisOrigen = document.getElementById("pais").value;
                var pathFoto = document.getElementById("foto").value;
                pathFoto = pathFoto.split("\\")[2];
                var foto = document.getElementById("foto");
                var televisor = new Entidades.Televisor(parseInt(codigo), marca, parseFloat(precio), tipo, paisOrigen, pathFoto);
                var fd = new FormData();
                fd.append('caso', caso);
                fd.append("cadenaJson", JSON.stringify(televisor));
                fd.append("foto", foto.files[0]);
                var request = new XMLHttpRequest();
                request.open('POST', 'BACKEND/administrar.php', true);
                request.setRequestHeader("enctype", "multipart/form-data");
                request.send(fd);
                Manejadora.AdministrarSpinner(true);
                request.onreadystatechange = function () {
                    if (request.status == 200 && request.readyState == 4) {
                        console.log(request.responseText);
                        Manejadora.MostrarTelevisores();
                        Manejadora.AdministrarSpinner(false);
                    }
                };
            }
        };
        Manejadora.MostrarTelevisores = function () {
            var request = new XMLHttpRequest();
            request.open('POST', './BACKEND/administrar.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('caso=traer');
            Manejadora.AdministrarSpinner(true);
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    Manejadora.AdministrarSpinner(false);
                    var televisores = JSON.parse(request.responseText);
                    var tabla = '<table border="1" width="100%" style="text-align:center">' +
                        '<tr>' +
                        '<td>CODIGO</td>' +
                        '<td>MARCA</td>' +
                        '<td>PRECIO</td>' +
                        '<td>TIPO</td>' +
                        '<td>PAIS</td>' +
                        '<td>FOTO</td>' +
                        '<td>ACCIONES</td>' +
                        '</tr>';
                    for (var i = 0; i < televisores.length; i++) {
                        tabla += '<tr>' +
                            '<td>' + televisores[i].codigo + '</td>' +
                            '<td>' + televisores[i].marca + '</td>' +
                            '<td>' + televisores[i].precio + '</td>' +
                            '<td>' + televisores[i].tipo + '</td>' +
                            '<td>' + televisores[i].paisOrigen + '</td>' +
                            '<td><img heigth="150px" width="150px" src="./BACKEND/fotos/' + televisores[i].pathFoto + '"/></td>' +
                            '<td><input type="button" class="eliminar" value="Eliminar" />' +
                            '<input type="button" class="modificar" value="Modificar" /></td>' +
                            '</tr>';
                    }
                    tabla += '</table>';
                    document.getElementById('divTabla').innerHTML = tabla;
                    var botonesEliminar = document.getElementsByClassName('eliminar');
                    var _loop_1 = function (i) {
                        botonesEliminar[i].onclick = function () { Manejadora.EliminarTelevisor(televisores[i]); };
                    };
                    for (var i = 0; i < botonesEliminar.length; i++) {
                        _loop_1(i);
                    }
                    var botonesModificar = document.getElementsByClassName('modificar');
                    var _loop_2 = function (i) {
                        botonesModificar[i].onclick = function () { Manejadora.ModificarTelevisor(televisores[i]); };
                    };
                    for (var i = 0; i < botonesModificar.length; i++) {
                        _loop_2(i);
                    }
                    Manejadora.GuardarEnLocalStorage();
                    Manejadora.LimpiarForm();
                }
            };
        };
        Manejadora.GuardarEnLocalStorage = function () {
            var request = new XMLHttpRequest();
            request.open('POST', './BACKEND/administrar.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('caso=traer');
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    localStorage.setItem('televisores_local_storage', request.responseText);
                }
            };
        };
        Manejadora.VerificarExistencia = function () {
            var codigo = parseInt(document.getElementById("codigo").value);
            var televisores = localStorage.getItem('televisores_local_storage');
            if (televisores != null) {
                var arrayObj = JSON.parse(televisores);
                var flag = 0;
                for (var i = 0; i < arrayObj.length; i++) {
                    if (arrayObj[i].codigo == codigo) {
                        flag = 1;
                        break;
                    }
                }
                if (flag == 0) {
                    Manejadora.AgregarTelevisor('agregar');
                }
                else {
                    console.log("El televisor ya existe");
                    alert("El televisor ya existe");
                }
            }
        };
        Manejadora.EliminarTelevisor = function (televisor) {
            if (window.confirm('Desea eliminar el televisor código ' + televisor.codigo + ', de tipo ' + televisor.tipo + '?')) {
                var request = new XMLHttpRequest();
                request.open('POST', 'BACKEND/administrar.php');
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send('caso=eliminar&cadenaJson=' + JSON.stringify(televisor));
                Manejadora.AdministrarSpinner(true);
                request.onreadystatechange = function () {
                    if (request.status == 200 && request.readyState == 4) {
                        Manejadora.MostrarTelevisores();
                        Manejadora.AdministrarSpinner(false);
                    }
                };
            }
            else {
                alert("Acción cancelada");
            }
        };
        Manejadora.ModificarTelevisor = function (televisor) {
            document.getElementById("codigo").value = televisor.codigo;
            document.getElementById("codigo").readOnly = true;
            document.getElementById("marca").value = televisor.marca;
            document.getElementById("precio").value = televisor.precio;
            document.getElementById("tipo").value = televisor.tipo;
            document.getElementById("pais").value = televisor.paisOrigen;
            document.getElementById("foto").value = '';
            document.getElementById("imgFoto").src = '.\\BACKEND\\fotos\\' + televisor.pathFoto;
            var boton = document.getElementById("btn-agregar");
            boton.value = "Modificar";
            boton.onclick = function () { Manejadora.AgregarTelevisor('modificar'); };
        };
        Manejadora.FiltrarTelevisoresPorPais = function () {
            var paisOrigen = document.getElementById("pais").value;
            var request = new XMLHttpRequest();
            request.open('POST', './BACKEND/administrar.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('caso=traer');
            Manejadora.AdministrarSpinner(true);
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    Manejadora.AdministrarSpinner(false);
                    var televisores = JSON.parse(request.responseText);
                    var tabla = '<table border="1" width="100%" style="text-align:center">' +
                        '<tr>' +
                        '<td>CODIGO</td>' +
                        '<td>MARCA</td>' +
                        '<td>PRECIO</td>' +
                        '<td>TIPO</td>' +
                        '<td>PAIS</td>' +
                        '<td>FOTO</td>' +
                        '<td>ACCIONES</td>' +
                        '</tr>';
                    for (var i = 0; i < televisores.length; i++) {
                        if (televisores[i].paisOrigen == paisOrigen) {
                            tabla += '<tr>' +
                                '<td>' + televisores[i].codigo + '</td>' +
                                '<td>' + televisores[i].marca + '</td>' +
                                '<td>' + televisores[i].precio + '</td>' +
                                '<td>' + televisores[i].tipo + '</td>' +
                                '<td>' + televisores[i].paisOrigen + '</td>' +
                                '<td><img heigth="150px" width="150px" src="./BACKEND/fotos/' + televisores[i].pathFoto + '"/></td>' +
                                '<td><input type="button" class="eliminar" value="Eliminar" />' +
                                '<input type="button" class="modificar" value="Modificar" /></td>' +
                                '</tr>';
                        }
                    }
                    tabla += '</table>';
                    document.getElementById('divTabla').innerHTML = tabla;
                    var botonesEliminar = document.getElementsByClassName('eliminar');
                    var _loop_3 = function (i) {
                        if (televisores[i].paisOrigen == paisOrigen) {
                            botonesEliminar[i].onclick = function () { Manejadora.EliminarTelevisor(televisores[i]); };
                        }
                    };
                    for (var i = 0; i < botonesEliminar.length; i++) {
                        _loop_3(i);
                    }
                    var botonesModificar = document.getElementsByClassName('modificar');
                    var _loop_4 = function (i) {
                        if (televisores[i].paisOrigen == paisOrigen) {
                            botonesModificar[i].onclick = function () { Manejadora.ModificarTelevisor(televisores[i]); };
                        }
                    };
                    for (var i = 0; i < botonesModificar.length; i++) {
                        _loop_4(i);
                    }
                }
            };
        };
        Manejadora.CargarPaises = function () {
            var request = new XMLHttpRequest();
            request.open('POST', 'BACKEND/administrar.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('caso=paises');
            Manejadora.AdministrarSpinner(true);
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    Manejadora.AdministrarSpinner(false);
                    var arrayPaises = JSON.parse(request.responseText);
                    for (var _i = 0, arrayPaises_1 = arrayPaises; _i < arrayPaises_1.length; _i++) {
                        var pais = arrayPaises_1[_i];
                        var flag = 0;
                        var comboPaises = document.getElementById('pais');
                        var coleccionOptiones = comboPaises.options;
                        for (var i = 0; i < coleccionOptiones.length; i++) {
                            if (coleccionOptiones[i].value == pais.descripcion) {
                                flag = 1;
                            }
                        }
                        if (flag == 0) {
                            document.getElementById('pais').appendChild(new Option(pais.descripcion));
                        }
                    }
                }
            };
        };
        Manejadora.AdministrarSpinner = function (mostrar) {
            var divSpinner = document.getElementById("divSpinner");
            if (mostrar == true) {
                divSpinner.style.display = "inline";
            }
            else {
                divSpinner.style.display = "none";
            }
        };
        Manejadora.LimpiarForm = function () {
            document.getElementById("codigo").value = '';
            document.getElementById("codigo").readOnly = false;
            document.getElementById("marca").value = '';
            document.getElementById("precio").value = '';
            document.getElementById("tipo").value = '';
            document.getElementById("pais").value = 'Argentina';
            document.getElementById("foto").value = '';
            document.getElementById("imgFoto").src = '.\\BACKEND\\fotos\\tv_defecto.jpg';
            var boton = document.getElementById("btn-agregar");
            boton.value = "Agregar";
            boton.onclick = function () { Manejadora.AgregarTelevisor('agregar'); };
        };
        Manejadora.AdministrarValidaciones = function () {
            var camposValidados = { "codigo": false, "marca": false, "precio": false, "tipo": false, "foto": false };
            var tiposValidos = ['Tubo', 'Plasma', 'LED', 'Smart', '4K', '8K'];
            if (Manejadora.ValidarCamposVacios("codigo") && Manejadora.ValidarCodigo(parseInt(document.getElementById("codigo").value))) {
                camposValidados["codigo"] = true;
            }
            else {
                Manejadora.AgregarAsterisco("codigo");
            }
            if (Manejadora.ValidarCamposVacios("marca")) {
                camposValidados["marca"] = true;
            }
            else {
                Manejadora.AgregarAsterisco("marca");
            }
            if (Manejadora.ValidarCamposVacios("precio")) {
                camposValidados["precio"] = true;
            }
            else {
                Manejadora.AgregarAsterisco("precio");
            }
            if (Manejadora.ValidarCamposVacios("tipo") && Manejadora.ValidarTipo(document.getElementById("tipo").value, tiposValidos)) {
                camposValidados["tipo"] = true;
            }
            else {
                Manejadora.AgregarAsterisco("tipo");
            }
            if (Manejadora.ValidarCamposVacios("foto")) {
                camposValidados["foto"] = true;
            }
            else {
                Manejadora.AgregarAsterisco("foto");
            }
            if (camposValidados["codigo"] == true && camposValidados["marca"] == true && camposValidados["precio"] == true
                && camposValidados["tipo"] == true && camposValidados["foto"] == true) {
                return true;
            }
            else {
                return false;
            }
        };
        Manejadora.ValidarCamposVacios = function (id) {
            var valor = document.getElementById(id).value;
            if (valor != '') {
                return true;
            }
            else {
                return false;
            }
        };
        Manejadora.ValidarTipo = function (valor, valores) {
            if (valores.indexOf(valor) != -1) {
                return true;
            }
            else {
                return false;
            }
        };
        Manejadora.ValidarCodigo = function (codigo) {
            if (codigo >= 523 && codigo < 1000) {
                return true;
            }
            else {
                return false;
            }
        };
        Manejadora.AgregarAsterisco = function (id) {
            document.getElementById(id).insertAdjacentHTML('afterend', '<span class="span" style="color:red">  (*)  </span>');
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
