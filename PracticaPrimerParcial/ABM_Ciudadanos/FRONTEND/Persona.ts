namespace Entidades {
    export class Persona {
        private _nombre: string;
        private _apellido: string;
        private _edad: number;

        public constructor(nombre: string, apellido: string, edad: number) {
            this._nombre = nombre;
            this._apellido = apellido;
            this._edad = edad;
        }

        public ToString(): string {
            return '"_nombre" : "' + this._nombre + '", "_apellido" : "' + this._apellido + '", "_edad" : "' + this._edad + '"';
        }
    }
}