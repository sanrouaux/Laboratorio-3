/// <reference path="./Televisor.ts" />

namespace PrimerParcial {
    export class Manejadora {

        public static AgregarTelevisor(caso: string) {
            if (Manejadora.AdministrarValidaciones()) {
                let codigo: string = (<HTMLInputElement>document.getElementById("codigo")).value;
                let marca: string = (<HTMLInputElement>document.getElementById("marca")).value;
                let precio: string = (<HTMLInputElement>document.getElementById("precio")).value;
                let tipo: string = (<HTMLInputElement>document.getElementById("tipo")).value;
                let paisOrigen: string = (<HTMLSelectElement>document.getElementById("pais")).value;
                let pathFoto: string = (<HTMLInputElement>document.getElementById("foto")).value;
                pathFoto = pathFoto.split("\\")[2];
                var foto: any = (<HTMLInputElement>document.getElementById("foto"));

                var televisor: Entidades.Televisor = new Entidades.Televisor(parseInt(codigo), marca, parseFloat(precio), tipo, paisOrigen, pathFoto);

                let fd: FormData = new FormData();
                fd.append('caso', caso);
                fd.append("cadenaJson", JSON.stringify(televisor));
                fd.append("foto", foto.files[0]);

                var request: XMLHttpRequest = new XMLHttpRequest();
                request.open('POST', 'BACKEND/administrar.php', true);
                request.setRequestHeader("enctype", "multipart/form-data");
                request.send(fd);
                Manejadora.AdministrarSpinner(true);
                request.onreadystatechange = () => {
                    if (request.status == 200 && request.readyState == 4) {
                        console.log(request.responseText);
                        Manejadora.MostrarTelevisores();
                        Manejadora.AdministrarSpinner(false);
                    }
                }
            }
        }


