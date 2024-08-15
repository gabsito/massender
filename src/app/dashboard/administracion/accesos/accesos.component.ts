import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditarComponent } from './modals/editar/editar.component';
import { AccesosService } from '../../../services/accesos.service';
import { UserService } from '../../../services/user.service';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-accesos',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule],
  templateUrl: './accesos.component.html',
  styleUrl: './accesos.component.css'
})
export class AccesosComponent implements OnInit{
  descripcion: String | null = null;
  ruta: String | null = null;
  dataSource = new MatTableDataSource<any>();
  originalData: any[] = []; // Para mantener una copia de los datos originales

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['descripcion', 'fecha_creacion', 'fecha_modificacion', 'editar', 'eliminar'];

  constructor(private userService: UserService, private accesosService: AccesosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarAccesos()
  }

  cargarAccesos(){
    this.accesosService.getAccesos().subscribe((data: any[]) => {
      this.originalData = data; // Guardar los datos originales
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  abrirModalEdicion(acceso: any) {
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '300px',
      data: { acceso: { ...acceso } }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result !== '' && result !== undefined) {
        this.guardarCambios(result, 'E');
      }else{      
        this.cargarAccesos()
      }
    });
  }

  guardarCambios(acceso: any, mode: string) {
    if(mode == 'E'){
      acceso.usuario_modificacion = this.userService.getUserId()
      acceso.fecha_modificacion = new Date()
      return this.accesosService.editarAcceso(acceso).subscribe((acc: any)=>{
        this.cargarAccesos()
      })
    }
    else if(mode == 'I'){
      acceso.usuario_insercion = this.userService.getUserId()
      acceso.fecha_insercion = new Date()
      return this.accesosService.insertarAcceso(acceso).subscribe((acc: any)=>{
        this.cargarAccesos()
      })
    }
    return null
  }

  eliminarAcceso(acc: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.accesosService.eliminarAcceso(acc).subscribe((a: any)=>{
          this.cargarAccesos()
        })
      }
    });
  }

  aplicarFiltro(): void {
    let filtradas = this.originalData; // Empezar con los datos originales

    if (this.descripcion) {
      filtradas = filtradas.filter(c => c.descripcion.includes(this.descripcion));
    }

    if (this.ruta) {
      filtradas = filtradas.filter(c => c.ruta.includes(this.ruta));
    }

    this.dataSource.data = filtradas;
    this.dataSource.paginator = this.paginator;
  }

  quitarFiltros(): void {
    this.descripcion = null;
    this.ruta = null;
    this.dataSource.data = this.originalData;
    this.dataSource.paginator = this.paginator;
  }

  agregarAcceso(): void {
    const nuevoAcceso = {
      descripcion: '',
      ruta: '',
      parent_id: null
    };

    const dialogRef = this.dialog.open(EditarComponent, {
      width: '400px',
      data: { acceso: nuevoAcceso }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        this.guardarCambios(result, 'I');
      }
    });
  }
}
