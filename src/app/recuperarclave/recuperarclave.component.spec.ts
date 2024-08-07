import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarclaveComponent } from './recuperarclave.component';

describe('RecuperarclaveComponent', () => {
  let component: RecuperarclaveComponent;
  let fixture: ComponentFixture<RecuperarclaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarclaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarclaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
