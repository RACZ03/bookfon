import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceinitComponent } from './serviceinit.component';

describe('ServiceinitComponent', () => {
  let component: ServiceinitComponent;
  let fixture: ComponentFixture<ServiceinitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceinitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceinitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
