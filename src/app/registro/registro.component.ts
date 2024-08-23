import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import * as CryptoJS from 'crypto-js';
import { BasicComponent } from '../basic/basic.component';
import { PremiumComponent } from '../premium/premium.component';
import { VipComponent } from '../vip/vip.component';
import { CienteService } from '../services/ciente.service';

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
  rol: string = '';

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

  constructor(private fb: FormBuilder, private http: HttpClient, private clienteService: CienteService, private userService: UserService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      empresa: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      correo: ['', [Validators.required, ]],
      telefono: ['', Validators.required,],
      password: ['', Validators.required]
    });

    this.pagosForm = this.fb.group({
      account_number: ['', Validators.required],
      expiry_date: ['', Validators.required],
      cvv: ['', Validators.required],
      account_holder: ['', Validators.required]
    });
  }

  updatePackageInfo(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const paquete = selectElement.value;
    this.paqueteDescripcion = this.paquetes[paquete].descripcion;
    this.paquetePrecio = this.paquetes[paquete].precio;
  }

  ngOnInit(): void {}

  onRegister() {
    const user = this.registerForm.value;
    const pagos = this.pagosForm.value;

    // Encriptar la contraseña
    const encryptedPassword = CryptoJS.AES.encrypt(user.password, 'tu-clave-secreta').toString();

    // Obtener las fechas actuales y formatearlas
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);

    const oneMonthLater = new Date(currentDate);
    oneMonthLater.setMonth(currentDate.getMonth() + 1);
    const formattedFinDate = oneMonthLater.getFullYear() + '-' +
                      ('0' + (oneMonthLater.getMonth() + 1)).slice(-2) + '-' +
                      ('0' + oneMonthLater.getDate()).slice(-2);

    // Crear el objeto con los datos del cliente
    const clientData = {
      nombre: user.empresa,
      //cliente_id: 3,
      usuario_insercion: 0,
      membresia_id: 1,
      tabla_precios_id: 1,
      medio_pago_id: 1,
      fecha_insercion: currentDate.toISOString(),
      fecha_ini_memb: formattedDate,
      fecha_fin_memb: formattedFinDate,
    };

    this.http.get<any>('https://jandryrt15.pythonanywhere.com/massender/roles/bydesc/administrador')
    .subscribe(rolResponse => {
      console.log('Respuesta del Rol:', rolResponse); // Verificar que cliente_id está en la respuesta
      this.rol = rolResponse.rol_id;  // Obtener el cliente_id de la respuesta
      if (!this.rol) {
        console.error('Error: rol_id es nulo o indefinido');
      }
    });
    

    // Hacer la primera solicitud para registrar el Cliente
    this.http.post<any>('https://jandryrt15.pythonanywhere.com/massender/clientes', clientData)
      .subscribe(clienteResponse => {
        console.log('Respuesta del Cliente:', clienteResponse); // Verificar que cliente_id está en la respuesta
        const cliente_id = clienteResponse.cliente_id;  // Obtener el cliente_id de la respuesta
        this.clienteService.setClienteId(cliente_id);
        
        if (!cliente_id) {
          console.error('Error: cliente_id es nulo o indefinido');
        }

        // Crear el objeto con los datos del usuario, incluyendo el cliente_id obtenido
        const userData = {
          username: user.username,
          nombre_completo: user.nombre_completo,
          correo: user.correo,
          rol_id: this.rol,
          telefono: user.telefono,
          password: user.password,
          usuario_insercion: 0,
          fecha_insercion: currentDate.toISOString(),
          cliente_id: cliente_id  // Asignar el cliente_id al usuario
        };

        // Hacer la segunda solicitud para registrar el Usuario
        this.http.post<any>('https://jandryrt15.pythonanywhere.com/massender/usuarios', userData)
          .subscribe(usuarioResponse => {
            console.log('Usuario registrado exitosamente', usuarioResponse);
            this.userService.setUsername(usuarioResponse.username);
          }, error => {
            console.error('Error al registrar el usuario', error);
          });
          window.alert('Usuario registrado exitosamente');
      }, error => {
        console.error('Error al registrar el cliente', error);
      });
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