import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoEncomendas } from './gestao-encomendas';

describe('GestaoEncomendas', () => {
  let component: GestaoEncomendas;
  let fixture: ComponentFixture<GestaoEncomendas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestaoEncomendas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoEncomendas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
