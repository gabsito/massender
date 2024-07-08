import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreardestinatariosComponent } from './creardestinatarios.component';

describe('CreardestinatariosComponent', () => {
  let component: CreardestinatariosComponent;
  let fixture: ComponentFixture<CreardestinatariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreardestinatariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreardestinatariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
