import { TestBed } from '@angular/core/testing';
import { MinhaConta } from '../pages/minha-conta/minha-conta';

describe('MinhaConta', () => {
  let service: MinhaConta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinhaConta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
