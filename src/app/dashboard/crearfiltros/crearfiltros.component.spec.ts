import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearfiltrosComponent } from './crearfiltros.component';

describe('CrearfiltrosComponent', () => {
  let component: CrearfiltrosComponent;
  let fixture: ComponentFixture<CrearfiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearfiltrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearfiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
