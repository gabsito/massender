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
    MatDialogContent,],
  templateUrl: './crearfiltros.component.html',
  styleUrl: './crearfiltros.component.css'
})

export class CrearfiltrosComponent {
  createFilterForm: FormGroup;
  listas: ListasDest[] = [];
  result: string[] = [];

  constructor(private http: HttpClient, 
    public dialogRef: MatDialogRef<CrearfiltrosComponent>) {
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

  ngOnInit() {
    this.loadListas();
  }

  getListaSelect(nombre: string) {
    return this.listas.find(lista => lista.nombre === nombre);

  }

  onSubmit() {
    const formData = this.createFilterForm.value;
    const nombreFiltro = formData.nombre;
    const listaDestinatariosNombre = formData.listaDestinatarios;
    const listaSelect = this.getListaSelect(listaDestinatariosNombre);
    if (listaSelect) {
      const filtro = new Filtros(nombreFiltro, listaSelect);
      console.log('Filtro creado:', filtro);
      // Enviar el objeto Filtro al componente principal
      this.dialogRef.close(filtro); // Pasar el objeto Filtro al cerrar el diálogo
    } else {
      console.error('Selected list not found');
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.listas);
  }

}
