import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../popup/popup.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { CienteService } from '../../services/ciente.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, PopupComponent, MatIconModule, CommonModule],
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {

  username: string = '';
  id: number = 0;
  empleados: { usuario_id: string, nombre_completo: string, username: string, correo: string }[] = [];
  rol: string = '';

  constructor(public dialog: MatDialog, private http: HttpClient, private clienteService: CienteService, private userService: UserService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  //verificaciones
  esNumero(str: string): boolean {
    return /^\d+$/.test(str);
  }

  esAlfa(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
  }
  // fin verficaciones

  // cuadro de dialogo
  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '450px', // puedes pasar datos al diálogo aquí si es necesario
    });
    dialogRef.afterClosed().subscribe(result => {

      const trimmedResult = result;

      if (this.esNumero(trimmedResult.name) || trimmedResult == '') {
        window.alert("Ingreso No Válido");
      } else {
        const firstName = trimmedResult.name.split(' ')[0].toLowerCase();
        const email = trimmedResult.email;
        
        const username = `${firstName}${this.id++}`;

        this.http.get<any>('https://jandryrt15.pythonanywhere.com/massender/roles/bydesc/usuario')
    .subscribe(rolResponse => {
      console.log('Respuesta del Rol:', rolResponse); // Verificar que cliente_id está en la respuesta
      this.rol = rolResponse.rol_id;  // Obtener el cliente_id de la respuesta
      if (!this.rol) {
        console.error('Error: rol_id es nulo o indefinido');
      }
    });

        // Datos para la solicitud POST
        const userData = {
          username: username,
          nombre_completo: trimmedResult.name,
          correo: email,
          rol_id: this.rol, // Rol de empleado
          telefono: '0123456789',
          password: username,
          usuario_insercion: 0,
          fecha_insercion: new Date().toISOString(),
          cliente_id: this.clienteService.getClienteId()
        };

        this.http.post('https://jandryrt15.pythonanywhere.com/massender/usuarios', userData)
          .subscribe({
            next: (response) => {
              console.log('Empleado registrado exitosamente', response);
            },
            error: (error) => {
              console.error('Error al registrar el empleado', error);
            },
            complete: () => {
              console.log('Operación completa');
            }
          });

        console.log(userData);

        window.alert("Empleado Registrado");
      }
    });
  }
  // fin cuadro de dialogo

  // operaciones api
  getEmpleados(): void {
    this.http.get<{ usuario_id: string, nombre_completo: string, username: string, correo: string }[]>(`https://jandryrt15.pythonanywhere.com/massender/usuarios`)
      .subscribe({
        next: (data) => {
          this.empleados = data;
          console.log('Lista de empleados', this.empleados);
        },
        error: (error) => {
          console.error('Error al obtener la lista de empleados', error);
        },
        complete: () => {
          console.log('Operación completa');
        }
      });

  }

  deleteEmployee(empleadoId: string): void {
    // Construimos la URL de eliminación utilizando el usuario_id
    const url = `https://jandryrt15.pythonanywhere.com/massender/usuarios/${empleadoId}`;

    // Realizamos la solicitud DELETE al servidor
    this.http.delete(url)
      .subscribe({
        next: (response) => {
          console.log('Empleado eliminado exitosamente', response);
          // Actualizamos la lista de empleados después de eliminar uno
          this.empleados = this.empleados.filter(e => e.usuario_id !== empleadoId)
        },
        error: (error) => {
          console.error('Error al eliminar el empleado', error);
        },
        complete: () => {
          console.log('Operación de eliminación completa');
        }
      });


  }
  // fin operaciones api
  trackByFn(index: number, item: any): string {
    return item.usuario_id; 
  }

}
