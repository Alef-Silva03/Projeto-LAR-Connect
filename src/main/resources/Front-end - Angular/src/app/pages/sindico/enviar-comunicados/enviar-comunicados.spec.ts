import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarComunicadosComponent } from './enviar-comunicados';

describe('EnviarComunicados', () => {
  let component: EnviarComunicadosComponent;
  let fixture: ComponentFixture<EnviarComunicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarComunicadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarComunicadosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
