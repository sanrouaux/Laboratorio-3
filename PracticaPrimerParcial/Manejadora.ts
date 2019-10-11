/// <reference path="./Alien.ts" />
/// <reference path="./IParte2.ts" />

namespace PrimerParcial
{
    export class Manejadora implements IParte2{
        public static AgregarAlien(caso : string) {
            let cuadrante : string = (<HTMLInputElement>document.getElementById("cuadrante")).value;
            let edad : string = (<HTMLInputElement>document.getElementById("edad")).value;
            let altura : string = (<HTMLInputElement>document.getElementById("altura")).value;
            let raza : string = (<HTMLInputElement>document.getElementById("raza")).value;
            let planetaOrigen : string = (<HTMLInputElement>document.getElementById("planetaOrigen")).value;
            let foto : any = (<HTMLInputElement> document.getElementById("pathFoto"));
        
            var alien : Entidades.Alien = new Entidades.Alien(cuadrante, parseInt(edad), parseFloat(altura), raza, planetaOrigen);
        
            let fd : FormData = new FormData();
            fd.append('caso', caso);
            fd.append("alien", JSON.stringify(alien));
            fd.append("foto", foto.files[0]);

            var request : XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', 'BACKEND/administrar.php');
            request.setRequestHeader("enctype", "multipart/form-data");
            request.send(fd);
            request.onreadystatechange = () => {
                if(request.status == 200 && request.readyState == 4) 
                {
                    console.log(request.responseText);
                    Manejadora.MostrarAliens();
                }
            }
            
        
        }

        public static MostrarAliens() {
            var request : XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/administrar.php');
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send('caso=traer');
            request.onreadystatechange = () => {
                if(request.status == 200 && request.readyState == 4) 
                {
                    var aliens = JSON.parse(request.responseText);
                    var tabla = '<table border="1">' +
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
                                    '<td><img heigth="150px" width="150px" src="'+aliens[i].pathFoto+'"/></td>' +
                                    '<td><input type="button" class="eliminar" value="Eliminar" >' +
                                    '<input type="button" class="modificar" value="Modificar" ></td>' +
                                '</tr>';
                    }
                    tabla += '</table>'; 
                    (<HTMLDivElement>document.getElementById('grillaAliens')).innerHTML = tabla;
                    
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
                }
            }
        }

        public static GuardarEnLocalStorage() {
            var request : XMLHttpRequest = new XMLHttpRequest();
            request.open('POST', './BACKEND/administrar.php');
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
                        console.log("El alien ya existe");
                        alert("El alien ya existe");
                        flag = 1;
                        break;
                    }
                }
                if(flag == 0) 
                {
                    Manejadora.AgregarAlien('agregar');
                    Manejadora.GuardarEnLocalStorage();
                }
            }
        }

        public static ObtenerAliensPorCuadrante() 
        {
            let contadorAliens : number = 0;
            let cuadrantesConMasAliens : string[] = new Array();
            let mayorNumeroDeAliens : number = 0;
            let cuadrantesConMenosAliens : string[] = new Array();
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
                request.send('caso=eliminar&alien='+JSON.stringify(alien));
                request.onreadystatechange = () => {
                    if(request.status == 200 && request.readyState == 4) 
                    {
                        console.log(request.responseText);
                        Manejadora.GuardarEnLocalStorage();
                        Manejadora.MostrarAliens();
                    }
                }                
            }
        }

        public Modificar(alien : any) {
            (<HTMLInputElement>document.getElementById("cuadrante")).value = alien.cuadrante;
            (<HTMLInputElement>document.getElementById("cuadrante")).readOnly = true;
            (<HTMLInputElement>document.getElementById("edad")).value = alien.edad;
            (<HTMLInputElement>document.getElementById("altura")).value = alien.altura;
            (<HTMLInputElement>document.getElementById("raza")).value = alien.raza;
            (<HTMLInputElement>document.getElementById("planetaOrigen")).value = alien.planetaOrigen;

            (<HTMLDivElement>document.getElementById("imgFoto")).innerHTML = '<img heigth="150px" width="150px" src="'+alien.pathFoto+'"/>';
            (<HTMLInputElement>document.getElementById("enviar")).value = "Modificar";

            let boton = (<HTMLButtonElement>document.getElementById("agregar"));

        }

    }
}