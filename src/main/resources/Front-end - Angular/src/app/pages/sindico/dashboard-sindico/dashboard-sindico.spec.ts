import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSindico } from './dashboard-sindico';

describe('DashboardSindico', () => {
  let component: DashboardSindico;
  let fixture: ComponentFixture<DashboardSindico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSindico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSindico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
