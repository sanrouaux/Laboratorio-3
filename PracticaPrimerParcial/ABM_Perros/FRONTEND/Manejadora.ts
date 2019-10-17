/// <reference path="./Perro.ts" />
/// <reference path="./IParte2.ts" />
/// <reference path="./IParte3.ts" />

window.onload = () => {
    var man: PrimerParcial.Manejadora = new PrimerParcial.Manejadora();
    (<HTMLButtonElement>document.getElementById('btn-1')).onclick = () => { man.ObtenerPerrosPorTamaño() };
    (<HTMLButtonElement>document.getElementById('btn-2')).onclick = () => { man.FiltrarPerrosPorRaza() };
    (<HTMLButtonElement>document.getElementById('btn-3')).onclick = () => { man.CargarRazasJSON() };

    (<HTMLInputElement>document.getElementById('foto')).onchange = (e) => {
        PrimerParcial.Manejadora.previsualizarImagen(e);
    }

    PrimerParcial.Manejadora.MostrarPerrosBaseDatos();

}

namespace PrimerParcial {
    export class Manejadora implements IParte2, IParte3 {
        public static AgregarPerroJSON() {
            let tamaño: string = (<HTMLInputElement>document.getElementById("txtTamaño")).value;
            let edad: string = (<HTMLInputElement>document.getElementById("txtEdad")).value;
            let precio: string = (<HTMLInputElement>document.getElementById("txtPrecio")).value;
            let nombre: string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
            let raza: string = (<HTMLSelectElement>document.getElementById("cboRaza")).value;
            let pathFoto: any = (<HTMLInputElement>document.getElementById("foto")).value;
            let foto: any = (<HTMLInputElement>document.getElementById("foto"));

            let perro: Entidades.Perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);

            let fd: FormData = new FormData();
            fd.append("cadenaJson", JSON.stringify(perro));
            fd.append("foto", foto.files[0]);

            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', 'BACKEND/agregar_json.php', true);
            request.setRequestHeader("enctype", "multipart/form-data");
            request.send(fd);
            request.onreadystatechange = () => {
                if (request.status == 200 && request.readyState == 4) {
                    if (JSON.parse(request.responseText).Ok == true) {
                        Manejadora.MostrarPerrosJSON();
                    }
                    else {
                        console.log("No se pudo agregar");
                        alert("No se pudo agregar");
                    }
                }
            }
            Manejadora.LimpiarForm();
        }


        public static MostrarPerrosJSON() {
            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/traer_json.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            request.onreadystatechange = () => {
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
                    for (let i = 0; i < perros.length; i++) {
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
                    (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = tabla;
                }
            }
        }


        public static AgregarPerroEnBaseDatos(accion: string) {
            if (Manejadora.AdministrarValidaciones()) {
                let tamaño: string = (<HTMLInputElement>document.getElementById("txtTamaño")).value;
                let edad: string = (<HTMLInputElement>document.getElementById("txtEdad")).value;
                let precio: string = (<HTMLInputElement>document.getElementById("txtPrecio")).value;
                let nombre: string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
                let raza: string = (<HTMLSelectElement>document.getElementById("cboRaza")).value;
                let pathFoto: any = (<HTMLInputElement>document.getElementById("foto")).value;
                let foto: any = (<HTMLInputElement>document.getElementById("foto"));

                let perro: Entidades.Perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);

                let fd: FormData = new FormData();
                fd.append("cadenaJson", JSON.stringify(perro));
                fd.append("foto", foto.files[0]);

                var request: XMLHttpRequest = new XMLHttpRequest();
                if (accion == 'agregar') {
                    request.open('POST', 'BACKEND/agregar_bd.php', true);
                }
                else {
                    request.open('POST', 'BACKEND/modificar_bd.php', true);
                }

                request.setRequestHeader("enctype", "multipart/form-data");
                request.send(fd);
                let man = new Manejadora();
                man.AdministrarSpinner(true);
                request.onreadystatechange = () => {
                    if (request.status == 200 && request.readyState == 4) {
                        if (JSON.parse(request.responseText).Ok == true) {
                            Manejadora.MostrarPerrosBaseDatos();
                        }
                        else {
                            if (accion == 'agregar') console.log("No se pudo agregar");
                            if (accion == 'modificar') console.log("No se pudo modificar");
                            if (accion == 'agregar') alert("No se pudo agregar");
                            if (accion == 'modificar') alert("No se pudo modificar");
                        }
                        man.AdministrarSpinner(false);
                    }
                }
                Manejadora.LimpiarForm();
            }
        }


