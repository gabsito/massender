import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrospaComponent } from './registrospa.component';

describe('RegistrospaComponent', () => {
  let component: RegistrospaComponent;
  let fixture: ComponentFixture<RegistrospaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrospaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrospaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
