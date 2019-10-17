/// <reference path="./Mascota.ts" />

namespace Entidades
{
    export class Perro extends Mascota{
        private nombre : string;
        private raza : string;
        private pathFoto : string;

        public constructor(tamaño : string, edad : number, precio : number, nombre : string, raza : string, pathFoto : string) {
            super(tamaño, edad, precio);
            this.nombre = nombre;
            this.raza = raza;
            this.pathFoto = pathFoto;
        }

        public ToJSON() : JSON {
            let cadenaJSON : string = '{' + this.ToString() + ', "nombre" : "' + this.nombre + '", "raza" : "' + this.raza + '", "pathFoto" : "' + this.pathFoto + '"}';    
            return JSON.parse(cadenaJSON);
        }
    }
}