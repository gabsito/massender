import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CienteService } from '../../services/ciente.service';
import { UserService } from '../../services/user.service';
import { RegistrospaComponent } from '../registrospa/registrospa.component';
import { Router } from '@angular/router'; // Import the Router class



@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [MatCardModule, MatButton, MatIcon, CommonModule, RegistrospaComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  mostrandoRegistro: boolean = false;

  clientes: {
    usuario_id: string,
    cliente_id: string,
    empresa: string,
    nombre_completo: string,
    username: string,
    correo: string,
    telefono: string,
    fecha_registro: string,
    membresia: string,
    precio: string,
  }[] = [];

  constructor(public dialog: MatDialog, private http: HttpClient, private clienteService: CienteService, private userService: UserService, private router: Router) { } // Add 'router' as a dependency in the constructor


  toggleRegistrospa(): void {
    this.mostrandoRegistro = !this.mostrandoRegistro;
  }

  onClienteRegistrado(): void {
    this.mostrandoRegistro = false;
    // Aquí puedes agregar la lógica para actualizar la lista de clientes si es necesario
  }



}
