export interface IPeople{
    Identificador: string;
    Nombres: string;
    Apellidos: string;
    NumeroIdentificacion: string;
    Email: string;
    TipoIdentificacion: string;
    CreadoPor?:string;
    FechaCreacion?:Date;
    ModificadoPor?:string;
    FechaModificacion?:Date;
}