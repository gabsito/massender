import { TestBed } from '@angular/core/testing';

import { CampaniasService } from './campanias.service';

describe('CampaniasService', () => {
  let service: CampaniasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaniasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
