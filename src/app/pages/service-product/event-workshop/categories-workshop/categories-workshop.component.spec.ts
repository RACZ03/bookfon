import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesWorkshopComponent } from './categories-workshop.component';

describe('CategoriesWorkshopComponent', () => {
  let component: CategoriesWorkshopComponent;
  let fixture: ComponentFixture<CategoriesWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesWorkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
