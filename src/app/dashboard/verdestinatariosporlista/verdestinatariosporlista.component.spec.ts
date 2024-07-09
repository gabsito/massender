import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDestinatariosPorListaComponent } from './verdestinatariosporlista.component';

describe('VerdestinatariosporlistaComponent', () => {
  let component: VerDestinatariosPorListaComponent;
  let fixture: ComponentFixture<VerDestinatariosPorListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDestinatariosPorListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDestinatariosPorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
