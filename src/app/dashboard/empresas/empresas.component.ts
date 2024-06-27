import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../popup/popup.component';
import { Employee } from '../../classes/employee';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, PopupComponent, FormsModule, MatIconModule],
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {

  employees: Employee[] = [];
  idEmployee = 0;
  numero = false;
  alfabetico = false;

  constructor(public dialog: MatDialog) { }

  esNumero(str: string): boolean {
    return /^[0-9]+$/.test(str);
  }

  esAlfa(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '450px', // puedes pasar datos al diálogo aquí si es necesario
    });


    dialogRef.afterClosed().subscribe(result => {

      if (this.esNumero(result.trim()) || result.trim() == '') {
        window.alert("Ingreso No Válido");
      } else {
        let employee: Employee = new Employee(result, this.idEmployee++);
        this.employees.push(employee);
        console.log(employee);
        console.log(this.employees.length);
      }
    });
  }

  onAddEmployee(employeeName: Employee) {
    this.employees.push(employeeName);

  }

  deleteEmployee(employeeID: number) {
    this.employees = this.employees.filter(employee => employee.id !== employeeID);
  }

}
