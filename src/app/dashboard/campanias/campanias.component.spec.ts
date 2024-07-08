import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaniasComponent } from './campanias.component';

describe('CampaniasComponent', () => {
  let component: CampaniasComponent;
  let fixture: ComponentFixture<CampaniasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaniasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
