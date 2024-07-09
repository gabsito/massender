import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

interface Destinatario {
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
  imports: [MatTableModule, MatDialogModule, MatButtonModule]
})
export class VerDestinatariosPorListaComponent implements OnInit {
  displayedColumns: string[] = ['cedula', 'nombre', 'apellido', 'genero', 'correo', 'telefono'];
  destinatarios: Destinatario[] = [];
  listaNombre: string;

  constructor(
    private dialogRef: MatDialogRef<VerDestinatariosPorListaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.listaNombre = data.nombreLista;
  }

  ngOnInit(): void {
    this.http.get<Destinatario[]>(`http://localhost:8000/massender/verdestinatarioporlista/${this.data.listaId}`).subscribe(
      data => {
        this.destinatarios = data;
      },
      error => {
        console.error('Error al cargar los destinatarios:', error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
