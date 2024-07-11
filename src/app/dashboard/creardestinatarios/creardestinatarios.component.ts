// creardestinatarios.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Destinatario {
  cedula: string;
  nombre: string;
  apellido: string;
  genero: string;
  correo: string;
  telefono: string;
}

interface Lista {
  nombreLista: string;
  fechaCreacion: Date;
  destinatarios: Destinatario[];
}

@Component({
  selector: 'app-creardestinatarios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './creardestinatarios.component.html',
  styleUrls: ['./creardestinatarios.component.css']
})
export class CreardestinatariosComponent {
  createListForm: FormGroup;
  selectedFile: File | null = null;
  validHeaders = ['Cedula', 'Nombre', 'Apellido', 'Genero', 'Correo', 'Telefono'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreardestinatariosComponent>,
    private http: HttpClient
  ) {
    this.createListForm = this.fb.group({
      nombreLista: ['', Validators.required]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  validateCsv(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const text = e.target.result;
        const rows = text.split('\n');
        const headers = rows[0].split(';').map((header: string) => header.trim());

        if (headers.length !== this.validHeaders.length || !headers.every((header: string, index: number) => header === this.validHeaders[index])) {
          resolve(false);
        } else {
          resolve(true);
        }
      };
      reader.onerror = () => {
        reject(false);
      };
      reader.readAsText(file, 'latin1');
    });
  }

  async onSubmit() {
    if (this.createListForm.invalid) {
      return;
    }

    if (this.selectedFile) {
      const isValid = await this.validateCsv(this.selectedFile);
      if (!isValid) {
        alert('El archivo CSV no tiene el formato correcto.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const text = e.target.result;
        const lines = text.split('\n');
        const formattedData: Destinatario[] = lines.slice(1).map((line: string) => {
          const [cedula, nombre, apellido, genero, correo, telefono] = line.replace('\r', '').split(';');
          return { cedula, nombre, apellido, genero, correo, telefono } as Destinatario;
        }).filter((destinatario: Destinatario) => destinatario.cedula && destinatario.nombre && destinatario.apellido && destinatario.genero && destinatario.correo && destinatario.telefono);

        const data: Lista = {
          nombreLista: this.createListForm.get('nombreLista')?.value,
          fechaCreacion: new Date(),
          destinatarios: formattedData
        };

        this.http.post('https://jandryrt15.pythonanywhere.com/massender/guardar-destinatarios', data).subscribe(
          response => {
            console.log('Respuesta del servidor:', response);
            this.dialogRef.close(data); // Devolver la lista creada completa
          },
          error => {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un error al enviar los datos.');
          }
        );
      };
      reader.readAsText(this.selectedFile, 'latin1');
    } else {
      const data: Lista = {
        nombreLista: this.createListForm.get('nombreLista')?.value,
        fechaCreacion: new Date(),
        destinatarios: []
      };

      this.http.post('https://jandryrt15.pythonanywhere.com/massender/guardar-destinatarios', data).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          this.dialogRef.close(data); // Devolver la lista creada completa
        },
        error => {
          console.error('Error al enviar los datos:', error);
          alert('Hubo un error al enviar los datos.');
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
