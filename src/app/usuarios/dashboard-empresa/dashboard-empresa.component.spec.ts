import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmpresaComponent } from './dashboard-empresa.component';

describe('DashboardEmpresaComponent', () => {
  let component: DashboardEmpresaComponent;
  let fixture: ComponentFixture<DashboardEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardEmpresaComponent]
    });
    fixture = TestBed.createComponent(DashboardEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
