import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CreardestinatariosComponent } from '../creardestinatarios/creardestinatarios.component';

@Component({
  selector: 'app-destinatarios',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, FormsModule, MatTableModule, CommonModule, RouterLink],
  templateUrl: './destinatarios.component.html',
  styleUrls: ['./destinatarios.component.css']
})
export class DestinatariosComponent {
  displayedColumns: string[] = ['nombre', 'fechaCreacion', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreardestinatariosComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addList(result);
      }
    });
  }

  addList(newList: any): void {
    this.dataSource.data = [...this.dataSource.data, newList];
  }

  deleteList(list: any): void {
    this.dataSource.data = this.dataSource.data.filter(l => l !== list);
  }
}
