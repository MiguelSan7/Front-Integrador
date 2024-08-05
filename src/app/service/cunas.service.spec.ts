import { TestBed } from '@angular/core/testing';

import { CunasService } from './cunas.service';

describe('CunasService', () => {
  let service: CunasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CunasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
