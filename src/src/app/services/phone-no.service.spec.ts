import { TestBed } from '@angular/core/testing';

import { PhoneNoService } from './phone-no.service';

describe('PhoneNoService', () => {
  let service: PhoneNoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneNoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
