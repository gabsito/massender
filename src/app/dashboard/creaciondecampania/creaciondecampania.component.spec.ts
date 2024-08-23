import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreacionDeCampaniaComponent } from './creaciondecampania.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CreacionDeCampaniaComponent', () => {
  let component: CreacionDeCampaniaComponent;
  let fixture: ComponentFixture<CreacionDeCampaniaComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionDeCampaniaComponent, HttpClientTestingModule, ReactiveFormsModule, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionDeCampaniaComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería invalidar el formulario si el nombre de la campaña está vacío', () => {
    component.campaignForm.controls['nombreCampania'].setValue('');
    expect(component.campaignForm.valid).toBeFalsy();
  });

  it('debería invalidar el formulario si el mensaje está vacío', () => {
    component.campaignForm.controls['mensaje'].setValue('');
    expect(component.campaignForm.valid).toBeFalsy();
  });

  it('debería invalidar el formulario si no se selecciona lista de destinatarios', () => {
    component.campaignForm.controls['listaDestinatarios'].setValue('');
    expect(component.campaignForm.valid).toBeFalsy();
  });

  it('debería invalidar el formulario si no se selecciona un medio de envío', () => {
    component.campaignForm.controls['medio'].setValue('');
    expect(component.campaignForm.valid).toBeFalsy();
  });
  

  });
