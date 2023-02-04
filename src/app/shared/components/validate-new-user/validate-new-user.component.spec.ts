import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateNewUserComponent } from './validate-new-user.component';

describe('ValidateNewUserComponent', () => {
  let component: ValidateNewUserComponent;
  let fixture: ComponentFixture<ValidateNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateNewUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
