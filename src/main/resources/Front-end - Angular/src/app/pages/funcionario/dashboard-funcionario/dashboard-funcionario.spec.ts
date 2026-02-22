import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFuncionario } from './dashboard-funcionario';

describe('DashboardFuncionario', () => {
  let component: DashboardFuncionario;
  let fixture: ComponentFixture<DashboardFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFuncionario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
