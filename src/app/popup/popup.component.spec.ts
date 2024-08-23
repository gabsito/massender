import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<PopupComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [PopupComponent, FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería ser inválido si el nombre contiene números', () => {
    component.employeeName = 'John123';
    fixture.detectChanges();

    const isValid = /^[a-zA-Z\s]*$/.test(component.employeeName);
    expect(isValid).toBeFalsy(); // Debería ser inválido porque contiene números
  });

  it('debería ser válido si el nombre contiene solo letras', () => {
    component.employeeName = 'John Doe';
    fixture.detectChanges();

    const isValid = /^[a-zA-Z\s]*$/.test(component.employeeName);
    expect(isValid).toBeTruthy(); // Debería ser válido porque contiene solo letras
  });

  it('debería ser inválido si el nombre está vacío', () => {
    component.employeeName = '';
    fixture.detectChanges();
  
    const nameInput = fixture.debugElement.query(By.css('#employeename')).nativeElement;
    expect(nameInput.checkValidity()).toBeFalsy(); // Debería ser inválido porque está vacío
  });

  it('debería ser inválido si el correo no tiene un formato correcto', () => {
    component.employeeEmail = 'john.doe@';
    fixture.detectChanges();

    const emailInput = fixture.debugElement.query(By.css('#employeeemail')).nativeElement;
    expect(emailInput.checkValidity()).toBeFalsy(); // Debería ser inválido porque no tiene un formato correcto
  });

  it('debería ser inválido si el correo está vacío', () => {
    component.employeeEmail = '';
    fixture.detectChanges();

    const emailInput = fixture.debugElement.query(By.css('#employeeemail')).nativeElement;
    expect(emailInput.checkValidity()).toBeFalsy(); // Debería ser inválido porque está vacío
  });

  it('debería cerrar el diálogo con datos válidos cuando se envía el formulario', () => {
    // No necesitamos espiar `close` aquí de nuevo
    component.employeeName = 'John Doe';
    component.employeeEmail = 'john.doe@example.com';
    component.onSubmit();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john.doe@example.com'
    });
  });

  it('no debería cerrar el diálogo si el formulario está incompleto', () => {
    // No necesitamos espiar `close` aquí de nuevo
    component.employeeName = '';
    component.employeeEmail = 'john.doe@example.com';
    component.onSubmit();

    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});
