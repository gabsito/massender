import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  
  passwordResetForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private http: HttpClient) {
    this.passwordResetForm = this.fb.group({
      username: ['', [Validators.required, Validators.nullValidator]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },{ validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.passwordResetForm.valid) {
      const username = this.passwordResetForm.get('username')?.value;
      const newPassword = this.passwordResetForm.get('newPassword')?.value;
      const usuario_id = this.userService.getUserId();

      const updateData = {
        password: newPassword
      };
  
      // Realizar la petición PUT para actualizar la contraseña
      this.http.put(`https://jandryrt15.pythonanywhere.com/massender/usuarios/${usuario_id}`, updateData)
        .subscribe({
          next: (response) => {
            console.log('Contraseña actualizada exitosamente', response);
          },
          error: (error) => {
            console.error('Error al actualizar la contraseña', error);
          },
          complete: () => {
            console.log('Operación de actualización completa');
          }
        });

      console.log('usuario:', username);
      console.log('Nueva Contraseña:', newPassword);
    }
  }

}
