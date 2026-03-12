import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelFuncionarios } from './painel-funcionarios';

describe('PainelFuncionarios', () => {
  let component: PainelFuncionarios;
  let fixture: ComponentFixture<PainelFuncionarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelFuncionarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelFuncionarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
