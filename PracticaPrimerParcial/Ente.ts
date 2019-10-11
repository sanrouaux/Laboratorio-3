namespace Entidades
{
    export class Ente{
        private cuadrante : string;
        private edad : number;
        private altura : number;

        public constructor(cuadrante : string, edad : number, altura : number) {
            this.cuadrante = cuadrante;
            this.edad = edad;
            this.altura = altura;
        }

        public ToString() : string {
            return '"cuadrante" : "' + this.cuadrante + '", "edad" : "' + this.edad + '", "altura" : "' + this.altura +'"';
        }
    }
}