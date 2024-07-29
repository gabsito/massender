import { Component } from '@angular/core';
import { CrearfiltrosComponent } from '../crearfiltros/crearfiltros.component';
import { MatDialog } from '@angular/material/dialog'; // Import the MatDialog class
import { Filtros } from '../../classes/filtros';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})


export class FiltrosComponent {

  filtros: Filtros[] = [];

  constructor(private dialog: MatDialog) {} // Inject the MatDialog service

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearfiltrosComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filtros.push(result);
      }
    });

  }

}

