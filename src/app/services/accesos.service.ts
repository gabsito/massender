import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesosService {
  private apiUrl = 'https://jandryrt15.pythonanywhere.com/massender/accesos';

  constructor(private http: HttpClient) { }

  getAccesos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });
  }

  getAccesosByRol(rol: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/byrol/"+rol, {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });
  }

  insertarAcceso(accesoData: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl, accesoData, {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });
  }
  
  editarAcceso(accesoData: any): Observable<any[]> {
    return this.http.put<any>(this.apiUrl, accesoData, {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });
  }

  eliminarAcceso(accesoId: number): Observable<any[]> {
    return this.http.delete<any>(this.apiUrl+"/"+accesoId, {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });
  }
}
