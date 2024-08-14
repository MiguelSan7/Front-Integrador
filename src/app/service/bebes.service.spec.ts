import { TestBed } from '@angular/core/testing';

import { BebesService } from './bebes.service';

describe('BebesService', () => {
  let service: BebesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BebesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
