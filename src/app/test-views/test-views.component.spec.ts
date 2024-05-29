import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestViewsComponent } from './test-views.component';

describe('TestViewsComponent', () => {
  let component: TestViewsComponent;
  let fixture: ComponentFixture<TestViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestViewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
