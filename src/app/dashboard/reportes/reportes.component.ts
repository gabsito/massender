import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CampaniasService } from '../../services/campanias.service';
import { FiltrosService } from '../../services/filtros.service'; // Importar el nuevo servicio
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  fechaDesde: Date | null = null;
  fechaHasta: Date | null = null;
  listaSeleccionada: any = null;
  listas: any[] = [];
  filtros: any[] = []; // Para almacenar los filtros
  dataSource = new MatTableDataSource<any>();
  originalData: any[] = []; // Para mantener una copia de los datos originales

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'mensaje', 'fecha_creacion', 'lista', 'filtro'];

  constructor(private campaniasService: CampaniasService, private filtrosService: FiltrosService, private authService: AuthService) { }

  ngOnInit(): void {
    // Obtener todas las campañas inicialmente
    this.campaniasService.getCampanias().subscribe((data: any[]) => {
      // console.log('Campañas recibidas:', data);
      // data.forEach(campania => console.log(`Campania: ${campania.nombre}, Filtro ID: ${campania.filtro_id}`));
      this.originalData = data; // Guardar los datos originales
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    // Obtener listas de clientes
    this.campaniasService.getListas().subscribe((data: any[]) => {
      this.listas = data;
      // console.log('Listas:', data);
    });

    // Obtener filtros
    this.filtrosService.getFiltros().subscribe((data: any[]) => {
      this.filtros = data;
      // console.log('Filtros:', data);
    });
  }

  aplicarFiltro(): void {
    let filtradas = this.originalData; // Empezar con los datos originales

    if (this.fechaDesde) {
      filtradas = filtradas.filter(c => {
        const fechaCreacion = new Date(c.fecha_creacion);
        return this.normalizeDate(fechaCreacion) >= this.normalizeDate(this.fechaDesde!);
      });
    }

    if (this.fechaHasta) {
      filtradas = filtradas.filter(c => {
        const fechaCreacion = new Date(c.fecha_creacion);
        return this.normalizeDate(fechaCreacion) <= this.normalizeDate(this.fechaHasta!);
      });
    }

    if (this.listaSeleccionada) {
      filtradas = filtradas.filter(c => c.lista_id === this.listaSeleccionada.id);
    }

    this.dataSource.data = filtradas;
    this.dataSource.paginator = this.paginator;
    // console.log('Campañas filtradas:', filtradas);
  }

  quitarFiltros(): void {
    this.fechaDesde = null;
    this.fechaHasta = null;
    this.listaSeleccionada = null;
    this.dataSource.data = this.originalData;
    this.dataSource.paginator = this.paginator;
  }

  normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  obtenerValorFiltro(filtroId: number): string {
    const filtro = this.filtros.find(f => f.id === filtroId);
    return filtro ? filtro.value : 'N';
  }

  obtenerNombreFiltro(filtroId: number): string {
    const filtro = this.filtros.find(f => f.id === filtroId);
    return filtro ? filtro.name : 'No Aplicado';
  }

  async descargarPDF(): Promise<void> {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Campañas', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    const filteredData = this.dataSource.data;
    // console.log('Datos filtrados para PDF:', filteredData);

    const generarReporte = async () => {
      for (let i = 0; i < filteredData.length; i++) {
        const campania = filteredData[i];
        const filtroId = campania.filtro_id || 'N'; // Asegúrate de que el campo `filtro_id` está presente en la campaña
        const filtroValor = this.obtenerValorFiltro(filtroId);
        // console.log(`Procesando campaña: ${campania.nombre}, Filtro ID: ${filtroId}, Filtro Valor: ${filtroValor}`);

        if (i > 0) doc.addPage();
        doc.setFontSize(14);
        doc.text(`Campaña: ${campania.nombre}`, 14, 30);
        doc.setFontSize(11);
        (doc as any).autoTable({
          head: [['Nombre', 'Mensaje', 'Fecha de Creación', 'Lista', 'Filtro Aplicado']],
          body: [[campania.nombre, campania.mensaje, campania.fecha_creacion, campania.lista_nombre, this.obtenerNombreFiltro(filtroId)]],
          startY: 40,
          theme: 'striped',
          styles: {
            halign: 'center'
          },
          headStyles: {
            fillColor: [22, 160, 133],
            textColor: [255, 255, 255],
            fontSize: 12
          }
        });

        await new Promise<void>((resolve) => {
          this.campaniasService.getDestinatariosPorLista(campania.lista_id).subscribe(destinatarios => {
            // console.log(`Destinatarios obtenidos para lista ${campania.lista_id}:`, destinatarios);

            const destinatariosFiltrados = destinatarios.filter((d: any) => {
              return filtroValor === 'N' || d.genero === filtroValor;
            });
            // console.log(`Destinatarios filtrados para filtro ID ${filtroId}:`, destinatariosFiltrados);

            const destinatariosData = destinatariosFiltrados.map((d: any) => [
              d.cedula,
              d.nombre,
              d.apellido,
              d.correo,
              d.telefono,
              d.genero
            ]);

            if (destinatariosData.length > 0) {
              (doc as any).autoTable({
                head: [['Cédula', 'Nombre', 'Apellido', 'Correo', 'Teléfono', 'Género']],
                body: destinatariosData,
                startY: (doc as any).lastAutoTable.finalY + 10,
                theme: 'striped',
                styles: {
                  halign: 'center'
                },
                headStyles: {
                  fillColor: [39, 174, 96],
                  textColor: [255, 255, 255],
                  fontSize: 11
                }
              });
            } else {
              doc.text('No hay destinatarios que cumplan con el criterio de género.', 14, (doc as any).lastAutoTable.finalY + 10);
            }
            resolve();
          });
        });
      }

      // Pie de página
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
      }

      doc.save('reporte_campanias.pdf');
    };

    await generarReporte();
  }
}
