import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeCustomersComponent } from './first-time-customers.component';

describe('FirstTimeCustomersComponent', () => {
  let component: FirstTimeCustomersComponent;
  let fixture: ComponentFixture<FirstTimeCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstTimeCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstTimeCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
