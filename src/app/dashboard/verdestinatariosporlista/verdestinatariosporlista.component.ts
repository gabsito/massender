import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Destinatario {
  destinatario_id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  genero: string;
  correo: string;
  telefono: string;
}

@Component({
  selector: 'app-verdestinatariosporlista',
  templateUrl: './verdestinatariosporlista.component.html',
  styleUrls: ['./verdestinatariosporlista.component.css'],
  standalone: true,
  imports: [MatTableModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, CommonModule]
})
export class VerDestinatariosPorListaComponent implements OnInit {
  displayedColumns: string[] = ['cedula', 'nombre', 'apellido', 'genero', 'correo', 'telefono', 'actions'];
  dataSource = new MatTableDataSource<Destinatario>();
  listaNombre: string;
  editDestinatario: Destinatario | null = null;

  constructor(
    private dialogRef: MatDialogRef<VerDestinatariosPorListaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.listaNombre = data.nombreLista;
  }

  ngOnInit(): void {
    this.http.get<Destinatario[]>(`https://jandryrt15.pythonanywhere.com/massender/verdestinatarioporlista/${this.data.listaId}`).subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        console.error('Error al cargar los destinatarios:', error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  editarDestinatario(destinatario: Destinatario): void {
    this.editDestinatario = { ...destinatario }; // Clona el destinatario para edición
  }

  guardarCambios(): void {
    if (this.editDestinatario) {
      this.http.put(`https://jandryrt15.pythonanywhere.com/massender/actualizardestinatario/${this.editDestinatario!.destinatario_id}`, this.editDestinatario).subscribe(
        () => {
          const index = this.dataSource.data.findIndex(d => d.destinatario_id === this.editDestinatario!.destinatario_id);
          if (index !== -1) {
            this.dataSource.data[index] = { ...this.editDestinatario! };
            // Forzar la actualización del dataSource
            this.dataSource.data = [...this.dataSource.data];
          }
          this.editDestinatario = null; // Limpia el destinatario editado después de guardar
        },
        error => {
          console.error('Error al actualizar el destinatario:', error);
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.editDestinatario = null; // Cancela la edición
  }

  eliminarDestinatario(destinatario: Destinatario): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el destinatario con id ${destinatario.destinatario_id}?`)) {
      this.http.delete(`https://jandryrt15.pythonanywhere.com/massender/eliminardestinatario/${destinatario.destinatario_id}`).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(d => d.destinatario_id !== destinatario.destinatario_id);
          // Forzar la actualización del dataSource
          this.dataSource.data = [...this.dataSource.data];
        },
        error => {
          console.error('Error al eliminar el destinatario:', error);
        }
      );
    }
  }
}
