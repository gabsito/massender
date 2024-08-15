import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccesosService } from '../../../../../services/accesos.service';
import { MatOption } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatOption
  ],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  accesosDisponibles: any
  constructor(private accesosService: AccesosService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.accesosService.getAccesos().subscribe((accesos: any[]) => {
      this.accesosDisponibles = accesos; // Guardar los datos originales
    });
  }

  ngOnInit(): void {}
}
