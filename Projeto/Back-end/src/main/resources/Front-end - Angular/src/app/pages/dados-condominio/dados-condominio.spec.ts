import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCondominio } from './dados-condominio';

describe('DadosCondominio', () => {
  let component: DadosCondominio;
  let fixture: ComponentFixture<DadosCondominio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosCondominio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosCondominio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
