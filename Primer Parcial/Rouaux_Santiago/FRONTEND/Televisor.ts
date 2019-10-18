/// <reference path="./Producto.ts" />

namespace Entidades
{
    export class Televisor extends Producto{
        private tipo : string;
        private paisOrigen : string;
        private pathFoto : string | undefined;

        public constructor(codigo : number, marca : string, precio : number, tipo : string, paisOrigen : string, pathFoto : string) {
            super(codigo, marca, precio);
            this.tipo = tipo;
            this.paisOrigen = paisOrigen;
            this.pathFoto = pathFoto;
        }

        public ToJSON() : JSON {
            let cadenaJSON : string = '{' + this.ToString() + ', "tipo" : "' + this.tipo + '", "paisOrigen" : "' + this.paisOrigen + '", "pathFoto" : "' + this.pathFoto + '"}';    
            return JSON.parse(cadenaJSON);
        }
    }
}