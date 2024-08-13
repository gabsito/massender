import { Component} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormControl, FormsModule} from '@angular/forms';


@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    FormsModule
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  employeeName: string = '';
  employeeEmail: string = '';

  constructor(public dialogRef: MatDialogRef<PopupComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  formControl = new FormControl('');

  onSubmit() {
    if (this.employeeName.trim() && this.employeeEmail.trim()) {
      const employeeData = {
        name: this.employeeName, // Este será el nombre ingresado
        email: this.employeeEmail // Este será el correo ingresado
      };
      // Si ambos campos están llenos, se cierra el diálogo y se envían los datos
      this.dialogRef.close(employeeData);
    } else {
      console.log('Formulario incompleto: asegúrate de que ambos campos estén llenos.');
    }
  }


}
