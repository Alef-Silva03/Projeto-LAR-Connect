import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCondominio } from './criar-condominio';

describe('CriarCondominio', () => {
  let component: CriarCondominio;
  let fixture: ComponentFixture<CriarCondominio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarCondominio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarCondominio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
