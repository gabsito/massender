import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CreardestinatariosComponent } from '../creardestinatarios/creardestinatarios.component';
import { VerDestinatariosPorListaComponent } from '../verdestinatariosporlista/verdestinatariosporlista.component';

interface Destinatario {
  cedula: string;
  nombre: string;
  apellido: string;
  genero: string;
  correo: string;
  telefono: string;
}

interface Lista {
  id: number;
  nombreLista: string;
  fechaCreacion: Date;
  destinatarios: Destinatario[];
}

@Component({
  selector: 'app-destinatarios',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, FormsModule, MatTableModule, CommonModule, RouterLink],
  templateUrl: './destinatarios.component.html',
  styleUrls: ['./destinatarios.component.css']
})
export class DestinatariosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'fechaCreacion', 'actions'];
  dataSource = new MatTableDataSource<Lista>([]);

  constructor(public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadLists();
  }

  loadLists(): void {
    this.http.get<Lista[]>('https://jandryrt15.pythonanywhere.com/massender/listar-destinatarios').subscribe(
      data => {
        this.dataSource.data = data.map(list => ({
          ...list,
          fechaCreacion: new Date(list.fechaCreacion)
        }));
      },
      error => {
        console.error('Error al cargar las listas de destinatarios:', error);
        alert('Hubo un error al cargar las listas de destinatarios.');
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreardestinatariosComponent, {
      width: '100vm'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addList(result);
      }
    });
  }

  addList(newList: Lista): void {
    this.dataSource.data = [...this.dataSource.data, {
      ...newList,
      fechaCreacion: new Date(newList.fechaCreacion)
    }];
  }

  deleteList(list: Lista): void {
    this.dataSource.data = this.dataSource.data.filter(l => l !== list);
  }

  verContactos(list: Lista): void {
    this.dialog.open(VerDestinatariosPorListaComponent, {
      width: '90vw',
      data: { listaId: list.id, nombreLista: list.nombreLista }
    });
  }
}
