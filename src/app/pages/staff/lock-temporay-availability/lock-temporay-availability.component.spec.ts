import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockTemporayAvailabilityComponent } from './lock-temporay-availability.component';

describe('LockTemporayAvailabilityComponent', () => {
  let component: LockTemporayAvailabilityComponent;
  let fixture: ComponentFixture<LockTemporayAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockTemporayAvailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockTemporayAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
