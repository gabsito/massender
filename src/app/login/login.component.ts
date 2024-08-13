import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Token } from '../interfaces/token';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { log } from 'console';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class LoginComponent {
  errorMessage = '';
  loading = false;
  
  loginForm = this.fb.group({
    username: new FormControl<string>(''),
    password: new FormControl<string>('')
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  
  
  onSubmit() {
    console.log(this.loginForm.value);

    this.loading = true;
    this.errorMessage = '';

    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';

    this.authService.getAuthToken(username, password).subscribe(
      (data) => {
        console.log(data);
        const token = data as Token;
        this.authService.saveToken(token.access_token, token.user_id, token.refresh_token);
        this.loading = false;
        this.authService.getUserAccess();
        this.router.navigate(['/dashboard/reportes']);

      },
      (error) => {
        this.loading = false;
        console.log(error);
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas';
        } else {
          this.errorMessage = 'Intente nuevamente';
        }
      }
    );
  }

  navigateToRecover() {
    this.router.navigate(['/recuperar']);
  }


}
