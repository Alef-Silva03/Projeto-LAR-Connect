import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedefinirSenhaComponent } from './redefinir-senha';

describe('RedefinirSenha', () => {
  let component: RedefinirSenhaComponent;
  let fixture: ComponentFixture<RedefinirSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedefinirSenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedefinirSenhaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
