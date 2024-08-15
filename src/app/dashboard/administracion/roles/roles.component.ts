import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RolesService } from '../../../services/roles.service';
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
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  descripcion: String | null = null;
  dataSource = new MatTableDataSource<any>();
  originalData: any[] = []; // Para mantener una copia de los datos originales

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['descripcion', 'fecha_creacion', 'fecha_modificacion', 'editar', 'eliminar'];

  constructor(private userService: UserService, private rolesService: RolesService, private accesosService: AccesosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarRoles()
  }

  cargarRoles(){
    this.rolesService.getRoles().subscribe((data: any[]) => {
      this.originalData = data; // Guardar los datos originales
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  abrirModalEdicion(rol: any) {
    this.accesosService.getAccesosByRol(rol.rol_id).subscribe((accesos: any[])=>{
      rol.accesos = this.aplanarAccesos(accesos,rol)
      const dialogRef = this.dialog.open(EditarComponent, {
        width: '300px',
        data: { rol: { ...rol } }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if (result !== '' && result !== undefined) {
          this.guardarCambios(result, 'E');
        }else{      
          this.cargarRoles()
        }
      });
    });
  }

  guardarCambios(data: any, mode: string) {
    if(mode == 'E'){
      data.rol.usuario_modificacion = this.userService.getUserId()
      data.rol.fecha_modificacion = new Date()
      return this.rolesService.editarRol(data.rol).subscribe((rol: any)=>{
        var newAccesos = this.generarAccesoRol(data.agregar,rol)
        var oldAccesos = this.generarAccesoRol(data.eliminar,rol)
        this.rolesService.asignarAccesos(newAccesos).subscribe((aAcc: any)=>{
          this.rolesService.desAsignarAccesos(oldAccesos).subscribe((dAcc: any)=>{
            this.cargarRoles()
          })
        })

      })
    }
    else if(mode == 'I'){
      data.rol.usuario_insercion = this.userService.getUserId()
      data.rol.fecha_insercion = new Date()
      return this.rolesService.insertarRol(data.rol).subscribe((rol: any)=>{
        var newAccesos = this.generarAccesoRol(data.agregar,rol)
        this.rolesService.asignarAccesos(newAccesos).subscribe((aAcc: any)=>{
          this.cargarRoles()
        })
      })
    }
    return null
  }

  eliminarRol(rol: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.rolesService.eliminarRol(rol).subscribe((rol: any)=>{
          this.cargarRoles()
        })
      }
    });
  }

  aplicarFiltro(): void {
    let filtradas = this.originalData; // Empezar con los datos originales

    if (this.descripcion) {
      filtradas = filtradas.filter(c => c.descripcion.includes(this.descripcion));
    }

    this.dataSource.data = filtradas;
    this.dataSource.paginator = this.paginator;
  }

  quitarFiltros(): void {
    this.descripcion = null;
    this.dataSource.data = this.originalData;
    this.dataSource.paginator = this.paginator;
  }

  aplanarAccesos(accesos: any[], rol: any): any {
    let resultado: any[] = [];

    function aplanar(nodo: any) {
      // Agregar el nodo actual al resultado, pero sin los children
      const { children, ...nodoSinChildren } = nodo;
      resultado.push(nodoSinChildren);

      // Recorrer los children, si existen
      if (children && children.length > 0) {
        children.forEach((child: any) => aplanar(child));
      }
    }

    accesos.forEach(acceso => aplanar(acceso));

    return resultado;
  }

  agregarRol(): void {
    const nuevoRol = {
      descripcion: '',
      accesos: []
    };

    const dialogRef = this.dialog.open(EditarComponent, {
      width: '400px',
      data: { rol: nuevoRol }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        this.guardarCambios(result, 'I');
      }
    });
  }

  generarAccesoRol(accesos: any[], rol: any){
    return accesos.map(acceso => ({
      fecha_insercion: acceso.fecha_insercion,
      usuario_insercion: acceso.usuario_insercion,
      acceso_id: acceso.acceso_id,
      rol_id: rol.rol_id
    }));
  }
}
