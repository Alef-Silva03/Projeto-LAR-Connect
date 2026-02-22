import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEnquete } from './criar-enquete';

describe('CriarEnquete', () => {
  let component: CriarEnquete;
  let fixture: ComponentFixture<CriarEnquete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarEnquete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarEnquete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
