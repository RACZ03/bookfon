import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighRefundsComponent } from './high-refunds.component';

describe('HighRefundsComponent', () => {
  let component: HighRefundsComponent;
  let fixture: ComponentFixture<HighRefundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighRefundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
