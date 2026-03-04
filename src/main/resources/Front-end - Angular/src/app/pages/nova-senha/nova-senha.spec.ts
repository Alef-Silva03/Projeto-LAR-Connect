import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSenha } from './nova-senha';

describe('NovaSenha', () => {
  let component: NovaSenha;
  let fixture: ComponentFixture<NovaSenha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaSenha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaSenha);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
