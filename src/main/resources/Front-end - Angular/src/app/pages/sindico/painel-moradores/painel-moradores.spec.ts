import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelMoradores } from './painel-moradores';

describe('PainelMoradores', () => {
  let component: PainelMoradores;
  let fixture: ComponentFixture<PainelMoradores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelMoradores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelMoradores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
