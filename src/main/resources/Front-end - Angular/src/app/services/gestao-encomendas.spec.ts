import { TestBed } from '@angular/core/testing';

import { GestaoEncomendas } from './gestao-encomendas';

describe('GestaoEncomendas', () => {
  let service: GestaoEncomendas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestaoEncomendas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
