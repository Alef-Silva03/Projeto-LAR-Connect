import { TestBed } from '@angular/core/testing';

import { Funcionarios } from './funcionarios';

describe('Funcionarios', () => {
  let service: Funcionarios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Funcionarios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
