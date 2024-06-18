import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinatariosComponent } from './destinatarios.component';

describe('DestinatariosComponent', () => {
  let component: DestinatariosComponent;
  let fixture: ComponentFixture<DestinatariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinatariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinatariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
