import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventAndWorkshopComponent } from './add-event-and-workshop.component';

describe('AddEventAndWorkshopComponent', () => {
  let component: AddEventAndWorkshopComponent;
  let fixture: ComponentFixture<AddEventAndWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventAndWorkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEventAndWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
