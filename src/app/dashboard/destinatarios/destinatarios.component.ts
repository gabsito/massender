import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { ListaspopupComponent } from '../../listaspopup/listaspopup.component';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ListasDest } from '../../classes/listas-dest';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destinatarios',
  standalone: true,
  imports: [MatButtonModule, ListaspopupComponent, FormsModule, MatTableModule, CommonModule, RouterLink],
  templateUrl: './destinatarios.component.html',
  styleUrls: ['./destinatarios.component.css']
})

export class DestinatariosComponent {

  displayedColumns: string[] = ['nombre', 'fechaCreacion', 'actions'];
  dataSource = new MatTableDataSource<ListasDest>([]);

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ListaspopupComponent, {
      width: '450px', // puedes pasar datos al diálogo aquí si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
      if (result) {
        this.addList(result);
        //console.log(list.nombre, list.fechaCreacion);
      }
    });
  }

  addList(newList: ListasDest): void {
    this.dataSource.data = [...this.dataSource.data, newList];
  }

  deleteList(list: ListasDest): void {
    this.dataSource.data = this.dataSource.data.filter(l => l !== list);
  }

}
