import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventWorkshopComponent } from './event-workshop.component';

describe('EventWorkshopComponent', () => {
  let component: EventWorkshopComponent;
  let fixture: ComponentFixture<EventWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventWorkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
