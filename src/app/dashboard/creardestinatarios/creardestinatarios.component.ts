import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
  validHeaders = ['Cédula', 'Nombre', 'Apellido', 'Género', 'Correo', 'Teléfono'];

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
        const formattedData = lines.slice(1).map((line: string) => {
          const [cedula, nombre, apellido, genero, correo, telefono] = line.replace('\r', '').split(';');
          return { cedula, nombre, apellido, genero, correo, telefono };
        });

        // Enviar los datos como JSON
        const data = {
          nombreLista: this.createListForm.get('nombreLista')?.value,
          destinatarios: formattedData
        };

        console.log(data)

        this.http.post('http://localhost:8000/massender/guardar-destinatarios', data).subscribe(
          response => {
            console.log('Respuesta del servidor:', response);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un error al enviar los datos.');
          }
        );
      };
      reader.readAsText(this.selectedFile, 'latin1');
    } else {
      const data = {
        nombreLista: this.createListForm.get('nombreLista')?.value,
        destinatarios: []
      };

      this.http.post('https://api.ejemplo.com/guardar-destinatarios', data).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          this.dialogRef.close(true);
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
