import { TestBed } from '@angular/core/testing';

import { CaixaDeEntrada } from './caixa-de-entrada';

describe('CaixaDeEntrada', () => {
  let service: CaixaDeEntrada;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaixaDeEntrada);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
