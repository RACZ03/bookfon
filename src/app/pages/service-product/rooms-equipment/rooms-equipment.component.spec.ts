import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsEquipmentComponent } from './rooms-equipment.component';

describe('RoomsEquipmentComponent', () => {
  let component: RoomsEquipmentComponent;
  let fixture: ComponentFixture<RoomsEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
