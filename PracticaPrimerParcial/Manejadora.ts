/// <reference path="./Alien.ts" />
/// <reference path="./IParte2.ts" />

window.onload = () => {
    PrimerParcial.Manejadora.MostrarAliens();
}

namespace PrimerParcial
{
    export class Manejadora implements IParte2{
        public static AgregarAlien(caso : string) 
        {
            let cuadrante : string = (<HTMLInputElement>document.getElementById("cuadrante")).value;
            let edad : string = (<HTMLInputElement>document.getElementById("edad")).value;
            let altura : string = (<HTMLInputElement>document.getElementById("altura")).value;
            let raza : string = (<HTMLInputElement>document.getElementById("raza")).value;
            let planetaOrigen : string =  (<HTMLSelectElement> document.getElementById("cboPlaneta")).value;           
            let pathFoto : string = (<HTMLInputElement>document.getElementById("foto")).value;       
            pathFoto = pathFoto.split("\\")[2];  
            var foto : any = (<HTMLInputElement> document.getElementById("foto"));
            
            var alien : Entidades.Alien = new Entidades.Alien(cuadrante, parseInt(edad), parseFloat(altura), raza, planetaOrigen, pathFoto);
        
            let fd : FormData = new FormData();
            fd.append('caso', caso);
            fd.append("cadenaJson", JSON.stringify(alien));
            fd.append("foto", foto.files[0]);

            var request : XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', 'BACKEND/administrar.php', true);
            request.setRequestHeader("enctype", "multipart/form-data");
            request.send(fd);
            request.onreadystatechange = () => {
                if(request.status == 200 && request.readyState == 4) 
                {
                    console.log(request.responseText);
                    Manejadora.MostrarAliens();
                }
            }
            Manejadora.LimpiarCampos();
        }

