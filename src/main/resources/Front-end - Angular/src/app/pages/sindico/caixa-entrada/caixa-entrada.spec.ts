import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaEntrada } from './caixa-entrada';

describe('CaixaEntrada', () => {
  let component: CaixaEntrada;
  let fixture: ComponentFixture<CaixaEntrada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaixaEntrada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaixaEntrada);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
