var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Mascota = /** @class */ (function () {
        function Mascota(tamaño, edad, precio) {
            this.tamanio = tamaño;
            this.edad = edad;
            this.precio = precio;
        }
        Mascota.prototype.ToString = function () {
            return '"tamaño" : "' + this.tamanio + '", "edad" : "' + this.edad + '", "precio" : "' + this.precio + '"';
        };
        return Mascota;
    }());
    Entidades.Mascota = Mascota;
})(Entidades || (Entidades = {}));
/// <reference path="./Mascota.ts" />
var Entidades;
(function (Entidades) {
    var Perro = /** @class */ (function (_super) {
        __extends(Perro, _super);
        function Perro(tamaño, edad, precio, nombre, raza, pathFoto) {
            var _this = _super.call(this, tamaño, edad, precio) || this;
            _this.nombre = nombre;
            _this.raza = raza;
            _this.pathFoto = pathFoto;
            return _this;
        }
        Perro.prototype.ToJSON = function () {
            var cadenaJSON = '{' + this.ToString() + ', "nombre" : "' + this.nombre + '", "raza" : "' + this.raza + '", "pathFoto" : "' + this.pathFoto + '"}';
            return JSON.parse(cadenaJSON);
        };
        return Perro;
    }(Entidades.Mascota));
    Entidades.Perro = Perro;
})(Entidades || (Entidades = {}));
/// <reference path="./Perro.ts" />
/// <reference path="./IParte2.ts" />
/// <reference path="./IParte3.ts" />
window.onload = function () {
    var man = new PrimerParcial.Manejadora();
    document.getElementById('btn-1').onclick = function () { man.ObtenerPerrosPorTamaño(); };
    document.getElementById('btn-2').onclick = function () { man.FiltrarPerrosPorRaza(); };
    document.getElementById('btn-3').onclick = function () { man.CargarRazasJSON(); };
    document.getElementById('foto').onchange = function (e) {
        PrimerParcial.Manejadora.previsualizarImagen(e);
    };
    PrimerParcial.Manejadora.MostrarPerrosBaseDatos();
};
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarPerroJSON = function () {
            var tamaño = document.getElementById("txtTamaño").value;
            var edad = document.getElementById("txtEdad").value;
            var precio = document.getElementById("txtPrecio").value;
            var nombre = document.getElementById("txtNombre").value;
            var raza = document.getElementById("cboRaza").value;
            var pathFoto = document.getElementById("foto").value;
            var foto = document.getElementById("foto");
            var perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);
            var fd = new FormData();
            fd.append("cadenaJson", JSON.stringify(perro));
            fd.append("foto", foto.files[0]);
            var request = new XMLHttpRequest();
            request.open('POST', 'BACKEND/agregar_json.php', true);
            request.setRequestHeader("enctype", "multipart/form-data");
            request.send(fd);
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    if (JSON.parse(request.responseText).Ok == true) {
                        Manejadora.MostrarPerrosJSON();
                    }
                    else {
                        console.log("No se pudo agregar");
                        alert("No se pudo agregar");
                    }
                }
            };
            Manejadora.LimpiarForm();
        };
        Manejadora.MostrarPerrosJSON = function () {
            var request = new XMLHttpRequest();
            request.open('POST', './BACKEND/traer_json.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    var perros = JSON.parse(request.responseText);
                    var tabla = '<table border="1" width="100%" style="text-align:center">' +
                        '<tr>' +
                        '<td>TAMANO</td>' +
                        '<td>EDAD</td>' +
                        '<td>PRECIO</td>' +
                        '<td>NOMBRE</td>' +
                        '<td>RAZA</td>' +
                        '<td>FOTO</td>' +
                        '</tr>';
                    for (var i = 0; i < perros.length; i++) {
                        tabla += '<tr>' +
                            '<td>' + perros[i].tamanio + '</td>' +
                            '<td>' + perros[i].edad + '</td>' +
                            '<td>' + perros[i].precio + '</td>' +
                            '<td>' + perros[i].nombre + '</td>' +
                            '<td>' + perros[i].raza + '</td>' +
                            '<td><img heigth="150px" width="150px" src="./BACKEND/fotos/' + perros[i].pathFoto + '"/></td>' +
                            '</tr>';
                    }
                    tabla += '</table>';
                    document.getElementById('divTabla').innerHTML = tabla;
                }
            };
        };
        Manejadora.AgregarPerroEnBaseDatos = function (accion) {
            if (Manejadora.AdministrarValidaciones()) {
                var tamaño = document.getElementById("txtTamaño").value;
                var edad = document.getElementById("txtEdad").value;
                var precio = document.getElementById("txtPrecio").value;
                var nombre = document.getElementById("txtNombre").value;
                var raza = document.getElementById("cboRaza").value;
                var pathFoto = document.getElementById("foto").value;
                var foto = document.getElementById("foto");
                var perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);
                var fd = new FormData();
                fd.append("cadenaJson", JSON.stringify(perro));
                fd.append("foto", foto.files[0]);
                var request = new XMLHttpRequest();
                if (accion == 'agregar') {
                    request.open('POST', 'BACKEND/agregar_bd.php', true);
                }
                else {
                    request.open('POST', 'BACKEND/modificar_bd.php', true);
                }
                request.setRequestHeader("enctype", "multipart/form-data");
                request.send(fd);
                var man_1 = new Manejadora();
                man_1.AdministrarSpinner(true);
                request.onreadystatechange = function () {
                    if (request.status == 200 && request.readyState == 4) {
                        if (JSON.parse(request.responseText).Ok == true) {
                            Manejadora.MostrarPerrosBaseDatos();
                        }
                        else {
                            if (accion == 'agregar')
                                console.log("No se pudo agregar");
                            if (accion == 'modificar')
                                console.log("No se pudo modificar");
                            if (accion == 'agregar')
                                alert("No se pudo agregar");
                            if (accion == 'modificar')
                                alert("No se pudo modificar");
                        }
                        man_1.AdministrarSpinner(false);
                    }
                };
                Manejadora.LimpiarForm();
            }
        };
        Manejadora.VerificarExistencia = function () {
            var flag = 0;
            var edad = document.getElementById("txtEdad").value;
            var raza = document.getElementById("cboRaza").value;
            var request = new XMLHttpRequest();
            request.open('POST', './BACKEND/traer_bd.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            var man = new Manejadora();
            man.AdministrarSpinner(true);
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    var perros = JSON.parse(request.responseText);
                    for (var i = 0; i < perros.length; i++) {
                        if (perros[i].edad == edad && perros[i].raza == raza) {
                            flag = 1;
                            break;
                        }
                    }
                    if (flag == 0) {
                        Manejadora.AgregarPerroEnBaseDatos('agregar');
                    }
                    else {
                        alert("El perro ya existe en Base de Datos");
                        console.log("El perro ya existe en Base de Datos");
                    }
                    man.AdministrarSpinner(false);
                }
            };
        };
        Manejadora.MostrarPerrosBaseDatos = function () {
            var request = new XMLHttpRequest();
            request.open('POST', './BACKEND/traer_bd.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            var man = new Manejadora();
            man.AdministrarSpinner(true);
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    var perros = JSON.parse(request.responseText);
                    var tabla = '<table border="1" width="100%" style="text-align:center">';
                    tabla += '<tr>';
                    if (document.getElementById('cbTamaño').checked) {
                        tabla += '<td>TAMANO</td>';
                    }
                    ;
                    if (document.getElementById('cbEdad').checked) {
                        tabla += '<td>EDAD</td>';
                    }
                    ;
                    if (document.getElementById('cbPrecio').checked) {
                        tabla += '<td>PRECIO</td>';
                    }
                    ;
                    if (document.getElementById('cbNombre').checked) {
                        tabla += '<td>NOMBRE</td>';
                    }
                    ;
                    if (document.getElementById('cbRaza').checked) {
                        tabla += '<td>RAZA</td>';
                    }
                    ;
                    if (document.getElementById('cbFoto').checked) {
                        tabla += '<td>FOTO</td>';
                    }
                    ;
                    tabla += '<td>ACCIONES</td>';
                    tabla += '</tr>';
                    for (var i = 0; i < perros.length; i++) {
                        tabla += '<tr>';
                        if (document.getElementById('cbTamaño').checked) {
                            tabla += '<td>' + perros[i].tamanio + '</td>';
                        }
                        ;
                        if (document.getElementById('cbEdad').checked) {
                            tabla += '<td>' + perros[i].edad + '</td>';
                        }
                        ;
                        if (document.getElementById('cbPrecio').checked) {
                            tabla += '<td>' + perros[i].precio + '</td>';
                        }
                        ;
                        if (document.getElementById('cbNombre').checked) {
                            tabla += '<td>' + perros[i].nombre + '</td>';
                        }
                        ;
                        if (document.getElementById('cbRaza').checked) {
                            tabla += '<td>' + perros[i].raza + '</td>';
                        }
                        ;
                        if (document.getElementById('cbFoto').checked) {
                            tabla += '<td><img heigth="150px" width="150px" src="./BACKEND/fotos/' + perros[i].pathFoto + '"/></td>';
                        }
                        ;
                        tabla += '<td><input type="button" class="eliminar" value="Eliminar" />';
                        tabla += '<input type="button" class="modificar" value="Modificar" /></td>';
                        tabla += '</tr>';
                    }
                    tabla += '</table>';
                    document.getElementById('divTabla').innerHTML = tabla;
                    var man_2 = new Manejadora();
                    var botonesEliminar = document.getElementsByClassName('eliminar');
                    var _loop_1 = function (i) {
                        botonesEliminar[i].onclick = function () { man_2.EliminarPerro(perros[i]); };
                    };
                    for (var i = 0; i < botonesEliminar.length; i++) {
                        _loop_1(i);
                    }
                    var botonesModificar = document.getElementsByClassName('modificar');
                    var _loop_2 = function (i) {
                        botonesModificar[i].onclick = function () { man_2.ModificarPerro(perros[i]); };
                    };
                    for (var i = 0; i < botonesModificar.length; i++) {
                        _loop_2(i);
                    }
                    man_2.AdministrarSpinner(false);
                }
            };
        };
        Manejadora.prototype.EliminarPerro = function (perro) {
            if (window.confirm('Esta seguro que desea eliminar al perro?')) {
                var request = new XMLHttpRequest();
                request.open('POST', 'BACKEND/eliminar_bd.php');
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send('cadenaJson=' + JSON.stringify(perro));
                var man_3 = new Manejadora();
                man_3.AdministrarSpinner(true);
                request.onreadystatechange = function () {
                    if (request.status == 200 && request.readyState == 4) {
                        console.log(request.responseText);
                        Manejadora.MostrarPerrosBaseDatos();
                    }
                    man_3.AdministrarSpinner(false);
                };
            }
            else {
                alert("Acción cancelada");
            }
        };
        Manejadora.prototype.ModificarPerro = function (perro) {
            document.getElementById("txtTamaño").value = perro.tamanio;
            document.getElementById("txtEdad").value = perro.edad;
            document.getElementById("txtPrecio").value = perro.precio;
            document.getElementById("txtNombre").value = perro.nombre;
            document.getElementById("txtNombre").readOnly = true;
            document.getElementById("cboRaza").value = perro.raza;
            document.getElementById("foto").value = '';
            document.getElementById("imgFoto").src = '.\\BACKEND\\fotos\\' + perro.pathFoto;
            var boton = document.getElementById("btn-agregar");
            boton.value = "Modificar";
            boton.onclick = function () { Manejadora.AgregarPerroEnBaseDatos('modificar'); };
        };
        Manejadora.LimpiarForm = function () {
            document.getElementById("txtTamaño").value = '';
            document.getElementById("txtEdad").value = '';
            document.getElementById("txtPrecio").value = '';
            document.getElementById("txtNombre").value = '';
            document.getElementById("txtNombre").readOnly = false;
            document.getElementById("cboRaza").value = 'Salchicha';
            document.getElementById("foto").value = '';
            document.getElementById("imgFoto").src = './perro_default.png';
            var boton = document.getElementById("btn-agregar");
            boton.value = "Agregar en BD";
            boton.onclick = function () { Manejadora.AgregarPerroEnBaseDatos('agregar'); };
        };
        Manejadora.prototype.ObtenerPerrosPorTamaño = function () {
            var contadorPerros = 0;
            var mayorNumeroDePerros = 0;
            var menorNumeroDePerros = 0;
            var tamañoConMasPerros = new Array();
            var tamañoConMenosPerros = new Array();
            var request = new XMLHttpRequest();
            request.open('POST', './BACKEND/traer_bd.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            var man = new Manejadora();
            man.AdministrarSpinner(true);
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    var perros = JSON.parse(request.responseText);
                    for (var i = 0; i < perros.length; i++) {
                        for (var j = 0; j < perros.length; j++) {
                            if (perros[i].tamanio == perros[j].tamanio) {
                                contadorPerros++;
                            }
                        }
                        if (contadorPerros > mayorNumeroDePerros) {
                            mayorNumeroDePerros = contadorPerros;
                        }
                        if (i == 0) {
                            menorNumeroDePerros = contadorPerros;
                        }
                        else if (contadorPerros < menorNumeroDePerros) {
                            menorNumeroDePerros = contadorPerros;
                        }
                        contadorPerros = 0;
                    }
                    for (var i = 0; i < perros.length; i++) {
                        for (var j = 0; j < perros.length; j++) {
                            if (perros[i].tamanio == perros[j].tamanio) {
                                contadorPerros++;
                            }
                        }
                        if (contadorPerros == mayorNumeroDePerros && tamañoConMasPerros.indexOf(perros[i].tamanio) == -1) {
                            tamañoConMasPerros.push(perros[i].tamanio);
                        }
                        if (contadorPerros == menorNumeroDePerros && tamañoConMenosPerros.indexOf(perros[i].tamanio) == -1) {
                            tamañoConMenosPerros.push(perros[i].tamanio);
                        }
                        contadorPerros = 0;
                    }
                    console.log("Tamaño con más perros: \n");
                    for (var i = 0; i < tamañoConMasPerros.length; i++) {
                        console.log(tamañoConMasPerros[i] + "\n");
                    }
                    console.log("Numero de perros: " + mayorNumeroDePerros + "\n");
                    console.log("Tamaño con menos perros: \n");
                    for (var i = 0; i < tamañoConMenosPerros.length; i++) {
                        console.log(tamañoConMenosPerros[i] + "\n");
                    }
                    console.log("Numero de aliens: " + menorNumeroDePerros + "\n");
                    man.AdministrarSpinner(true);
                }
            };
        };
        Manejadora.prototype.FiltrarPerrosPorRaza = function () {
            var raza = document.getElementById("cboRaza").value;
            var request = new XMLHttpRequest();
            request.open('POST', './BACKEND/traer_bd.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            var man = new Manejadora();
            man.AdministrarSpinner(true);
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    var perros = JSON.parse(request.responseText);
                    var tabla = '<table border="1" width="100%" style="text-align:center">' +
                        '<tr>' +
                        '<td>TAMANO</td>' +
                        '<td>EDAD</td>' +
                        '<td>PRECIO</td>' +
                        '<td>NOMBRE</td>' +
                        '<td>RAZA</td>' +
                        '<td>FOTO</td>' +
                        '<td>ACCIONES</td>' +
                        '</tr>';
                    for (var i = 0; i < perros.length; i++) {
                        if (perros[i].raza == raza) {
                            tabla += '<tr>' +
                                '<td>' + perros[i].tamanio + '</td>' +
                                '<td>' + perros[i].edad + '</td>' +
                                '<td>' + perros[i].precio + '</td>' +
                                '<td>' + perros[i].nombre + '</td>' +
                                '<td>' + perros[i].raza + '</td>' +
                                '<td><img heigth="150px" width="150px" src="./BACKEND/fotos/' + perros[i].pathFoto + '"/></td>' +
                                '<td><input type="button" class="eliminar" value="Eliminar" />' +
                                '<input type="button" class="modificar" value="Modificar" /></td>' +
                                '</tr>';
                        }
                    }
                    tabla += '</table>';
                    document.getElementById('divTabla').innerHTML = tabla;
                    var man_4 = new Manejadora();
                    var botonesEliminar = document.getElementsByClassName('eliminar');
                    var _loop_3 = function (i) {
                        botonesEliminar[i].onclick = function () { man_4.EliminarPerro(perros[i]); };
                    };
                    for (var i = 0; i < botonesEliminar.length; i++) {
                        _loop_3(i);
                    }
                    var botonesModificar = document.getElementsByClassName('modificar');
                    var _loop_4 = function (i) {
                        botonesModificar[i].onclick = function () { man_4.ModificarPerro(perros[i]); };
                    };
                    for (var i = 0; i < botonesModificar.length; i++) {
                        _loop_4(i);
                    }
                    man_4.AdministrarSpinner(false);
                }
            };
        };
        Manejadora.prototype.CargarRazasJSON = function () {
            var request = new XMLHttpRequest();
            request.open('POST', 'BACKEND/cargar_raza.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            var man = new Manejadora();
            man.AdministrarSpinner(true);
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    var razas = JSON.parse(request.responseText);
                    for (var _i = 0, razas_1 = razas; _i < razas_1.length; _i++) {
                        var raza = razas_1[_i];
                        var flag = 0;
                        var comboRazas = document.getElementById('cboRaza');
                        var coleccionOpciones = comboRazas.options;
                        for (var i = 0; i < coleccionOpciones.length; i++) {
                            if (coleccionOpciones[i].value == raza.descripcion) {
                                flag = 1;
                            }
                        }
                        if (flag == 0) {
                            comboRazas.appendChild(new Option(raza.descripcion));
                        }
                    }
                    man.AdministrarSpinner(false);
                }
            };
        };
        Manejadora.prototype.AdministrarSpinner = function (mostrar) {
            var divSpinner = document.getElementById("divSpinner");
            if (mostrar == true) {
                divSpinner.style.display = "inline";
            }
            else {
                divSpinner.style.display = "none";
            }
        };
        Manejadora.previsualizarImagen = function (event) {
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    var url = event.target.result;
                    document.getElementById('imgFoto').src = url;
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        };
        Manejadora.AdministrarValidaciones = function () {
            var camposValidados = { "tamaño": false, "edad": false, "precio": false, "nombre": false, "raza": false, "foto": false };
            var razasValidas = ['Salchicha', 'Ovejero', 'Perro', 'Caniche toy', 'Chihuahua'];
            if (Manejadora.ValidarCamposVacios("txtTamaño")) {
                camposValidados["tamaño"] = true;
            }
            else {
                Manejadora.AgregarAsterisco("txtTamaño");
            }
            if (Manejadora.ValidarCamposVacios("txtEdad") && Manejadora.ValidarEdad(parseInt(document.getElementById("txtEdad").value))) {
                camposValidados["edad"] = true;
            }
            else {
                Manejadora.AgregarAsterisco("txtEdad");
            }
            if (Manejadora.ValidarCamposVacios("txtPrecio")) {
                camposValidados["precio"] = true;
            }
            else {
                Manejadora.AgregarAsterisco("txtPrecio");
            }
            if (Manejadora.ValidarCamposVacios("txtNombre")) {
                camposValidados["nombre"] = true;
            }
            else {
                Manejadora.AgregarAsterisco("txtNombre");
            }
            if (Manejadora.ValidarRaza(document.getElementById('cboRaza').value, razasValidas)) {
                camposValidados["raza"] = true;
            }
            else {
                Manejadora.AgregarAsterisco("cboRaza");
            }
            if (Manejadora.ValidarCamposVacios("foto")) {
                camposValidados["foto"] = true;
            }
            else {
                Manejadora.AgregarAsterisco("foto");
            }
            if (camposValidados["tamaño"] == true && camposValidados["edad"] == true && camposValidados["precio"] == true
                && camposValidados["nombre"] == true && camposValidados["raza"] == true && camposValidados["foto"] == true) {
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
        Manejadora.ValidarRaza = function (valor, valores) {
            if (valores.indexOf(valor) != -1) {
                return true;
            }
            else {
                return false;
            }
        };
        Manejadora.ValidarEdad = function (edad) {
            if (edad >= 0 && edad < 18) {
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
