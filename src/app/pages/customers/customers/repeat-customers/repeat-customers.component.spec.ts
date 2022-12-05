import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatCustomersComponent } from './repeat-customers.component';

describe('RepeatCustomersComponent', () => {
  let component: RepeatCustomersComponent;
  let fixture: ComponentFixture<RepeatCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepeatCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
