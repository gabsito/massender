import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargadestinatariosComponent } from './cargadestinatarios.component';

describe('CargadestinatariosComponent', () => {
  let component: CargadestinatariosComponent;
  let fixture: ComponentFixture<CargadestinatariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargadestinatariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargadestinatariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
