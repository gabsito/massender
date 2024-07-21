import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
  nombre: string;
  fecha_modificacion: Date;
  estado: string;
  destinatarios: Destinatario[];
}

@Component({
  selector: 'app-destinatarios',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, FormsModule, MatTableModule, MatPaginatorModule, CommonModule, RouterLink],
  templateUrl: './destinatarios.component.html',
  styleUrls: ['./destinatarios.component.css']
})
export class DestinatariosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'fecha_modificacion', 'estado', 'actions'];
  dataSource = new MatTableDataSource<Lista>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadLists();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadLists(): void {
    this.http.get<Lista[]>('https://jandryrt15.pythonanywhere.com/massender/listar-destinatarios').subscribe(
      data => {
        this.dataSource.data = data.map(list => ({
          ...list,
          fecha_modificacion: new Date(list.fecha_modificacion)
        }));
        this.dataSource.paginator = this.paginator;
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
      fecha_modificacion: new Date(newList.fecha_modificacion)
    }];
    this.dataSource.paginator = this.paginator;
  }

  deactivateList(list: Lista): void {
    this.dataSource.data = this.dataSource.data.map(l => {
      if (l.id === list.id) {
        return { ...l, estado: 'I' };
      }
      return l;
    });
    this.dataSource.paginator = this.paginator;
  }

  activateList(list: Lista): void {
    this.dataSource.data = this.dataSource.data.map(l => {
      if (l.id === list.id) {
        return { ...l, estado: 'A' };
      }
      return l;
    });
    this.dataSource.paginator = this.paginator;
  }

  verContactos(list: Lista): void {
    this.dialog.open(VerDestinatariosPorListaComponent, {
      width: '90vw',
      data: { listaId: list.id, nombreLista: list.nombre }
    });
  }

  desactivarLista(list: Lista): void {
    if (confirm(`¿Estás seguro de que deseas desactivar la lista "${list.nombre}"?`)) {
      this.http.put(`https://jandryrt15.pythonanywhere.com/massender/desactivar-lista/${list.id}`, {}).subscribe(
        () => {
          this.deactivateList(list);
          console.log(`Lista "${list.nombre}" desactivada`);
        },
        error => {
          console.error('Error al desactivar la lista de destinatarios:', error);
          alert('Hubo un error al desactivar la lista de destinatarios.');
        }
      );
    }
  }

  activarLista(list: Lista): void {
    if (confirm(`¿Estás seguro de que deseas activar la lista "${list.nombre}"?`)) {
      this.http.put(`https://jandryrt15.pythonanywhere.com/massender/activar-lista/${list.id}`, {}).subscribe(
        () => {
          this.activateList(list);
          console.log(`Lista "${list.nombre}" activada`);
        },
        error => {
          console.error('Error al activar la lista de destinatarios:', error);
          alert('Hubo un error al activar la lista de destinatarios.');
        }
      );
    }
  }

  eliminarLista(list: Lista): void {
    if (confirm(`¿Estás seguro de que deseas eliminar la lista "${list.nombre}"? Esta acción no se puede deshacer.`)) {
      this.http.delete(`https://jandryrt15.pythonanywhere.com/massender/eliminar-lista/${list.id}`).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(l => l.id !== list.id);
          this.dataSource.paginator = this.paginator;
          console.log(`Lista "${list.nombre}" eliminada`);
        },
        error => {
          console.error('Error al eliminar la lista de destinatarios:', error);
          alert('Hubo un error al eliminar la lista de destinatarios.');
        }
      );
    }
  }
}
