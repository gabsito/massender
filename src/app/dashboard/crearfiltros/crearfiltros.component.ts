import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/select';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Filtros } from '../../classes/filtros';
import { ListasDest } from '../../classes/listas-dest';
import { MockBackendService } from '../../services/mock-backend.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-crearfiltros',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatOption,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './crearfiltros.component.html',
  styleUrl: './crearfiltros.component.css'
})

export class CrearfiltrosComponent {
  createFilterForm: FormGroup;
  listas: ListasDest[] = [];
  listas2: { id: number, nombre: string, destinatarios: Record<string, any>[] }[] = [];
  listasClaves: string[] = [];
  listaValores: Record<string, any[]> = {};
  listaFiltrada: Record<string, any>[] = [];
  claveSeleccionada: string | null = null; // Nueva variable para la clave seleccionada
  valorSeleccionado: string | null = null; // Nueva variable para el valor seleccionado


  constructor(private http: HttpClient,
    public dialogRef: MatDialogRef<CrearfiltrosComponent>, private mockBackendService: MockBackendService, private cdr: ChangeDetectorRef) {
    this.createFilterForm = new FormGroup({
      nombre: new FormControl(''),
      listaDestinatarios: new FormControl('')
    });
  } // Inject the HttpClient module into the constructor

  loadListas() {
    this.http.get<ListasDest[]>('https://jandryrt15.pythonanywhere.com/massender/listar-destinatarios')
      .subscribe(
        data => {
          this.listas = data;
        },
        error => {
          console.error('Error loading listas', error);
        }
      );
  }

  loadListas2() {
    this.http.get<{ id: number, nombre: string, destinatarios: {}[] }[]>('https://jandryrt15.pythonanywhere.com/massender/listar-destinatarios')
      .subscribe(
        data => {
          this.listas2 = data.map(lista => ({
            id: lista.id,
            nombre: lista.nombre,
            destinatarios: lista.destinatarios
          }));
        },
        error => {
          console.error('Error loading listas', error);
        }
      );
  }

  ngOnInit() {
    this.loadListas();
    this.loadListas2();
  }

  getListaSelect(nombre: string) {
    return this.listas.find(lista => lista.nombre === nombre);

  }

  getListaSelect2(nombre: string) {
    return this.listas2.find(lista => lista.nombre === nombre);
  }


  fillValues() {
    this.listasClaves = [];
    this.listaValores = {};
    const formData = this.createFilterForm.value;
    const listaDestinatariosNombre = formData.listaDestinatarios;
    const listaSelect = this.getListaSelect2(listaDestinatariosNombre);


    if (listaSelect) {
      listaSelect.destinatarios.forEach(destinatario => {
        Object.keys(destinatario).forEach(key => { // Iterar sobre cada clave del destinatario
          if (!this.listaValores[key]) { // Inicializar la clave en el diccionario si no existe
            this.listaValores[key] = [];
          }
          if (!this.listaValores[key].includes(destinatario[key])) { // Agregar el valor a la lista de la clave si no está ya presente
            this.listaValores[key].push(destinatario[key]);
          } else {
            console.log(`Valor "${destinatario[key]}" ya existe en la clave "${key}"`);
          }
        });
      });
      this.listasClaves = Object.keys(this.listaValores); // Llenar listasClaves con las claves del diccionario listaValores
      console.log(this.listaValores);
      console.log(this.listasClaves);
    } else {
      console.error('Selected list not found');
    }

  }

  filter(listaSelect: ListasDest, filtrado: string): void {
    // Obtener la lista de destinatarios de la posición correcta del objeto listaSelect
    const destinatarios = Object.values(listaSelect)[4] as { [key: string]: any }[];

    // Filtrar la lista de destinatarios basándose en el valor del radio button seleccionado
    this.listaFiltrada = destinatarios.filter(destinatario => {
      return Object.values(destinatario).some(value => value.toString().includes(filtrado));
    });

  }

  onSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedNombre = selectElement.value;
    this.createFilterForm.patchValue({ listaDestinatarios: selectedNombre });
    this.fillValues();
  }

  onRadioChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.claveSeleccionada = inputElement.value;
  }

  onRadioChange2(event: Event) {
    this.listaFiltrada = [];
    const inputElement = event.target as HTMLInputElement;
    this.valorSeleccionado = inputElement.value;
    const formData = this.createFilterForm.value;
    const listaDestinatariosNombre = formData.listaDestinatarios;
    const listaSelect = this.getListaSelect(listaDestinatariosNombre);
    if (listaSelect) {
      this.filter(listaSelect, this.valorSeleccionado);
    } else {
      console.error('Selected list not found');
    }

  }

  onSubmit() {
    const formData = this.createFilterForm.value;
    const nombreFiltro = formData.nombre;
    const listaDestinatariosNombre = formData.listaDestinatarios;
    const listaSelect = this.getListaSelect(listaDestinatariosNombre);
    let filtro: Filtros | null = null;  // Definir el objeto Filtro sin inicializar


    if (listaSelect) {

      // Asegurar que la propiedad 'filtros' esté inicializada
      if (!listaSelect.filtros) {
        listaSelect.filtros = [];
      }
      // Crear una copia mutable del objeto listaSelect
      const listaSelectMutable = { ...listaSelect, destinatarios: [] as Record<string, any>[] };

      // Reemplazar el contenido de la lista con la lista filtrada
      if (this.listaFiltrada.length > 0) {
        listaSelectMutable.destinatarios = [...this.listaFiltrada];
      }

      // Crear el objeto Filtro con la lista modificada
      filtro = new Filtros(nombreFiltro, listaSelectMutable);


      //this.addFilter(listaSelect, filtro);

      this.cdr.detectChanges();
      // Guardar el filtro en el servicio de backend
      this.mockBackendService.guardarFiltro(filtro);

      console.log("listaDest sin filtro ", listaSelect);

      console.log("listaDest con filtro de nombre carlos", filtro);

      // Enviar el objeto Filtro al componente principal
      this.dialogRef.close(filtro); // Pasar el objeto Filtro al cerrar el diálogo


    } else {
      console.error('Selected list not found');

    }

    if (filtro && listaSelect) {
      listaSelect.filtros.push(filtro);
      console.log('lista after', listaSelect);
      console.log('Filtro agregado:', listaSelect.filtros);
    }

    // Actualizar la lista modificada en el backend
    this.http.put(`https://tu-backend.com/actualizar-lista/${listaSelect?.nombre}`, listaSelect)
      .subscribe(
        response => {
          console.log('Lista actualizada en el backend', response);
        },
        error => {
          console.error('Error al actualizar la lista en el backend', error);
        }
      );

  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
