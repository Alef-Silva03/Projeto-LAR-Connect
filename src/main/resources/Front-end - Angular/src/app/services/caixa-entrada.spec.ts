import { TestBed } from '@angular/core/testing';

import { CaixaEntrada } from './caixa-entrada';

describe('CaixaDeEntrada', () => {
  let service: CaixaEntrada;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaixaEntrada);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
