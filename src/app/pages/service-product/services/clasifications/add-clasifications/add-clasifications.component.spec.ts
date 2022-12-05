import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClasificationsComponent } from './add-clasifications.component';

describe('AddClasificationsComponent', () => {
  let component: AddClasificationsComponent;
  let fixture: ComponentFixture<AddClasificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClasificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClasificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
