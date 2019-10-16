/// <reference path="./Ciudadano.ts" />

window.onload = () => {
    (<HTMLInputElement>document.getElementById('foto')).onchange = (e) => {
        Test.Manejadora.previsualizarImagen(e);
    }
    Test.Manejadora.mostrarCiudadanos();
}

namespace Test {

    export class Manejadora {
        public static agregarCiudadano(accion: string) {
            let nombre: string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
            let apellido: string = (<HTMLInputElement>document.getElementById("txtApellido")).value;
            let edad: string = (<HTMLInputElement>document.getElementById("txtEdad")).value;
            let dni: string = (<HTMLInputElement>document.getElementById("txtDni")).value;
            let pais: string = (<HTMLSelectElement>document.getElementById("cboPais")).value;
            let pathFoto: string = (<HTMLInputElement>document.getElementById("foto")).value;
            pathFoto = pathFoto.split("\\")[2];
            let foto: any = (<HTMLInputElement>document.getElementById("foto"));

            let ciudadano: Entidades.Ciudadano = new Entidades.Ciudadano(nombre, apellido, parseInt(edad), parseInt(dni), pais, pathFoto);

            let fd: FormData = new FormData();
            fd.append('accion', accion);
            fd.append("obJSON", JSON.stringify(ciudadano));
            fd.append("foto", foto.files[0]);
            
            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/nexo.php', true);
            request.setRequestHeader("enctype", "multipart/form-data");
            request.send(fd);
            request.onreadystatechange = () => {
                if (request.status == 200 && request.readyState == 4) {
                    console.log(request.responseText);
                    Manejadora.mostrarCiudadanos();
                }
            }
            Manejadora.LimpiarForm();
        }


        public static mostrarCiudadanos() {
            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/nexo.php', true);
            request.setRequestHeader("enctype", "multipart/form-data");
            
            let fd: FormData = new FormData();
            fd.append('accion', 'mostrar');
            fd.append("mostrarNombre", (<HTMLInputElement>document.getElementById('cbNombre')).checked ? 'true' : 'false');
            fd.append("mostrarApellido", (<HTMLInputElement>document.getElementById('cbApellido')).checked ? 'true' : 'false');
            fd.append("mostrarEdad", (<HTMLInputElement>document.getElementById('cbEdad')).checked ? 'true' : 'false');
            fd.append("mostrarDni", (<HTMLInputElement>document.getElementById('cbDni')).checked ? 'true' : 'false');
            fd.append("mostrarPais", (<HTMLInputElement>document.getElementById('cbPais')).checked ? 'true' : 'false');
            fd.append("mostrarFoto", (<HTMLInputElement>document.getElementById('cbFoto')).checked ? 'true' : 'false');
            request.send(fd);
            
            request.onreadystatechange = () => {
                if (request.status == 200 && request.readyState == 4) {
                    (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = request.responseText;
                }
            }
            Manejadora.LimpiarForm();
        }


        public static eliminarCiudadano(ciudadano: JSON) {
            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', 'BACKEND/nexo.php');
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('accion=eliminar&obJSON=' + JSON.stringify(ciudadano));
            request.onreadystatechange = () => {
                if (request.status == 200 && request.readyState == 4) {
                    console.log(request.responseText);
                    Manejadora.mostrarCiudadanos();
                }
            }
        }

        public static modificarCiudadano(ciudadano: any) {
            (<HTMLInputElement>document.getElementById("txtNombre")).value = ciudadano._nombre;
            (<HTMLInputElement>document.getElementById("txtApellido")).value = ciudadano._apellido;
            (<HTMLInputElement>document.getElementById("txtEdad")).value = ciudadano._edad;
            (<HTMLInputElement>document.getElementById("txtDni")).value = ciudadano._dni;
            (<HTMLInputElement>document.getElementById("txtDni")).readOnly = true;
            (<HTMLSelectElement>document.getElementById("cboPais")).value = ciudadano._pais;
            (<HTMLInputElement>document.getElementById("foto")).value = '';
            (<HTMLImageElement>document.getElementById("imgFoto")).src = '.\\BACKEND\\fotos\\' + ciudadano._foto;

            let boton = (<HTMLButtonElement>document.getElementById("btn-agregar"));
            boton.value = "Modificar";
            boton.onclick = () => { Manejadora.agregarCiudadano('modificar') };
        }

        public static LimpiarForm() {
            (<HTMLInputElement>document.getElementById("txtNombre")).value = '';
            (<HTMLInputElement>document.getElementById("txtApellido")).value = '';
            (<HTMLInputElement>document.getElementById("txtEdad")).value = '';
            (<HTMLInputElement>document.getElementById("txtDni")).value = '';
            (<HTMLInputElement>document.getElementById("txtDni")).readOnly = false;
            (<HTMLSelectElement>document.getElementById("cboPais")).value = 'Argentina';
            (<HTMLInputElement>document.getElementById("foto")).value = '';
            (<HTMLImageElement>document.getElementById("imgFoto")).src = '.\\BACKEND\\fotos\\ciudadano_default.jpg';

            let boton = (<HTMLButtonElement>document.getElementById("btn-agregar"));
            boton.value = "Agregar";
            boton.onclick = () => { Manejadora.agregarCiudadano('agregar') };
        }


        public static filtrarPorPais() {
            let pais: string = (<HTMLSelectElement>document.getElementById("cboPais")).value;

            var request: XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/nexo.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('accion=filtrar&pais=' + pais);
            request.onreadystatechange = () => {
                if (request.status == 200 && request.readyState == 4) {
                    (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = request.responseText;
                }
            }
        }


        public static previsualizarImagen(event: any) {
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();

                reader.onload = (event: ProgressEvent) => {
                    let url : any = (<FileReader>event.target).result;
                    (<HTMLImageElement>document.getElementById('imgFoto')).src = url;
                }

                reader.readAsDataURL(event.target.files[0]);
            }
        }
    }
}
