import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarMensagens } from './enviar-mensagens';

describe('EnviarMensagens', () => {
  let component: EnviarMensagens;
  let fixture: ComponentFixture<EnviarMensagens>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarMensagens]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarMensagens);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
