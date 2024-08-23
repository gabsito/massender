import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = 'https://jandryrt15.pythonanywhere.com/massender/roles';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });
  }
  
  insertarRol(rolData: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl, rolData, {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });
  }
  
  editarRol(rolData: any): Observable<any[]> {
    return this.http.put<any>(this.apiUrl, rolData, {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });
  }

  eliminarRol(rolId: number): Observable<any[]> {
    return this.http.delete<any>(this.apiUrl+"/"+rolId, {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });
  }

  asignarAccesos(accesosRol: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl+'/agregarAccesos', accesosRol, {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });
  }

  desAsignarAccesos(accesosRol: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl+'/eliminarAccesos', accesosRol, {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
    });
  }
}
