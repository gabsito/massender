import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../services/user.service';
import { CienteService } from '../services/ciente.service';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RegistroComponent],
      
      providers: [UserService, CienteService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('debería ser válido si el nombre es de 20 caracteres o menos', () => {
    const nombre = component.registerForm.controls['empresa'];
    nombre.setValue('NombreEmpresa');
    expect(nombre.valid).toBeTruthy();
  });

  it('debería ser inválido si el username es mayor a 10 caracteres', () => {
    const username = component.registerForm.controls['username'];
    username.setValue('UsuarioMuyLargo');
    expect(username.valid).toBeFalsy();
  });

  it('debería ser válido si el username es de 10 caracteres o menos', () => {
    const username = component.registerForm.controls['username'];
    username.setValue('Usuario');
    expect(username.valid).toBeTruthy();
  });

  it('debería ser inválido si el nombre completo es mayor a 50 caracteres', () => {
    const nombre_completo = component.registerForm.controls['nombre_completo'];
    nombre_completo.setValue('Nombre Completo Muy Largo Que Excede Cincuenta Caracteres Permitidos');
    expect(nombre_completo.valid).toBeFalsy();
  });

  it('debería ser válido si el nombre completo es de 50 caracteres o menos', () => {
    const nombre_completo = component.registerForm.controls['nombre_completo'];
    nombre_completo.setValue('Nombre Completo');
    expect(nombre_completo.valid).toBeTruthy();
  });

  it('debería ser inválido si el correo tiene más de 30 caracteres o no tiene el formato correcto', () => {
    const correo = component.registerForm.controls['correo'];
    correo.setValue('uncorreoquenocumpleconel@formatoymucharacteres.com');
    expect(correo.valid).toBeFalsy();

    correo.setValue('correo@sinformato');
    expect(correo.valid).toBeFalsy();
  });

  it('debería ser válido si el correo tiene 30 caracteres o menos y el formato correcto', () => {
    const correo = component.registerForm.controls['correo'];
    correo.setValue('ejemplo@universidad.edu.ec');
    expect(correo.valid).toBeTruthy();
  });

  it('debería ser inválido si el teléfono no tiene exactamente 10 dígitos', () => {
    const telefono = component.registerForm.controls['telefono'];
    telefono.setValue('12345');
    expect(telefono.valid).toBeFalsy();

    telefono.setValue('12345678901');
    expect(telefono.valid).toBeFalsy();
  });

  it('debería ser válido si el teléfono tiene exactamente 10 dígitos', () => {
    const telefono = component.registerForm.controls['telefono'];
    telefono.setValue('0987654321');
    expect(telefono.valid).toBeTruthy();
  });

  it('debería ser inválido si alguno de los campos requeridos está vacío', () => {
    component.registerForm.controls['empresa'].setValue('');
    component.registerForm.controls['username'].setValue('');
    component.registerForm.controls['nombre_completo'].setValue('');
    component.registerForm.controls['correo'].setValue('');
    component.registerForm.controls['telefono'].setValue('');
    component.registerForm.controls['password'].setValue('');

    expect(component.registerForm.valid).toBeFalsy();
  });

});
