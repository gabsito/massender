import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, PopupComponent],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent {

  // employees: Employee[] = [new Employee('John Doe'), new Employee('Jane Smith'),new Employee('Jim Brown')];

  
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
