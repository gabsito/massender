import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-recuperarclave',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recuperarclave.component.html',
  styleUrl: './recuperarclave.component.css'
})
export class RecuperarclaveComponent {
  passwordResetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.passwordResetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.passwordResetForm.valid) {
      const email = this.passwordResetForm.value.email;
      
      // Hacer la petición GET al endpoint para recuperar usuario
      this.http.get(`https://jandryrt15.pythonanywhere.com/massender/usuarios/recuperar/${email}`).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrando un mensaje al usuario.
          if(response != 0){
            window.alert('Revisa tu correo para continuar con el proceso (si no lo encuentras en la bandeja de entrada, revisa en spam)');
          }
          else{
            window.alert('El correo no se encuentra registrado');
          }

        },
        (error) => {
          console.error('Error al enviar la solicitud:', error);
        }
      );
      
    } else {
      console.log('Formulario no válido');
    }
  }

}