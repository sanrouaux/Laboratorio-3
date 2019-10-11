/// <reference path="./Ente.ts" />

namespace Entidades
{
    export class Alien extends Ente{
        private raza : string;
        private planetaOrigen : string;
        private pathFoto : string | undefined;

        public constructor(cuadrante : string, edad : number, altura : number, raza : string, planetaOrigen : string, pathFoto? : string) {
            super(cuadrante, edad, altura);
            this.raza = raza;
            this.planetaOrigen = planetaOrigen;
            this.pathFoto = pathFoto;
        }

        public ToJSON() : JSON {
            let cadenaJSON : string = '{' + this.ToString() + ', "raza" : "' + this.raza + '", "planetaOrigen" : "' + this.planetaOrigen + '", "pathFoto" : "' + this.pathFoto + '"}';    
            return JSON.parse(cadenaJSON);
        }
    }
}