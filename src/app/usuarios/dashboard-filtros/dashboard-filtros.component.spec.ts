import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFiltrosComponent } from './dashboard-filtros.component';

describe('DashboardFiltrosComponent', () => {
  let component: DashboardFiltrosComponent;
  let fixture: ComponentFixture<DashboardFiltrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardFiltrosComponent]
    });
    fixture = TestBed.createComponent(DashboardFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
