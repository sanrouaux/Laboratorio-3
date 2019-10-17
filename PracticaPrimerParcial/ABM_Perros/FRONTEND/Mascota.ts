namespace Entidades
{
    export class Mascota{
        private tamanio : string;
        private edad : number;
        private precio : number;

        public constructor(tamaño : string, edad : number, precio : number) {
            this.tamanio = tamaño;
            this.edad = edad;
            this.precio = precio;
        }

        public ToString() : string {
            return '"tamaño" : "' + this.tamanio + '", "edad" : "' + this.edad + '", "precio" : "' + this.precio +'"';
        }
    }
}