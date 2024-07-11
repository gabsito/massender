import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionDeCampaniaComponent } from './creaciondecampania.component';

describe('CreaciondecampaniaComponent', () => {
  let component: CreacionDeCampaniaComponent;
  let fixture: ComponentFixture<CreacionDeCampaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionDeCampaniaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionDeCampaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
