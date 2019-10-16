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
    var Ente = /** @class */ (function () {
        function Ente(cuadrante, edad, altura) {
            this.cuadrante = cuadrante;
            this.edad = edad;
            this.altura = altura;
        }
        Ente.prototype.ToString = function () {
            return '"cuadrante" : "' + this.cuadrante + '", "edad" : "' + this.edad + '", "altura" : "' + this.altura + '"';
        };
        return Ente;
    }());
    Entidades.Ente = Ente;
})(Entidades || (Entidades = {}));
/// <reference path="./Ente.ts" />
var Entidades;
(function (Entidades) {
    var Alien = /** @class */ (function (_super) {
        __extends(Alien, _super);
        function Alien(cuadrante, edad, altura, raza, planetaOrigen, pathFoto) {
            var _this = _super.call(this, cuadrante, edad, altura) || this;
            _this.raza = raza;
            _this.planetaOrigen = planetaOrigen;
            _this.pathFoto = pathFoto;
            return _this;
        }
        Alien.prototype.ToJSON = function () {
            var cadenaJSON = '{' + this.ToString() + ', "raza" : "' + this.raza + '", "planetaOrigen" : "' + this.planetaOrigen + '", "pathFoto" : "' + this.pathFoto + '"}';
            return JSON.parse(cadenaJSON);
        };
        return Alien;
    }(Entidades.Ente));
    Entidades.Alien = Alien;
})(Entidades || (Entidades = {}));
/// <reference path="./Alien.ts" />
/// <reference path="./IParte2.ts" />
window.onload = function () {
    PrimerParcial.Manejadora.MostrarAliens();
};
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarAlien = function (caso) {
            var cuadrante = document.getElementById("cuadrante").value;
            var edad = document.getElementById("edad").value;
            var altura = document.getElementById("altura").value;
            var raza = document.getElementById("raza").value;
            var planetaOrigen = document.getElementById("cboPlaneta").value;
            var pathFoto = document.getElementById("foto").value;
            pathFoto = pathFoto.split("\\")[2];
            var foto = document.getElementById("foto");
            var alien = new Entidades.Alien(cuadrante, parseInt(edad), parseFloat(altura), raza, planetaOrigen, pathFoto);
            var fd = new FormData();
            fd.append('caso', caso);
            fd.append("cadenaJson", JSON.stringify(alien));
            fd.append("foto", foto.files[0]);
            var request = new XMLHttpRequest();
            request.open('POST', 'BACKEND/administrar.php', true);
            request.setRequestHeader("enctype", "multipart/form-data");
            request.send(fd);
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    console.log(request.responseText);
                    Manejadora.MostrarAliens();
                }
            };
            Manejadora.LimpiarCampos();
        };
        Manejadora.MostrarAliens = function () {
            var request = new XMLHttpRequest();
            request.open('POST', './BACKEND/administrar.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('caso=traer');
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    var aliens = JSON.parse(request.responseText);
                    var tabla = '<table border="1" style="text-align:center">' +
                        '<tr>' +
                        '<td>CUADRANTE</td>' +
                        '<td>EDAD</td>' +
                        '<td>ALTURA</td>' +
                        '<td>RAZA</td>' +
                        '<td>PLANETA</td>' +
                        '<td>FOTO</td>' +
                        '<td>ACCIONES</td>' +
                        '</tr>';
                    for (var i = 0; i < aliens.length; i++) {
                        tabla += '<tr>' +
                            '<td>' + aliens[i].cuadrante + '</td>' +
                            '<td>' + aliens[i].edad + '</td>' +
                            '<td>' + aliens[i].altura + '</td>' +
                            '<td>' + aliens[i].raza + '</td>' +
                            '<td>' + aliens[i].planetaOrigen + '</td>' +
                            '<td><img heigth="150px" width="150px" src="./BACKEND/fotos/' + aliens[i].pathFoto + '"/></td>' +
                            '<td><input type="button" class="eliminar" value="Eliminar" />' +
                            '<input type="button" class="modificar" value="Modificar" /></td>' +
                            '</tr>';
                    }
                    tabla += '</table>';
                    document.getElementById('divTabla').innerHTML = tabla;
                    var manejadora_1 = new Manejadora();
                    var botonesEliminar = document.getElementsByClassName('eliminar');
                    var _loop_1 = function (i) {
                        botonesEliminar[i].addEventListener('click', function () {
                            manejadora_1.Eliminar(aliens[i]);
                        });
                    };
                    for (var i = 0; i < botonesEliminar.length; i++) {
                        _loop_1(i);
                    }
                    var botonesModificar = document.getElementsByClassName('modificar');
                    var _loop_2 = function (i) {
                        botonesModificar[i].addEventListener('click', function () {
                            manejadora_1.Modificar(aliens[i]);
                        });
                    };
                    for (var i = 0; i < botonesModificar.length; i++) {
                        _loop_2(i);
                    }
                    Manejadora.GuardarEnLocalStorage();
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
                    localStorage.setItem('aliens_local_storage', request.responseText);
                }
            };
        };
        Manejadora.VerificarExistencia = function () {
            var cuadrante = document.getElementById("cuadrante").value;
            var raza = document.getElementById("raza").value;
            var aliens = localStorage.getItem('aliens_local_storage');
            if (aliens != null) {
                var arrayObj = JSON.parse(aliens);
                var flag = 0;
                for (var i = 0; i < arrayObj.length; i++) {
                    if (arrayObj[i].cuadrante == cuadrante && arrayObj[i].raza == raza) {
                        flag = 1;
                        break;
                    }
                }
                if (flag == 0) {
                    Manejadora.AgregarAlien('agregar');
                    Manejadora.GuardarEnLocalStorage();
                }
                else {
                    console.log("El alien ya existe");
                    alert("El alien ya existe");
                }
            }
        };
        Manejadora.ObtenerAliensPorCuadrante = function () {
            var contadorAliens = 0;
            var cuadrantesConMasAliens = new Array();
            var mayorNumeroDeAliens = 0;
            var cuadrantesConMenosAliens = new Array();
            var menorNumeroDeAliens = 0;
            var aliens = localStorage.getItem('aliens_local_storage');
            if (aliens != null) {
                var arrayObj = JSON.parse(aliens);
                for (var i = 0; i < arrayObj.length; i++) {
                    for (var j = 0; j < arrayObj.length; j++) {
                        if (arrayObj[i].cuadrante == arrayObj[j].cuadrante) {
                            contadorAliens++;
                        }
                    }
                    if (contadorAliens > mayorNumeroDeAliens) {
                        mayorNumeroDeAliens = contadorAliens;
                    }
                    if (i == 0) {
                        menorNumeroDeAliens = contadorAliens;
                    }
                    else if (contadorAliens < menorNumeroDeAliens) {
                        menorNumeroDeAliens = contadorAliens;
                    }
                    contadorAliens = 0;
                }
                for (var i = 0; i < arrayObj.length; i++) {
                    for (var j = 0; j < arrayObj.length; j++) {
                        if (arrayObj[i].cuadrante == arrayObj[j].cuadrante) {
                            contadorAliens++;
                        }
                    }
                    if (contadorAliens == mayorNumeroDeAliens && cuadrantesConMasAliens.indexOf(arrayObj[i].cuadrante) == -1) {
                        cuadrantesConMasAliens.push(arrayObj[i].cuadrante);
                    }
                    if (contadorAliens == menorNumeroDeAliens && cuadrantesConMenosAliens.indexOf(arrayObj[i].cuadrante) == -1) {
                        cuadrantesConMenosAliens.push(arrayObj[i].cuadrante);
                    }
                    contadorAliens = 0;
                }
                console.log("Cuadrantes con más aliens: \n");
                for (var i = 0; i < cuadrantesConMasAliens.length; i++) {
                    console.log(cuadrantesConMasAliens[i] + "\n");
                }
                console.log("Numero de aliens: " + mayorNumeroDeAliens + "\n");
                console.log("Cuadrantes con menos aliens: \n");
                for (var i = 0; i < cuadrantesConMenosAliens.length; i++) {
                    console.log(cuadrantesConMenosAliens[i] + "\n");
                }
                console.log("Numero de aliens: " + menorNumeroDeAliens + "\n");
            }
        };
        Manejadora.prototype.Eliminar = function (alien) {
            if (window.confirm('Desea eliminar al alien ' + alien.raza + ' del cuadrante ' + alien.cuadrante + '?')) {
                var request = new XMLHttpRequest();
                request.open('POST', 'BACKEND/administrar.php');
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send('caso=eliminar&cadenaJson=' + JSON.stringify(alien));
                request.onreadystatechange = function () {
                    if (request.status == 200 && request.readyState == 4) {
                        console.log(request.responseText);
                        Manejadora.MostrarAliens();
                    }
                };
            }
            else {
                alert("Acción cancelada");
            }
        };
        Manejadora.prototype.Modificar = function (alien) {
            document.getElementById("cuadrante").value = alien.cuadrante;
            document.getElementById("cuadrante").readOnly = true;
            document.getElementById("edad").value = alien.edad;
            document.getElementById("altura").value = alien.altura;
            document.getElementById("raza").value = alien.raza;
            document.getElementById("raza").readOnly = true;
            document.getElementById("cboPlaneta").value = alien.planetaOrigen;
            document.getElementById("foto").value = '';
            document.getElementById("imgFoto").src = '.\\BACKEND\\fotos\\' + alien.pathFoto;
            var boton = document.getElementById("btn-agregar");
            boton.value = "Modificar";
            boton.onclick = function () { Manejadora.AgregarAlien('modificar'); };
        };
        Manejadora.LimpiarCampos = function () {
            document.getElementById("cuadrante").value = '';
            document.getElementById("cuadrante").readOnly = false;
            document.getElementById("edad").value = '';
            document.getElementById("altura").value = '';
            document.getElementById("raza").value = '';
            document.getElementById("raza").readOnly = false;
            document.getElementById("cboPlaneta").value = 'Melmac';
            document.getElementById("foto").value = '';
            document.getElementById("imgFoto").src = '.\\BACKEND\\fotos\\alien_defecto.jpg';
            var boton = document.getElementById("btn-agregar");
            boton.value = "Agregar";
            boton.onclick = function () { Manejadora.AgregarAlien('agregar'); };
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
