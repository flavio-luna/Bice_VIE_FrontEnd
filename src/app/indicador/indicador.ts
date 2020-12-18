import { ISerie } from "./serie";
export interface IIndicador{
    codigo: string;
    nombre: string;
    unidad_Medida: string;
    valor: number;
    fecha: Date;
    esFavorito: boolean;
    mostrarFecha: boolean;
    mostrarAnno:boolean;
    valores : ISerie[];
}