import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: number | null = null;
  private username: string | null = null;

  constructor() {}

  setUserId(id: number) {
    this.userId = id;
    localStorage.setItem('userId', id.toString());
  }

  getUserId(): number | null {
    if (!this.userId) {
      const storedId = sessionStorage.getItem('user_id');
      this.userId = storedId ? parseInt(storedId, 10) : null;
    }
    return this.userId;
  }

  setUsername(username: string) {
    this.username = username;
    localStorage.setItem('username', username);
  }

  getUsername(): string | null {
    if (!this.username) {
      this.username = localStorage.getItem('username');
    }
    return this.username;
  }


  
}
