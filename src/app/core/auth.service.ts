import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenURL = '/api/massender/token'

  constructor(private http: HttpClient, private router:Router) { }

  getAuthToken(username: string, password: string): Observable<Object>{
    const body = new HttpParams().set('username', username).set('password', password);
    let response = this.http.post(this.tokenURL, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Access-Control-Allow-Origin', '*')
    });

    console.log(response);

    return response;
  }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
