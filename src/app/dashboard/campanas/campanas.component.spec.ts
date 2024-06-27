import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanasComponent } from './campanas.component';

describe('CampanasComponent', () => {
  let component: CampanasComponent;
  let fixture: ComponentFixture<CampanasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampanasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
