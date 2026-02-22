import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnunciosImoveis } from './anuncios-imoveis';

describe('AnunciosImoveis', () => {
  let component: AnunciosImoveis;
  let fixture: ComponentFixture<AnunciosImoveis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnunciosImoveis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnunciosImoveis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
