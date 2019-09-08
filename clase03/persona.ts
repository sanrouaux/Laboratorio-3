namespace Ejercicio{
  export abstract class Persona{

    private _apellido : string;
    private _dni : number;
    private _nombre : string;
    private _sexo : string;

    public constructor(nombre:string, apellido:string, dni:number, sexo:string)
    {
      this._nombre = nombre;
      this._apellido=apellido;
      this._dni=dni;
      this._sexo=sexo;
    }

    public GetApellido() : string
    {
      return this._apellido;
    }

    public GetDni() : number
    {
      return this._dni;
    }

    public GetNombre() : string{
      return this._nombre;
    }

    public GetSexo() : string{
      return this._sexo;
    }

    public abstract Hablar(idioma:string) : string;

    public ToString() : string
    {
      return this.GetNombre() + " - " + this.GetApellido()
      + " - " + this.GetDni() + " - " + this.GetSexo() + " - ";
    }
  }
}
