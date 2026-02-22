import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaEspacos } from './reserva-espacos';

describe('ReservaEspacos', () => {
  let component: ReservaEspacos;
  let fixture: ComponentFixture<ReservaEspacos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaEspacos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaEspacos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
