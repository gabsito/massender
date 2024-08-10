import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private http: HttpClient) {
    this.campaignForm = this.fb.group({
      nombreCampania: ['', Validators.required],
      mensaje: ['', Validators.required],
      filtro: ['', Validators.required],
      listaDestinatarios: ['', Validators.required],
      medio: ['', Validators.required]  // Nueva propiedad
    });
  }

  ngOnInit() {
    this.loadFiltros();
    this.loadListas();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

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

  programarEnvio() {
    if (this.campaignForm.valid) {
      // Lógica para programar el envío
      console.log('Programar Envio');
    }
  }

  enviarAhora() {
    if (this.campaignForm.valid) {
      const formData = this.campaignForm.value;
      const campaniaData = {
        nombre: formData.nombreCampania,
        mensaje: formData.mensaje,
        filtro_id: formData.filtro,
        lista_id: formData.listaDestinatarios,
        medio: formData.medio  // Incluir el medio en los datos enviados
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
