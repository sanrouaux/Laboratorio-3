//Para importar declaraciones presentes en otros ficheros hay dos expresiones.
//La primera se usa para importar NameSpaces. La segunda para importar módulos sueltos (fuera de NameSpaces)
//En ambos casos, las declaraciones a importar deben llevar la palabra reservada "export".

/// <reference path="persona.ts" />
//import { Persona } from "./persona";

namespace Ejercicio{
  export class Empleado extends Persona{
    protected _legajo : number;
    protected _sueldo : number;

    public constructor(nombre:string, apellido:string, dni:number, sexo:string, legajo:number, sueldo:number)
    {
      super(nombre, apellido, dni, sexo);
      this._legajo=legajo;
      this._sueldo=sueldo;
    }

    public GetLegajo() : number
    {
      return this._legajo;
    }

    public GetSueldo() : number
    {
      return this._sueldo;
    }

    public Hablar(idioma : string) : string
    {
      return "El empleado habla " + idioma;
    }

    public ToString() : string
    {
      return super.ToString() + this.GetSueldo() + " - " + this.GetLegajo();
    }
  }
}
