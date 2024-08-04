import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  
  passwordResetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, /*{ validator: this.passwordMatchValidator }*/);
  }
/*
  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword').value === form.get('confirmPassword').value 
      ? null : { 'mismatch': true };
  }
*/
  onSubmit() {/*
    if (this.passwordResetForm.valid) {
      const email = this.passwordResetForm.get('email').value;
      const newPassword = this.passwordResetForm.get('newPassword').value;
      // Aquí debes agregar la lógica para verificar el correo y actualizar la contraseña
      // Esto probablemente implicará una llamada a un servicio que maneje la autenticación
      console.log('Correo:', email);
      console.log('Nueva Contraseña:', newPassword);
    }*/
  }

}
