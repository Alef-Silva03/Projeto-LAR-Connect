import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaDeEntrada } from './caixa-de-entrada';

describe('CaixaDeEntrada', () => {
  let component: CaixaDeEntrada;
  let fixture: ComponentFixture<CaixaDeEntrada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaixaDeEntrada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaixaDeEntrada);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
