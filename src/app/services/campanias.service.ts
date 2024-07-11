import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaniasService {
  private apiUrl = 'https://jandryrt15.pythonanywhere.com/massender/listar-campanias';

  constructor(private http: HttpClient) { }

  getCampanias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
