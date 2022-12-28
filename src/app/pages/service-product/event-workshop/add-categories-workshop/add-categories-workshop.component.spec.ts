import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoriesWorkshopComponent } from './add-categories-workshop.component';

describe('AddCategoriesWorkshopComponent', () => {
  let component: AddCategoriesWorkshopComponent;
  let fixture: ComponentFixture<AddCategoriesWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoriesWorkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoriesWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
