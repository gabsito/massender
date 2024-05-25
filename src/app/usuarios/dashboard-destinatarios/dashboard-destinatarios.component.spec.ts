import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDestinatariosComponent } from './dashboard-destinatarios.component';

describe('DashboardDestinatariosComponent', () => {
  let component: DashboardDestinatariosComponent;
  let fixture: ComponentFixture<DashboardDestinatariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDestinatariosComponent]
    });
    fixture = TestBed.createComponent(DashboardDestinatariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
