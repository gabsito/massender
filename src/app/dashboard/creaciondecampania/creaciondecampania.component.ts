import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MockBackendService } from '../../services/mock-backend.service';
import { Filtros } from '../../classes/filtros';
import { ListasDest } from '../../classes/listas-dest';

@Component({
  selector: 'app-creaciondecampania',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './creaciondecampania.component.html',
  styleUrls: ['./creaciondecampania.component.css']
})
export class CreacionDeCampaniaComponent implements OnInit, AfterViewInit {
  campaignForm: FormGroup;
  filtros: { id: number, name: string, value: string }[] = [];
  listas: { id: number, nombre: string }[] = [];

  filtrosPrueba: Filtros[] = [];
  listasPrueba: ListasDest[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private http: HttpClient, private mockBackendService: MockBackendService) {
    this.campaignForm = this.fb.group({
      nombreCampania: ['', Validators.required],
      mensaje: ['', Validators.required],
      filtro: [''],
      listaDestinatarios: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.filtrosPrueba = this.mockBackendService.obtenerFiltros();
    //this.loadFiltros();
    this.loadListas();
    this.loadListas2();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
/*
  loadFiltros() {
    this.http.get<{ id: number, name: string, value: string }[]>('https://jandryrt15.pythonanywhere.com/massender/listar-filtros')
      .subscribe(
        data => {
          this.filtros = data;
        },
        error => {
          console.error('Error loading filtros', error);
        }
      );
  }
*/


  loadListas() {
    this.http.get<{ id: number, nombre: string }[]>('https://jandryrt15.pythonanywhere.com/massender/listar-destinatarios')
      .subscribe(
        data => {
          this.listas = data.map(lista => ({ id: lista.id, nombre: lista.nombre }));
        },
        error => {
          console.error('Error loading listas', error);
        }
      );
  }

  loadListas2() {
    this.http.get<ListasDest[]>('https://jandryrt15.pythonanywhere.com/massender/listar-destinatarios')
      .subscribe(
        data => {
          this.listasPrueba = data;
        },
        error => {
          console.error('Error loading listas', error);
        }
      );
  }

  getListaSelect(nombre: string) {
    return this.listasPrueba.find(lista => lista.nombre === nombre);

  }


  fillfiltros(){
    this.filtrosPrueba = [];
    const formData = this.campaignForm.value;
    const listaDestinatariosNombre = formData.listaDestinatarios;
    const listaSelect = this.getListaSelect(listaDestinatariosNombre);
    if(listaSelect){
      if(listaSelect.filtros){
        this.filtrosPrueba = listaSelect.filtros;
        console.log('Filtros:', this.filtrosPrueba);

      }
    }
  }

  onSelect(event: any) {
    const selectedLista = event.value;
    console.log('Lista seleccionada:', selectedLista);
    console.log('Filtros:', selectedLista.filtros);
    console.log('Filtros:', this.mockBackendService.obtenerFiltros());
    this.fillfiltros();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file);
      // lógica para manejar el archivo seleccionado
    }
  }

  programarEnvio() {
    if (this.campaignForm.valid) {
      // Lógica para programar el envío
    }
  }

  enviarAhora() {
    if (this.campaignForm.valid) {
      const formData = this.campaignForm.value;
      const campaniaData = {
        nombre: formData.nombreCampania,
        mensaje: formData.mensaje,
        filtro_id: formData.filtro,
        lista_id: formData.listaDestinatarios
      };

      this.http.post('https://jandryrt15.pythonanywhere.com/massender/guardar-campania', campaniaData)
        .subscribe(
          response => {
            console.log('Campaña guardada con éxito', response);
            this.campaignForm.reset();  // Limpiar el formulario
          },
          error => {
            console.error('Error al guardar la campaña', error);
          }
        );
    }
  }
}
