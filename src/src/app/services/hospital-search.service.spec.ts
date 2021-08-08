import { TestBed } from '@angular/core/testing';

import { HospitalSearchService } from './hospital-search.service';

describe('HospitalSearchService', () => {
  let service: HospitalSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
