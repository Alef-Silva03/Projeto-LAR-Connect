import { TestBed } from '@angular/core/testing';

import { Moradores } from './moradores';

describe('Moradores', () => {
  let service: Moradores;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Moradores);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
