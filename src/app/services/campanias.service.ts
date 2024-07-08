import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampaniasService {

  constructor() { }

  getCampanias() {
    // Aquí pondrías tu lógica para obtener las campanias, por ejemplo, desde una API
    return [
      { nombre: 'Promo Aniversario', tipo: 'Email', estado: 'Activa' },
      { nombre: 'Promo Navidad', tipo: 'SMS', estado: 'Pendiente' },
      { nombre: 'Promo Verano', tipo: 'Whatsapp', estado: 'Finalizada' },
      { nombre: 'Promo Primavera', tipo: 'Email', estado: 'Activa' },
      { nombre: 'Promo Aniversario', tipo: 'Email', estado: 'Activa' },
      { nombre: 'Promo Navidad', tipo: 'SMS', estado: 'Pendiente' },
      { nombre: 'Promo Verano', tipo: 'Whatsapp', estado: 'Finalizada' },
      { nombre: 'Promo Primavera', tipo: 'Email', estado: 'Activa' },
      { nombre: 'Promo Aniversario', tipo: 'Email', estado: 'Activa' },
      { nombre: 'Promo Navidad', tipo: 'SMS', estado: 'Pendiente' },
      { nombre: 'Promo Verano', tipo: 'Whatsapp', estado: 'Finalizada' },
      { nombre: 'Promo Primavera', tipo: 'Email', estado: 'Activa' },
      { nombre: 'Promo Aniversario', tipo: 'Email', estado: 'Activa' },
      { nombre: 'Promo Navidad', tipo: 'SMS', estado: 'Pendiente' },
      { nombre: 'Promo Verano', tipo: 'Whatsapp', estado: 'Finalizada' },
      { nombre: 'Promo Primavera', tipo: 'Email', estado: 'Activa' },
      { nombre: 'Promo Aniversario', tipo: 'Email', estado: 'Activa' },
      { nombre: 'Promo Navidad', tipo: 'SMS', estado: 'Pendiente' },
      { nombre: 'Promo Verano', tipo: 'Whatsapp', estado: 'Finalizada' },
      { nombre: 'Promo Primavera', tipo: 'Email', estado: 'Activa' },
      { nombre: 'Promo Aniversario', tipo: 'Email', estado: 'Activa' },
      { nombre: 'Promo Navidad', tipo: 'SMS', estado: 'Pendiente' },
      { nombre: 'Promo Verano', tipo: 'Whatsapp', estado: 'Finalizada' },
      { nombre: 'Promo Primavera', tipo: 'Email', estado: 'Activa' },
      // Otros registros
    ];
  }
}
