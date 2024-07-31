import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaniasService {
  private apiUrl = 'https://jandryrt15.pythonanywhere.com/massender/listar-campanias';
  private listasUrl = 'https://jandryrt15.pythonanywhere.com/massender/listar-destinatarios';
  private destinatariosUrl = 'https://jandryrt15.pythonanywhere.com/massender/verdestinatarioporlista';

  constructor(private http: HttpClient) { }

  getCampanias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getListas(): Observable<any[]> {
    return this.http.get<any[]>(this.listasUrl);
  }

  getDestinatariosPorLista(listaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.destinatariosUrl}/${listaId}`);
  }
}
