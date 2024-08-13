import { TestBed } from '@angular/core/testing';

import { CienteService } from './ciente.service';

describe('CienteService', () => {
  let service: CienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