        public static MostrarAliens() {
            var request : XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/administrar.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('caso=traer');
            request.onreadystatechange = () => {
                if(request.status == 200 && request.readyState == 4) 
                {
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
                    for(let i = 0; i < aliens.length; i++) {
                        tabla += '<tr>' +
                                    '<td>'+aliens[i].cuadrante+'</td>' +
                                    '<td>'+aliens[i].edad+'</td>' +
                                    '<td>'+aliens[i].altura+'</td>' +
                                    '<td>'+aliens[i].raza+'</td>' +
                                    '<td>'+aliens[i].planetaOrigen+'</td>' +
                                    '<td><img heigth="150px" width="150px" src="./BACKEND/fotos/'+aliens[i].pathFoto+'"/></td>' +
                                    '<td><input type="button" class="eliminar" value="Eliminar" />' +
                                    '<input type="button" class="modificar" value="Modificar" /></td>' +
                                '</tr>';
                    }
                    tabla += '</table>'; 
                    (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = tabla;

                    let manejadora : Manejadora = new Manejadora();

                    let botonesEliminar : HTMLCollection = document.getElementsByClassName('eliminar');
                    for(let i = 0; i < botonesEliminar.length; i++) {
                        botonesEliminar[i].addEventListener('click', () => {
                            manejadora.Eliminar(aliens[i]);
                        });
                    }                    
                    let botonesModificar : HTMLCollection = document.getElementsByClassName('modificar');
                    for(let i = 0; i < botonesModificar.length; i++) {
                        botonesModificar[i].addEventListener('click', () => {
                            manejadora.Modificar(aliens[i]);
                        });
                    }                   
                    Manejadora.GuardarEnLocalStorage();
                }
            }
        }

        public static GuardarEnLocalStorage() {
            var request : XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/administrar.php', true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('caso=traer');
            request.onreadystatechange = () => {
                if(request.status == 200 && request.readyState == 4) 
                {
                    localStorage.setItem('aliens_local_storage', request.responseText);                  
                }
            }
        }

       public static VerificarExistencia() {
            let cuadrante : string = (<HTMLInputElement>document.getElementById("cuadrante")).value;
            let raza : string = (<HTMLInputElement>document.getElementById("raza")).value;    

            let aliens = localStorage.getItem('aliens_local_storage');
            if(aliens != null) {
                let arrayObj = JSON.parse(aliens);
                let flag = 0;
                for(let i = 0; i < arrayObj.length; i++) 
                {
                    if(arrayObj[i].cuadrante == cuadrante && arrayObj[i].raza == raza) 
                    {
                        flag = 1;
                        break;
                    }
                }
                if(flag == 0) 
                {
                    Manejadora.AgregarAlien('agregar');
                    Manejadora.GuardarEnLocalStorage();
                }
                else 
                {
                    console.log("El alien ya existe");
                    alert("El alien ya existe");
                }
            }
        }

        public static ObtenerAliensPorCuadrante() 
        {
            let contadorAliens : number = 0;
            let cuadrantesConMasAliens : string[] = new Array<string>();
            let mayorNumeroDeAliens : number = 0;
            let cuadrantesConMenosAliens : string[] = new Array<string>();
            let menorNumeroDeAliens : number = 0;

            let aliens = localStorage.getItem('aliens_local_storage');
            if(aliens != null) 
            {
                let arrayObj = JSON.parse(aliens);
                
                for(let i = 0; i < arrayObj.length; i++)
                {
                    for(let j = 0; j < arrayObj.length; j++)
                    {
                        if(arrayObj[i].cuadrante == arrayObj[j].cuadrante)
                        {
                            contadorAliens ++;
                        }
                    }
                    if(contadorAliens > mayorNumeroDeAliens) {
                        mayorNumeroDeAliens = contadorAliens;
                    }
                    if(i == 0) {
                        menorNumeroDeAliens = contadorAliens;
                    }
                    else if(contadorAliens < menorNumeroDeAliens) {
                        menorNumeroDeAliens = contadorAliens;
                    }
                    contadorAliens = 0;
                }

                for(let i = 0; i < arrayObj.length; i++)
                {
                    for(let j = 0; j < arrayObj.length; j++)
                    {
                        if(arrayObj[i].cuadrante == arrayObj[j].cuadrante)
                        {
                            contadorAliens ++;
                        }
                    }
                    if(contadorAliens == mayorNumeroDeAliens && cuadrantesConMasAliens.indexOf(arrayObj[i].cuadrante) == -1) {
                        cuadrantesConMasAliens.push(arrayObj[i].cuadrante);
                    }
                    if(contadorAliens == menorNumeroDeAliens && cuadrantesConMenosAliens.indexOf(arrayObj[i].cuadrante) == -1) {
                        cuadrantesConMenosAliens.push(arrayObj[i].cuadrante);
                    }                    
                    contadorAliens = 0;
                }
                
                console.log("Cuadrantes con más aliens: \n");
                for(let i = 0; i < cuadrantesConMasAliens.length; i++) {
                    console.log(cuadrantesConMasAliens[i]+"\n");
                }
                console.log("Numero de aliens: " + mayorNumeroDeAliens + "\n");
            
                console.log("Cuadrantes con menos aliens: \n");
                for(let i = 0; i < cuadrantesConMenosAliens.length; i++) {
                    console.log(cuadrantesConMenosAliens[i]+"\n");
                }
                console.log("Numero de aliens: " + menorNumeroDeAliens + "\n")
            }
        }

        public Eliminar(alien : any) {
            if(window.confirm('Desea eliminar al alien '+alien.raza+' del cuadrante '+alien.cuadrante+'?')){
                var request : XMLHttpRequest = new XMLHttpRequest();
                request.open('POST', 'BACKEND/administrar.php');
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send('caso=eliminar&cadenaJson='+JSON.stringify(alien));
                request.onreadystatechange = () => {
                    if(request.status == 200 && request.readyState == 4) 
                    {
                        console.log(request.responseText);
                        Manejadora.MostrarAliens();
                    }
                }                
            }
            else
            {
                alert("Acción cancelada");
            }
        }

        public Modificar(alien : any) {
            (<HTMLInputElement>document.getElementById("cuadrante")).value = alien.cuadrante;
            (<HTMLInputElement>document.getElementById("cuadrante")).readOnly = true;
            (<HTMLInputElement>document.getElementById("edad")).value = alien.edad;
            (<HTMLInputElement>document.getElementById("altura")).value = alien.altura;
            (<HTMLInputElement>document.getElementById("raza")).value = alien.raza;
            (<HTMLInputElement>document.getElementById("raza")).readOnly = true;
            (<HTMLSelectElement>document.getElementById("cboPlaneta")).value = alien.planetaOrigen;
            (<HTMLInputElement>document.getElementById("foto")).value = '';
            (<HTMLImageElement>document.getElementById("imgFoto")).src = '.\\BACKEND\\fotos\\' + alien.pathFoto;
           
            let boton = (<HTMLButtonElement>document.getElementById("btn-agregar"));
            boton.value = "Modificar";
            boton.onclick = () => {Manejadora.AgregarAlien('modificar')};
        }


        public static LimpiarCampos()
        {
            (<HTMLInputElement>document.getElementById("cuadrante")).value = '';
            (<HTMLInputElement>document.getElementById("cuadrante")).readOnly = false;
            (<HTMLInputElement>document.getElementById("edad")).value = '';
            (<HTMLInputElement>document.getElementById("altura")).value = '';
            (<HTMLInputElement>document.getElementById("raza")).value = '';
            (<HTMLInputElement>document.getElementById("raza")).readOnly = false;
            (<HTMLSelectElement>document.getElementById("cboPlaneta")).value = 'Melmac';
            (<HTMLInputElement>document.getElementById("foto")).value = '';
            (<HTMLImageElement>document.getElementById("imgFoto")).src = '.\\BACKEND\\fotos\\alien_defecto.jpg';

            let boton = (<HTMLButtonElement>document.getElementById("btn-agregar"));
            boton.value = "Agregar";
            boton.onclick = () => {Manejadora.AgregarAlien('agregar')};
        }

    }
}