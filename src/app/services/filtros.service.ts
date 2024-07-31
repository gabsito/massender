import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  private apiUrl = 'https://jandryrt15.pythonanywhere.com/massender/listar-filtros';

  constructor(private http: HttpClient) { }

  getFiltros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
