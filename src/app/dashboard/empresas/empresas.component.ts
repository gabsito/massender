import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../popup/popup.component';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../classes/employee';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, PopupComponent, MatIconModule],
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {


  employees: Employee[] = [new Employee('John Doe', 0), new Employee('Jane Smith', 1),new Employee('Jim Brown', 2)];
  idEmployee: number = 3;

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
