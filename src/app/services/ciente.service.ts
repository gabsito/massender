import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CienteService {

  private clienteId: number | null = null;
  private username: string | null = null;

  constructor() { }

  setClienteId(id: number) {
    this.clienteId = id;
    localStorage.setItem('clienteId', id.toString());
  }

  getClienteId(): number | null {
    if (!this.clienteId) {
      const storedId = localStorage.getItem('clienteId');
      this.clienteId = storedId ? parseInt(storedId, 10) : null;
    }
    return this.clienteId;
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
