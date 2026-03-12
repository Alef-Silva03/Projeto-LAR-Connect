import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSenhaComponent } from './nova-senha';

describe('NovaSenha', () => {
  let component: NovaSenhaComponent;
  let fixture: ComponentFixture<NovaSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaSenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaSenhaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
