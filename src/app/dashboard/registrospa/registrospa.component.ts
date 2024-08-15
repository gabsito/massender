import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { CienteService } from '../../services/ciente.service';

@Component({
  selector: 'app-registrospa',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrospa.component.html',
  styleUrl: './registrospa.component.css'
})
export class RegistrospaComponent {

  registerForm: FormGroup;
  pagosForm: FormGroup;
  membresiaForm: FormGroup;
  @Output() clienteRegistrado = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private http: HttpClient, private clienteService: CienteService, private userService: UserService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      empresa: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.membresiaForm = this.fb.group({
      membresia: ['', Validators.required],
      descripcionmembresia: ['', Validators.required],
      dias: ['', Validators.required],
      precio: ['', Validators.required],
      descripcionprecio: ['', Validators.required]
    });

    this.pagosForm = this.fb.group({
      account_number: ['', Validators.required],
      expiry_date: ['', Validators.required],
      cvv: ['', Validators.required],
      account_holder: ['', Validators.required]
    });

  }

  onRegister() {
    
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);

    // Obtenemos los días de vigencia ingresados
    const diasVigencia = this.membresiaForm.value.dias;

    // Calculamos la fecha de fin sumando los días de vigencia al currentDate
    const fechaFinMembresia = new Date(currentDate);
    fechaFinMembresia.setDate(fechaFinMembresia.getDate() + diasVigencia);

    const formattedFinDate = fechaFinMembresia.getFullYear() + '-' +
      ('0' + (fechaFinMembresia.getMonth() + 1)).slice(-2) + '-' +
      ('0' + fechaFinMembresia.getDate()).slice(-2);

    const membresiaData = {
      titulo: this.membresiaForm.value.membresia,
      descripcion: this.membresiaForm.value.descripcionmembresia,
      dias_vigencia: this.membresiaForm.value.dias,
      fecha_insercion: currentDate.toISOString(),
      usuario_insercion: 0,
    };

    this.http.post<any>('https://jandryrt15.pythonanywhere.com/massender/membresias', membresiaData).subscribe(responseMembresia => {
      const membresia_id = responseMembresia.membresia_id;

      const tablaPreciosData = {
        fecha_insercion: currentDate.toISOString(),
        usuario_insercion: 0,
        descripcion: this.membresiaForm.value.descripcionprecio
      };

      this.http.post<any>('https://jandryrt15.pythonanywhere.com/massender/tablaPrecios', tablaPreciosData).subscribe(responseTablaPrecios => {
        const tabla_precios_id = responseTablaPrecios.tabla_precios_id;

        const preciosData = {
          valor: this.membresiaForm.value.precio,
          membresia_id: membresia_id,
          tabla_precios_id: tabla_precios_id,
          usuario_insercion: 0,
          fecha_insercion: currentDate.toISOString(),
        };

        this.http.post<any>('https://jandryrt15.pythonanywhere.com/massender/precios', preciosData).subscribe(() => {

          const clienteData = {
            nombre: this.registerForm.value.empresa,
            membresia_id: membresia_id,
            tabla_precios_id: tabla_precios_id,
            usuario_insercion: 0,
            medio_pago_id: 1,
            fecha_insercion: currentDate.toISOString(),
            fecha_ini_memb: formattedDate,
            fecha_fin_memb: formattedFinDate, //revisar
          };

          this.http.post<any>('https://jandryrt15.pythonanywhere.com/massender/clientes', clienteData).subscribe(() => {

            this.http.get<any>('https://jandryrt15.pythonanywhere.com/massender/roles/bydesc/administrador').subscribe(responseRol => {
              const rol_id = responseRol.rol_id;

              const usuarioData = {
                username: this.registerForm.value.username,
                nombre_completo: this.registerForm.value.nombre_completo,
                correo: this.registerForm.value.correo,
                telefono: this.registerForm.value.telefono,
                password: this.registerForm.value.password,
                rol_id: rol_id
              };

              this.http.post<any>('https://jandryrt15.pythonanywhere.com/massender/usuarios', usuarioData).subscribe(() => {
                console.log('Cliente registrado exitosamente');
              });
            });
          });
        });
      });
    });
    this.clienteRegistrado.emit();
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
