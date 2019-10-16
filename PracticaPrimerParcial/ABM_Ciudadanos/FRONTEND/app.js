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
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this._nombre = nombre;
            this._apellido = apellido;
            this._edad = edad;
        }
        Persona.prototype.ToString = function () {
            return '"_nombre" : "' + this._nombre + '", "_apellido" : "' + this._apellido + '", "_edad" : "' + this._edad + '"';
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
/// <reference path="./Persona.ts" />
var Entidades;
(function (Entidades) {
    var Ciudadano = /** @class */ (function (_super) {
        __extends(Ciudadano, _super);
        function Ciudadano(nombre, apellido, edad, dni, pais, foto) {
            if (foto === void 0) { foto = 'ciudadano_default.jpg'; }
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this._dni = dni;
            _this._pais = pais;
            _this._foto = foto;
            return _this;
        }
        Ciudadano.prototype.ToJSON = function () {
            var cadenaJSON = '{' + this.ToString() + ', "_dni" : "' + this._dni + '", "_pais" : "' + this._pais + '", "_foto" : "' + this._foto + '"}';
            return JSON.parse(cadenaJSON);
        };
        return Ciudadano;
    }(Entidades.Persona));
    Entidades.Ciudadano = Ciudadano;
})(Entidades || (Entidades = {}));
/// <reference path="./Ciudadano.ts" />
window.onload = function () {
    document.getElementById('foto').onchange = function (e) {
        Test.Manejadora.previsualizarImagen(e);
    };
    Test.Manejadora.mostrarCiudadanos();
};
var Test;
(function (Test) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.agregarCiudadano = function (accion) {
            var nombre = document.getElementById("txtNombre").value;
            var apellido = document.getElementById("txtApellido").value;
            var edad = document.getElementById("txtEdad").value;
            var dni = document.getElementById("txtDni").value;
            var pais = document.getElementById("cboPais").value;
            var pathFoto = document.getElementById("foto").value;
            pathFoto = pathFoto.split("\\")[2];
            var foto = document.getElementById("foto");
            var ciudadano = new Entidades.Ciudadano(nombre, apellido, parseInt(edad), parseInt(dni), pais, pathFoto);
            var fd = new FormData();
            fd.append('accion', accion);
            fd.append("obJSON", JSON.stringify(ciudadano));
            fd.append("foto", foto.files[0]);
            var request = new XMLHttpRequest();
            request.open('POST', './BACKEND/nexo.php', true);
            request.setRequestHeader("enctype", "multipart/form-data");
            request.send(fd);
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    console.log(request.responseText);
                    Manejadora.mostrarCiudadanos();
                }
            };
            Manejadora.LimpiarForm();
        };
        Manejadora.mostrarCiudadanos = function () {
            var request = new XMLHttpRequest();
            request.open('POST', './BACKEND/nexo.php', true);
            request.setRequestHeader("enctype", "multipart/form-data");
            var fd = new FormData();
            fd.append('accion', 'mostrar');
            fd.append("mostrarNombre", document.getElementById('cbNombre').checked ? 'true' : 'false');
            fd.append("mostrarApellido", document.getElementById('cbApellido').checked ? 'true' : 'false');
            fd.append("mostrarEdad", document.getElementById('cbEdad').checked ? 'true' : 'false');
            fd.append("mostrarDni", document.getElementById('cbDni').checked ? 'true' : 'false');
            fd.append("mostrarPais", document.getElementById('cbPais').checked ? 'true' : 'false');
            fd.append("mostrarFoto", document.getElementById('cbFoto').checked ? 'true' : 'false');
            request.send(fd);
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    document.getElementById('divTabla').innerHTML = request.responseText;
                }
            };
            Manejadora.LimpiarForm();
        };
        Manejadora.eliminarCiudadano = function (ciudadano) {
            var request = new XMLHttpRequest();
            request.open('POST', 'BACKEND/nexo.php');
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('accion=eliminar&obJSON=' + JSON.stringify(ciudadano));
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    console.log(request.responseText);
                    Manejadora.mostrarCiudadanos();
                }
            };
        };
        Manejadora.modificarCiudadano = function (ciudadano) {
            document.getElementById("txtNombre").value = ciudadano._nombre;
            document.getElementById("txtApellido").value = ciudadano._apellido;
            document.getElementById("txtEdad").value = ciudadano._edad;
            document.getElementById("txtDni").value = ciudadano._dni;
            document.getElementById("txtDni").readOnly = true;
            document.getElementById("cboPais").value = ciudadano._pais;
            document.getElementById("foto").value = '';
            document.getElementById("imgFoto").src = '.\\BACKEND\\fotos\\' + ciudadano._foto;
            var boton = document.getElementById("btn-agregar");
            boton.value = "Modificar";
            boton.onclick = function () { Manejadora.agregarCiudadano('modificar'); };
        };
        Manejadora.LimpiarForm = function () {
            document.getElementById("txtNombre").value = '';
            document.getElementById("txtApellido").value = '';
            document.getElementById("txtEdad").value = '';
            document.getElementById("txtDni").value = '';
            document.getElementById("txtDni").readOnly = false;
            document.getElementById("cboPais").value = 'Argentina';
            document.getElementById("foto").value = '';
            document.getElementById("imgFoto").src = '.\\BACKEND\\fotos\\ciudadano_default.jpg';
            var boton = document.getElementById("btn-agregar");
            boton.value = "Agregar";
            boton.onclick = function () { Manejadora.agregarCiudadano('agregar'); };
        };
        Manejadora.filtrarPorPais = function () {
            var pais = document.getElementById("cboPais").value;
            var request = new XMLHttpRequest();
            request.open('POST', './BACKEND/nexo.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('accion=filtrar&pais=' + pais);
            request.onreadystatechange = function () {
                if (request.status == 200 && request.readyState == 4) {
                    document.getElementById('divTabla').innerHTML = request.responseText;
                }
            };
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
        return Manejadora;
    }());
    Test.Manejadora = Manejadora;
})(Test || (Test = {}));
