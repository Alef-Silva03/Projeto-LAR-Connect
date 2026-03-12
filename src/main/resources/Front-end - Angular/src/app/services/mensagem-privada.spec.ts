import { TestBed } from '@angular/core/testing';

import { MensagemPrivada } from './mensagem-privada';

describe('MensagemPrivada', () => {
  let service: MensagemPrivada;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensagemPrivada);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
