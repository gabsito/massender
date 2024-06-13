import { Component } from '@angular/core';
import { Employee } from '../../models/employee';
// TODO: Actualizar el diálogo a la nueva versión de Angular Material
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
// TODO: Actualizar los botones y las tarjetas a la nueva versión de Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-dashboard-empresa',
  templateUrl: './dashboard-empresa.component.html',
  styleUrls: ['./dashboard-empresa.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
})
export class DashboardEmpresaComponent {
  
  employees: Employee[] = [new Employee('John Doe'), new Employee('Jane Smith'),new Employee('Jim Brown')];

  constructor(public dialog:MatDialog){}

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '450px',
      // puedes pasar datos al diálogo aquí si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
      // manejar el resultado si es necesario
    });
  }

  
  }


