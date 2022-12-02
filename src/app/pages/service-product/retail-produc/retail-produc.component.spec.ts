import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailProducComponent } from './retail-produc.component';

describe('RetailProducComponent', () => {
  let component: RetailProducComponent;
  let fixture: ComponentFixture<RetailProducComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailProducComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailProducComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
