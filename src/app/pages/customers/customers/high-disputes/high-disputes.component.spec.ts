import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighDisputesComponent } from './high-disputes.component';

describe('HighDisputesComponent', () => {
  let component: HighDisputesComponent;
  let fixture: ComponentFixture<HighDisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighDisputesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
