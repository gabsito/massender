import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { Token } from '../interfaces/token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private routes = new Subject<object>();
  currentRoutes = this.routes.asObservable();

  URL = 'https://jandryrt15.pythonanywhere.com/massender'
  tokenURL = this.URL + '/token'
  refreshURL = this.URL + '/refresh'
  userURL = this.URL + '/usuarios/'
  accessURL = this.URL + '/accesos/byrol/'

  constructor(private http: HttpClient, private router: Router) { }

  getAuthToken(username: string, password: string): Observable<Object>{
    const body = new HttpParams().set('username', username).set('password', password);
    let response = this.http.post(this.tokenURL, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Access-Control-Allow-Origin', '*')
    });

    console.log(response);

    return response;
  }

  async refreshToken(): Promise<Object>{
    return this.http.post(this.refreshURL, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + localStorage.getItem('refresh_token'))
    });
  }
  
  async getUserAccess(): Promise<void> {
    await this.getUserRol()
    .then(
      async (data) => {
        console.log(data);
        const user = data as User;
        await this.getAccess(user.rol_id)
        .then(
          (data) => {
            this.changeAccessRoutes(data as object[]);
          }
        ).catch(
          (error) => {
            console.error('Error al obtener los accesos del usuario:', error);
          }
        );
      })
    .catch(
      (error) => {
        this.refreshToken()
        .then(
          (data) => {
            console.log('refresh token: ', data);
            const token = data as Token;
            this.saveToken(token.access_token, token.user_id, token.refresh_token);
            this.getUserAccess();
          })
        .catch(
          (error) => {
            console.error('Error al refrescar el token:', error);
            this.logout();
          }
        );
        console.error('Error al obtener el rol del usuario:', error);
        return false;
      }
    );

  }

  async getUserRol(): Promise<Object>{
    let response = this.http.get(this.userURL + localStorage.getItem('user_id'), {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });

    return await lastValueFrom(response);
  }

  async getAccess(rol_id: number): Promise<Object>{
    let response = this.http.get(this.accessURL + rol_id, {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*')
                                .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });

    return await lastValueFrom(response);
  }


  saveToken(token: string, user_id: number, refresh_token: string){
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user_id.toString());
    localStorage.setItem('refresh_token', refresh_token);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
    this.router.navigate(['/']);
  }

  changeAccessRoutes(routes: object[]) {
    this.routes.next(this.processRoutes(routes));
  }

  processRoutes(data: object[]): object {
    let routes: any = [];
    data.forEach((route: any) => {
      routes.push({
        'ruta': route.ruta,
        'descripcion': route.descripcion,
        'children': route.children != undefined ? this.processRoutes(route.children) : false
      });
    });
    return routes;
  }

}

