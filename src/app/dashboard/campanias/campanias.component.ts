import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CampaniasService } from '../../services/campanias.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-campanias',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatButtonModule],
  templateUrl: './campanias.component.html',
  styleUrls: ['./campanias.component.css']
})
export class CampaniasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'mensaje', 'fecha_creacion', 'lista', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private campaniasService: CampaniasService, private http: HttpClient) { }

  ngOnInit(): void {
    this.campaniasService.getCampanias().subscribe((data: any[]) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminarCampania(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta campaña?')) {
      this.http.delete(`https://jandryrt15.pythonanywhere.com/eliminar-campania/${id}`).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(c => c.id !== id);
          console.log('Campaña eliminada');
        },
        error => {
          console.error('Error al eliminar la campaña:', error);
          alert('Hubo un error al eliminar la campaña.');
        }
      );
    }
  }
}
