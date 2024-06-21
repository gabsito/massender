import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Employee } from '../classes/employee';
import { FormControl, FormsModule } from '@angular/forms';

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
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  employeeName: string = '';

  constructor(public dialogRef: MatDialogRef<PopupComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  formControl = new FormControl('');

  onSubmit() {
    const employeeName = this.formControl.value;
    this.dialogRef.close(employeeName);
  }


}
 