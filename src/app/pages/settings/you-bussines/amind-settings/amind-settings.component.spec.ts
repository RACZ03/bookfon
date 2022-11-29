import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmindSettingsComponent } from './amind-settings.component';

describe('AmindSettingsComponent', () => {
  let component: AmindSettingsComponent;
  let fixture: ComponentFixture<AmindSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmindSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmindSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
