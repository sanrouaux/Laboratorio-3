namespace Entidades
{
    export class Producto{
        private codigo : number;
        private marca : string;
        private precio : number;

        public constructor(codigo : number, marca : string, precio : number) {
            this.codigo = codigo;
            this.marca = marca;
            this.precio = precio;
        }

        public ToString() : string {
            return '"codigo" : "' + this.codigo + '", "marca" : "' + this.marca + '", "precio" : "' + this.precio +'"';
        }
    }
}