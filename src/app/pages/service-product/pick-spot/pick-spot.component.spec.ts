import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickSpotComponent } from './pick-spot.component';

describe('PickSpotComponent', () => {
  let component: PickSpotComponent;
  let fixture: ComponentFixture<PickSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickSpotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
