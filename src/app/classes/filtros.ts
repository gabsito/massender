import { ListasDest } from "./listas-dest";

export class Filtros {
    nombre: string;
    listaDest: ListasDest
    constructor(nombre: string, listaDest: ListasDest) {
        this.nombre = nombre;
        this.listaDest = listaDest;
    }
}