        public static MostrarTelevisores() {
            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/administrar.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('caso=traer');
            Manejadora.AdministrarSpinner(true);
            request.onreadystatechange = () => {
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
                    for (let i = 0; i < televisores.length; i++) {
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
                    (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = tabla;

                    let botonesEliminar: HTMLCollection = document.getElementsByClassName('eliminar');
                    for (let i = 0; i < botonesEliminar.length; i++) {
                        (<HTMLButtonElement>botonesEliminar[i]).onclick = () => { Manejadora.EliminarTelevisor(televisores[i]) };
                    }

                    let botonesModificar: HTMLCollection = document.getElementsByClassName('modificar');
                    for (let i = 0; i < botonesModificar.length; i++) {
                        (<HTMLButtonElement>botonesModificar[i]).onclick = () => { Manejadora.ModificarTelevisor(televisores[i]) };
                    }
                    Manejadora.GuardarEnLocalStorage();
                    Manejadora.LimpiarForm();
                }
            }
        }

        public static GuardarEnLocalStorage() {
            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/administrar.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('caso=traer');
            request.onreadystatechange = () => {
                if (request.status == 200 && request.readyState == 4) {
                    localStorage.setItem('televisores_local_storage', request.responseText);
                }
            }
        }


        public static VerificarExistencia() {
            let codigo: number = parseInt((<HTMLInputElement>document.getElementById("codigo")).value);

            let televisores = localStorage.getItem('televisores_local_storage');
            if (televisores != null) {
                let arrayObj = JSON.parse(televisores);
                let flag = 0;
                for (let i = 0; i < arrayObj.length; i++) {
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
        }


        public static EliminarTelevisor(televisor: any) {
            if (window.confirm('Desea eliminar el televisor código ' + televisor.codigo + ', de tipo ' + televisor.tipo + '?')) {
                var request: XMLHttpRequest = new XMLHttpRequest();
                request.open('POST', 'BACKEND/administrar.php');
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send('caso=eliminar&cadenaJson=' + JSON.stringify(televisor));
                Manejadora.AdministrarSpinner(true);
                request.onreadystatechange = () => {
                    if (request.status == 200 && request.readyState == 4) {
                        Manejadora.MostrarTelevisores();
                        Manejadora.AdministrarSpinner(false);
                    }
                }
            }
            else {
                alert("Acción cancelada");
            }
        }


        public static ModificarTelevisor(televisor: any) {
            (<HTMLInputElement>document.getElementById("codigo")).value = televisor.codigo;
            (<HTMLInputElement>document.getElementById("codigo")).readOnly = true;
            (<HTMLInputElement>document.getElementById("marca")).value = televisor.marca;
            (<HTMLInputElement>document.getElementById("precio")).value = televisor.precio;
            (<HTMLInputElement>document.getElementById("tipo")).value = televisor.tipo;
            (<HTMLSelectElement>document.getElementById("pais")).value = televisor.paisOrigen;
            (<HTMLInputElement>document.getElementById("foto")).value = '';
            (<HTMLImageElement>document.getElementById("imgFoto")).src = '.\\BACKEND\\fotos\\' + televisor.pathFoto;

            let boton = (<HTMLButtonElement>document.getElementById("btn-agregar"));
            boton.value = "Modificar";
            boton.onclick = () => { Manejadora.AgregarTelevisor('modificar') };
        }


        public static FiltrarTelevisoresPorPais() {
            let paisOrigen: string = (<HTMLSelectElement>document.getElementById("pais")).value;

            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/administrar.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('caso=traer');
            Manejadora.AdministrarSpinner(true);
            request.onreadystatechange = () => {
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
                    for (let i = 0; i < televisores.length; i++) {
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
                    (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = tabla;

                    let botonesEliminar: HTMLCollection = document.getElementsByClassName('eliminar');
                    for (let i = 0; i < botonesEliminar.length; i++) {
                        if (televisores[i].paisOrigen == paisOrigen) {
                            (<HTMLButtonElement>botonesEliminar[i]).onclick = () => { Manejadora.EliminarTelevisor(televisores[i]) };
                        }
                    }

                    let botonesModificar: HTMLCollection = document.getElementsByClassName('modificar');
                    for (let i = 0; i < botonesModificar.length; i++) {
                        if (televisores[i].paisOrigen == paisOrigen) {
                            (<HTMLButtonElement>botonesModificar[i]).onclick = () => { Manejadora.ModificarTelevisor(televisores[i]) };
                        }
                    }
                }
            }
        }

        public static CargarPaises() {
            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', 'BACKEND/administrar.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('caso=paises');
            Manejadora.AdministrarSpinner(true);
            request.onreadystatechange = () => {
                if (request.status == 200 && request.readyState == 4) {
                    Manejadora.AdministrarSpinner(false);
                    let arrayPaises = JSON.parse(request.responseText);
                    for (let pais of arrayPaises) {
                        let flag = 0;
                        let comboPaises = <HTMLSelectElement>document.getElementById('pais');
                        let coleccionOptiones = comboPaises.options;

                        for (let i = 0; i < coleccionOptiones.length; i++) {
                            if (coleccionOptiones[i].value == pais.descripcion) {
                                flag = 1;
                            }
                        }

                        if (flag == 0) {
                            (<HTMLSelectElement>document.getElementById('pais')).appendChild(new Option(pais.descripcion));
                        }
                    }
                }
            }
        }

        public static AdministrarSpinner(mostrar: boolean) {
            let divSpinner = <HTMLDivElement>document.getElementById("divSpinner");
            if (mostrar == true) {
                divSpinner.style.display = "inline";
            }
            else {
                divSpinner.style.display = "none";
            }
        }


        public static LimpiarForm() {
            (<HTMLInputElement>document.getElementById("codigo")).value = '';
            (<HTMLInputElement>document.getElementById("codigo")).readOnly = false;
            (<HTMLInputElement>document.getElementById("marca")).value = '';
            (<HTMLInputElement>document.getElementById("precio")).value = '';
            (<HTMLInputElement>document.getElementById("tipo")).value = '';
            (<HTMLSelectElement>document.getElementById("pais")).value = 'Argentina';
            (<HTMLInputElement>document.getElementById("foto")).value = '';
            (<HTMLImageElement>document.getElementById("imgFoto")).src = '.\\BACKEND\\fotos\\tv_defecto.jpg';

            let boton = (<HTMLButtonElement>document.getElementById("btn-agregar"));
            boton.value = "Agregar";
            boton.onclick = () => { Manejadora.AgregarTelevisor('agregar') };
        }

        public static AdministrarValidaciones() {
            let camposValidados = { "codigo": false, "marca": false, "precio": false, "tipo": false, "foto": false };
            let tiposValidos: string[] = ['Tubo', 'Plasma', 'LED', 'Smart', '4K', '8K'];

            if (Manejadora.ValidarCamposVacios("codigo") && Manejadora.ValidarCodigo(parseInt((<HTMLInputElement>document.getElementById("codigo")).value))) {
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

            if (Manejadora.ValidarCamposVacios("tipo") && Manejadora.ValidarTipo((<HTMLInputElement>document.getElementById("tipo")).value, tiposValidos)) {
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

        }

        private static ValidarCamposVacios(id: string) {
            let valor = (<HTMLInputElement>document.getElementById(id)).value;
            if (valor != '') {
                return true;
            }
            else {
                return false;
            }
        }

        private static ValidarTipo(valor: string, valores: string[]) {
            if (valores.indexOf(valor) != -1) {
                return true;
            }
            else {
                return false;
            }
        }

        private static ValidarCodigo(codigo: number) {
            if (codigo >= 523 && codigo < 1000) {
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