import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaGaragem } from './vaga-garagem';

describe('VagaGaragem', () => {
  let component: VagaGaragem;
  let fixture: ComponentFixture<VagaGaragem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VagaGaragem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VagaGaragem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
