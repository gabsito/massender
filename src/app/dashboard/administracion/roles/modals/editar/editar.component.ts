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
    data.agregar = []
    data.eliminar = []
    this.accesosService.getAccesos().subscribe((accesos: any[]) => {
      this.accesosDisponibles = accesos; // Guardar los datos originales
    });
  }

  ngOnInit(): void {}

  compararAccesos(a1: any, a2: any): boolean {
    return a1 && a2 ? a1.acceso_id === a2.acceso_id : a1 === a2;
  }

  onAccesoChange(acceso: any, event: any): void {
    console.log(event)
    if(event.isUserInput){
      console.log(this.data.rol.accesos)
      if (event.source.selected) {
        this.agregarAcceso(acceso);
      } else {
        this.eliminarAcceso(acceso);
      }
    }
  }

  agregarAcceso(acceso: any): void {
    if (!this.data.rol.accesos.some((acc: any) => acc.acceso_id === acceso.acceso_id)) {
      this.data.agregar.push(acceso);
      this.data.eliminar = this.data.eliminar.filter((acc: any) => acc.acceso_id !== acceso.acceso_id);
    } else {
      this.data.eliminar = this.data.eliminar.filter((acc: any) => acc.acceso_id !== acceso.acceso_id);
    }
  }

  eliminarAcceso(acceso: any): void {
    if (this.data.rol.accesos.some((acc: any) => acc.acceso_id === acceso.acceso_id)) {      
      console.log('eliminar')
      this.data.eliminar.push(acceso);
      this.data.agregar = this.data.agregar.filter((acc: any) => acc.acceso_id !== acceso.acceso_id);
    } else {
      this.data.agregar = this.data.agregar.filter((acc: any) => acc.acceso_id !== acceso.acceso_id);
    }
  }
}
