import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarComunicados } from './enviar-comunicados';

describe('EnviarComunicados', () => {
  let component: EnviarComunicados;
  let fixture: ComponentFixture<EnviarComunicados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarComunicados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarComunicados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
