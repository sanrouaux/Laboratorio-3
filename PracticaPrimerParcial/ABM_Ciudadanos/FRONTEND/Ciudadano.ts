/// <reference path="./Persona.ts" />

namespace Entidades {
    export class Ciudadano extends Persona {
        private _dni: number;
        private _pais: string;
        private _foto: string;

        public constructor(nombre: string, apellido: string, edad: number, dni: number, pais: string, foto: string = 'ciudadano_default.jpg') {
            super(nombre, apellido, edad);
            this._dni = dni;
            this._pais = pais;
            this._foto = foto;
        }

        public ToJSON(): JSON {
            let cadenaJSON: string = '{' + this.ToString() + ', "_dni" : "' + this._dni + '", "_pais" : "' + this._pais + '", "_foto" : "' + this._foto + '"}';
            return JSON.parse(cadenaJSON);
        }
    }
}