        public static VerificarExistencia() {
            var flag = 0;

            let edad: string = (<HTMLInputElement>document.getElementById("txtEdad")).value;
            let raza: string = (<HTMLSelectElement>document.getElementById("cboRaza")).value;

            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/traer_bd.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            let man = new Manejadora();
            man.AdministrarSpinner(true);
            request.onreadystatechange = () => {
                if (request.status == 200 && request.readyState == 4) {
                    var perros = JSON.parse(request.responseText);
                    for (let i = 0; i < perros.length; i++) {
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
            }
        }

        public static MostrarPerrosBaseDatos() {
            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/traer_bd.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            let man = new Manejadora();
            man.AdministrarSpinner(true);
            request.onreadystatechange = () => {
                if (request.status == 200 && request.readyState == 4) {
                    var perros = JSON.parse(request.responseText);
                    var tabla = '<table border="1" width="100%" style="text-align:center">';
                    tabla += '<tr>';
                    if ((<HTMLInputElement>document.getElementById('cbTamaño')).checked) { tabla += '<td>TAMANO</td>' };
                    if ((<HTMLInputElement>document.getElementById('cbEdad')).checked) { tabla += '<td>EDAD</td>' };
                    if ((<HTMLInputElement>document.getElementById('cbPrecio')).checked) { tabla += '<td>PRECIO</td>' };
                    if ((<HTMLInputElement>document.getElementById('cbNombre')).checked) { tabla += '<td>NOMBRE</td>' };
                    if ((<HTMLInputElement>document.getElementById('cbRaza')).checked) { tabla += '<td>RAZA</td>' };
                    if ((<HTMLInputElement>document.getElementById('cbFoto')).checked) { tabla += '<td>FOTO</td>' };
                    tabla += '<td>ACCIONES</td>';
                    tabla += '</tr>';
                    for (let i = 0; i < perros.length; i++) {
                        tabla += '<tr>';
                        if ((<HTMLInputElement>document.getElementById('cbTamaño')).checked) { tabla += '<td>' + perros[i].tamanio + '</td>' };
                        if ((<HTMLInputElement>document.getElementById('cbEdad')).checked) { tabla += '<td>' + perros[i].edad + '</td>' };
                        if ((<HTMLInputElement>document.getElementById('cbPrecio')).checked) { tabla += '<td>' + perros[i].precio + '</td>' };
                        if ((<HTMLInputElement>document.getElementById('cbNombre')).checked) { tabla += '<td>' + perros[i].nombre + '</td>' };
                        if ((<HTMLInputElement>document.getElementById('cbRaza')).checked) { tabla += '<td>' + perros[i].raza + '</td>' };
                        if ((<HTMLInputElement>document.getElementById('cbFoto')).checked) { tabla += '<td><img heigth="150px" width="150px" src="./BACKEND/fotos/' + perros[i].pathFoto + '"/></td>' };
                        tabla += '<td><input type="button" class="eliminar" value="Eliminar" />';
                        tabla += '<input type="button" class="modificar" value="Modificar" /></td>';
                        tabla += '</tr>';
                    }
                    tabla += '</table>';
                    (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = tabla;

                    let man: Manejadora = new Manejadora();

                    let botonesEliminar: HTMLCollection = document.getElementsByClassName('eliminar');
                    for (let i = 0; i < botonesEliminar.length; i++) {
                        (<HTMLButtonElement>botonesEliminar[i]).onclick = () => { man.EliminarPerro(perros[i]) };
                    }

                    let botonesModificar: HTMLCollection = document.getElementsByClassName('modificar');
                    for (let i = 0; i < botonesModificar.length; i++) {
                        (<HTMLButtonElement>botonesModificar[i]).onclick = () => { man.ModificarPerro(perros[i]) };
                    }
                    man.AdministrarSpinner(false);
                }
            }
        }

        public EliminarPerro(perro: any) {
            if (window.confirm('Esta seguro que desea eliminar al perro?')) {
                var request: XMLHttpRequest = new XMLHttpRequest();
                request.open('POST', 'BACKEND/eliminar_bd.php');
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send('cadenaJson=' + JSON.stringify(perro));
                let man = new Manejadora();
                man.AdministrarSpinner(true);
                request.onreadystatechange = () => {
                    if (request.status == 200 && request.readyState == 4) {

                        console.log(request.responseText);
                        Manejadora.MostrarPerrosBaseDatos();
                    }
                    man.AdministrarSpinner(false);
                }
            }
            else {
                alert("Acción cancelada");
            }

        }

        public ModificarPerro(perro: any) {
            (<HTMLInputElement>document.getElementById("txtTamaño")).value = perro.tamanio;
            (<HTMLInputElement>document.getElementById("txtEdad")).value = perro.edad;
            (<HTMLInputElement>document.getElementById("txtPrecio")).value = perro.precio;
            (<HTMLInputElement>document.getElementById("txtNombre")).value = perro.nombre;
            (<HTMLInputElement>document.getElementById("txtNombre")).readOnly = true;
            (<HTMLSelectElement>document.getElementById("cboRaza")).value = perro.raza;
            (<HTMLInputElement>document.getElementById("foto")).value = '';
            (<HTMLImageElement>document.getElementById("imgFoto")).src = '.\\BACKEND\\fotos\\' + perro.pathFoto;

            let boton = (<HTMLButtonElement>document.getElementById("btn-agregar"));
            boton.value = "Modificar";
            boton.onclick = () => { Manejadora.AgregarPerroEnBaseDatos('modificar') };
        }

        public static LimpiarForm() {
            (<HTMLInputElement>document.getElementById("txtTamaño")).value = '';
            (<HTMLInputElement>document.getElementById("txtEdad")).value = '';
            (<HTMLInputElement>document.getElementById("txtPrecio")).value = '';
            (<HTMLInputElement>document.getElementById("txtNombre")).value = '';
            (<HTMLInputElement>document.getElementById("txtNombre")).readOnly = false;
            (<HTMLSelectElement>document.getElementById("cboRaza")).value = 'Salchicha';
            (<HTMLInputElement>document.getElementById("foto")).value = '';
            (<HTMLImageElement>document.getElementById("imgFoto")).src = './perro_default.png';

            let boton = (<HTMLButtonElement>document.getElementById("btn-agregar"));
            boton.value = "Agregar en BD";
            boton.onclick = () => { Manejadora.AgregarPerroEnBaseDatos('agregar') };
        }

        public ObtenerPerrosPorTamaño(): any {
            let contadorPerros: number = 0;
            let mayorNumeroDePerros: number = 0;
            let menorNumeroDePerros: number = 0;
            let tamañoConMasPerros: string[] = new Array();
            let tamañoConMenosPerros: string[] = new Array();

            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/traer_bd.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            let man = new Manejadora();
            man.AdministrarSpinner(true);
            request.onreadystatechange = () => {
                if (request.status == 200 && request.readyState == 4) {
                    var perros = JSON.parse(request.responseText);

                    for (let i = 0; i < perros.length; i++) {
                        for (let j = 0; j < perros.length; j++) {
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

                    for (let i = 0; i < perros.length; i++) {
                        for (let j = 0; j < perros.length; j++) {
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
                    for (let i = 0; i < tamañoConMasPerros.length; i++) {
                        console.log(tamañoConMasPerros[i] + "\n");
                    }
                    console.log("Numero de perros: " + mayorNumeroDePerros + "\n");

                    console.log("Tamaño con menos perros: \n");
                    for (let i = 0; i < tamañoConMenosPerros.length; i++) {
                        console.log(tamañoConMenosPerros[i] + "\n");
                    }
                    console.log("Numero de aliens: " + menorNumeroDePerros + "\n");

                    man.AdministrarSpinner(true);
                }
            }
        }

        public FiltrarPerrosPorRaza(): any {
            let raza: string = (<HTMLSelectElement>document.getElementById("cboRaza")).value;

            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/traer_bd.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            let man = new Manejadora();
            man.AdministrarSpinner(true);
            request.onreadystatechange = () => {
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
                    for (let i = 0; i < perros.length; i++) {
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
                    (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = tabla;

                    let man: Manejadora = new Manejadora();

                    let botonesEliminar: HTMLCollection = document.getElementsByClassName('eliminar');
                    for (let i = 0; i < botonesEliminar.length; i++) {
                        (<HTMLButtonElement>botonesEliminar[i]).onclick = () => { man.EliminarPerro(perros[i]) };
                    }

                    let botonesModificar: HTMLCollection = document.getElementsByClassName('modificar');
                    for (let i = 0; i < botonesModificar.length; i++) {
                        (<HTMLButtonElement>botonesModificar[i]).onclick = () => { man.ModificarPerro(perros[i]) };
                    }
                    man.AdministrarSpinner(false);
                }
            }
        }

        public CargarRazasJSON(): any {
            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', 'BACKEND/cargar_raza.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            let man = new Manejadora();
            man.AdministrarSpinner(true);
            request.onreadystatechange = () => {
                if (request.status == 200 && request.readyState == 4) {
                    let razas = JSON.parse(request.responseText);
                    for (let raza of razas) {
                        let flag = 0;
                        let comboRazas = <HTMLSelectElement>document.getElementById('cboRaza');
                        let coleccionOpciones = comboRazas.options;

                        for (let i = 0; i < coleccionOpciones.length; i++) {
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
            }
        }

        public AdministrarSpinner(mostrar: boolean): any {
            let divSpinner = <HTMLDivElement>document.getElementById("divSpinner");
            if (mostrar == true) {
                divSpinner.style.display = "inline";
            }
            else {
                divSpinner.style.display = "none";
            }
        }


        public static previsualizarImagen(event: any) {
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();

                reader.onload = (event: ProgressEvent) => {
                    let url: any = (<FileReader>event.target).result;
                    (<HTMLImageElement>document.getElementById('imgFoto')).src = url;
                }

                reader.readAsDataURL(event.target.files[0]);
            }
        }


        public static AdministrarValidaciones() {
            let camposValidados = { "tamaño": false, "edad": false, "precio": false, "nombre": false, "raza": false, "foto": false };
            let razasValidas: string[] = ['Salchicha', 'Ovejero', 'Perro', 'Caniche toy', 'Chihuahua'];

            if (Manejadora.ValidarCamposVacios("txtTamaño")) {
                camposValidados["tamaño"] = true;
            }
            else {
                Manejadora.AgregarAsterisco("txtTamaño");
            }

            if (Manejadora.ValidarCamposVacios("txtEdad") && Manejadora.ValidarEdad(parseInt((<HTMLInputElement>document.getElementById("txtEdad")).value))) {
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

            if (Manejadora.ValidarRaza((<HTMLInputElement>document.getElementById('cboRaza')).value, razasValidas)) {
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
        }

        private static ValidarCamposVacios(id: string): boolean {
            let valor = (<HTMLInputElement>document.getElementById(id)).value;
            if (valor != '') {
                return true;
            }
            else {
                return false;
            }
        }

        private static ValidarRaza(valor: string, valores: string[]): boolean {
            if (valores.indexOf(valor) != -1) {
                return true;
            }
            else {
                return false;
            }
        }

        private static ValidarEdad(edad: number): boolean {
            if (edad >= 0 && edad < 18) {
                return true;
            }
            else {
                return false;
            }
        }

        private static AgregarAsterisco(id: string) {
            (<HTMLInputElement>document.getElementById(id)).insertAdjacentHTML('afterend', '<span class="span" style="color:red">  (*)  </span>');
        }
    }
}
