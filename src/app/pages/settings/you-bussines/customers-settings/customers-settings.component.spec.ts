import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersSettingsComponent } from './customers-settings.component';

describe('CustomersSettingsComponent', () => {
  let component: CustomersSettingsComponent;
  let fixture: ComponentFixture<CustomersSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
