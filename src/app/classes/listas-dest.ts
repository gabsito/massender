import { Filtros } from "./filtros";

export class ListasDest {
    nombre: string;
    fechaCreacion: Date;
    filtros: Filtros[];  // Un array para almacenar múltiples filtros

    constructor(nombre: string, fechaCreacion: Date, filtros: Filtros[] = []) {
        this.nombre = nombre;
        this.fechaCreacion = fechaCreacion;
        this.filtros = filtros;
    };
}
