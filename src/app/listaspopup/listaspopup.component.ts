import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormControl, FormsModule} from '@angular/forms';
import { ListasDest } from '../classes/listas-dest';

@Component({
  selector: 'app-listaspopup',
  standalone: true,
  imports: [MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    FormsModule
  ],
  templateUrl: './listaspopup.component.html',
  styleUrls: ['./listaspopup.component.css']
})
export class ListaspopupComponent {
  
  listName: string = '';

  constructor(public dialogRef: MatDialogRef<ListaspopupComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const newList: ListasDest = {
      nombre: this.listName,
      fechaCreacion: new Date()
    };
    this.dialogRef.close(newList);
  }

}

