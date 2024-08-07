import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import * as CryptoJS from 'crypto-js';
import { BasicComponent } from '../basic/basic.component';
import { PremiumComponent } from '../premium/premium.component';
import { VipComponent } from '../vip/vip.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, BasicComponent, PremiumComponent, VipComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registerForm: FormGroup;
  pagosForm: FormGroup;
  correosUsados: string[] = [];
  usernameUsados: string[] = [];
  usernameExists: boolean = false;

  paqueteDescripcion: string = '';
  paquetePrecio: string = '';

  paquetes: { [key: string]: { descripcion: string; precio: string } } = {
    "basic": {
      descripcion: 'Capacidad para 10000 mensajes.',
      precio: '$ 10'
    },
    "premium": {
      descripcion: 'Capacidad para 100000 mensajes.',
      precio: '$ 30'
    },
    "vip": {
      descripcion: 'Capacidad para 50,000 mensajes.',
      precio: '$ 20'
    }
  };

  constructor(private fb: FormBuilder, private http: HttpClient, private userService: UserService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.pagosForm = this.fb.group({
      tarjeta: ['', Validators.required],
      fecha: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  updatePackageInfo(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const paquete = selectElement.value;
    this.paqueteDescripcion = this.paquetes[paquete].descripcion;
    this.paquetePrecio = this.paquetes[paquete].precio;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      this.userService.checkUsername(userData.username).subscribe(
        (exists: boolean) => {
          if (exists) {
            this.usernameExists = true;
          } else {
            this.usernameExists = false;

            // Cifrar la contraseña antes de enviarla al servidor
            const encryptedPassword = CryptoJS.AES.encrypt(userData.password, 'tu-clave-secreta').toString();

            const user = {
              username: userData.username,
              nombre_completo: userData.nombre_completo,
              correo: userData.correo,
              telefono: userData.telefono,
              password: encryptedPassword
            };

            console.log('Usuario a registrar', user);

            // Llamar al servicio de backend para registrar el usuario con los datos del formulario
            // this.http.post('https://jandryrt15.pythonanywhere.com/massender/usuarios', user)
            //   .subscribe(
            //     response => {
            //       console.log('Usuario registrado con éxito', response);
            //       this.registerForm.reset();  // Limpiar el formulario
            //     },
            //     (error: any) => {
            //       console.error('Error al registrar el usuario', error);
            //     }
            //   );
          }
        },
        (error: any) => {
          console.error('Error al verificar el nombre de usuario', error);
        }
      );
    }
  }

  onFocus() {
    const input = document.getElementById('expiry-date') as HTMLInputElement;
    if (input) {
      input.placeholder = 'MM/AA';
    }
  }

  onBlur() {
    const input = document.getElementById('expiry-date') as HTMLInputElement;
    if (input) {
      input.placeholder = 'Fecha de vencimiento';
    }
  }
  
}