import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemAoSindico } from './mensagem-ao-sindico';

describe('MensagemAoSindico', () => {
  let component: MensagemAoSindico;
  let fixture: ComponentFixture<MensagemAoSindico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensagemAoSindico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensagemAoSindico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
