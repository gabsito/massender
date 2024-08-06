import { Injectable } from '@angular/core';
import { Filtros } from '../classes/filtros';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {

  private filtros: Filtros[] = [];

  constructor() { }

  // Método para guardar un filtro
  guardarFiltro(filtro: Filtros): void {
    this.filtros.push(filtro);
  }

  // Método para obtener todos los filtros
  obtenerFiltros(): Filtros[] {
    return this.filtros;
  }


}
