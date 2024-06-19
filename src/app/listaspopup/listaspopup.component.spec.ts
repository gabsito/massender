import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaspopupComponent } from './listaspopup.component';

describe('ListaspopupComponent', () => {
  let component: ListaspopupComponent;
  let fixture: ComponentFixture<ListaspopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaspopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
