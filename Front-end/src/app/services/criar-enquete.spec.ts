import { TestBed } from '@angular/core/testing';

import { CriarEnquete } from './criar-enquete';

describe('CriarEnquete', () => {
  let service: CriarEnquete;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriarEnquete);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
